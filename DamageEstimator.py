import json
import math
from termcolor import colored
import argparse

status_multipliers = {
    "Soaked": 0.2,
    "Pull": 0.5,
    "Angled Push": 0.5,
    "Push": 0.5,
    "Dazed": 0.75,
    "Grabbed": 0.75,
    "Reeling": 0.75,
    "Vulnerable": 0.75,
    "Slowed": 0.75,
    "Bleed": 1.0,
    "Exposed": 1.0,
    "Impaired": 1.0,
    "Restrained": 1.0,
    "Prone": 1.25,
    "Hobbled": 1.5,
    "Reeling": 1.25,
    "Break": 1.25,
}

keyword_multipliers = {
    "Avoidable": -0.5,
    "Groundsource": 0,
    "Brawling": 0.25,
    "Overwhelming": 0.25,
    "Pierce": 0.5,
    "Remote": 1.0,
    "Siege": 0
}

attack_range_multiplier = {
    "Melee": 1,
    "Short": 0.9,
    "Medium": 0.8,
    "Long": 0.7
}

MINOR_ATTACK = 1
MAJOR_ATTACK = 2
TECHNIQUE = 3

def get_status_damage(status_string, glancing):
    split_status = status_string.split('_')
    if(len(split_status) == 1): return 0
    status = split_status[1]
    secondary = split_status[2]
    secondary = secondary.replace('[', '')

    damage_multiplier = status_multipliers[status]

    if(glancing): damage_multiplier = damage_multiplier / 2

    if damage_multiplier != 0:
        if 'x' in secondary:
            return damage_multiplier * int(secondary[0]) * int(secondary[2])
        else:
            return damage_multiplier * int(secondary) 
    else:
        print(status + " has no damage multiplier!")
    return damage_multiplier

def get_data(database):
    # Open the appropriate database.
    if(database == "Technique"):
        f = open('.\src\database\\techniques.json')
    elif(database == "Weapon"):
        f = open('.\src\database\items\weapons.json')
    elif(database == "Attack"):
        f = open('.\src\database\\attacks.json')

    return json.load(f)


def find_attack(database, name):
    data = get_data(database)

    if(database == "Technique"):
        for technique in data:
            if(technique["name"] == name):
                return technique
    else:
        for el in data:
            if(el["name"] == name):
                return el

    raise Exception("Attack not found.")


def estimate_all_damage(database):
    data = get_data(database)
    invalid_attacks = {}

    for el in data:
        if("chart" in el):
            oob, diff = estimate_damage(el, False, False)
            if(oob):
                invalid_attacks[el["name"]] = diff

    for key in invalid_attacks:
        print("    " + key + ": " + str(invalid_attacks[key]))


def estimate_damage(attack, glancing, print_stats):
    # Statistics for a given roll based on dis/advantage.
    straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.166666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
    advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.0740740740741]
    disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]

    # Useful analysis parameters.
    cost = 0
    roll_chart = []
    damage_chart = []
    status_chart = []
    speed = 1
    bonus_damage = 0
    expected_targets = 1
    lvh = 'none'
    attack_class = MINOR_ATTACK
    override_range = ""
    
    expected_damage = [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
    momentum_value = 1.5

                
    if("chart" in attack):
        if(not("damage" in attack["chart"])):
            damage_chart = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
        else:                        
            damage_chart = attack["chart"]["damage"]
        status_chart = attack["chart"]["status"]
        roll_chart = attack["chart"]["roll"]
    else:
        raise Exception("Attack has no chart!")
                    
    if(type(attack["speed"]) is int or len(attack["speed"]) == 1):
        speed = int(attack["speed"])
    else:
        speed = int(attack["speed"][0])
    if("class" in attack):
        attack_class = (attack["class"] == 'Major Attack')+1
    elif("weight" in attack): # Means that this is a weapon.
        attack_class = MAJOR_ATTACK
    else:
        attack_class = TECHNIQUE
    if("cost" in attack):
        cost = int(attack["cost"][0])
    if("type" in attack): 
        lvh = attack["type"]

    if("analysis_notes" in attack):
        cost = cost + attack["analysis_notes"].get("fudge", 0)
        expected_targets = attack["analysis_notes"].get("expected_targets", 1)
        bonus_damage = attack["analysis_notes"].get("bonus_damage", 0)
        override_range = attack["analysis_notes"].get("range", "")
        
    if("hands" in attack and attack["hands"] == 2):
        cost += 1

    if attack_class == MINOR_ATTACK:
        expected_damage = [x / 2 for x in expected_damage]
    elif attack_class == TECHNIQUE:
        expected_damage = [x * 1.5 for x in expected_damage]

    # Adjust for cost.
    expected_damage = [x + (cost * momentum_value) for i, x in enumerate(expected_damage)]
    
    # Adjust for expected targets.
    expected_damage = [x / expected_targets for x in expected_damage]

    speed_string = "Speed:                  1      2      3      4      5      6      7      8"
    speed_string = speed_string.replace("   " + str(speed) + "   ", "***"+ str(speed) + "***")

    range_strings = [
        "============================   PRIMARY RANGE   ===========================",
        "===========================   SECONDARY RANGE   ==========================",
        "===========================   TERTIARY RANGE   ==========================="
    ]

    diff = 0

    keyword_bonus = 0
    for keyword in attack["chart"].get("keywords", []):        
        keyword = keyword.replace('_', '')
        split_keywords = keyword.split(' ')
        if len(split_keywords) > 1:
            keyword_bonus += keyword_multipliers[split_keywords[0]] * int(split_keywords[1])
        else:
            keyword_bonus += keyword_multipliers[split_keywords[0]]

    ranges = []
    if override_range == "":
        ranges = attack["range"]
    else:
        ranges = [override_range]

    for range_index, attack_range in enumerate(ranges):    
        straight_damage = [0, 0, 0, 0, 0, 0, 0, 0]
        advantage_damage = [0, 0, 0, 0, 0, 0, 0, 0]
        disadvantage_damage = [0, 0, 0, 0, 0, 0, 0, 0]

        thrown = "Thrown" in attack_range.get("special", "")
        range_category = "Melee"

        if attack_range["category"] == "Self":
            range_category = "Melee"
        elif attack_range["value"] > 1 and attack_range["value"] <= 4:
            range_category = "Short"
        elif attack_range["value"] > 4 and attack_range["value"] < 8:
            range_category = "Medium"
        elif attack_range["value"] > 8:
            range_category = "Long"

        range_modifier = 0
        if "Ordnance" in attack_range.get("special", ""):
            range_modifier += 0.05

        range_expected_damage = [x * (attack_range_multiplier[range_category]+range_modifier) for x in expected_damage]

        # Calculate the damage for each speed.
        for i in range(10,0,-1):
            for j in range(0,8):
                if(thrown and roll_chart[i] == "Graze"): 
                    continue
                speed_dif = j-speed+1 # +1 because zero indexed

                # Heavy takes double the speed penalty.
                if lvh == 'Heavy':
                    speed_dif = speed_dif*2
                index = i

                if speed_dif < 0:
                    index = i + speed_dif

                # Attacking too early with some weapons will make some rolls automatically miss.
                if index < 0:
                    continue

                damage = (damage_chart[index])
                if(glancing): damage = math.ceil(damage/2.0)

                for status in status_chart[index].split(','):
                    if '/' in status:
                        options = status.split('/')
                        status_damage = max([get_status_damage(x, glancing) for x in options])
                        damage += status_damage
                    else:
                        status_damage = get_status_damage(status, glancing)
                        damage += status_damage

                if(roll_chart[index] != "Miss"): 
                    damage += bonus_damage
                    damage += keyword_bonus

                straight_damage[j] += straight[i]*damage
                advantage_damage[j] += advantage[i]*damage
                disadvantage_damage[j] += disadvantage[i]*damage

        if(print_stats):
            print(colored(range_strings[range_index], 'white'))
            print(colored(speed_string, 'white'))
            print(colored("Expected Damage:        " +  '  '.join(["{:.3f}".format(damage) for damage in range_expected_damage]), 'blue'))
            print(colored("Straight Attack:        " +  '  '.join(["{:.3f}".format(damage) for damage in straight_damage]), 'white'))
            print(colored("Advantage Attack:       " +  '  '.join(["{:.3f}".format(damage) for damage in advantage_damage]), 'green'))
            print(colored("Disadvantage Attack:    " +  '  '.join(["{:.3f}".format(damage) for damage in disadvantage_damage]), 'red'))
        diff = max(abs(range_expected_damage[speed-1]-straight_damage[speed-1]), diff)

    return diff > 0.1, diff


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--analyze_all", help="Analyze everything of that type.", action='store_true')
    parser.add_argument("--type", help="What type of ability this is.", type=str)
    parser.add_argument("--name", help="Name of the ability.", type=str)
    parser.add_argument("--glancing", help="Whether or not to apply Glancing.", action='store_true')
    args = parser.parse_args()

    if(args.analyze_all):
        estimate_all_damage(args.type)
    else:        
        attack = find_attack(args.type, args.name)
        estimate_damage(attack, args.glancing, True)