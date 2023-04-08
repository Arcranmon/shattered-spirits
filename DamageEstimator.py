import json
import sys
from termcolor import colored

if(len(sys.argv) <= 1):
    raise Exception("Not enough inputs; requires a weapon or skill designation, as well as the name of the respective ability.")

file = sys.argv[1]
name = sys.argv[2]
bonus_damage = 0
min_roll = 0
if(len(sys.argv) >= 4):
    bonus_damage = int(sys.argv[3])
    min_roll = int(sys.argv[4])-1

if(file == "Technique"):
    f = open('.\src\database\\techniques.json')
elif(file == "Obstacle"):
    f = open('.\src\database\obstacles.json')
elif(file == "Weapon"):
    f = open('.\src\database\items\weapons.json')
elif(file == "Maneuvers"):
    f = open('.\src\database\maneuvers.json')

data = json.load(f)

# Benchmark damage for a given speed.
damage_benchmark = [3.,4.,5.,6.,7.,8.]

# Liklihood of a roll based on the defenses being used.
straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.166666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.0740740740741]
disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]

hit = []
attack = []
speed = 1

if(file == "Technique"):
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
            if("speed" in weapon):
                speed = int(weapon["speed"])


if(attack == []):
    raise Exception("Technique or weapon not found.")
                    
straight_damage = 0
advantage_damage = 0
disadvantage_damage = 0

expected_damage = damage_benchmark[speed-1]
bonus = [0]*11

for i in range (0,11):
    if(i >= min_roll):
        bonus[i] = bonus_damage
    straight_damage += straight[i]*(attack[i]+bonus[i])
    advantage_damage += advantage[i]*(attack[i]+bonus[i])
    disadvantage_damage += disadvantage[i]*(attack[i]+bonus[i])

print(colored("Expected Damage:        " + str(round(expected_damage,3)), 'blue'))
print(colored("Straight Attack:        " + str(round(straight_damage,3)), 'white'))
print(colored("Advantage Attack:       " + str(round(advantage_damage,3)), 'green'))
print(colored("Disadvantage Attack:    " + str(round(disadvantage_damage,3)), 'red'))