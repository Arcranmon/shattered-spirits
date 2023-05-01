import json
import math
from termcolor import colored
import argparse

def estimate_damage(type, name, glancing, treat_vulnerable_as_damage, treat_wounded_as_damage):
    if(type == "Technique"):
        f = open('.\src\database\\techniques.json')
    elif(type == "Obstacle"):
        f = open('.\src\database\obstacles.json')
    elif(type == "Weapon"):
        f = open('.\src\database\items\weapons.json')
    elif(type == "Maneuvers"):
        f = open('.\src\database\maneuvers.json')
    elif(type == "Attack"):
        f = open('.\src\database\\attacks.json')

    data = json.load(f)

    # Liklihood of a roll based on the defenses being used.
    straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.166666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
    advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.0740740740741]
    disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]

    hit = []
    damage_chart = []
    status_chart = []
    speed = 1
    lvh = 'none'

    if(type == "Technique"):
        for technique in data:
            if(technique["name"] == name):
                if("chart" in technique):
                    if(not("damage" in technique["chart"])):
                        raise Exception("This Ability does not deal damage; cannot be analyzed.")
                    hit = technique["chart"]["roll"]
                    damage_chart = technique["chart"]["damage"]
                    if(len(technique["speed"]) == 1):
                        speed = int(technique["speed"])
    else:
        for weapon in data:
            if(weapon["name"] == name):
                hit = weapon["chart"]["roll"]
                damage_chart = weapon["chart"]["damage"]
                status_chart = weapon["chart"]["status"]
                if("speed" in weapon):
                    speed = int(weapon["speed"])

    if(damage_chart == []):
        raise Exception("Technique or weapon not found.")
                        
    straight_damage = [0, 0, 0, 0, 0, 0, 0, 0]
    advantage_damage = [0, 0, 0, 0, 0, 0, 0, 0]
    disadvantage_damage = [0, 0, 0, 0, 0, 0, 0, 0]

    for i in range (10,0,-1):
        for j in range(0,8):
            speed_dif = j-speed+1 # +1 because zero indexed
            if lvh == 'Heavy':
                speed_dif = speed_dif*2
            index = i

            if speed_dif < 0:
                index = i + speed_dif

            if index < 0:
                continue

            damage = (damage_chart[index])
            if(glancing): damage = math.ceil(damage/2.0)

            if(treat_vulnerable_as_damage or treat_wounded_as_damage):
                next_string_is_damage_status = False
                for sub_status in status_chart[i].split():
                    if next_string_is_damage_status:
                        sub_status = sub_status.replace(',', '')
                        if 'x' in sub_status:
                            damage += int(sub_status[0]) * int(sub_status[2])
                        else:
                            damage += int(sub_status)
                        next_string_is_damage_status = False
                    if sub_status == '_Vulnerable_' and treat_vulnerable_as_damage:
                        next_string_is_damage_status = True
                    if sub_status == '_Wounded_' and treat_wounded_as_damage:
                        next_string_is_damage_status = True

            straight_damage[j] += straight[i]*damage
            advantage_damage[j] += advantage[i]*damage
            disadvantage_damage[j] += disadvantage[i]*damage

    print(colored("Speed:                  1      2      3      4      5      6      7      8", 'white'))
    print(colored("Expected Damage:        3.0    4.0    5.0    6.0    7.0    8.0    9.0    10.0", 'blue'))
    print(colored("Straight Attack:        " +  '  '.join(["{:.3f}".format(damage) for damage in straight_damage]), 'white'))
    print(colored("Advantage Attack:       " +  '  '.join(["{:.3f}".format(damage) for damage in advantage_damage]), 'green'))
    print(colored("Disadvantage Attack:    " +  '  '.join(["{:.3f}".format(damage) for damage in disadvantage_damage]), 'red'))

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--type", help="What type of ability this is.", type=str)
    parser.add_argument("--name", help="Name of the ability.", type=str)
    parser.add_argument("--glancing", help="Whether or not to apply Glancing.", action='store_true')
    parser.add_argument("--treat_vulnerable_as_damage", help="If specified will add Vulnerable additively to the Damage.", action='store_true')
    parser.add_argument("--treat_wounded_as_damage", help="If specified will add Wounded additively to the Damage.", action='store_true')
    args = parser.parse_args()
    estimate_damage(args.type, args.name, args.glancing, args.treat_vulnerable_as_damage, args.treat_wounded_as_damage)