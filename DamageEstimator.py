import json
import math
from termcolor import colored
import argparse

status_multipliers = {
    "Alight": 1.0,
    "Burned": 1.0,
    "Soaked": 0.2,
    "Pull": 0.5,
    "Angled Push": 0.5,
    "Push": 0.5,
    "Dazed": 0.75,
    "Grabbed": 0.75,
    "Vulnerable": 0.75,
    "Slowed": 1.25,
    "Bleeding": 1.0,
    "Frost": 1.0,
    "Exposed": 1.0,
    "Impaired": 1.0,
    "Restrained": 1.75,
    "Prone": 1.5,
    "Hobbled": 1.25,
    "Reeling": 1.25,
    "Break": 1.25,
    "Blinded": 2,
    "Shocked": 1.0,
}

keyword_multipliers = {
    "Avoidable": -0.5,
    "Cold": 0.0,
    "Groundsource": 0.5,
    "Brawling": 0.25,
    "Overwhelming": 0.25,
    "Pierce": 0.5,
    "Remote": 1.0,
    "Siege": 0,
    "Fist": 0,
    "Body": 0,
    "Kick": 0,
    "Fist/Body/Kick": 0
}

attack_range_multiplier = {
    "Melee": 1,
    "Long Melee": 0.95,
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
        if status == 'Alight':
            return math.sqrt(sum(range(1,int(secondary)+1)))+int(secondary)/2
        elif 'x' in secondary:
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


def estimate_all_damage(database, threshold):
    data = get_data(database)
    invalid_attacks = {}

    for el in data:
        if("chart" in el):
            diff = estimate_damage(el, False, False)
            if(abs(diff) > threshold):
                invalid_attacks[el["name"]] = diff

    for key in invalid_attacks:
        print("    " + key + ": " + str(-invalid_attacks[key]))


def estimate_damage(attack, glancing, print_stats):
    # Statistics for a given roll based on dis/advantage.
    straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.166666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
    advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.0740740740741]
    disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]

    # Useful analysis parameters.
    cost = 0
    roll_chart = ["Hit"]*11
    damage_chart = [0]*11
    status_chart = ['']*11
    speed = 1
    bonus_damage =  [0]*11
    expected_targets = 1
    lvh = 'none'
    attack_class = MINOR_ATTACK
    override_range = ""
    diff_speed = 0
    
    expected_damage = [3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 10.0]
                
    if("chart" in attack):
        if(not("damage" in attack["chart"])):
            damage_chart = [0]*11
        else:                        
            damage_chart = attack["chart"]["damage"]
        status_chart = attack["chart"]["status"]
        roll_chart = attack["chart"]["roll"]
                    
    if(type(attack["speed"]) is int or len(attack["speed"]) == 1):
        speed = int(attack["speed"])
    else:
        speed = int(attack["speed"][0])
    if("rank" in attack):
        attack_class = (attack["rank"] == 'Major Attack')+1
    elif(attack.get("category", "") == "Shield"):
        attack_class = MINOR_ATTACK
    elif("hands" in attack): # Means that this is a weapon.
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
        bonus_damage = attack["analysis_notes"].get("bonus_damage", [0]*11)
        override_range = attack["analysis_notes"].get("range", "")
        diff_speed = attack["analysis_notes"].get("speed", 0)
    
    momentum_value = ((diff_speed if diff_speed != 0 else speed) + 2)/4
        
    if("hands" in attack and attack["hands"] == 2):
        cost += 1

    if attack_class == MINOR_ATTACK:
        expected_damage = [x / 2 for x in expected_damage]
    elif attack_class == TECHNIQUE:
        expected_damage = [x * 1.5 for x in expected_damage]

    speed_string = "Speed:                  1      2      3      4      5      6      7      8"
    speed_string = speed_string.replace("   " + str(speed) + "   ", "***"+ str(speed) + "***")

    range_strings = [
        "============================   PRIMARY RANGE   ===========================",
        "===========================   SECONDARY RANGE   ==========================",
        "===========================   TERTIARY RANGE   ==========================="
    ]

    diff = 0

    keyword_bonus = 0

    if("chart" in attack):
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
        ranges = override_range

    for range_index, attack_range in enumerate(ranges):    
        straight_damage = [0]*8
        advantage_damage = [0]*8
        disadvantage_damage = [0]*8

        thrown = "Thrown" in attack_range.get("special", "")
        range_category = "Melee"

        if attack_range["category"] == "Self":
            range_category = "Melee"
        elif attack_range["value"] > 1 and attack_range["value"] <= 2:
            range_category = "Long Melee"
        elif attack_range["value"] > 2 and attack_range["value"] <= 4:
            range_category = "Short"
        elif attack_range["value"] > 4 and attack_range["value"] < 8:
            range_category = "Medium"
        elif attack_range["value"] >= 8:
            range_category = "Long"

        range_modifier = 0
        if "Ordnance" in attack_range.get("special", ""):
            range_modifier += 0.05

        range_expected_damage = [x * (attack_range_multiplier[range_category]+range_modifier) for x in expected_damage]

        # Adjust for cost.
        range_expected_damage = [x + (cost * momentum_value) for x in range_expected_damage]
        
        # Adjust for expected targets.
        range_expected_damage = [x / expected_targets for x in range_expected_damage]

        # Calculate the damage for each speed.
        for roll_index in range(10,-1,-1):
            for speed_index in range(8):
                if(thrown and roll_chart[roll_index] == "Graze"): 
                    continue
                speed_dif = speed_index-speed+1 # +1 because zero indexed

                # Heavy takes double the speed penalty.
                if lvh == 'Heavy':
                    speed_dif = speed_dif*2
                index = roll_index

                if speed_dif < 0:
                    index = roll_index + speed_dif

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

                damage += bonus_damage[index]
                if(roll_chart[index] != "Miss"): 
                    damage += keyword_bonus

                straight_damage[speed_index] += straight[index]*damage
                advantage_damage[speed_index] += advantage[index]*damage
                disadvantage_damage[speed_index] += disadvantage[index]*damage

        if(print_stats):
            print(colored(range_strings[range_index], 'white'))
            print(colored(speed_string, 'white'))
            print(colored("Expected Damage:        " +  '  '.join(["{:.3f}".format(damage) for damage in range_expected_damage]), 'blue'))
            print(colored("Straight Attack:        " +  '  '.join(["{:.3f}".format(damage) for damage in straight_damage]), 'white'))
            print(colored("Advantage Attack:       " +  '  '.join(["{:.3f}".format(damage) for damage in advantage_damage]), 'green'))
            print(colored("Disadvantage Attack:    " +  '  '.join(["{:.3f}".format(damage) for damage in disadvantage_damage]), 'red'))
        if diff_speed == 0:
            diff = max(range_expected_damage[speed-1]-straight_damage[speed-1], diff, key=abs)
        else:
            diff_speed_expected_damage = range_expected_damage[math.floor(diff_speed)-1] + (range_expected_damage[math.floor(diff_speed)]-range_expected_damage[math.floor(diff_speed)-1]) * (diff_speed-math.floor(diff_speed))
            diff = max(diff_speed_expected_damage-straight_damage[speed-1], diff, key=abs)
        if(print_stats):
            print("\033[1mExpected Damage Difference: " + "{:.3f}".format(-diff) + "\033[0m") 

    return diff


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--analyze_all", help="Analyze everything of that type.", action='store_true')
    parser.add_argument("--threshold", help="How large of a gap between expected and actual damage to flag.", type=float, default=0.1)
    parser.add_argument("--type", help="What type of ability this is.", type=str)
    parser.add_argument("--name", help="Name of the ability.", type=str)
    parser.add_argument("--glancing", help="Whether or not to apply Glancing.", action='store_true')
    args = parser.parse_args()

    if(args.analyze_all):
        estimate_all_damage(args.type, args.threshold)
    else:        
        attack = find_attack(args.type, args.name)
        estimate_damage(attack, args.glancing, True)