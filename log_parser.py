"""Opens a saved chatlog from Dark Age of Camelot and parses various numbers
    and stats from it"""
__author__ = "robert.pape"
__date__ = "2018/01/04"

import json
import operator

#region Message Constants
CHAT_MESSAGE_INDICATOR = "@@"

#region Money messages
GOLD_PICKUP_MESSAGE = 'You pick up'
# [19:04:48] You pick up 1 gold, 5 silver and 61 copper pieces.
GOLD_FOR_KILL_MESSAGE = 'for this kill'
# [21:45:03] You get 54 silver and 63 copper pieces for this kill.
MONEY_RECEIVED_MESSAGE = 'gives you'
# [15:04:51] Galdur Bonsavoir gives you 25 silver pieces for 2 earthen distill.
MONEY_SPENT_MESSAGE = 'You just bought'
# [15:05:42] You just bought an ancient treant wood for 20 silver pieces.
#endregion

#region Attack Messages
MELEE_OFFENSE_ATTACK_MESSAGE = 'You attack'
MELEE_OFFENSE_WEAPON_ATTACK_MESSAGE = 'with your'
# [19:41:05] You attack the cave trow with your Grim Maul and hit for 96 damage!
MELEE_OFFENSE_ATTACK_EVADE_MESSAGE = 'evades your attack'
# [21:51:25] Thatguy evades your attack!
MELEE_OFFENSE_ATTACK_PARRY_MESSAGE = 'parries your attack'
MELEE_OFFENSE_ATTACK_BLOCK_MESSAGE = 'blocks your attack'
MELEE_OFFENSE_ATTACK_MISS_MESSAGE = 'you miss'
MELEE_OFFENSE_DMG_ADD_MESSAGE = 'extra damage!'
# [22:17:51] You hit Man at Arms for 21 extra damage!

CASTER_OFFENSE_ATTACK_MESSAGE = 'You hit'
# [21:57:40] You hit Aser for 269 (-14) damage!
CASTER_OFFENSE_SPELL_RESIST_MESSAGE = 'resists the effect'
# [21:57:59] Krok resists the effect!
CASTER_OFFENSE_SPELL_CAST_MESSAGE = 'You cast a'
# [21:44:42] You cast a Greater Shadow Blast spell!

CRITICAL_HIT_OFFENSE_MESSAGE = 'You critical hit'
# [19:05:13] You critical hit the cave trow for an additional 41 damage!
CRITICAL_HIT_SPELL_MESSAGE = 'You critical hit for'
# [21:57:19] You critical hit for an additional 41 damage!

MELEE_STYLE_MESSAGE = 'You perform your'
# [22:00:40] You perform your Doublefrost perfectly! (+108)
# [22:00:40] You attack Sannik with your shimmering Cleaving arcanium spiked hammer and hit for 215 (-75) damage!
# [22:00:42] You attack Sannik with your shimmering Cleaving arcanium weighted bearded ax and hit for 72 (-27) damage!

#endregion

#region Death/Kills/RP messages
DEFENSE_DEATH_MESSAGE = 'You have died'
# [21:32:23] You have died.  Type /release to return to your last bindpoint.
OFFENSE_DEATHBLOW_MESSAGE = 'You just killed'
# [21:16:07] You just killed Healina!
REALM_POINTS_EARNED_MESSAGE = 'realm points!'
# [21:16:07] You get 171 realm points!
BONUS_REALM_POINTS_EARNED_MESSAGE = 'extra realm points'
# [21:16:07] You get 3 extra realm points for outpost ownership!
RECENT_KILL_NO_REALM_POINTS_MESSAGE = 'and is worth no realm points!'
# [22:03:03] Laddy has been killed recently and is worth no realm points!
#endregion

#region Defense Messages
MELEE_DEFENSE_BLOCK_MESSAGE = 'you block the blow'
# [19:05:20] The cave trow attacks you and you block the blow!
MELEE_DEFENSE_PARRY_MESSAGE = 'you parry the blow'
# [19:05:17] The cave trow attacks you and you parry the blow!
MELEE_DEFENSE_EVADE_MESSAGE = 'you evade the blow'
# [19:05:28] The cave trow attacks you and you evade the blow!
MELEE_DEFENSE_DAMAGE_RECEIVED_MESSAGE = 'hits your'
# [21:36:46] Krok hits your leg with his bright arcanium fortified mace for 102 damage!
MELEE_DEFENSE_OPPONENT_MISS_MESSAGE = 'attacks you and misses'
# [21:35:46] Krok attacks you and misses!
MELEE_DEFENSE_OPPONENT_CRIT_MESSAGE = 'critical hits you for an additionnal'
# [21:51:42] Dacy critical hits you for an additionnal 19 damage!
MELEE_DEFENSE_SPELL_PROC_MESSAGE = 'hits you for'
# [21:25:47] Aser hits you for 150 damage !
MELEE_BUFFER_ABSORB_MESSAGE = 'melee buffer absorbs'
# [18:54:28] Your melee buffer absorbs 25 damage!

CASTER_DEFENSE_SPELL_RESISTED_MESSAGE = 'You resist the effect'
# [21:45:12] You resist the effect!
#endregion

#region Healing Messages
HEALING_RECEIVED_MESSAGE = 'You are healed by'
# [21:57:56] You are healed by Norseiaw for 85 hit points.
HEALING_DELIVERED_MESSAGE = 'You heal'
# [21:38:30] You heal the skeletal commander for 158 hit points!
LIFETAP_HEALTH_STOLEN_MESSAGE = 'You steal'
# [21:44:57] You steal 109 hit points.
#endregion

#endregion

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
                money_gained = parse_money_denomination(line)
            elif MONEY_SPENT_MESSAGE in line:
                money_spent = parse_money_denomination(line)
            elif GOLD_PICKUP_MESSAGE in line or GOLD_FOR_KILL_MESSAGE in line:
                money_looted += parse_money_denomination(line)
        except Exception as err:
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

#region Combat
def parse_combat(readf, error_messages):
    """Parses attack and defense values"""
    combat = {}
    combat['MeleeAttack'] = parse_melee_attack(readf, error_messages)
    combat['CasterAttack'] = parse_caster_attack(readf, error_messages)
    combat['Defense'] = parse_defense_combat(readf, error_messages)
    combat['Summary'] = parse_combat_summary(readf, error_messages)

    return combat

def parse_melee_attack(readf, error_messages):
    """Counts and returns the # of successful attacks with both hands"""
    readf.seek(0)
    current_line = 0
    result = {}
    result['Hits'] = 0
    result['BaseDamage'] = 0
    result['Crits'] = 0
    result['CritDamage'] = 0
    result['Evades'] = 0
    result['Parries'] = 0
    result['Blocks'] = 0
    result['Misses'] = 0
    
    targets = {}
    # targets[<name>] = [<hits>,<blocks>,<parries>,<evades>,<dmg>]

    styles = {}
    weapon_dmg = {}
    style_grs = {}
    style_dmg = {}
    style_dmg['unstyled'] = 0

    style = ''
    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif MELEE_STYLE_MESSAGE in line:
                split_line = line.split()
                style =  ' '.join(split_line[4:split_line.index('perfectly!')])
                gr = split_line[len(split_line)-1]
                if style in style_grs.keys():
                    style_grs[style] = [style_grs[style][0] +1, style_grs[style][1] + gr]
                else:
                    style_grs[style] = [1, gr]
            elif MELEE_OFFENSE_ATTACK_MESSAGE in line and MELEE_OFFENSE_WEAPON_ATTACK_MESSAGE in line:
                result['Hits'] += 1

                targ_weap_dmg = get_target_weapon_and_damage(line, True, False)
                result['BaseDamage'] += targ_weap_dmg[2]

                # Dmg per target
                if targ_weap_dmg[0] in targets.keys():
                    targets[targ_weap_dmg[0]][0] += 1
                    targets[targ_weap_dmg[0]][4] += targ_weap_dmg[2]
                else:
                    targets[targ_weap_dmg[0]] = [1, 0, 0, 0, targ_weap_dmg[2]]

                # Dmg per style
                if style != '':
                    if targ_weap_dmg[1] in style_dmg.keys():
                        style_dmg[targ_weap_dmg[1]] += targ_weap_dmg[2]
                    else:
                        style_dmg[targ_weap_dmg[1]] = targ_weap_dmg[2]
                else:
                    style_dmg['unstyled'] += targ_weap_dmg[2]

            elif MELEE_OFFENSE_DMG_ADD_MESSAGE in line:
                targ_weap_dmg = get_target_weapon_and_damage(line, False, False)
                result['BaseDamage'] += targ_weap_dmg[2]
                targets[targ_weap_dmg[0]][4] += targ_weap_dmg[2]
            elif CRITICAL_HIT_OFFENSE_MESSAGE in line:
                #If the 4th word isn't "for" then it is a melee crit, not a spell
                if line.split()[4] != 'for': 
                    result['Crits'] += 1
                    targ_weap_dmg = get_target_weapon_and_damage(line, True, True)
                    result['CritDamage'] += targ_weap_dmg[2]
                    if targ_weap_dmg[0] in targets.keys():
                        targets[targ_weap_dmg[0]][4] += targ_weap_dmg[2]
                    else:
                        targets[targ_weap_dmg[0]][4] = targ_weap_dmg[2]
            elif MELEE_OFFENSE_ATTACK_EVADE_MESSAGE in line:
                result['Evades'] += 1
                split_line = line.split()
                target = ' '.join(split_line[1:split_line.index('evades')])
                target = target.replace('The', '')
                if target in targets.keys():
                    targets[target][3] += 1
                else:
                    targets[target] = [0, 0, 0, 1, 0]
            elif MELEE_OFFENSE_ATTACK_PARRY_MESSAGE in line:
                result['Parries'] += 1
                split_line = line.split()
                target = ' '.join(split_line[1:split_line.index('parries')])
                target = target.replace('The', '')
                if target in targets.keys():
                    targets[target][2] += 1
                else:
                    targets[target] = [0, 0, 1, 0, 0]
            elif MELEE_OFFENSE_ATTACK_BLOCK_MESSAGE in line:
                result['Blocks'] += 1
                split_line = line.split()
                target = ' '.join(split_line[1:split_line.index('blocks')])
                target = target.replace('The', '')
                if target in targets.keys():
                    targets[target][1] += 1
                else:
                    targets[target] = [0, 1, 0, 0, 0]
                
            elif MELEE_OFFENSE_ATTACK_MISS_MESSAGE in line:
                result['Misses'] += 1
            style = ''
        except Exception as err:
            error_messages.append('MA (line {0}): {1}'.format(current_line, err))
            continue

    target_list = dict_to_list(targets)
    result['Targets'] = sorted(target_list, key=operator.itemgetter(5), reverse=True)
    

    result['TotalAttacks'] = result['Hits'] + result['Misses'] + \
        result['Evades'] + result['Parries'] + result['Blocks']
    result['TotalDamage'] = result['BaseDamage'] + result['CritDamage']

    melee_events = ['Hits', 'Blocks', 'Parries', 'Evades', 'Misses', 'Crits']
    try:
        result = calculate_attack_percents(result, melee_events)
    except Exception as err:
        error_messages.append('MAP: {0}'.format(err))

    return result

# targets[<name>] = [<hits>,<blocks>,<parries>,<evades>,<dmg>]
def dict_to_list(dict_to_sort):
    dict_list = []
    for name, values in dict_to_sort.items():
        one_list = []
        one_list.append(name)
        for val in values:
            one_list.append(val)
        
        dict_list.append(one_list)
    
    return dict_list

def list_to_dict(ld):
    result = {}
    for item in ld:
        name = ld[0]
        item.remove(name)
        result[name] = item
    
    return result


def parse_caster_attack(readf, error_messages):
    """Parses the log file for casting statistics.
    This includes spells + procs until I figure out how to differentiate them."""
    readf.seek(0)
    current_line = 0
    result = {}
    targets = {}
    result['Targets'] = {}
    result['Landed'] = 0
    result['Crits'] = 0
    result['Resists'] = 0
    result['BaseDamage'] = 0
    result['CritDamage'] = 0

    spells = {} # spells[name] = [casted, landed, resisted, crits, damage]
    spells['DD/Proc'] = [0, 0, 0, 0, 0]
    spell_name = ''
    spell_cast_time = ''

    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif CASTER_OFFENSE_SPELL_CAST_MESSAGE in line:
                split_line = line.split()
                if 'spell!' in split_line:
                    spell_name = ' '.join(split_line[4:split_line.index('spell!')])
                else:
                    spell_name = ' '.join(split_line[4:split_line.index('Spell!')])
                if spell_name not in spells.keys():
                    spells[spell_name] = [1, 0, 0, 0, 0]
                else:
                    spells[spell_name][0] += 1

                spell_cast_time = split_line[0]
            elif CASTER_OFFENSE_ATTACK_MESSAGE in line and MELEE_OFFENSE_DMG_ADD_MESSAGE not in line:
                result['Landed'] += 1
                target_weapon_damage = get_target_weapon_and_damage(line, False, False)
                result['BaseDamage'] += target_weapon_damage[2]
                if target_weapon_damage[0] in targets.keys():
                    targets[target_weapon_damage[0]] += target_weapon_damage[2]
                else:
                    targets[target_weapon_damage[0]] = target_weapon_damage[2]

                spell_time = line.split()[0]
                if spell_time != spell_cast_time:
                    spell_name = ''
                
                if spell_name == '':
                    spell_name = 'DD/Proc'

                spells[spell_name][1] += 1
                spells[spell_name][4] += target_weapon_damage[2]
            elif CRITICAL_HIT_OFFENSE_MESSAGE in line:
                #If the 4th word is "for" then it is a spell crit, not melee
                if line.split()[4] == 'for':
                    result['Crits'] += 1
                    target_weapon_damage = get_target_weapon_and_damage(line, False, True)
                    result['CritDamage'] += target_weapon_damage[2]
                    if target_weapon_damage[0] in targets.keys():
                        targets[target_weapon_damage[0]] += target_weapon_damage[2]
                    else:
                        targets[target_weapon_damage[0]] = target_weapon_damage[2]

                    spell_time = line.split()[0]
                    if spell_time != spell_cast_time:
                        spell_name = ''
                    if spell_name == '':
                        spell_name = 'DD/Proc'

                    spells[spell_name][3] += 1
                    spells[spell_name][4] += target_weapon_damage[0]
            elif CASTER_OFFENSE_SPELL_RESIST_MESSAGE in line:
                result['Resists'] += 1

                spell_time = line.split()[0]
                if spell_time != spell_cast_time:
                    spell_name = ''

                if spell_name == '':
                    spell_name = 'DD/Proc'
                if spell_name not in spells.keys():
                    spells[spell_name] = [1, 1, 0]
                else:
                    spells[spell_name][2] += 1
            else:
                spell_name = ''
            
        except Exception as err:
            error_messages.append('CA (line {0}): {1}'.format(current_line, err))
            continue

    result['Targets'] = sorted(targets.items(), key=operator.itemgetter(1), reverse=True)

    cleaned_spells = {}
    for spell, stats in spells.items():
        if stats[1] != 0 or stats[2] != 0:
            cleaned_spells[spell] = stats

    result['SpellStats'] = sorted(cleaned_spells.items(), key=operator.itemgetter(1), reverse=True)

    result['TotalDamage'] = result['BaseDamage'] + result['CritDamage']
    result['TotalAttacks'] = result['Landed'] + result['Resists']

    caster_events = ['Landed', 'Resists', 'Crits']
    try:
        result = calculate_attack_percents(result, caster_events)
    except Exception as err:
        error_messages.append('CAP: {0}'.format(err))

    return result

def parse_defense_combat(readf, error_messages):
    """Parses attacks against the player."""
    readf.seek(0)
    current_line = 0
    result = {}
    sources = {}
    result['Sources'] = []
    result['Blocks'] = 0
    result['Parries'] = 0
    result['Evades'] = 0
    result['Hits'] = 0
    result['MeleeDamage'] = 0
    result['Misses'] = 0
    result['Resists'] = 0
    result['Crits'] = 0
    result['CritDamage'] = 0
    result['Absorbed'] = 0
    result['SpellsLanded'] = 0
    result['SpellDamage'] = 0
    armor_hits = {}
    armor_hits['head'] = 0
    armor_hits['torso'] = 0
    armor_hits['arm'] = 0
    armor_hits['hand'] = 0
    armor_hits['leg'] = 0
    armor_hits['foot'] = 0
    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif MELEE_DEFENSE_BLOCK_MESSAGE in line:
                result['Blocks'] += 1
            elif MELEE_DEFENSE_PARRY_MESSAGE in line:
                result['Parries'] += 1
            elif MELEE_DEFENSE_EVADE_MESSAGE in line:
                result['Evades'] += 1
            elif CASTER_DEFENSE_SPELL_RESISTED_MESSAGE in line:
                result['Resists'] += 1
            elif MELEE_DEFENSE_OPPONENT_MISS_MESSAGE in line:
                result['Misses'] += 1
            elif MELEE_DEFENSE_DAMAGE_RECEIVED_MESSAGE in line:
                result['Hits'] += 1
                damage_source_armor = get_damage_source_and_armor(line, True, False)
                result['MeleeDamage'] += damage_source_armor[0]
                if damage_source_armor[1] in sources.keys():
                    sources[damage_source_armor[1]] += damage_source_armor[0]
                else:
                    sources[damage_source_armor[1]] = damage_source_armor[0]
                armor_hits[damage_source_armor[2]] += 1
            elif MELEE_DEFENSE_OPPONENT_CRIT_MESSAGE in line:
                result['Crits'] += 1
                damage_and_source = get_damage_source_and_armor(line, False, True)
                result['CritDamage'] += damage_and_source[0]
                if damage_and_source[1] in sources.keys():
                    sources[damage_and_source[1]] += damage_and_source[0]
                else:
                    sources[damage_and_source[1]] = damage_and_source[0]
            elif MELEE_DEFENSE_SPELL_PROC_MESSAGE in line:
                result['SpellsLanded'] += 1
                damage_and_source = get_damage_source_and_armor(line, False, False)
                result['SpellDamage'] += damage_and_source[0]
                if damage_and_source[1] in sources.keys():
                    sources[damage_and_source[1]] += damage_and_source[0]
                else:
                    sources[damage_and_source[1]] = damage_and_source[0]
            elif MELEE_BUFFER_ABSORB_MESSAGE in line:
                result['Absorbed'] += parse_healing_and_source(line)[0]
        except Exception as err:
            error_messages.append('DC (line {0}): {1}'.format(current_line, err))
            continue

    result['Sources'] = sorted(sources.items(), key=operator.itemgetter(1), reverse=True)
    result['ArmorHits'] = sorted(armor_hits.items(), key=operator.itemgetter(1), reverse=True)

    result['TotalMeleeAttacks'] = result['Blocks'] + result['Parries'] + result['Evades'] + \
        result['Hits'] + result['Misses']
    result['TotalSpellAttacks'] = result['Resists'] + result['SpellsLanded']
    result['TotalAttacks'] = result['TotalMeleeAttacks'] + result['TotalSpellAttacks']
    result['TotalDamage'] = result['MeleeDamage'] + result['CritDamage'] + result['SpellDamage']

    try:
        result = parse_defense_percents(result)
    except Exception as err:
        error_messages.append('CDP: {0}'.format(err))
    return result

def parse_defense_percents(result):
    """Calculates percentages of defensive events"""

    result['Percents'] = {}

    melee_events = ['Hits', 'Blocks', 'Parries', 'Evades', 'Misses']
    for event in melee_events:
        if result['TotalMeleeAttacks'] > 0:
            result['Percents'][event] = '{0:.2f}'.format(
                float(result[event])/result['TotalMeleeAttacks'])
        else:
            result['Percents'][event] = 0

    caster_events = ['SpellsLanded', 'Resists']
    for event in caster_events:
        if result['TotalSpellAttacks'] > 0:
            result['Percents'][event] = '{0:.2f}'.format(
                float(result[event])/result['TotalSpellAttacks'])
        else:
            result['Percents'][event] = 0
    
    return result

def parse_combat_summary(readf, error_messages):
    """Parses RPs, Deathblows, and Deaths"""
    readf.seek(0)
    current_line = 0
    result = {}
    result['DeathblowCount'] = 0
    deathblows = {}
    result['RPs'] = 0
    result['Deaths'] = 0

    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif OFFENSE_DEATHBLOW_MESSAGE in line:
                result['DeathblowCount'] += 1
                split_line = line.split()
                deathblow = split_line[len(split_line)-1]
                deathblow_target = deathblow[0:len(deathblow)-1]
                if deathblow_target in deathblows.keys():
                    deathblows[deathblow_target] += 1
                else:
                    deathblows[deathblow_target] = 1
            elif REALM_POINTS_EARNED_MESSAGE in line or BONUS_REALM_POINTS_EARNED_MESSAGE in line:
                if RECENT_KILL_NO_REALM_POINTS_MESSAGE not in line:
                    result['RPs'] += int(line.split()[3])
            elif DEFENSE_DEATH_MESSAGE in line:
                result['Deaths'] += 1
        except Exception as err:
            error_messages.append('CS (line {0}): {1}'.format(current_line, err))
            continue

    result['DeathBlows'] = sorted(deathblows.items(), key=operator.itemgetter(1), reverse=True)

    return result

def calculate_attack_percents(result, event_list):
    """Calculates percentages of offensive events"""
    result['Percents'] = {}
    for event in event_list:
        if result['TotalAttacks'] > 0:
            result['Percents'][event] = '{0:.2f}'.format(
                float(result[event])/result['TotalAttacks'])
        else:
            result['Percents'][event] = 0

    return result

def get_damage_source_and_armor(line, is_melee, is_crit):
    split_line = line.split()
    if is_crit:
        source = ' '.join(split_line[1:split_line.index('critical')])
        damage = int(split_line[split_line.index('additionnal') +1])
    else:
        source = ' '.join(split_line[1:split_line.index('hits')])
        damage = int(split_line[split_line.index('for') +1])
    armor = ''
    if is_melee:
        armor = split_line[split_line.index('your')+1]

    source = source.replace('The ', '')

    return [damage, source, armor]

def get_target_weapon_and_damage(line, is_melee, is_crit):
    split_line = line.split()

    target = ''
    weapon = ''
    damage = 0
    if is_crit:
        target = ' '.join(split_line[4:split_line.index('for')])
        weapon = ''
        damage = int(split_line[split_line.index('additional') +1])
    else:
        if is_melee:
            target = ' '.join(split_line[3:split_line.index('with')])
            weapon = ' '.join(split_line[split_line.index('your')+1:split_line.index('and')])           
        else: 
            target = ' '.join(split_line[3:split_line.index('for')])
            weapon = ''
        damage = int(split_line[split_line.index('for') +1])
    

    target = target.replace('the ', '')
    weapon = weapon.replace('the ', '')

    return [target, weapon, damage]
#endregion

#region Healing
def parse_healing(readf, error_messages):
    """Parses healing Received and Delivered. Includes LifeTap"""
    readf.seek(0)
    current_line = 0
    healing = {}
    sources = {}
    targets = {}
    healing['Sources'] = []
    healing['Targets'] = []
    healing['Received'] = 0
    healing['Lifetapped'] = 0
    healing['Delivered'] = 0
    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif HEALING_RECEIVED_MESSAGE in line:
                healing_and_source = parse_healing_and_source(line)
                healing['Received'] += healing_and_source[0]
                if healing_and_source[1] in sources.keys():
                    sources[healing_and_source[1]] += healing_and_source[0]
                else:
                    sources[healing_and_source[1]] = healing_and_source[0]
            elif LIFETAP_HEALTH_STOLEN_MESSAGE in line:
                healing['Lifetapped'] += parse_healing_and_source(line)[0]
            elif HEALING_DELIVERED_MESSAGE in line:
                healing_and_target = parse_healing_and_target(line)
                healing['Delivered'] += healing_and_target[0]
                if healing_and_target[1] in targets.keys():
                    targets[healing_and_target[1]] += healing_and_target[0]
                else:
                    targets[healing_and_target[1]] = healing_and_target[0]
        except Exception as err:
            error_messages.append('H (line {0}): {1}'.format(current_line, err))
            continue

    healing['Sources'] = sorted(sources.items(), key=operator.itemgetter(1), reverse=True)
    healing['Targets'] = sorted(targets.items(), key=operator.itemgetter(1), reverse=True)

    return healing

def parse_healing_and_source(line):
    """Helper method that finds amount of healing and character providing it"""
    split_line = line.split()
    source = ''

    is_name_part = False
    for word in split_line:
        if word == 'for':
            is_name_part = False
        elif is_name_part:
            source += word + ' '
        elif word == 'by':
            is_name_part = True
    source = source.replace('the ', '')

    for word in split_line:
        num = 0
        try:
            num = int(word)
        except ValueError:
            continue
        if num > 0:
            return [num, source]

    return [num, source]

def parse_healing_and_target(line):
    """Helper method that finds the amount of healing and who it was provided to"""
    split_line = line.split()
    target = ''

    is_name_part = False
    for word in split_line:
        if word == 'for':
            is_name_part = False
        elif is_name_part:
            target += word + ' '
        elif word == 'heal':
            is_name_part = True
    target = target.replace('the ', '')

    for word in split_line:
        num = 0
        try:
            num = int(word)
        except ValueError:
            continue
        if num > 0:
            return [num, target]

    return [num, target]
#endregion

#region Printing
def print_healing(healing):
    """Prints out the values from the <healing> dictionary"""
    print('%&%&%&%&%&%& Healing stats %&%&%&%&%&%&')
    for key, value in healing.items():
        if key != 'Sources' and key != 'Targets':
            print(key + ': ' + '{:,}'.format(value))
    print('++++Healed By++++')
    for key, value in healing['Sources'].items():
        print('\t' + key + ': ' + '{:,}'.format(value))
    print('++++Healing Given++++')
    for key, value in healing['Targets'].items():
        print('\t' + key + ': ' + '{:,}'.format(value))

def print_combat(combat):
    """Prints out the values from the <combat> dictionary"""
    print('=|====> COMBAT DATA <====|=')
    print('----> Offensive stats: <----')
    print('===[] Melee []===')
    for key, value in combat['Melee_attack'].items():
        if key != 'Targets':
            print(key + ': ' + '{:,}'.format(value))
    print('----Individual targets----')
    for key, value in combat['Melee_attack']['Targets'].items():
        print('\t' + key + ': ' + '{:,}'.format(value))
    print('\n')


    print('**** Casting/proc stats ****')
    for key, value in combat['Caster_attack'].items():
        if key != 'Targets':
            print(key + ': ' + '{:,}'.format(value))
    print('----Individual Targets----')
    for key, value in combat['Caster_attack']['Targets'].items():
        print('\t' + key + ': ' + '{:,}'.format(value))
    print('\n')

    print('||||| Defensive stats |||||')
    for key, value in combat['Defense'].items():
        if key != 'Sources':
            print(key + ': ' + '{:,}'.format(value))
    print('++++Individual attackers++++')
    for key, value in combat['Defense']['Sources'].items():
        print('\t' + key + ': ' + '{:,}'.format(value))
    print('\n')

def print_money(cash_flow):
    """Prints out the values from the <cash_flow> dictionary"""
    print('\n\n$$$$ CASH FLOW $$$$')
    print('Money looted: ' + currency_print_helper(cash_flow['Loot']))
    print('Money spent: ' + currency_print_helper(cash_flow['Expense']))
    print('Money received: ' + currency_print_helper(cash_flow['Income']))
    print('\n\n')
#endregion

def parse_uploaded_file(file):
    """Performs parsing process on 'file'"""
    response = {}
    error_messages = []
    try:
        cash_flow = parse_cash_flow(file, error_messages)
        combat = parse_combat(file, error_messages)
        healing = parse_healing(file, error_messages)

        result = {}
        result['Cash'] = cash_flow
        result['Combat'] = combat
        result['Healing'] = healing

        response['Results'] = result

    except IOError:
        error_messages.append("Failed to open file")

    response['Messages'] = error_messages
    j_result = json.dumps(response)
    return j_result

def currency_print_helper(currency_dict):
    """Helper method for printing currency prettily"""
    result_text = ''
    if currency_dict[0] > 0:
        result_text += str(currency_dict[0]) + 'p '
    if currency_dict[1] > 0:
        result_text += str(currency_dict[1]) + 'g '
    if currency_dict[2] > 0:
        result_text += str(currency_dict[2]) + 's '
    if currency_dict[3] > 0:
        result_text += str(currency_dict[3]) + 'c'

    return result_text


def parse_weapon_and_style_and_damage(readf):
    style_prefix = ''
    style_gr = 0
    weapon = ''
    damage = 0
    for line in readf:
        if 'You perform' in line:
            split_line = line.split()
            style_prefix = ' '.join(split_line[4:split_line.index('perfectly!')])
            style_gr = split_line[len(split_line)-1]
        elif 'with your' in line:
            split_line = line.split()
            weapon = ' '.join(split_line[split_line.index('your')+1:split_line.index('and')])
            damage = int(split_line[split_line.index('for')+1])
            
def parse_test_file():
    """Main function"""
    response = {}
    error_messages = []
    # try:
    with open('C:/Git/Daoc_log_parse/Log Files/alibi_0105.log', 'r') as readf:
        result = {}
        cash_flow = parse_cash_flow(readf,error_messages)
        combat = parse_combat(readf,error_messages)
        healing = parse_healing(readf,error_messages)

        # print_money(cash_flow)
        # print_combat(combat)
        # print_healing(healing)
        # print('\n\n')

    result['Cash'] = cash_flow
    result['Combat'] = combat
    result['Healing'] = healing

    response['Results'] = result
    response['Messages'] = error_messages

    j_result = json.dumps(result)
    print(j_result)

    # except IOError:
    #     print("Failed to open file")
    #     exit(0)


if __name__ == '__main__':
    parse_test_file()
