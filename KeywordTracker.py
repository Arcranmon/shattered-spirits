import json
import os
from termcolor import colored
import re

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

    validKeywords = set()
    for database in [glossary, statuses, abilities, terrain, traits]:
        for item in database:
            validKeywords.add(item["name"])
            for keyword in item.get("keywords", []):
                if '_' in keyword:                    
                    foundKeywords.add(re.search(keywordPattern, keyword))
                else:
                    foundKeywords.add(keyword)
            for field in ["effect", "special"]:
                fieldData = item.get(field, "")
                keywords = re.findall(keywordPattern, fieldData)
                for keyword in keywords:
                    foundKeywords.add(keyword)

    # Get all text files and read them in as strings
    for root, dirs, files in os.walk('src/database/text_files'):
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