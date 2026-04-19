import json
import math
from termcolor import colored
import argparse
import OrphanFinder

STANCE_VALUE = 15
SPIRIT_STANCE_VALUE = 7 # Assume a rough defensive/movement budget of 4, +3 for Momentum
# Should be a little bit better than Spiritual Essence, but not horrifically so
MOVEMENT_VALUE = 1.5 # Make it worth less from stance than buying it raw
POSTURE_VALUE = 1
SPEED_VALUE = 0.5
DEFENSES_VALUE = 2/3
BLOCK_VALUE = 0.3

def find_stance(name):
    f = open('.\src\database\\stances.json')
    data = json.load(f)
    for stance in data:
        if stance["name"] == name:
            return stance
                    
    raise Exception("Stance not found.")

def estimate_all_stances():
    f = open('.\src\database\\stances.json')
    data = json.load(f)

    stances = {}
    for stance in data:
        if not "Spirit" in stance["name"]:
            stances[stance["name"]] = estimate_stance_value(stance, False)
        elif stance["name"] != "Spiritual Essence":
                # We do it at Speed 3 as that's the most 'real' speed for a lot spirits
                stances[stance["name"] + '(' + str(3) + ')'] = estimate_spirit_stance_value(stance, 2, False)

    for key, value in stances.items():
        print(("    " + key + ": ").ljust(25 + (0 if value > 0 else -1)) + colored("{:.3f}".format(value), 'magenta' if value > 0.5 else 'red' if value < -0.5 else 'green'))

def estimate_spirit_stance_value(stance, speed, print_results):
    stance_value = 0

    # Get the basic values.
    stance_value += int(stance["momentum"].split('/')[speed])
    stance_value += stance.get("posture", 0) * POSTURE_VALUE
    stance_value += stance.get("movement", 0) ** 0.6 * MOVEMENT_VALUE # We root here because Movement reaches a ceiling of usefulness quickly.
    stance_value += stance.get("block", 0) * BLOCK_VALUE
    # stance_value += stance.get("stun_clear", 0) * STUN_VALUE
    stance_value += 0.5 if '-' in stance.get("speed") else -0.5 if '+' in stance.get("speed") else 0 
    stance_value += stance["defenses"].get('grit', 0) * DEFENSES_VALUE
    stance_value += stance["defenses"].get('reflex', 0) * DEFENSES_VALUE
    stance_value += stance["defenses"].get('focus', 0) * DEFENSES_VALUE

    # Account for intangibles
    if "adjust" in stance:        
        stance_value += stance["adjust"]

    diff = SPIRIT_STANCE_VALUE - stance_value

    if print_results:
        print(colored("Expected Value:        " +  "{:.3f}".format(STANCE_VALUE), 'blue'))
        print(colored("Actual Value:          " +  "{:.3f}".format(stance_value), 'white'))
        print(colored("Difference:            " +  "{:.3f}".format(diff), 'red' if diff > 0.25 else 'magneta' if diff < -0.25 else 'green'))
    return stance_value - SPIRIT_STANCE_VALUE 

def estimate_stance_value(stance, print_results):
    stance_value = 0

    # Get the basic values.
    stance_value += stance["momentum"]
    stance_value += stance.get("posture", 0) * POSTURE_VALUE
    stance_value += stance.get("movement", 0) ** 0.6 * MOVEMENT_VALUE # We root here because Movement reaches a ceiling of usefulness quickly.
    stance_value += stance.get("block", 0) * BLOCK_VALUE
    # stance_value += stance.get("stun_clear", 0) * STUN_VALUE
    stance_value += 6 - stance["speed"] * SPEED_VALUE
    stance_value += stance["defenses"]["grit"] * DEFENSES_VALUE
    stance_value += stance["defenses"]["reflex"] * DEFENSES_VALUE
    stance_value += stance["defenses"]["focus"] * DEFENSES_VALUE

    # Account for intangibles
    if "adjust" in stance:        
        stance_value += stance["adjust"]

    diff = STANCE_VALUE - stance_value

    if print_results:
        print(colored("Expected Value:        " +  "{:.3f}".format(STANCE_VALUE), 'blue'))
        print(colored("Actual Value:          " +  "{:.3f}".format(stance_value), 'white'))
        print(colored("Difference:            " +  "{:.3f}".format(diff), 'red' if diff > 0.25 else 'magneta' if diff < -0.25 else 'green'))
    return stance_value - STANCE_VALUE 
    

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--analyze_all", help="Analyze everything of that type.", action='store_true')
    parser.add_argument("--name", help="Name of the ability.", type=str)
    args = parser.parse_args()

    if(args.analyze_all):
        estimate_all_stances()
    else:
        stance = find_stance(args.name)
        estimate_stance_value(stance, True)