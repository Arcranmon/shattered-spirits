import json
import argparse

def find_orphans(job):
    match job:
        case 'Technique':
            jsonData = json.load(open('.\src\database\\techniques.json'))
            field = "techniques"
        case 'Maneuver':
            jsonData = json.load(open('.\src\database\\maneuvers.json'))
            field = "maneuvers"
        case 'Attacks':
            jsonData = json.load(open('.\src\database\\attacks.json'))
            field = "attacks"
        case 'Stances':
            jsonData = json.load(open('.\src\database\\stances.json'))
            field = "stances"
        case _:
            print("Invalid key!")
            return

    names = [x['name'] for x in jsonData]

    discData = json.load(open('.\src\database\\disciplines.json'))

    discNames = [ item for x in discData if x.get('tier_1').get(field) != None for item in x.get('tier_1').get(field)  ]    
    orphans = set(names) - set(discNames)
    return orphans

if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--job", help="Which type of file we are attempting to get.")
    args = parser.parse_args()

    names = find_orphans(args.job)
