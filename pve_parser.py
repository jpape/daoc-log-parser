import operator

#region Money messages
CHAT_MESSAGE_INDICATOR = "@@"
GOLD_PICKUP_MESSAGE = 'You pick up'
# [19:04:48] You pick up 1 gold, 5 silver and 61 copper pieces.
GOLD_FOR_KILL_MESSAGE = 'for this kill'
# [21:45:03] You get 54 silver and 63 copper pieces for this kill.
MONEY_RECEIVED_MESSAGE = 'gives you'
# [15:04:51] Galdur Bonsavoir gives you 25 silver pieces for 2 earthen distill.
MONEY_SPENT_MESSAGE = 'You just bought'
# [15:05:42] You just bought an ancient treant wood for 20 silver pieces.
BG_LOOT_SHARE_MESAGE = 'Your share of the loot'
# [10:09:40] Your share of the loot is 29 silver and 72 copper pieces.
#endregion

def parse_pve(readf, error_messages):
    result = {}
    result['Monies'] = parse_cash_flow(readf, error_messages)
    result['Drops'] = parse_loot(readf, error_messages)
    result['XP'] = parse_xp(readf, error_messages)

    return result

def parse_loot(readf, error_messages):
    readf.seek(0)
    mob_drops = {}

    try:
        for line in readf:
            if 'dies!' in line:
                split_line = line.split()
                dead_mob = ' '.join(split_line[1:split_line.index('dies!')])
                dead_mob = dead_mob.replace('The ', '')
                if dead_mob not in mob_drops.keys():
                    mob_drops[dead_mob] = MobDropList()
                mob_drops[dead_mob].add_death()
            elif 'drops a' in line:
                split_line = line.split()
                mob = ' '.join(split_line[1:split_line.index('drops')])
                drop = ' '.join(split_line[split_line.index('drops')+1:])

                mob = mob.replace('The ', '')
                drop = drop.replace('a ', '').replace('the ', '').replace('.', '').replace('an ', '')

                if mob not in mob_drops.keys():
                    mob_drops[mob] = MobDropList()

                mob_drops[mob].add_drop(drop)
    except Exception:
        error_messages.append('Error parsing PVE')


    results = []
    for mob, drops in mob_drops.items():
        if drops.get_drops():
            deaths, drop_list = drops.get_all_stats()
            results.append([mob, deaths, drop_list])

    return results

#region Money
def parse_cash_flow(readf, error_messages):
    """Parses income, expense, and loot"""
    readf.seek(0)
    current_line = 0
    result = {}
    money_spent = 0
    money_gained = 0
    money_looted = 0
    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif MONEY_RECEIVED_MESSAGE in line:
                money_gained += parse_money_denomination(line)
            elif MONEY_SPENT_MESSAGE in line:
                money_spent += parse_money_denomination(line)
            elif GOLD_PICKUP_MESSAGE in line or GOLD_FOR_KILL_MESSAGE in line or BG_LOOT_SHARE_MESAGE in line:
                money_looted += parse_money_denomination(line)
        except IndexError as err:
            error_messages.append('TM (line {0}): {1}'.format(current_line, err))
            continue
    result['Income'] = currency_breakdown(money_gained)
    result['Expense'] = currency_breakdown(money_spent)
    result['Loot'] = currency_breakdown(money_looted)

    return result

def parse_money_denomination(line):
    split_line = line.split()
    """Finds each currency denomination and breaks it all down to copper"""
    money_total = 0
    if 'plat' in line:
        if 'plat,' in line:
            plat_text = split_line[split_line.index('plat,')-1]
        else:
            plat_text = split_line[split_line.index('plat')-1]
        # if type(plat_text) is int:
        money_total += 10000000 * int(plat_text)
    if 'gold' in line:
        if 'gold,' in line:
            gold_text = split_line[split_line.index('gold,')-1]
        else:
            gold_text = split_line[split_line.index('gold')-1]
        # if type(gold_text) is int:
        money_total += 10000 * int(gold_text)
    if 'silver' in line:
        if 'silver,' in line:
            silver_text = split_line[split_line.index('silver,')-1]
        else:
            silver_text = split_line[split_line.index('silver')-1]
        # if type(silver_text) is int:
        money_total += 100 * int(silver_text)
    if line.find('copper') != -1:
        copper_text = split_line[split_line.index('copper')-1]
        # if type(copper_text) is int:
        money_total += int(copper_text)

    return money_total

def currency_breakdown(total):
    """Helper method to parse_money. Seperates 'total' into
    largest denominations and returns them in a list."""
    plat = int(total/10000000)
    gold = int((total%10000000)/10000)
    silver = int((total%10000)/100)
    copper = int(total%100)
    return [plat, gold, silver, copper]

#endregion


def parse_xp(readf, error_messages, inject_non_xp_timestamps=False, using_stacked_area=False):
    readf.seek(0)

    experience_timestamps = {}
    nonLocal = NonLocal()

    xp_timestamp = ''

    for line in readf:
        if len(line.split()) == 0:
            continue

        this_timestamp = line.split()[0].replace('[', '').replace(']', '')

        if this_timestamp != xp_timestamp and nonLocal.xp_earn is not None:
            if nonLocal.xp_earn.base_xp < 0:
                nonLocal.xp_earn.base_xp = 0
            experience_timestamps[xp_timestamp] = nonLocal.xp_earn
            nonLocal.xp_earn = None
            xp_timestamp = ''

        if 'experience points' in line:
            xp_timestamp = this_timestamp
            if nonLocal.xp_earn is None:
                nonLocal.xp_earn = ExperienceEarn()


            xp_amount = int(line.split()[3].replace(',', ''))
            if 'extra' not in line:
                nonLocal.xp_earn.base_xp += xp_amount
            else:
                nonLocal.xp_earn.extra_xp += xp_amount

        if 'camp bonus' in line:
            xp_timestamp = this_timestamp
            if nonLocal.xp_earn is None:
                nonLocal.xp_earn = ExperienceEarn()

            try:
                c_xp = int(line.split()[5].replace('points.(', '').replace(',', '').replace('(', ''))
            except ValueError:
                c_xp = int(line.split()[6].replace('points.(', '').replace(',', '').replace('(', ''))
            nonLocal.xp_earn.camp_xp += c_xp
            nonLocal.xp_earn.base_xp -= c_xp
        
        if 'group bonus' in line:
            xp_timestamp = this_timestamp
            if nonLocal.xp_earn is None:
                nonLocal.xp_earn = ExperienceEarn()

            split_line = line.split()
            g_xp = int(split_line[split_line.index('group')-1].replace(',', '').replace('(', ''))
            nonLocal.xp_earn.group_xp += g_xp
            nonLocal.xp_earn.base_xp -= g_xp
        
        if 'bonus experience' in line:
            xp_timestamp = this_timestamp
            if nonLocal.xp_earn is None:
                nonLocal.xp_earn = ExperienceEarn()

            b_xp = int(line.split()[3].replace(',', ''))

            if 'for adventuring in this area' in line:
                nonLocal.xp_earn.zone_xp += b_xp
            elif 'from realm outpost ownership!' in line:
                nonLocal.xp_earn.keep_xp += b_xp
            else:
                nonLocal.xp_earn.bonus_xp += b_xp
            nonLocal.xp_earn.base_xp -= b_xp

        if 'over cap' in line:
            xp_timestamp = this_timestamp
            if nonLocal.xp_earn is None:
                nonLocal.xp_earn = ExperienceEarn()
            
            split_line = line.split()
            oc_xp = int(split_line[split_line.index('over')-1].replace(',', '').replace('(', ''))
            nonLocal.xp_earn.over_cap += oc_xp
            nonLocal.xp_earn.base_xp -= oc_xp


    if inject_non_xp_timestamps and experience_timestamps.keys():
        from datetime import datetime, timedelta

        max_ts = datetime.strptime(max(experience_timestamps.keys()), '%H:%M:%S')
        min_ts = datetime.strptime(min(experience_timestamps.keys()), '%H:%M:%S')
        total_time = max_ts - min_ts
        for second in range(int(total_time.total_seconds())):
            next_ts = datetime.strftime(min_ts + timedelta(seconds=second), '%H:%M:%S')
            if next_ts not in experience_timestamps.keys():
                experience_timestamps[next_ts] = ExperienceEarn()

    sorted_xp_list = sorted(experience_timestamps.items(), key=operator.itemgetter(0))

    if using_stacked_area:
        return manip_dict_to_stacked_chart(sorted_xp_list)

    return manip_dict_to_chart_data(sorted_xp_list)


def manip_dict_to_stacked_chart(xp_timestamps):
    result = []
    
    base_series = []
    camp_series = []
    zone_series = []
    group_series = []
    bonus_series = []
    extra_series = []
    keep_series = []
    overcap_series = []

    for ts in xp_timestamps:
        xp= ts[1]
        
        base_series.append({
            "name":ts[0],
            "value":xp.base_xp
        })
        camp_series.append({
            "name":ts[0],
            "value":xp.camp_xp
        })
        zone_series.append({
            "name":ts[0],
            "value":xp.zone_xp
        })
        group_series.append({
            "name":ts[0],
            "value":xp.group_xp
        })
        bonus_series.append({
            "name":ts[0],
            "value":xp.bonus_xp
        })
        extra_series.append({
            "name":ts[0],
            "value":xp.extra_xp
        })
        keep_series.append({
            "name":ts[0],
            "value":xp.keep_xp
        })
        overcap_series.append({
            "name":ts[0],
            "value":xp.over_cap
        })

    regions = ['Base', 'Camp', 'Zone', 'Group', 'Bonus', 'Extra', 'Keep', 'OverCap']
    series = [base_series, camp_series, zone_series, group_series, bonus_series, extra_series, keep_series, overcap_series]

    for x in range(len(regions)):
        result.append({
            'name':regions[x],
            'series':series[x]
        })

    return result



def manip_dict_to_chart_data(xp_timestamps):
    result = []

    for ts in xp_timestamps:
        series = []
        xp = ts[1]

        # if xp.base_xp > 0:
        series.append(
            {
                "name":"Base",
                "value":xp.base_xp
            }
        )
        # if xp.camp_xp > 0:
        series.append(
            {
                "name":"Camp",
                "value":xp.camp_xp
            }
        )
        # if xp.zone_xp > 0:
        series.append(
            {
                "name":"Zone",
                "value":xp.zone_xp
            }
        )
        # if xp.group_xp > 0:
        series.append(
            {
                "name":"Group",
                "value":xp.group_xp
            }
        )
        # if xp.bonus_xp > 0:
        series.append(
            {
                "name":"Bonus",
                "value":xp.bonus_xp
            }
        )
        # if xp.extra_xp > 0:
        series.append(
            {
                "name":"Extra",
                "value":xp.extra_xp
            }
        )
        # if xp.keep_xp > 0:
        series.append(
            {
                "name":"Keep",
                "value":xp.keep_xp
            }
        )
        # if xp.over_cap > 0:
        series.append(
            {
                "name":"OverCap",
                "value":xp.over_cap
            }
        )

        result.append({
            "name":ts[0],
            "series":series
        })

    return result



class NonLocal(object):
    xp_earn = None

class MobDropList(object):
    def __init__(self):
        self._deaths = 0
        self._items = {}

    def add_drop(self, item):
        if item not in self._items.keys():
            self._items[item] = 0

        self._items[item] += 1

    def add_death(self):
        self._deaths += 1

    def get_drops(self):
        # res = []
        # for item, count in self._items.items():
        #     res.append([item, count])

        # return res

        return sorted(self._items.items(), key=operator.itemgetter(1), reverse=True)

    def get_all_stats(self):
        return self._deaths, self.get_drops()

class ExperienceEarn(object):
    def __init__(self):
        self.base_xp = 0
        self.camp_xp = 0
        self.zone_xp = 0
        self.group_xp = 0
        self.bonus_xp = 0
        self.extra_xp = 0
        self.keep_xp = 0
        self.over_cap = 0

    def get_total_xp(self):
        return self.base_xp + self.camp_xp + self.zone_xp + self.bonus_xp \
            + self.extra_xp + self.group_xp + self.keep_xp


def test_parse():
    with open('C:/Git/Daoc_log_parse/Log Files/spindel915.log', 'r') as readf:
        res = parse_xp(readf, [])

        print(res)




# test_parse()








# [18:55:13] You attack the cave trow with your Grim Maul and hit for 106 damage!
# [18:55:13] The cave trow drops a bag of coins.
# [18:55:13] The cave trow drops a cursed ekyps control orb.
# [18:55:13] The cave trow drops a small chest.
# [18:55:13] You pick up 75 silver and 66 copper pieces.
# [18:55:13] You get a cursed ekyps control orb and put it in your backpack.
# [18:55:13] You pick up 1 gold, 16 silver and 98 copper pieces.
# [18:55:13] The cave trow dies!
# [18:55:13] You get 75,497,472 experience points.(33,554,432 camp bonus)
# [18:55:13] You gain 9,059,696 bonus experience due to successful activities of your realm in the frontiers