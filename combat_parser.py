"""Opens a saved chatlog from Dark Age of Camelot and parses various numbers
    and stats from it"""
__author__ = "robert.pape"
__date__ = "2018/01/04"

import json
import operator

import craft_parser

# Figure out animist / necro / BD pet damage.
#   Does any line that includes 'damage' but doesn't start with 'You' mean it is pet damage?
# Find block messages for someone you are guarding


#region Message Constants
CHAT_MESSAGE_INDICATOR = "@@"

#region Attack Messages
MELEE_OFFENSE_ATTACK_MESSAGE = 'You attack'
MELEE_OFFENSE_WEAPON_ATTACK_MESSAGE = 'with your'
# [19:41:05] You attack the cave trow with your Grim Maul and hit for 96 damage!
MELEE_OFFENSE_ATTACK_EVADE_MESSAGE = 'evades your attack'
# [21:51:25] Thatguy evades your attack!
MELEE_OFFENSE_ATTACK_PARRY_MESSAGE = 'parries your attack'
MELEE_OFFENSE_ATTACK_BLOCK_MESSAGE = 'blocks your attack'
MELEE_OFFENSE_ATTACK_MISS_MESSAGE = 'You miss'
MELEE_OFFENSE_DMG_ADD_MESSAGE = 'extra damage!'
# [22:17:51] You hit Man at Arms for 21 extra damage!

RANGED_OFFENSE_ATTACK_MESSAGE = 'You shot'
# [21:03:32] You shot Wyldy with your shimmering Dragon duskwood heavy composite bow and hit for 142 (-82) damage!

MELEE_OFFENSE_ATTACK_FUMBLE_MESSAGE = 'You fumble the attack'
# [21:41:17] You fumble the attack and take time to recover!

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
# [22:00:40] You attack Sannik with your shimmering Cleaving arcanium \
#   spiked hammer and hit for 215 (-75) damage!
# [22:00:42] You attack Sannik with your shimmering Cleaving arcanium \
#   weighted bearded ax and hit for 72 (-27) damage!

MELEE_OFFENSE_ATTACK_BLADE_TURN_MISS_MESSAGE = 'Your strike was absorbed by a magical barrier!'
# [22:36:08] Your strike was absorbed by a magical barrier!
# [22:36:08] You miss!

MELEE_OFFENSE_ATTACK_ABSORB_MESSAGE = 'A barrier absorbs'
# [22:02:33] A barrier absorbs 36 damage of your attack!

PET_CASTER_ATTACK_MESSAGE = 'Your pet\'s spell hits'
# [20:20:11] Your pet's spell hits the hobgoblin whelp for 106 damage!
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
REALM_POINTS_EARNED_KEEP_MESSAGE = 'realmpoints'
# [23:35:16] You get 2592 realmpoints for killing Lord Vaebryn.
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
CASTER_DEFENSE_SPELL_PROC_MESSAGE = 'hits you for'
# [21:25:47] Aser hits you for 150 damage !
MELEE_BUFFER_ABSORB_MESSAGE = 'melee buffer absorbs'
# [18:54:28] Your melee buffer absorbs 25 damage!

MELEE_DEFENSE_GUARD_BLOCKED_MESSAGE = 'blocks you from'
# [22:35:38] Gorz blocks you from Alonso's attack!

MELEE_DEFENSE_BLOCKED_GUARD_MESSAGE = 'you block'
# ??

MELEE_DEFENSE_INTERCEPT_MESSAGE = 'steps in front of you and takes the blow!'
# [00:11:50] The spirit champion steps in front of you and takes the blow!

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

def parse_combat(readf, error_messages):
    """Parses attack and defense values"""

    timestamp_dict = {}
    readf.seek(0)
    for line in readf:
        ts_split = line.split()
        if ts_split:
            ts = ts_split[0].replace('[', '').replace(']', '')
            if ts not in timestamp_dict.keys():
                timestamp_dict[ts] = []

            timestamp_dict[ts].append(line)

    physical_events = []
    spell_events = []
    for event_list in timestamp_dict.values():
        event_type = check_timestamp_event_type(event_list)
        if event_type == 'physical':
            mel_events, sp_events = parse_physical_attack(event_list, error_messages, True)
            physical_events.extend(mel_events)
            if sp_events is not None:
                spell_events.extend(sp_events)
        if event_type == 'spell':
            sp_events, mel_events = parse_caster_attack(event_list, error_messages, True)
            spell_events.extend(sp_events)
            if mel_events is not None:
                physical_events.extend(mel_events)

    combat = {}
    combat['PhysicalAttack'] = aggregate_physical_events(physical_events)
    combat['CasterAttack'] = aggregate_spell_events(spell_events)
    combat['Defense'] = parse_defense_combat(readf, error_messages)
    combat['Summary'] = parse_combat_summary(readf, error_messages)

    dps_results = get_chart_data(physical_events, spell_events, timestamp_dict.keys())
    combat['ChartData'] = {
        'Labels': dps_results[0],
        'Values': dps_results[1]
    }

    dps = 0
    tot_secs = len(dps_results[0])
    if tot_secs:
        total_dmg = sum(dps_results[1])
        dps = float(total_dmg) / tot_secs

    combat['DPS'] = dps

    return combat

def check_timestamp_event_type(event_list):
    """For the given event_list, determine whether physical
    or spell offensive actions take place"""
    for line in event_list:
        if 'You perform' in line \
          or 'You attack ' in line \
          or 'You shot' in line \
          or 'You miss' in line \
          or 'You fumble' in line \
          or 'evades your attack' in line:
            return 'physical'
        elif 'you cast' in line \
          or 'You hit' in line \
          or 'resists the effect' in line:
            return 'spell'

    return 'no-op'


#region Offense
def parse_physical_attack(events, error_messages, should_recurse):
    """Counts and returns the # of successful attacks with both hands"""
    is_bladeturned = False
    contains_spell_event = False

    mel_events = []
    pet_events = []

    non_local = Nonlocal()
    non_local.mel_event = None
    event_timestamp = events[0].split()[0].replace('[', '').replace(']', '')

    for line in events:
        if MELEE_STYLE_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            non_local.mel_event = MeleeEvent()
            non_local.mel_event.timestamp = event_timestamp

            split_line = line.split()
            style = ' '.join(split_line[4:split_line.index('perfectly!')])
            growth_rate = split_line[len(split_line)-1]
            growth_rate_int = int(growth_rate[2:growth_rate.index(')')])

            non_local.mel_event.style = style
            non_local.mel_event.growth_rate = growth_rate_int

        elif (MELEE_OFFENSE_ATTACK_MESSAGE in line and \
              MELEE_OFFENSE_WEAPON_ATTACK_MESSAGE in line) \
            or RANGED_OFFENSE_ATTACK_MESSAGE in line:
            targ_weap_dmg = get_target_weapon_and_damage(line, True, False)

            if non_local.mel_event is not None:
                if non_local.mel_event.damage > 0:
                    mel_events.append(non_local.mel_event)
                    non_local.mel_event = MeleeEvent()
                    non_local.mel_event.timestamp = event_timestamp
                    if 'shot' in line:
                        non_local.mel_event.style = '(Ranged)'
                    else:
                        non_local.mel_event.style = '-unstyled-'

            else:
                non_local.mel_event = MeleeEvent()
                non_local.mel_event.timestamp = event_timestamp
                if 'shot' in line:
                    non_local.mel_event.style = '(Ranged)'
                else:
                    non_local.mel_event.style = '-unstyled-'


            non_local.mel_event.target = targ_weap_dmg[0]
            non_local.mel_event.weapon = targ_weap_dmg[1]
            non_local.mel_event.damage = targ_weap_dmg[2]

        elif CRITICAL_HIT_OFFENSE_MESSAGE in line:
            if line.split()[4] != 'for':
                if non_local.mel_event is None:
                    # error_messages.append('Critical hit without base damage')
                    continue

                targ_weap_dmg = get_target_weapon_and_damage(line, True, True)
                non_local.mel_event.crit = targ_weap_dmg[2]

        elif CASTER_OFFENSE_ATTACK_MESSAGE in line and MELEE_OFFENSE_DMG_ADD_MESSAGE not in line:
            if non_local.mel_event is None:
                contains_spell_event = True
                continue

            targ_weap_dmg = get_target_weapon_and_damage(line, False, False)
            non_local.mel_event.proc = targ_weap_dmg[2]

        elif MELEE_OFFENSE_DMG_ADD_MESSAGE in line:
            if non_local.mel_event is None:
                # error_messages.append('Damage add without base damage')
                continue

            targ_weap_dmg = get_target_weapon_and_damage(line, False, False)
            non_local.mel_event.damage_add += targ_weap_dmg[2]

        elif MELEE_OFFENSE_ATTACK_ABSORB_MESSAGE in line:
            if non_local.mel_event is None:
                # error_messages.append('Dmg absorb without target')
                continue

            non_local.mel_event.absorb = int(line.split()[4])

        elif MELEE_OFFENSE_ATTACK_EVADE_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            target = get_attack_non_hit_target(line, 'evades')
            non_local.mel_event = MeleeEvent()
            non_local.mel_event.timestamp = event_timestamp
            non_local.mel_event.target = target
            non_local.mel_event.evade = 1

            mel_events.append(non_local.mel_event)
            non_local.mel_event = None

        elif MELEE_OFFENSE_ATTACK_PARRY_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            target = get_attack_non_hit_target(line, 'parries')
            non_local.mel_event = MeleeEvent()
            non_local.mel_event.timestamp = event_timestamp
            non_local.mel_event.target = target
            non_local.mel_event.parry = 1

            mel_events.append(non_local.mel_event)
            non_local.mel_event = None

        elif MELEE_OFFENSE_ATTACK_BLOCK_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            target = get_attack_non_hit_target(line, 'blocks')
            non_local.mel_event = MeleeEvent()
            non_local.mel_event.timestamp = event_timestamp
            non_local.mel_event.target = target
            non_local.mel_event.block = 1

            mel_events.append(non_local.mel_event)
            non_local.mel_event = None

        elif MELEE_OFFENSE_ATTACK_FUMBLE_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            fum_event = MeleeEvent()
            fum_event.timestamp = event_timestamp
            fum_event.fumble = 1
            mel_events.append(fum_event)

            non_local.mel_event = None

        elif MELEE_OFFENSE_ATTACK_MISS_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            if not is_bladeturned:
                miss_event = MeleeEvent()
                miss_event.timestamp = event_timestamp
                miss_event.miss = 1
                mel_events.append(miss_event)

            is_bladeturned = False
            non_local.mel_event = None

        elif MELEE_OFFENSE_ATTACK_BLADE_TURN_MISS_MESSAGE in line:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)

            non_local.mel_event = None

            bt_event = MeleeEvent()
            bt_event.timestamp = event_timestamp
            bt_event.bladeturn = 1
            mel_events.append(bt_event)

            is_bladeturned = True
        
        # elif 'Your pet\'s spell hits' in line:
        #     pet_event = PetAttack(is_physical = False, timestamp = event_timestamp)
        #     split_line = line.split()
        #     pet_event.target = ' '.join(split_line[split_line.index('hits')+1:split_line.index('for')]).replace('the ', '')
        #     pet_event.damage = split_line[split_line.index('for')+1]
          
        #     pet_events.append(pet_event)

        # elif ('Your' in line and \
        #   ('attacks' in line or 'hit' in line)) \
        #   and 'Your attacks' not in line \
        #   and 'Your standing' not in line:
        #     pet_event = PetAttack(is_physical = True, timestamp = event_timestamp)
        #     split_line = line.split()
        #     pet_event.damage = split_line[split_line.index('for')+1]
        #     if 'hit' in split_line:
        #         pet_event.target = ' '.join(split_line[split_line.index('hit')+1:split_line.index('for')]).replace('the ', '')
        #     else:
        #         pet_event.target = ' '.join(split_line[split_line.index('attacks')+1:split_line.index('and')]).replace('the ', '')

        #     pet_events.append(pet_event)

        elif 'A crystal shield covers' in line:
            continue

        elif 'no longer hidden' in line:
            if non_local.mel_event is not None:
                if non_local.mel_event.style != '' \
                  and non_local.mel_event.damage == 0:
                    continue

        else:
            if non_local.mel_event is not None:
                mel_events.append(non_local.mel_event)
            non_local.mel_event = None

    if non_local.mel_event is not None:
        mel_events.append(non_local.mel_event)

    if contains_spell_event and should_recurse:
        spell_events = parse_caster_attack(events, error_messages, False)[0]
    else:
        spell_events = None

    return mel_events, spell_events

def aggregate_physical_events(events_list):
    """Aggregates physical events into groups for responses"""
    targets = {}
    weapons = {}
    styles = {}
    timestamps = {}

    result = {}
    result['Hits'] = 0
    result['BaseDamage'] = 0
    result['Procs'] = 0
    result['ProcDamage'] = 0
    result['Crits'] = 0
    result['CritDamage'] = 0
    result['Evades'] = 0
    result['Parries'] = 0
    result['Blocks'] = 0
    result['Misses'] = 0
    result['Fumbles'] = 0
    result['Bladeturns'] = 0
    result['Absorbed'] = 0
    result['Pet_Damage'] = 0

    for event in events_list:
        # Targets
        if event.target != '':
            if event.target not in targets.keys():
                targets[event.target] = MeleeTarget()
            targets[event.target].add_physical_event(event)

        # Weapons
        if event.weapon != '':
            if event.weapon not in weapons.keys():
                weapons[event.weapon] = WeaponStats()
            weapons[event.weapon].add_physical_event(event)

        # Styles
        if event.block == event.parry == event.evade == \
             event.miss == event.fumble == event.bladeturn == 0:
            if event.style == '':
                event.style = '-unstyled-'
            if event.style not in styles.keys():
                styles[event.style] = StyleStats()
            styles[event.style].add_physical_event(event)


        if event.timestamp not in timestamps.keys():
            timestamps[event.timestamp] = TimeStats()
        timestamps[event.timestamp].add_physical_event(event)

        if event.damage > 0:
            result['Hits'] += 1
            result['BaseDamage'] += event.damage

        if event.proc > 0:
            result['Procs'] += 1
            result['ProcDamage'] += event.proc

        if event.crit > 0:
            result['Crits'] += 1
            result['CritDamage'] += event.crit

        result['Evades'] += event.evade
        result['Parries'] += event.parry
        result['Blocks'] += event.block
        result['Misses'] += event.miss
        result['Fumbles'] += event.fumble
        result['Bladeturns'] += event.bladeturn
        result['Absorbed'] += event.absorb

    result['TotalAttacks'] = result['Hits'] + result['Misses'] + result['Bladeturns'] + \
        result['Evades'] + result['Parries'] + result['Blocks'] + result['Fumbles']
    result['TotalDamage'] = result['BaseDamage'] + result['CritDamage'] + result['ProcDamage']

    targets_list = dict_to_list(targets)
    result['Targets'] = sorted(targets_list, key=operator.itemgetter(11), reverse=True)

    weapon_stats_list = dict_to_list(weapons)
    result['WeaponStats'] = sorted(weapon_stats_list, key=operator.itemgetter(8), reverse=True)

    styles_list = dict_to_list(styles)
    result['StyleStats'] = sorted(styles_list, key=operator.itemgetter(5), reverse=True)

    physical_events = ['Hits', 'Blocks', 'Parries', 'Evades', \
        'Misses', 'Crits', 'Fumbles', 'Procs', 'Bladeturns']
    result = calculate_attack_percents(result, physical_events)

    return result

def parse_caster_attack(events, error_messages, should_recurse):
    """Parses the log file for casting statistics.
    This includes spells + procs until I figure out how to differentiate them."""
    spell_events = []
    non_local = Nonlocal()
    non_local.spell_event = None
    event_timestamp = events[0].split()[0].replace('[', '').replace(']', '')

    contains_physical_event = False

    prev_line_physical = False # This is to keep track of proc vs dd

    for line in events:
        if 'You cast a' in line:
            split_line = line.split()
            if non_local.spell_event is not None:
                spell_events.append(non_local.spell_event)

            if 'spell!' in split_line:
                spell_name = ' '.join(split_line[4:split_line.index('spell!')])
            else:
                spell_name = ' '.join(split_line[4:split_line.index('Spell!')])

            non_local.spell_event = SpellEvent()
            non_local.spell_event.timestamp = event_timestamp
            non_local.spell_event.spell = spell_name

            prev_line_physical = False

        elif 'You hit' in line and 'extra damage!' not in line:
            target_weapon_damage = get_target_weapon_and_damage(line, False, False)

            # Spell vs Proc: what was the previous line?
            if prev_line_physical:
                continue

            if non_local.spell_event is not None:
                if non_local.spell_event.damage > 0:
                    next_spell_event = SpellEvent()
                    next_spell_event.timestamp = event_timestamp
                    spell_events.append(non_local.spell_event)
                    # Copy name of spell from last event
                    next_spell_event.spell = non_local.spell_event.spell
                    non_local.spell_event = next_spell_event

            # Single target instant
            else:
                non_local.spell_event = SpellEvent()
                non_local.spell_event.timestamp = event_timestamp

            non_local.spell_event.target = target_weapon_damage[0]
            non_local.spell_event.damage = target_weapon_damage[2]

        elif 'You critical hit for' in line:
            # If the 4th word is "for" then it is a spell crit, not physical
            if line.split()[4] == 'for':
                target_weapon_damage = get_target_weapon_and_damage(line, False, True)

                if non_local.spell_event is None:
                    error_messages.append('Spell proc without base dmg: ' + line)
                else:
                    non_local.spell_event.crit = target_weapon_damage[2]

                prev_line_physical = False

            else:
                prev_line_physical = True

        elif 'resists the effect' in line:
            if prev_line_physical:
                continue

            split_line = line.split()
            target = ' '.join(split_line[1:split_line.index('resists')])
            target = target.replace('The ', '')

            if non_local.spell_event is None:
                non_local.spell_event = SpellEvent()
                non_local.spell_event.timestamp = event_timestamp

            non_local.spell_event.target = target
            non_local.spell_event.resist = 1

            prev_line_physical = False

        elif 'have that effect again' in line \
            or 'you get' in line \
            or 'your guild due' in line \
            or 'you just killed' in line \
            or 'gain no experience' in line \
            or 'is worth no' in line \
            or 'resists the effect' in line \
            or 'already has that effect' in line \
            or 'Spell Failed' in line \
            or 'dies!' in line:
            prev_line_physical = False

            continue

        elif 'A crystal shield covers' in line:
            continue

        else:
            if 'You attack' in line or 'You perform your' in line:
                contains_physical_event = True
                prev_line_physical = True
            else:
                prev_line_physical = False
            if non_local.spell_event is not None:
                spell_events.append(non_local.spell_event)
            non_local.spell_event = None

    if non_local.spell_event is not None:
        spell_events.append(non_local.spell_event)

    if contains_physical_event and should_recurse:
        physical_events = parse_physical_attack(events, error_messages, False)[0]
    else:
        physical_events = None

    return spell_events, physical_events

def aggregate_spell_events(events_list):
    """Aggregates list of spell events"""
    targets = {}
    spells = {}
    timestamps = {}

    result = {}
    result['Landed'] = 0
    result['Crits'] = 0
    result['Resists'] = 0
    result['BaseDamage'] = 0
    result['CritDamage'] = 0

    for event in events_list:
        # Targets
        if event.target != '':
            if event.target not in targets.keys():
                targets[event.target] = SpellTarget()
            targets[event.target].add_spell_event(event)

        # Spells
        if event.spell == '':
            event.spell = 'DD/Debuff'
        if event.spell not in spells.keys():
            spells[event.spell] = SpellStats()
        spells[event.spell].add_spell_event(event)

        # Timestamp
        if event.timestamp not in timestamps.keys():
            timestamps[event.timestamp] = TimeStats()
        timestamps[event.timestamp].add_spell_event(event)

        if event.damage > 0:
            result['Landed'] += 1
            result['BaseDamage'] += event.damage
        if event.crit > 0:
            result['Crits'] += 1
            result['CritDamage'] += event.crit

        result['Resists'] += event.resist

    result['TotalDamage'] = result['BaseDamage'] + result['CritDamage']
    result['TotalAttacks'] = result['Landed'] + result['Resists']

    targets_list = dict_to_list(targets)
    result['Targets'] = sorted(targets_list, key=operator.itemgetter(7), reverse=True)

    cleaned_spell_list = {}
    for spell, stats in spells.items():
        if stats.is_dmg_dealing():
            cleaned_spell_list[spell] = stats

    spells_list = dict_to_list(cleaned_spell_list)
    result['SpellStats'] = sorted(spells_list, key=operator.itemgetter(7), reverse=True)

    caster_events = ['Landed', 'Resists', 'Crits']
    result = calculate_attack_percents(result, caster_events)

    return result

def get_attack_non_hit_target(line, keyword):
    """Gets the target of an attack that did not land"""
    split_line = line.split()
    target = ' '.join(split_line[1:split_line.index(keyword)])
    target = target.replace('The', '')

    return target

def get_target_weapon_and_damage(line, is_physical, is_crit):
    """Gets the target of our attack, the weapon we hit them with,
        and the damage amount. Returns [target, weapon, damage]"""
    split_line = line.split()


    target = ''
    weapon = ''
    damage = 0
    if is_crit:
        target = ' '.join(split_line[4:split_line.index('for')])
        weapon = ''
        damage = int(split_line[split_line.index('additional') +1])
    else:
        if is_physical:
            target = ' '.join(split_line[3:split_line.index('with')])
            weapon = ' '.join(split_line[split_line.index('your')+1:split_line.index('and')])
        else:
            target = ' '.join(split_line[3:split_line.index('for')])
            weapon = ''
        damage = int(split_line[split_line.index('for') +1])

    target = target.replace('the ', '')
    weapon = weapon.replace('the ', '')

    return [target, weapon, damage]

def calculate_attack_percents(result, event_list):
    """Calculates percentages of offensive events"""
    result['Percents'] = {}
    for event in event_list:
        if event == 'Crits' and result[event_list[0]] > 0:
            result['Percents'][event] = '{0:.2f}'.format(
                float(result[event])/result[event_list[0]])
        else:
            if result['TotalAttacks'] > 0:
                result['Percents'][event] = '{0:.2f}'.format(
                    float(result[event])/result['TotalAttacks'])
            else:
                result['Percents'][event] = 0

    return result

#endregion


#region Defense
def parse_defense_combat(readf, error_messages):
    """Parses attacks against the player."""
    readf.seek(0)
    current_line = 0
    result = {}
    sources = {}
    result['Sources'] = []
    result['Blocks'] = 0
    result['Guarded_Blocked'] = 0
    result['Guarding_Blocked'] = 0
    result['Parries'] = 0
    result['Evades'] = 0
    result['Hits'] = 0
    result['PhysicalDamage'] = 0
    result['Misses'] = 0
    result['Resists'] = 0
    result['Crits'] = 0
    result['Intercepts'] = 0
    result['CritDamage'] = 0
    result['Absorbed'] = 0
    result['SpellsLanded'] = 0
    result['SpellDamage'] = 0
    armor_hits = {}
    armor_hits['head'] = ArmorStats()
    armor_hits['torso'] = ArmorStats()
    armor_hits['arm'] = ArmorStats()
    armor_hits['hand'] = ArmorStats()
    armor_hits['leg'] = ArmorStats()
    armor_hits['foot'] = ArmorStats()
    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif MELEE_DEFENSE_BLOCK_MESSAGE in line:
                result['Blocks'] += 1
                source = add_defense_non_hit_source(line, sources)
                sources[source].add_block()
            elif MELEE_DEFENSE_PARRY_MESSAGE in line:
                result['Parries'] += 1
                source = add_defense_non_hit_source(line, sources)
                sources[source].add_parry()
            elif MELEE_DEFENSE_EVADE_MESSAGE in line:
                result['Evades'] += 1
                source = add_defense_non_hit_source(line, sources)
                sources[source].add_evade()
            elif CASTER_DEFENSE_SPELL_RESISTED_MESSAGE in line:
                result['Resists'] += 1
            elif MELEE_DEFENSE_OPPONENT_MISS_MESSAGE in line:
                result['Misses'] += 1
                source = add_defense_non_hit_source(line, sources)
                sources[source].add_miss()
            elif MELEE_DEFENSE_DAMAGE_RECEIVED_MESSAGE in line:
                result['Hits'] += 1
                armor_damage = get_armor_and_damage(line, sources, True, False)
                result['PhysicalDamage'] += armor_damage[1]

                if armor_damage[0] in armor_hits.keys():
                    armor_hits[armor_damage[0]].add_hit_with_damage(armor_damage[1])
            elif MELEE_DEFENSE_OPPONENT_CRIT_MESSAGE in line:
                result['Crits'] += 1
                armor_damage = get_armor_and_damage(line, sources, False, True)
                result['CritDamage'] += armor_damage[1]
            elif CASTER_DEFENSE_SPELL_PROC_MESSAGE in line:
                result['SpellsLanded'] += 1
                armor_damage = get_armor_and_damage(line, sources, False, False)
                result['SpellDamage'] += armor_damage[1]
            elif MELEE_BUFFER_ABSORB_MESSAGE in line:
                result['Absorbed'] += parse_healing_and_source(line, False, True)[0]
            elif MELEE_DEFENSE_GUARD_BLOCKED_MESSAGE in line:
                result['Guarded_Blocked'] += 1
            elif MELEE_DEFENSE_INTERCEPT_MESSAGE in line:
                result['Intercepts'] += 1
            elif MELEE_DEFENSE_BLOCKED_GUARD_MESSAGE in line:
                result['Guarding_Blocked'] += 1
        except IndexError as err:
            error_messages.append('DC (line {0}): {1}'.format(current_line, err))
            continue

    sources_as_list = dict_to_list(sources)
    result['Sources'] = sorted(sources_as_list, key=operator.itemgetter(8), reverse=True)

    armor_hits_list = dict_to_list(armor_hits)
    result['ArmorHits'] = sorted(armor_hits_list, key=operator.itemgetter(1), reverse=True)

    result['TotalPhysicalAttacks'] = result['Blocks'] + result['Parries'] + result['Evades'] + \
        result['Hits'] + result['Misses'] + result['Intercepts']
    result['TotalSpellAttacks'] = result['Resists'] + result['SpellsLanded']
    result['TotalAttacks'] = result['TotalPhysicalAttacks'] + result['TotalSpellAttacks']
    result['TotalDamage'] = result['PhysicalDamage'] + result['CritDamage'] + result['SpellDamage']

    try:
        result = calculate_defense_percents(result)
    except (IndexError, ZeroDivisionError) as err:
        error_messages.append('CDP: {0}'.format(err))
    return result

def calculate_defense_percents(result):
    """Calculates percentages of defensive events"""

    result['Percents'] = {}

    physical_events = ['Hits', 'Blocks', 'Parries', 'Evades', 'Misses', 'Intercepts']
    for event in physical_events:
        if result['TotalPhysicalAttacks'] > 0:
            result['Percents'][event] = '{0:.2f}'.format(
                float(result[event])/result['TotalPhysicalAttacks'])
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

def get_armor_and_damage(line, sources, is_physical, is_crit):
    """Gets which piece of armor they hit, and how much damage they did.  \
        Adds the damage to <sources>, and returns [armor, damage]"""
    split_line = line.split()
    if is_crit:
        source = ' '.join(split_line[1:split_line.index('critical')])
        damage = int(split_line[split_line.index('additionnal') +1])
    else:
        source = ' '.join(split_line[1:split_line.index('hits')])
        damage = int(split_line[split_line.index('for') +1])
    armor = ''
    if is_physical:
        armor = split_line[split_line.index('your')+1]

    source = source.replace('The ', '')

    if source not in sources.keys():
        sources[source] = DefenseStats()
        sources[source].add_damage(damage)
    else:
        sources[source].add_damage(damage)

    return [armor, damage]

def add_defense_non_hit_source(line, sources):
    """Finds the name of the attacker who failed to hit"""
    split_line = line.split()
    source = ' '.join(split_line[1:split_line.index('attacks')])

    source = source.replace('The ', '')

    if source not in sources.keys():
        sources[source] = DefenseStats()

    return source
#endregion

#region Summary
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
            elif REALM_POINTS_EARNED_MESSAGE in line or \
                BONUS_REALM_POINTS_EARNED_MESSAGE in line or \
                REALM_POINTS_EARNED_KEEP_MESSAGE in line:
                if RECENT_KILL_NO_REALM_POINTS_MESSAGE not in line:
                    result['RPs'] += int(line.split()[3])
            elif DEFENSE_DEATH_MESSAGE in line:
                result['Deaths'] += 1
        except IndexError as err:
            error_messages.append('CS (line {0}): {1}'.format(current_line, err))
            continue

    result['DeathBlows'] = sorted(deathblows.items(), key=operator.itemgetter(1), reverse=True)

    return result
#endregion


#region Healing
def parse_healing(readf, error_messages):
    """Parses healing Received and Delivered. Includes LifeTap"""
    readf.seek(0)
    current_line = 0
    healing = {}
    sources = {}
    targets = {}
    healing['Received'] = 0
    healing['Lifetapped'] = 0
    healing['Delivered'] = 0
    for line in readf:
        current_line += 1
        try:
            if CHAT_MESSAGE_INDICATOR in line:
                continue
            elif HEALING_RECEIVED_MESSAGE in line:
                healing_and_source = parse_healing_and_source(line, False, False)
                healing['Received'] += healing_and_source[0]
                if healing_and_source[1] not in sources.keys():
                    sources[healing_and_source[1]] = HealingStats(healing_and_source[0])
                else:
                    sources[healing_and_source[1]].add_heal(healing_and_source[0])
            elif LIFETAP_HEALTH_STOLEN_MESSAGE in line:
                healing['Lifetapped'] += parse_healing_and_source(line, True, False)[0]
            elif HEALING_DELIVERED_MESSAGE in line:
                healing_and_target = parse_healing_and_target(line)
                healing['Delivered'] += healing_and_target[0]
                if healing_and_target[1] not in targets.keys():
                    targets[healing_and_target[1]] = HealingStats(healing_and_target[0])
                else:
                    targets[healing_and_target[1]].add_heal(healing_and_target[0])
        except IndexError as err:
            error_messages.append('H (line {0}): {1}'.format(current_line, err))
            continue

    if 'yourself' in targets.keys():
        sources['yourself'] = targets['yourself']
        healing['Received'] += targets['yourself'].amount

    sources_list = dict_to_list(sources)
    healing['Sources'] = sorted(sources_list, key=operator.itemgetter(2), reverse=True)
    targets_list = dict_to_list(targets)
    healing['Targets'] = sorted(targets_list, key=operator.itemgetter(2), reverse=True)

    return healing

def parse_healing_and_source(line, is_lifetap, is_absorb):
    """Helper method that finds amount of healing and character providing it"""
    split_line = line.split()
    source = ''

    if is_lifetap:
        num = int(split_line[3])
    elif is_absorb:
        num = int(split_line[5])
    else:
        source = ' '.join(split_line[5:split_line.index('for')])
        num = int(split_line[split_line.index('for')+1])

    source = source.replace('the ', '')

    return [num, source]

def parse_healing_and_target(line):
    """Helper method that finds the amount of healing and who it was provided to"""
    split_line = line.split()

    target = ' '.join(split_line[3:split_line.index('for')])
    target = target.replace('the ', '')

    amount = int(split_line[split_line.index('for')+1])

    return [amount, target]
#endregion


#region DPS Chart
def get_chart_data(physical_events, spell_events, timestamps):
    """Compiles data for the DPS chart"""
    total_dps = {}
    total_dps = aggregate_dps(spell_events, aggregate_dps(physical_events, total_dps))

    # for ts in timestamps:
    #     if ts not in total_dps.keys():
    #         total_dps[ts] = 0

    sorted_dps = sorted(total_dps.items(), key=operator.itemgetter(0))

    labels = []
    values = []
    for val in sorted_dps:
        labels.append(val[0])
        values.append(val[1])

    return [labels, values]
    
    # results = []
    # for val in sorted_dps:
    #     results.append(
    #         {
    #             "name": val[0],
    #             "value": val[1]
    #         }
    #     )

    # return results

def aggregate_dps(events, dic):
    """Aggregates the DPS per timestamp"""
    for event in events:
        if event.timestamp not in dic.keys():
            dic[event.timestamp] = 0

        dic[event.timestamp] += event.damage + event.crit

        if type(event) == MeleeEvent:
            dic[event.timestamp] += event.damage_add + event.proc

    return dic
#endregion


def dict_to_list(dict_to_convert):
    """Converts a dictionary to a multi-dimensional array. The first item of the
        tuple is the key from the dictionary"""
    result_list = []
    for name, values in dict_to_convert.items():
        result_list.append([name] + values.get_all_stats())

    return result_list


def parse_uploaded_file(upload_file, error_messages):
    """Performs parsing process on 'file'"""
    result = {}

    try:
        combat = parse_combat(upload_file, error_messages)
        healing = parse_healing(upload_file, error_messages)

        result = combat
        result['Healing'] = healing

    except IOError:
        error_messages.append("Failed to open file")

    return result


#region Classes
class Nonlocal(object):
    """A container to hold non-scope specific class objects"""
    mel_event = None
    spell_event = None

class MeleeEvent(object):
    """Tracks all possible attributes of a physical event"""
    def __init__(self):
        self.timestamp = ''
        self.style = ''
        self.growth_rate = 0
        self.weapon = ''
        self.target = ''
        self.damage = 0
        self.damage_add = 0
        self.proc = 0
        self.crit = 0
        self.block = 0
        self.parry = 0
        self.evade = 0
        self.absorb = 0
        self.miss = 0
        self.fumble = 0
        self.bladeturn = 0

class SpellEvent(object):
    """Tracks all possible attributes of a spell-casting event"""
    def __init__(self):
        self.timestamp = ''
        self.target = ''
        self.spell = ''
        self.damage = 0
        self.crit = 0
        self.resist = 0

class TimeStats(object):
    """Track stats for a timestamp"""
    def __init__(self):
        self.physical_damage = 0
        self.spell_damage = 0

    def add_physical_event(self, event):
        """Records a physical event for the timestamp"""
        self.physical_damage += event.damage + event.damage_add + event.proc + event.crit

    def add_physical_pet_event(self, event):
        self.physical_damage += event.damage

    def add_spell_event(self, event):
        """Records a spell event for the timestamp"""
        self.spell_damage += event.damage + event.crit

    def add_spell_pet_event(self, event):
        self.spell_damage += event.damage

class StyleStats(object):
    """Tracks stats for weapon styles"""
    def __init__(self):
        self.growth_rate = 0
        self.damage = self.max_dmg = self.min_dmg = 0
        self.count = 0

    def add_physical_event(self, event):
        """Records a physical event for the style"""
        self.count += 1
        if event.damage > 0:
            self.damage += event.damage
            self.growth_rate += event.growth_rate
            if self.min_dmg == 0 or event.damage < self.min_dmg:
                self.min_dmg = event.damage
            if event.damage > self.max_dmg:
                self.max_dmg = event.damage

    def get_all_stats(self):
        """Returns all values for the Style"""
        avg_growth_rate = 0
        if self.count > 0:
            avg_growth_rate = self.growth_rate/self.count
        return [self.count, avg_growth_rate, self.min_dmg, self.max_dmg, self.damage]

class WeaponStats(object):
    """Tracks stats for weapons"""
    def __init__(self):
        self.count = 0
        self.damage = self.max_dmg = self.min_dmg = 0
        self.procs = 0
        self.proc_dmg = 0
        self.crits = 0
        self.crit_dmg = 0

    def add_physical_event(self, event):
        """Records a physical event for the weapon"""
        if event.damage > 0:
            self.count += 1

            total_event_damage = event.damage + event.damage_add + event.proc + event.crit
            self.damage += total_event_damage
            if self.min_dmg == 0 or total_event_damage < self.min_dmg:
                self.min_dmg = total_event_damage
            if total_event_damage > self.max_dmg:
                self.max_dmg = total_event_damage
            if event.proc > 0:
                self.procs += 1
                self.proc_dmg += event.proc
            if event.crit > 0:
                self.crits += 1
                self.crit_dmg += event.crit

    def get_all_stats(self):
        """Returns all values for the Weapon"""
        return [self.count, self.crits, self.crit_dmg, self.procs, \
            self.proc_dmg, self.min_dmg, self.max_dmg, self.damage]

class SpellStats(object):
    """Tracks stats for casting target"""
    def __init__(self):
        self.casted = 0
        self.landed = 0
        self.resisted = 0
        self.crits = 0
        self.crit_dmg = 0
        self.max_dmg = self.min_dmg = self.damage = 0

    def add_spell_event(self, event):
        """Records a spell event for the spell"""
        if event.damage > 0:
            self.landed += 1

        total_event_damage = event.damage + event.crit

        self.damage += total_event_damage
        if self.min_dmg == 0 or total_event_damage < self.min_dmg:
            self.min_dmg = total_event_damage
        if total_event_damage > self.max_dmg:
            self.max_dmg = total_event_damage

        if event.crit > 0:
            self.crits += 1
            self.crit_dmg += event.crit

        self.resisted += event.resist

    def is_dmg_dealing(self):
        """Returns true if the spell has landed or caused damage"""
        return self.landed > 0 or self.damage > 0

    def get_all_stats(self):
        """Returns all values for the Spell"""
        return [self.landed, self.resisted, self.crits, self.crit_dmg, \
            self.min_dmg, self.max_dmg, self.damage]

class MeleeTarget(object):
    """Tracks stats for physical target"""
    def __init__(self):
        self.hits = 0
        self.blocks = 0
        self.parries = 0
        self.evades = 0
        self.crits = 0
        self.crit_dmg = 0
        self.procs = 0
        self.proc_dmg = 0
        self.max_dmg = self.min_dmg = self.damage = 0

    def add_physical_event(self, event):
        """Records a physical event for the target"""
        if event.damage > 0:
            self.hits += 1

            total_event_damage = event.damage + event.damage_add + event.proc + event.crit
            self.damage += total_event_damage
            if self.min_dmg == 0 or total_event_damage < self.min_dmg:
                self.min_dmg = total_event_damage
            if total_event_damage > self.max_dmg:
                self.max_dmg = total_event_damage

        if event.crit > 0:
            self.crits += 1
            self.crit_dmg += event.crit

        if event.proc > 0:
            self.procs += 1
            self.proc_dmg += event.proc

        self.blocks += event.block
        self.parries += event.parry
        self.evades += event.evade

    def get_all_stats(self):
        """Returns all values for the target"""
        return [self.hits, self.blocks, self.parries, self.evades, self.crits,  \
            self.crit_dmg, self.procs, self.proc_dmg, self.min_dmg, self.max_dmg, self.damage]

class SpellTarget(object):
    """Keeps track of spell stats per target"""
    def __init__(self):
        self.landed = 0
        self.resisted = 0
        self.crits = 0
        self.crit_dmg = 0
        self.max_dmg = self.min_dmg = self.damage = 0

    def add_spell_event(self, event):
        """Records a spell event for the target"""
        if event.damage > 0:
            self.landed += 1

        total_event_damage = event.damage + event.crit

        self.damage += total_event_damage
        if self.min_dmg == 0 or total_event_damage < self.min_dmg:
            self.min_dmg = total_event_damage
        if total_event_damage > self.max_dmg:
            self.max_dmg = total_event_damage

        if event.crit > 0:
            self.crits += 1
            self.crit_dmg += event.crit

        self.resisted += event.resist

    def get_all_stats(self):
        """Returns all values for the target"""
        return [self.landed, self.resisted, self.crits, self.crit_dmg, \
            self.min_dmg, self.max_dmg, self.damage]

class PetAttack(object):
    def __init__(self, timestamp, is_physical=False):
        self.timestamp = timestamp
        self.target = ''
        self.damage = 0
        self.is_physical = is_physical

class DefenseStats(object):
    """Tracks defensive stats per attacker"""
    def __init__(self):
        self.attacks = 0
        self.hits = 0
        self.blocks = 0
        self.parries = 0
        self.evades = 0
        self.misses = 0
        self.damage = 0
        self.crits = 0

    def add_damage(self, damage):
        """Track a damage event"""
        self.attacks += 1
        self.hits += 1
        self.damage += damage

    def add_crit(self, damage):
        """Track a critical hit"""
        self.crits += 1
        self.damage += damage

    def add_block(self):
        """Track a block event"""
        self.attacks += 1
        self.blocks += 1

    def add_parry(self):
        """Track a parry event"""
        self.attacks += 1
        self.parries += 1

    def add_evade(self):
        """Track an evade event"""
        self.attacks += 1
        self.evades += 1

    def add_miss(self):
        """Track a miss event"""
        self.attacks += 1
        self.misses += 1

    def get_all_stats(self):
        """Returns all values"""
        return [self.attacks, self.hits, self.blocks, self.parries, \
            self.evades, self.misses, self.crits, self.damage]

class ArmorStats(object):
    """Tracks defensive stats for armor"""
    def __init__(self, hits=0, damage=0):
        self.hits = hits
        self.damage = damage

    def add_hit_with_damage(self, damage):
        """Track a hit for the piece of armor"""
        self.hits += 1
        self.damage += damage

    def get_all_stats(self):
        """Returns all values for the armor"""
        return [self.hits, self.damage]

class HealingStats(object):
    """Tracks stats for healing"""
    def __init__(self, amount):
        self.count = 1
        self.amount = amount
        self.max = amount

    def add_heal(self, amount):
        """Track a healing event"""
        self.count += 1
        self.amount += amount
        if amount > self.max:
            self.max = amount

    def get_all_stats(self):
        """Returns all values"""
        return [self.count, self.amount, self.max]
#endregion

if __name__ == '__main__':
    print('Yay')
