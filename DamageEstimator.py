import json
import math
from termcolor import colored
import argparse
import OrphanFinder

# Momentum is 'worth' this much
momentum_value = 1.5

status_multipliers = {
    "Airborne": 4,
    "Alight": 4,
    "Engaged": 2,
    "Bleeding": 4,
    "Blinded": 6,
    "Burned": 3,
    "Dazed": 2,
    "Exposed": 2,
    "Frightened": 3,
    "Frozen": 3,
    "Grabbed": 3,
    "Hobbled": 3,
    "Impaired": 2,
    "Prone": 3,
    "Poisoned": 4,
    "Reeling": 2,
    "Shocked": 3,
    "Soaked": 1,
    "Sundered": 3,
    "Studied": 4,
    "Taunted": 2,
    "Push": 2,
    "Pull": 2,
    "Slide": 2.5,
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
    "Point Blank": 0.5,
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

negate = [2, 3, 4, 5]

def get_status_magnitude(status):
    split_status = status.split(' ')
    if len(split_status) == 1: 
        return status_multipliers[split_status[0].strip()]
    if len(split_status) == 2: 
        return status_multipliers[split_status[0].strip()] * int(split_status[1].strip())
    if len(split_status) == 3: # I'm lazy
        return status_multipliers[split_status[0].strip() + ' ' + split_status[1].strip()] * int(split_status[2].strip())

def get_status_damage(status_string, index):
    # Split individual statuses out
    status_string = status_string.replace('_', '')

    multiplier = (negate[index]-1)/6
    
    statuses = status_string.split(', ')

    estimated_damage = 0
    no_save_damage = 0
    # TODO: Add something about no-save
    for status in statuses: 
        if status == 'None': continue        
        if('Momentum' in status):
            # Gaining Momentum should be worth a little less; if gaining momentum if worth the same as spending, there's no escalation
            no_save_damage += int(status[1]) * momentum_value * 0.9 
        elif('Prepare' in status):
            # Preparing is worth much less
            no_save_damage += int(status[-1]) * 0.75
        elif '/' in status and 'Grit' not in status:
            status_options = status.split('/')
            estimated_damage += max(get_status_magnitude(status_option.strip()) for status_option in status_options)
        else:
            if ' ' in status.strip():
                split_status = status.split(' ')
                estimated_damage += get_status_magnitude(split_status[0].strip())
            else:
                estimated_damage += get_status_magnitude(status.strip())

    return estimated_damage * multiplier + no_save_damage

def get_data(database):
    # Open the appropriate database.
    if(database == "Technique"):
        f = open('.\src\database\\techniques.json')
    elif(database == "Weapon"):
        f = open('.\src\database\items\weapons.json')
    elif(database == "Attack"):
        f = open('.\src\database\\arts.json')

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
    roll_chart = 0*4
    damage_chart = [0]*4
    stun_chart = [0]*4
    status_chart = ['']*4
    speed = 1
    bonus_damage =  [0]*4
    expected_targets = 1
    lvh = 'none'
    attack_class = ATTACK
    override_range = ""
    diff_speed = 0
    stun_scale = 0.5 # Stun is worth less
    
    expected_damage = [0, momentum_value, momentum_value*2, momentum_value*3]
                
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
        if("negate" in attack):
            negate = attack["chart"]["negate"]

    ability = attack["abilities"][0]           
    if "cost" in ability:
        cost += int(ability["cost"][0])

    if("analysis_notes" in ability):
        analysis_notes = ability["analysis_notes"]
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
        diff_speed = analysis_notes.get("speed", 0)

    speed_string = "Speed:                  1      2      3      4   "
    if diff_speed == 0:
        speed_string = speed_string.replace("   " + str(speed) + "   ", "***"+ str(speed) + "***")
    else:
        speed_string = speed_string.replace("   " + str(math.floor(diff_speed)) + "   ", "***"+ str(math.floor(diff_speed)) + "***")
        if math.floor(diff_speed) != math.ceil(diff_speed):
            speed_string = speed_string.replace("   " + str(math.ceil(diff_speed)) + "   ", "***"+ str(math.ceil(diff_speed)) + "***")
            
    diff = 0

    keyword_bonus = 0


    for keyword in ability.get("keywords", []):       
        keyword = keyword.replace('_', '')
        split_keywords = keyword.split(' ')
        if not split_keywords[0] in keyword_modifiers:
            print("WARNING: Keyword " + split_keywords[0] + " does not have a listed cost.")
            continue
        if len(split_keywords) > 1:
            keyword_bonus += keyword_modifiers.get(split_keywords[0], 0) * int(split_keywords[1])
        else:
            keyword_bonus += keyword_modifiers.get(split_keywords[0], 0)

    attack_ranges = ability["range"].replace('_', '').split('/')
    attack_range = attack_ranges[-1]
    if "Thrown" in attack_range:
        attack_range = attack_ranges[-2]
    if override_range != "":
        attack_range = override_range

    # Parse and range keywords associated with this.
    if "(" in attack_range:
        attack_range = attack_range.split("(")[0].replace(' ', '')
    straight_damage = 0
    advantage_damage = 0
    disadvantage_damage = 0

    # Adjust for cost.
    range_expected_damage = [x + (cost * momentum_value) for x in expected_damage]

    range_expected_damage = [x * (attack_range_multiplier[attack_range]) for x in range_expected_damage]
        
    # Adjust for expected targets.
    range_expected_damage = [x / expected_targets for x in range_expected_damage]

    target_damage = 0 
    if diff_speed == 0:
        target_damage = range_expected_damage[speed-1]
    else:
        target_damage = range_expected_damage[math.floor(diff_speed)-1] + (range_expected_damage[math.floor(diff_speed)]-range_expected_damage[math.floor(diff_speed)-1]) * (diff_speed-math.floor(diff_speed))

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
        

    if(print_stats):
        print(colored("Speed:                  " + str(speed), 'white'))
        print(colored("Expected Damage:        " +  "{:.3f}".format(target_damage), 'blue'))
        print(colored("Straight Attack:        " +  "{:.3f}".format(straight_damage), 'white'))
        print(colored("Advantage Attack:       " +  "{:.3f}".format(advantage_damage), 'green'))
        print(colored("Disadvantage Attack:    " +  "{:.3f}".format(disadvantage_damage), 'red'))
    if(print_stats):
        print("\033[1mExpected Damage Difference: " + "{:.3f}".format(straight_damage-target_damage) + "\033[0m") 

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