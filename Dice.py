import argparse
import random

def roll_dice(advantage, disadvantage):
    rolls = []
    if advantage or disadvantage:
        rolls.append(random.randint(1, 6))
    
    rolls.append(random.randint(1, 6))
    rolls.append(random.randint(1, 6))

    if advantage:        
        rolls.sort(reverse=True)
    if disadvantage:        
        rolls.sort()

    predictedResult = rolls[0] + rolls[1]
    print("Predicted Result: " + str(predictedResult))
    rollsText = ""
    for i, roll in enumerate(rolls):
        if i == 0:
            rollsText += '['
        rollsText += str(roll)
        if i == 1:
            rollsText += ']'
        if(not i == len(rolls)-1):
            rollsText += ", "
    print(rollsText)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--advantage", action='store_true')
    parser.add_argument("--disadvantage", action='store_true')
    args = parser.parse_args()

    roll_dice(args.advantage, args.disadvantage)