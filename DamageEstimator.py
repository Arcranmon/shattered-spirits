import json
import math
from termcolor import colored
import argparse
import OrphanFinder

status_multipliers = {
    "Airborne": 4,
    "Alight": 4,
    "Bleeding": 4,
    "Blinded": 6,
    "Burned": 3,
    "Dazed": 1,
    "Exposed": 2,
    "Frightened": 3,
    "Frozen": 3,
    "Grabbed": 4,
    "Hobbled": 3,
    "Impaired": 2,
    "Prone": 3,
    "Reeling": 2,
    "Shocked": 3,
    "Soaked": 1,
    "Sundered": 3,
    "Studied": 4,
    "Taunted": 2,
    "Push": 2,
    "Pull": 2,
    "Tidal Motion": 1.75
}

instant_statuses = [   "Dazed",   "Slide"]

keyword_modifiers = {
    "Avoidable": -2,
    "Draw": -0.25,
    "Cold": 0.0,
    "Earth": 0.0,
    "Fragile": 0.0,
    "Quickdraw": 0.0,
    "Groundsource": 0.5,
    "Brawling": 0.15, # Pretty niche
    "Metal": 0.0,
    "Overwhelming": 0.25,
    "Social": 0.5,
    "Pierce": 0.5,
    "Remote": 1.0,
    "Siege": 0,
    "Fist": 0,
    "Body": 0,
    "Kick": 0,
    "Fist/Body/Kick": 0,
    "Water": 0.0,
    "Wind": 0.0,
    "Wood": 0.0,
    "Secure": 0.0,
    "Spirit": 0.0
}

attack_range_multiplier = {
    "Melee": 1,
    "Short": 0.9,
    "Reach": 0.85,
    "Medium": 0.8,
    "Long": 0.7
}

ATTACK = 1
TECHNIQUE = 2

def get_status_damage(status_string, glancing):
    # Split individual statuses out
    statuses = status_string.split(', ')

    estimated_damage = 0
    no_save_damage = 0
    for status in statuses:
        # Scale the estimated damage based on the DC
        if '[' in status:
            status = status.replace('_', '')
            final_statuses = status.split('[')
            estimated_damage += status_multipliers[final_statuses[0].strip()]
            multiplier = (int(final_statuses[1][0])-1)/6
            estimated_damage = estimated_damage * multiplier
        # Otherwise, add the effect to the damage
        else:
            split_status = status.split('_')
            if len(split_status) == 1: continue
            if split_status[1] in instant_statuses:
                if glancing:
                    no_save_damage += int(split_status[2].strip()) * status_multipliers[split_status[1].strip()]/2
                else:
                    no_save_damage += int(split_status[2].strip()) * status_multipliers[split_status[1].strip()]
            else:
                estimated_damage += status_multipliers[split_status[1]]

    return estimated_damage + no_save_damage

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

    orphan_attacks = OrphanFinder.find_orphans(database + 's')

    for el in data:
        if el["name"] not in orphan_attacks:
            if "chart" in el:
                diff = estimate_damage(el, False, False)
                if(abs(diff) > threshold):
                    invalid_attacks[el["name"]] = diff
            elif "analysis_notes" in el:
                if "status" in el["analysis_notes"]:
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
    stun_chart = [0]*11
    status_chart = ['']*11
    speed = 1
    bonus_damage =  [0]*11
    expected_targets = 1
    lvh = 'none'
    attack_class = ATTACK
    override_range = ""
    diff_speed = 0
    status_damage = 0
    
    expected_damage = [4.0, 5.0, 6.0, 7.0]
                
    if("chart" in attack):
        if(not("damage" in attack["chart"])):
            damage_chart = [0]*11
        else:                        
            damage_chart = attack["chart"]["damage"]
        if(not("stun" in attack["chart"])):
            stun_chart = [0]*11
        else:                        
            stun_chart = attack["chart"]["stun"]
        status_chart = attack["chart"]["status"]
        roll_chart = attack["chart"]["roll"]
                    
    if(type(attack["speed"]) is int or len(attack["speed"]) == 1):
        speed = int(attack["speed"])
    else:
        speed = int(attack["speed"][0])
    if "cost" in attack:
        cost = int(attack["cost"][0])
    if "type" in attack: 
        lvh = attack["type"]

    if("analysis_notes" in attack):
        cost = cost + attack["analysis_notes"].get("fudge", 0)
        expected_targets = attack["analysis_notes"].get("expected_targets", 1)
        bonus_damage = attack["analysis_notes"].get("bonus_damage", [0]*11)
        override_range = attack["analysis_notes"].get("range", "")
        diff_speed = attack["analysis_notes"].get("speed", 0)
        status_damage = get_status_damage(attack["analysis_notes"].get("status", ""), False)
    
    # Momentum is 'worth' this much
    momentum_value = 1.5
        
    if("hands" in attack and attack["hands"] == 2):
        cost += 1

    if lvh == "Light":        
        expected_damage = [x * 0.5 for x in expected_damage]
    if lvh == "Heavy":        
        expected_damage = [x * 1.5 for x in expected_damage]
    elif attack_class == TECHNIQUE:
        expected_damage = [x * 1.5 for x in expected_damage]

    speed_string = "Speed:                  1      2      3      4   "
    if diff_speed == 0:
        speed_string = speed_string.replace("   " + str(speed) + "   ", "***"+ str(speed) + "***")
    else:
        speed_string = speed_string.replace("   " + str(math.floor(diff_speed)) + "   ", "***"+ str(math.floor(diff_speed)) + "***")
        if math.floor(diff_speed) != math.ceil(diff_speed):
            speed_string = speed_string.replace("   " + str(math.ceil(diff_speed)) + "   ", "***"+ str(math.ceil(diff_speed)) + "***")
            
    diff = 0

    keyword_bonus = 0

    if("chart" in attack):
        for keyword in attack["chart"].get("keywords", []):       
            keyword = keyword.replace('_', '')
            split_keywords = keyword.split(' ')
            if len(split_keywords) > 1:
                keyword_bonus += keyword_modifiers[split_keywords[0]] * int(split_keywords[1])
            else:
                keyword_bonus += keyword_modifiers[split_keywords[0]]
        for keyword in attack.get("keywords", []):       
            keyword = keyword.replace('_', '')
            split_keywords = keyword.split(' ')
            if not split_keywords[0] in keyword_modifiers:
                print("WARNING: Keyword " + split_keywords[0] + " does not have a listed cost.")
                continue
            if len(split_keywords) > 1:
                keyword_bonus += keyword_modifiers.get(split_keywords[0], 0) * int(split_keywords[1])
            else:
                keyword_bonus += keyword_modifiers.get(split_keywords[0], 0)

    attack_range = attack["range"].replace('_', '').split('/')[-1]
    if override_range != "":
        attack_range = override_range
    thrown = False 

    # Parse and range keywords associated with this.
    if "Thrown" in attack_range:
        thrown = True
    if "(" in attack_range:
        attack_range = attack_range.split("(")[0].replace(' ', '')
    straight_damage = [0]*4
    advantage_damage = [0]*4
    disadvantage_damage = [0]*4


    range_modifier = 0
    #if "Ordnance" in attack_range.get("special", ""):
    #    range_modifier += 0.05

    # Adjust for cost.
    range_expected_damage = [x + (cost * momentum_value) for x in expected_damage]

    range_expected_damage = [x * (attack_range_multiplier[attack_range]+range_modifier) for x in range_expected_damage]
        
    # Adjust for expected targets.
    range_expected_damage = [x / expected_targets for x in range_expected_damage]

    # Calculate the damage for each speed.
    for roll_index in range(10,-1,-1):
        for speed_index in range(4):
            if(thrown and roll_chart[roll_index] == "Graze"): 
                continue
            index = roll_index
            # Attacking too early with some weapons will make some rolls automatically miss.
            if index < 0:
                continue
            damage = (damage_chart[index])
            damage += stun_chart[index]
            if(glancing): damage = math.ceil(damage/2.0)
            damage += get_status_damage(status_chart[index], glancing)
            damage += status_damage
            damage += bonus_damage[index]
            if(roll_chart[index] != "Miss"): 
                damage += keyword_bonus / 2 # Keywords are priced as Momentum, 2 Damage per Momentum
            straight_damage[speed_index] += straight[index]*damage
            advantage_damage[speed_index] += advantage[index]*damage
            disadvantage_damage[speed_index] += disadvantage[index]*damage
    if(print_stats):
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