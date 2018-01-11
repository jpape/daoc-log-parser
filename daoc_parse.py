import sys

# from guizero import App, Text, CheckBox

total_damage = 0

MeleeCombat = False
CasterCombat = False
Mainhand = False
Crit = False
Defense = False
LootMoney = False


def parse_money(openFile):
    """Counts the amount of money paid and received"""
    money_spent = 0
    money_gained = 0
    for line in openFile:
        if line.find('gives you') != -1:
            money_gained = currency_to_copper(line)
        elif line.find('You just bought') != -1:
            money_spent = currency_to_copper(line)
    print_currency("Money gained: ", money_gained)
    print_currency("Money spent: ", money_spent)
    if money_gained > money_spent:
        print_currency("Net income: ", copper_to_currency(money_gained - money_spent))
    else:
        print_currency("Net loss: ", copper_to_currency(money_spent-money_gained))

def parse_gold_loot(openFile):
    """Counts amount of gold picked up from mobs"""
    money_looted = 0
    for line in openFile:
        if line.find('You pick up') != -1 or line.find('for this kill') != -1:
            money_looted += currency_to_copper(line)
    print_currency("Loot money: ", copper_to_currency(money_looted))

def copper_to_currency(total):
    """Helper method to parse_money. Seperates 'total' into largest denominations
       and returns the results a dictionary"""
    result = {}
    result['plat'] = str(int(total/10000000))
    result['gold'] = str(int((total%10000000)/10000))
    result['silver'] = str(int((total%10000)/100))
    result['copper'] = str(int(total%100))
    return result

## Helper method to parse currency amount from line and return it in copper denomination
def currency_to_copper(line):
    """Helper method to parse currency amount from line and return it in copper denomination"""
    total_currency_amount = 0
    if line.find('plat') != -1:
        plat_text = line[line.find('plat')-4:line.find('plat')]
        total_currency_amount += 10000000 * int(plat_text.split()[len(plat_text.split())-1])
    if line.find('gold') != -1:
        gold_text = line[line.find('gold')-4:line.find('gold')]
        total_currency_amount += 10000 * int(gold_text.split()[len(gold_text.split())-1])
    if line.find('silver') != -1:
        total_currency_amount += 100 * int(line[line.find('silver')-3:line.find('silver')-1])
    if line.find('copper') != -1:
        total_currency_amount += int(line[line.find('copper')-3:line.find('copper')-1])
    return total_currency_amount

def print_currency(preamble, currency_in_copper):
    """Converts currency_in_copper to the largest denominations,
       and prints out the reader-friendly amounts"""
    print(preamble)
    denominated_currency = copper_to_currency(currency_in_copper)
    print(denominated_currency['plat'] + 'p ' +
          denominated_currency['gold'] + 'g ' +
          denominated_currency['silver'] + 's ' +
          denominated_currency['copper'] + 'c')

## Counts and returns the # of successful attacks with both hands
def parse_melee_combat(openFile):
    """Counts and returns the # of successful attacks with both hands and total damage"""
    try:
        hit_count = 0
        total_damage = 0
        for line in openFile:
            if line.find('You attack') != -1 and line.find('with your') != -1:
                hit_count += 1
                damage_text = line[line.find('damage')-16:line.find('damage')]
                if line.find('-') != -1 or line.find('+') != -1:
                    total_damage += int(damage_text.split()[len(damage_text.split())-2])
                else:
                    total_damage += int(damage_text.split()[len(damage_text.split())-1])
        print("# of melee hits: " + str(hit_count))
        print('     Total damage dealt: ' + str(total_damage))
        return hit_count
    except IndexError:
        print(str(line))
        exit(0)

def parse_caster_combat(openFile):
    """Counts and returns the # of successful damage spells and total damage"""
    try:
        hit_count = 0
        resist_count = 0
        total_damage = 0
        for line in openFile:
            if line.find('You hit') != -1:
                hit_count += 1
                damage_text = line[line.find('damage')-16:line.find('damage')]
                if line.find('-') != -1 or line.find('+') != -1:
                    total_damage += int(damage_text.split()[len(damage_text.split())-2])
                else:
                    total_damage += int(damage_text.split()[len(damage_text.split())-1])
            if line.find('resists the effect') != -1:
                resist_count += 1
        print("# nukes landed: " + str(hit_count))
        print("     Total damage: " + str(total_damage))
        print("# nukes resisted: " + str(resist_count) + "\n")
        return hit_count
    except IndexError:
        print(str(line))
        exit(0)

## Counts and returns the # of critical hits inflicted with either hand.
def parse_crit(openFile):
    crit_count = 0
    for line in openFile:
        if line.find('You critical hit') != -1:
            crit_count += 1
    print("# of crits: " + str(crit_count))
    return crit_count

## Counts # of attacks made with user-input 'weaponName'.
def parse_mainhand(openFile, weaponName):
    mainhand_count = 0
    print(weaponName)
    for line in openFile:
        if line.find('with your ' + weaponName) != -1:
            mainhand_count += 1
    print("# of mainhand hits: " + str(mainhand_count))

def parse_defense(openFile):
    """Counts # blocks, # misses, # parries, # evades, # hits taken.
       Prints results, along with %'s."""
    block_count = 0
    parry_count = 0
    evade_count = 0
    hits_taken = 0
    total_damage = 0
    misses = 0
    try:
        for line in openFile:
            if line.find('you block the blow') != -1:
                block_count += 1
            elif line.find('you parry the blow') != -1:
                parry_count += 1
            elif line.find('you evade the blow') != -1:
                evade_count += 1
            elif line.find('hits your') != -1:
                hits_taken += 1
                damage_text = line[line.find('damage')-9:line.find('damage')]
                if line.find('-') != -1 or line.find('+') != -1:
                    total_damage += int(damage_text.split()[len(damage_text.split())-2])
                else:
                    total_damage += int(damage_text.split()[len(damage_text.split())-1])
            elif line.find('attacks you and misses') != -1:
                misses += 1
            total_attacks = block_count + parry_count + evade_count + hits_taken + misses
        print("Defensive statistics:\n")
        print("Total attacks received: " + str(total_attacks))
        if total_attacks != 0:
            print("Block count: " + str(block_count) +
                  "\n\tBlock %: " + str((float(block_count))/(float(total_attacks))) +
                  "\nParry count: " + str(parry_count) +
                  "\n\tParry %: " + str((float(parry_count))/(float(total_attacks))) +
                  "\nEvade Count " + str(evade_count) +
                  "\n\tEvade %: " + str((float(evade_count))/(float(total_attacks))) +
                  "\nMiss count: " + str(misses) +
                  "\n\tMiss %: " + str((float(misses))/(float(total_attacks))) +
                  "\nHits taken: " + str(hits_taken) +
                  "\n\tHit %: " + str((float(hits_taken))/(float(total_attacks))) +
                  "\nTotal damage taken: " + str(total_damage) + "\n")
    except ValueError or IndexError:
        print(line)
        exit(0)

## Executes parse_combat, parse_crit, and parse_defense.
def parse_allCombat(openFile):
    """Executes parse_combat, parse_crit, and parse_defense."""
    hit_count = parse_melee_combat(openFile)
    openFile.seek(0)
    spell_count = parse_caster_combat(openFile)
    openFile.seek(0)
    crit_count = parse_crit(openFile)
    print("Crit %: " + str(float(crit_count)/float(hit_count + spell_count)) + "\n")
    openFile.seek(0)
    parse_defense(openFile)

## Executes parse_money and parse_gold_loot.
def parse_allMoney(openFile):
    """Executes parse_money and parse_gold_loot."""
    parse_money(openFile)
    print("\n")
    openFile.seek(0)
    parse_gold_loot(openFile)

## Executes parse_allCombat and parse_allMoney.
"""Executes parse_allCombat and parse_allMoney."""
def parse_all(openFile):
    print("Combat statistics:\n")
    parse_allCombat(openFile)
    openFile.seek(0)
    print("Financial statistics: ")
    parse_allMoney(openFile)

def main() :
    # with open('./Log Files/smallTest.txt', 'r') as readf:
    #     parse_all(readf)
    try:
        if sys.argv[1] == 'help':
            print("Available options are: \nmeleeCombat, \ncasterCombat, \nMainhand <weaponName>, " +
                "\nCrit, \nDefense, \nallCombat, \nMoney, \nlootMoney, \nallMoney, \nAll")
        elif len(sys.argv) > 2:
            with open('./Log Files/' + sys.argv[1], 'r') as readf:
                if sys.argv[2] == "meleeCombat":
                    parse_melee_combat(readf)
                elif sys.argv[2] == "casterCombat":
                    parse_caster_combat(readf)
                elif sys.argv[2] == "Mainhand":
                    parse_mainhand(readf, sys.argv[3])
                elif sys.argv[2] == 'Crit':
                    parse_crit(readf)
                elif sys.argv[2] == 'Defense':
                    parse_defense(readf)
                elif sys.argv[2] == 'allCombat':
                    parse_allCombat(readf)
                elif sys.argv[2] == "Money":
                    parse_money(readf)
                elif sys.argv[2] == 'lootMoney':
                    parse_gold_loot(readf)
                elif sys.argv[2] == 'allMoney':
                    parse_allMoney(readf)
                elif sys.argv[2] == 'All':
                    parse_all(readf)
                elif sys.argv[2] == 'help':
                    print ("Available options are: \nmeleeCombat, \ncasterCombat, \nMainhand <weaponName>, " +
                        "\nCrit, \nDefense, \nallCombat, \nMoney, \nlootMoney, \nallMoney, \nAll")
        else:
            print("No method for parsing indicated topic. Please use argument 'help' for a list of available arguments.")
    except IOError:
        print("Failed to open "+ sys.argv[1])

main()
