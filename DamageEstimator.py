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
    f = open('.\src\database\glossary\obstacles.json')
elif(file == "Weapon"):
    f = open('.\src\database\items\weapons.json')
elif(file == "Enhancements"):
    f = open('.\src\database\enhancements.json')

data = json.load(f)

# Benchmark damage for a given speed.
damage_benchmark = [3.,4.,5.,6.,7.,8.]

# Liklihood of a roll based on the defenses being used.
straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.166666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
straight_evade_10_plus = [0.0324074074074, 0.0648148148148, 0.0972222222222, 0.12962962963, 0.162037037037, 0.194444444444, 0.162037037037, 0.12962962963, 0.0138888888889, 0.00925925925926, 0.00462962962963]
straight_evade_8_plus = [0.0393518518519, 0.0787037037037, 0.118055555556, 0.157407407407, 0.196759259259, 0.236111111111, 0.0578703703704, 0.0462962962963, 0.0347222222222, 0.0231481481481, 0.0115740740741]
advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.0740740740741]
advantage_evade_8_plus = [0.00628000685871, 0.0188400205761, 0.043960048011, 0.0753600823045, 0.119320130316, 0.169560185185, 0.213520233196, 0.226080246914, 0.0561128257888, 0.0445601851852, 0.0264060356653]
advantage_evade_10_plus = [0.00778034979424, 0.0233410493827, 0.0544624485597, 0.0933641975309, 0.147826646091, 0.210069444444, 0.107124485597, 0.113425925926, 0.107124485597, 0.0850694444444, 0.0504115226337]
disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.166666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]
disadvantage_evade_8_plus = [0.0778463648834, 0.131365740741, 0.165423525377, 0.175154320988, 0.165423525377, 0.131365740741, 0.092442558299, 0.0583847736626, 0.00165037722908, 0.000707304526749, 0.000235768175583]
disadvantage_evade_10_plus = [0.0884773662551, 0.149305555556, 0.188014403292, 0.199074074074, 0.188014403292, 0.149305555556, 0.017103909465, 0.0108024691358, 0.00630144032922, 0.00270061728395, 0.000900205761317]

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
            if("speed" in weapon["chart"]):
                speed = int(weapon["speed"])


if(attack == []):
    raise Exception("Technique or weapon not found.")
                    
straight_damage = 0
straight_damage_10_plus_evade = 0
straight_damage_8_plus_evade = 0
straight_damage_block = 0
advantage_damage = 0
advantage_damage_10_plus_evade = 0
advantage_damage_8_plus_evade = 0
advantage_damage_block = 0
disadvantage_damage = 0
disadvantage_damage_10_plus_evade = 0
disadvantage_damage_8_plus_evade = 0
disadvantage_damage_block = 0

expected_damage = damage_benchmark[speed-1]
bonus = [0]*11

for i in range (0,11):
    if(i >= min_roll):
        bonus[i] = bonus_damage
    straight_damage += straight[i]*(attack[i]+bonus[i])
    straight_damage_10_plus_evade += straight_evade_8_plus[i]*(attack[i]+bonus[i])
    straight_damage_8_plus_evade += straight_evade_10_plus[i]*(attack[i]+bonus[i])
    advantage_damage += advantage[i]*(attack[i]+bonus[i])
    advantage_damage_10_plus_evade += advantage_evade_8_plus[i]*(attack[i]+bonus[i])
    advantage_damage_8_plus_evade += advantage_evade_10_plus[i]*(attack[i]+bonus[i])
    disadvantage_damage += disadvantage[i]*(attack[i]+bonus[i])
    disadvantage_damage_10_plus_evade += disadvantage_evade_8_plus[i]*(attack[i]+bonus[i])
    disadvantage_damage_8_plus_evade += disadvantage_evade_10_plus[i]*(attack[i]+bonus[i])
    if(i > 0):
        straight_damage_block += straight[i]*(attack[i-1]+bonus[i-1])
        advantage_damage_block += advantage[i]*(attack[i-1]+bonus[i-1])
        disadvantage_damage_block += disadvantage[i]*(attack[i-1]+bonus[i-1])

print(colored("Expected Damage:        " + str(round(expected_damage,3)), 'blue'))
print(colored("Straight Attack:        " + str(round(straight_damage,3)), 'white'))
print(colored("  Block:                "  + str(round(straight_damage_block,3)), 'white'))
print(colored("  Evade (10+):          " + str(round(straight_damage_10_plus_evade,3)), 'white'))
print(colored("  Evade (8+):           " + str(round(straight_damage_8_plus_evade,3)), 'white'))
print(colored("Advantage Attack:       " + str(round(advantage_damage,3)), 'green'))
print(colored("  Block:                "  + str(round(advantage_damage_block,3)), 'green'))
print(colored("  Evade (10+):          " + str(round(advantage_damage_10_plus_evade,3)), 'green'))
print(colored("  Evade (8+):           " + str(round(advantage_damage_8_plus_evade,3)), 'green'))
print(colored("Disadvantage Attack:    " + str(round(disadvantage_damage,3)), 'red'))
print(colored("  Block:                "  + str(round(disadvantage_damage_block,3)), 'red'))
print(colored("  Evade (10+):          " + str(round(disadvantage_damage_10_plus_evade,3)), 'red'))
print(colored("  Evade (8+):           " + str(round(disadvantage_damage_8_plus_evade,3)), 'red'))