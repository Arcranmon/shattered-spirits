import json
import os
from termcolor import colored
import re

keywordPattern = " _([^_]+)_ "

def getKeywordsFromString(input, foundKeywords):
    r = re.compile(keywordPattern)
    keywords = re.findall(keywordPattern, input)
    for keyword in keywords:
        foundKeywords.add(keyword)

def getAbilityData(ability, foundKeywords, validKeywords):
    validKeywords.add(ability["name"])
    for keyword in ability.get("keywords", []):
        if '_' in keyword:                    
            foundKeywords.add(re.search(keywordPattern, keyword))
        else:
            foundKeywords.add(keyword)
    for field in ["effect", "special"]:
        fieldData = ability.get(field, "")
        getKeywordsFromString(fieldData, foundKeywords)
    enhancements = ability.get("enhancements", [])
    for enhancement in enhancements:                
        fieldData = enhancement.get("effect", "")
        getKeywordsFromString(fieldData, foundKeywords)
    imbues = ability.get("imbues", [])
    for imbue in imbues:                
        fieldData = imbue.get("effect", "")
        getKeywordsFromString(fieldData, foundKeywords)

def findKeywordsAndSeeIfInGlossary():
    # Open the appropriate database.
    foundKeywords = set()
    keywordPattern = " _([^_]+)_ "
    r = re.compile(keywordPattern)

    glossary = json.load(open('.\src\database\glossary\glossary.json'))
    statuses = json.load(open('.\src\database\glossary\statuses.json'))
    abilities = json.load(open('.\src\database\\abilities.json'))
    terrain = json.load(open('.\src\database\\terrain.json'))
    traits = json.load(open('.\src\database\\traits.json'))
    equipment = json.load(open('.\src\database\\items\\equipment.json'))
    abilityPackages = json.load(open('.\src\database\\ability_packages.json'))

    validKeywords = set()
    for database in [glossary, statuses, abilities, terrain, equipment]:
        for item in database:
            getAbilityData(item, foundKeywords, validKeywords)

    for database in [abilityPackages, traits]:
        for item in database:
            validKeywords.add(item["name"])
            for ability in item.get("abilities", []):
                getAbilityData(ability, foundKeywords, validKeywords)

    # Get all text files and read them in as strings
    exclude = set(['character_creation'])
    for root, dirs, files in os.walk('src/database/text_files'):
        dirs[:] = [d for d in dirs if d not in exclude]       
        for filename in files:
            if filename.endswith(".txt"):
                filepath = os.path.join(root, filename)
                
                with open(filepath, 'r', encoding='utf-8') as f:
                    file_contents = f.read()
                    keywords = re.findall(keywordPattern, file_contents)
                    for keyword in keywords:
                        foundKeywords.add(keyword)


    missingKeywords = foundKeywords - validKeywords
    missingKeywords = [word for word in missingKeywords if word is not None and word.count('/') != 3]

    # Sort reverse so I can just scroll up
    for missingKeyword in sorted(missingKeywords, reverse=True):
        print(missingKeyword)

    print("Total Missing Keywords: " + str(len(missingKeywords)))


if __name__ == "__main__":
    findKeywordsAndSeeIfInGlossary()