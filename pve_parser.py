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
#endregion

def parse_pve(readf, error_messages):
    result = {}
    result['Monies'] = parse_cash_flow(readf, error_messages)
    result['Drops'] = parse_loot(readf, error_messages)

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
            elif GOLD_PICKUP_MESSAGE in line or GOLD_FOR_KILL_MESSAGE in line:
                money_looted += parse_money_denomination(line)
        except IndexError as err:
            error_messages.append('TM (line {0}): {1}'.format(current_line, err))
            continue
    result['Income'] = currency_breakdown(money_gained)
    result['Expense'] = currency_breakdown(money_spent)
    result['Loot'] = currency_breakdown(money_looted)

    return result

def parse_money_denomination(line):
    """Finds each currency denomination and breaks it all down to copper"""
    money_total = 0
    if line.find('plat') != -1:
        plat_text = line[line.find('plat')-4:line.find('gold')]
        money_total += 10000000 * int(plat_text.split()[line(plat_text.split())-1])
    if line.find('gold') != -1:
        gold_text = line[line.find('gold')-4:line.find('gold')]
        money_total += 10000 * int(gold_text.split()[len(gold_text.split())-1])
    if line.find('silver') != -1:
        money_total += 100 * int(line[line.find('silver')-3:line.find('silver')-1])
    if line.find('copper') != -1:
        money_total += int(line[line.find('copper')-3:line.find('copper')-1])

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



def test_parse():
    with open('C:/Git/Daoc_log_parse/Log Files/spindel915.log', 'r') as readf:
        res = parse_pve(readf, [])

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