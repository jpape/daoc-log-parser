

def parse_crafting(readf, error_messages):
    readf.seek(0)

    result = {}

    crafted_items = {}
    crafting_skills = {}
    last_attempted_item = ''
    try:
        for line in readf:
            if 'You successfully make' in line:
                # item = get_item_name(line)
                # quality = get_item_quality(line)

                item, quality = get_item_and_quality(line)
                if item not in crafted_items.keys():
                    crafted_items[item] = CraftItem()

                crafted_items[item].qualities[quality] += 1
                
                last_attempted_item = ''
                losing_items = False
            
            elif 'but lose no materials' in line:
                item = get_item_name(line)

                if item not in crafted_items.keys():
                    crafted_items[item] = CraftItem()

                crafted_items[item].fails += 1

                last_attempted_item = ''
                losing_items = False
            
            elif 'and lose some materials' in line:
                item = get_item_name(line)

                if item not in crafted_items.keys():
                    crafted_items[item] = CraftItem()

                crafted_items[item].fails += 1

                last_attempted_item = item
                losing_items = True
            
            elif 'You lose' in line and losing_items and last_attempted_item != '':
                material, amount = get_material_name_and_count(line)
                if material not in crafted_items[last_attempted_item].lost_materials.keys():
                    crafted_items[last_attempted_item].lost_materials[material] = 0
                
                crafted_items[last_attempted_item].lost_materials[material] += amount

            elif 'You gain skill' in line:
                skill, level = get_skill_and_level(line)
                if skill not in crafting_skills.keys():
                    crafting_skills[skill] = 0

                crafting_skills[skill] += 1
            
            else:
                losing_items = False
    except Exception:
        error_messages.append('Error while parsing crafting')

    result['Series'] = []
    result['Values'] = []

    for item_name, craft_results in crafted_items.items():
        result['Series'].append(item_name)
        result['Values'].append(craft_results.get_qualities_ascending())


    return result


def get_skill_and_level(line):
    split_line = line.split()
    skill = split_line[5].replace('!', '')
    level = split_line[6].replace('(', '').replace(')', '')

    return skill, level

def get_item_name(line):
    split_line = line.split()
    item = split_line[split_line.index('make')+1:]

    if 'successfully' in line:
        item = ' '.join(item)
        item = item[:item.index('!')]
    
    elif 'lose no materials' in line:
        item = ' '.join(item[:item.index('but')])
    
    elif 'lose some materials' in line:
        item = ' '.join(item[:item.index('and')])

    item = item.replace('the ', '')
    item = item.replace(',', '')

    return item

def get_item_and_quality(line):
    split_line = line.split()
    quality = 0
    item = ' '.join(split_line[split_line.index('make')+1:])

    item = item[:item.index('!')].replace('the ', '').replace(',', '')
    quality = split_line[len(split_line)-1].replace('(', '').replace(')', '')

    return item, quality

def get_material_name_and_count(line):
    material_lost = line[line.index(')')+2:len(line)-1]
    amount_lost = line[line.index('(')+1:line.index()]

    return material_lost, amount_lost


class CraftItem(object):
    def __init__(self):
        self.fails = 0
        self.qualities = {
            "100": 0,
            "99": 0,
            "98": 0,
            "97": 0,
            "96": 0,
            "95": 0,
            "94": 0
        }
        self.lost_materials = {}

    def get_total_crafts(self):
        return sum(self.qualities.values()) + self.fails

    def get_qualities_ascending(self):
        return [self.fails, self.qualities['94'], self.qualities['95'], self.qualities['96'],\
         self.qualities['97'], self.qualities['98'], self.qualities['99'], self.qualities['100']]