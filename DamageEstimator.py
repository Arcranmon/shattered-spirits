import json
import math
from termcolor import colored
import argparse

def estimate_damage(type, name, glancing):
    if(type == "Technique"):
        f = open('.\src\database\\techniques.json')
    elif(type == "Obstacle"):
        f = open('.\src\database\obstacles.json')
    elif(type == "Weapon"):
        f = open('.\src\database\items\weapons.json')
    elif(type == "Maneuvers"):
        f = open('.\src\database\maneuvers.json')

    data = json.load(f)

    # Liklihood of a roll based on the defenses being used.
    straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.166666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
    advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.0740740740741]
    disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]

    hit = []
    attack = []
    speed = 1
    lvh = 'none'

    if(type == "Technique"):
        for technique in data:
            if(technique["name"] == name):
                if("chart" in technique):
                    if(not("damage" in technique["chart"])):
                        raise Exception("This Ability does not deal damage; cannot be analyzed.")
                    hit = technique["chart"]["roll"]
                    attack = technique["chart"]["damage"]
                    if(len(technique["speed"]) == 1):
                        speed = int(technique["speed"])
    else:
        for weapon in data:
            if(weapon["name"] == name):
                hit = weapon["chart"]["roll"]
                attack = weapon["chart"]["damage"]
                if("Light" in weapon["keywords"]):
                    lvh = "Light"
                if("Versatile" in weapon["keywords"]):
                    lvh = "Versatile"
                if("Heavy" in weapon["keywords"]):
                    lvh = "Heavy"
                if("speed" in weapon):
                    speed = int(weapon["speed"])

    if(attack == []):
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

            damage = (attack[index])
            if(glancing): damage = math.ceil(damage/2.0)

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
    args = parser.parse_args()
    estimate_damage(args.type, args.name, args.glancing)