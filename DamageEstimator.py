import json
import math
from termcolor import colored
import argparse
import OrphanFinder

# Momentum is 'worth' this much
momentum_value = 2

# In theory, Advantage is 'worth' ~1/2 Momentum just in terms of the increased likelihood of a Gambit. Actual worth depends heavily on the applicable attack.

status_multipliers = {
    "Bleeding": 1.5,
    "Dazed": 2,
    "Pierce": 0.5
}

instant_statuses = ["Defending"]

keyword_modifiers = {
    "Brawling": 0.15, # Pretty niche
    "Remote": 0.25,
    "Glancing": -1
}

attack_range_multiplier = {
    "Melee": 1,
    "0": 0.95,
    "1": 0.9,
    "2": 0.85,
    "3": 0.8
}

ATTACK = 1
TECHNIQUE = 2
AT_LEAST_ODDS = {2:100,
3:97.22222222222,
4:91.66666666665999,
5:83.33333333332999,
6:72.22222222222999,
7:58.33333333332999,
8:41.66666666662999,
9:27.777777777729995,
10:16.666666666629993,
11:8.333333333299993,
12:2.7777777777399937,}
STANDARD_NEGATE = [4, 6, 7, 9]

def get_negate_adjustment(index):
    return (100-AT_LEAST_ODDS[STANDARD_NEGATE[index]])/100
    

def get_status_magnitude(status):
    if(not status): return 0
    split_status = status.split(' ')
    if len(split_status) == 1: 
        return status_multipliers[split_status[0].strip()]
    if len(split_status) == 2 and '[' in split_status[1]: 
        return status_multipliers[split_status[0].strip()]
    elif len(split_status) == 2 : 
        return status_multipliers[split_status[0].strip()] * int(split_status[1].strip())
    elif len(split_status) == 3: # I'm lazy
        return status_multipliers[split_status[0].strip() ] * int(split_status[1].strip()) 

def get_status_damage(status_string, index):
    # Split individual statuses out
    status_string = status_string.replace('_', '')

    multiplier = get_negate_adjustment(index)
    
    statuses = status_string.split(', ')

    estimated_damage = 0
    no_save_damage = 0
    # TODO: Add something about no-save
    for status in statuses: 
        if status == 'None': continue        
        if('Momentum' in status):
            # Gaining Momentum should be worth a little less; if gaining momentum if worth the same as spending, there's no escalation
            no_save_damage += int(status[1]) * momentum_value * 0.75
        elif '/' in status and 'Grit' not in status:
            status_options = status.split('/')
            estimated_damage += max(get_status_magnitude(status_option.strip()) for status_option in status_options)
        else:
            estimated_damage += get_status_magnitude(status.strip())

    return estimated_damage * multiplier + no_save_damage

def get_databases():
    # Open the appropriate database.
    merged_data = json.load(open('.\src\database\items\weapons.json'))
    merged_data.extend(json.load(open('.\src\database\\ability_packages.json')))
    merged_data.extend(json.load(open('.\src\database\\traits.json')))
    return merged_data


def find_attack(parent, name):
    data = []
    target = {}
    if len(parent) == 0:        
        f = open('.\src\database\\abilities.json')
        data = json.load(f)
        for ability in data:
            if ability["name"] == name:
                target = ability
    else:
        data = get_databases()
        for ap in data:
            if ap["name"] == parent:
                for ability in ap["abilities"]:
                    if ability["name"] == name:
                        target = ability
                    
    if len(target.keys()) == 0:        
        raise Exception("Attack not found.")
    if not target["type"] == 'Attack':
        raise Exception("Ability is not an attack.")
    return target

def estimate_all_damage(database, threshold):
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
    roll_chart = 0*4
    damage_chart = [0]*4
    stun_chart = [0]*4
    status_chart = ['']*4
    bonus_damage =  [0]*4
    expected_targets = 1
    lvh = 'none'
    attack_category = ATTACK
    override_range = ""
    stun_scale = 0.9 # Stun is worth less (not sure how much)

    cost += int(attack["cost"][0])
                    
    if("chart" in attack):
        roll_chart = attack["chart"]["roll"]
        if(not("damage" in attack["chart"])):
            damage_chart = [0]*4
        else:                        
            damage_chart = attack["chart"]["damage"]
        if(not("stun" in attack["chart"])):
            stun_chart = [0]*4
        else:                        
            stun_chart = attack["chart"]["stun"]
        if(not("status" in attack["chart"])):
            status_chart = ['']*4
        else:
            status_chart = attack["chart"]["status"]
        roll_chart = attack["chart"]["roll"]
            

    if("analysis_notes" in attack):
        analysis_notes = attack["analysis_notes"]
        cost += analysis_notes.get("fudge", 0)
        expected_targets = analysis_notes.get("expected_targets", 1)
        if("bonus_damage" in analysis_notes):
            if(isinstance(analysis_notes["bonus_damage"], float) or isinstance(analysis_notes["bonus_damage"], int)):
                bonus_damage = [analysis_notes["bonus_damage"]]*11
                print(bonus_damage)
            else:
                print("test")
                bonus_damage = analysis_notes["bonus_damage"]
        override_range = analysis_notes.get("range", "")

    keyword_bonus = 0

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

    attack_ranges = attack["range"].replace('_', '').replace('-', '').split('/')
    attack_range = attack_ranges[-1]
    if override_range != "":
        attack_range = override_range

    # Parse and range keywords associated with this.
    if "(" in attack_range:
        attack_range = attack_range.split("(")[0].replace(' ', '')
    straight_damage = 0
    advantage_damage = 0
    disadvantage_damage = 0

    # Adjust for cost.
    target_damage =  (cost * momentum_value)* attack_range_multiplier[attack_range]

    # Adjust for expected targets.
    target_damage = target_damage / expected_targets

    # TODO: Add a roll map check.
    roll_map = 11 * [0]
    for i, roll in enumerate(roll_chart):
        roll_range = roll.split('-')
        if(len(roll_range) == 1):
            roll_map[int(roll_range[0])-2] = i
        else:
            for j in range(int(roll_range[0]), int(roll_range[1]) + 1):
                roll_map[j-2] = i

    # Calculate the damage for each speed.
    est_damage = [0]*12
    for roll_index in range(10,-1,-1):
        index = roll_map[roll_index]
        damage = damage_chart[index]
        damage += stun_chart[index] * stun_scale
        if(glancing): damage = math.ceil(damage/2.0)
        if(index < len(status_chart)):
            damage += get_status_damage(status_chart[index], index)
        damage += bonus_damage[index]
        if(roll_chart[index] != 0): 
            damage += keyword_bonus / 2 # Keywords are priced as Momentum, 2 Damage per Momentum
        straight_damage += straight[roll_index]*damage
        advantage_damage += advantage[roll_index]*damage
        disadvantage_damage += disadvantage[roll_index]*damage
        est_damage[index] = damage
        

    if(print_stats):
        colors = ["red", "yellow", "green", "magenta"]
        hit_string = colored("|", 'red')
        damage_string = colored("|", 'red')
        for index, item in enumerate(roll_chart):            
            a, b = item.split('-') if '-' in item else [item, item ]         
            a, b = int(a), int(b)
            for num in range(a, b+1):
                hit_string += colored("   " + str(num) + "  |", colors[index])
                pad = "" if num < 10 else " "
                damage_string += colored(" " + "{:.2f}".format(est_damage[index]) + pad + " |", colors[index])

        print(hit_string)
        print(damage_string)
        print(colored("Expected Damage:        " +  "{:.3f}".format(target_damage), 'blue'))
        print(colored("Straight Attack:        " +  "{:.3f}".format(straight_damage), 'white'))
        print(colored("Advantage Attack:       " +  "{:.3f}".format(advantage_damage), 'green'))
        print(colored("Disadvantage Attack:    " +  "{:.3f}".format(disadvantage_damage), 'red'))
    if(print_stats):
        print("\033[1mExpected Damage Difference: " + "{:.3f}".format(straight_damage-target_damage) + "\033[0m") 

    return straight_damage - target_damage


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--analyze_all", help="Analyze everything of that type.", action='store_true')
    parser.add_argument("--threshold", help="How large of a gap between expected and actual damage to flag.", type=float, default=0.1)
    parser.add_argument("--parent", help="What the parent to this ability is.", type=str, default="")
    parser.add_argument("--name", help="Name of the ability.", type=str)
    parser.add_argument("--glancing", help="Whether or not to apply Glancing.", action='store_true')
    args = parser.parse_args()

    if(args.analyze_all):
        estimate_all_damage(args.type, args.threshold)
    else:        
        attack = find_attack(args.parent, args.name)
        estimate_damage(attack, args.glancing, True)