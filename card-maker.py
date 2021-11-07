import subprocess
import sys
import glob
import os
import json

# Arg1 is Stances/Techniques, Arg2 is filepath
category = sys.argv[1]
discipline = sys.argv[2]
print('Creating cards for ', category, ' ', discipline)

filepath = category + '\\' + discipline + '\\'

# Create output file
with open(filepath  + '\\cards.tex', "w") as tex_file:
    tex_file.write('LaTex Headers Here\n')

# Create information for Stances
for filename in glob.glob(os.path.join(filepath, '*stances.json')):
    with open(filename) as read_file:
        data = json.load(read_file)

# Create output file
with open(filepath  + '\\cards.tex', "a") as tex_file:
    for entry in data:
        tex_file.write(entry['name'] + '\n')

# Create information for Techniques
for filename in glob.glob(os.path.join(filepath, '*techs.json')):
    with open(filename) as read_file:
        data = json.load(read_file)

with open(filepath  + '\\cards.tex', "a") as tex_file:
    for entry in data:
        tex_file.write('\\begin{document}\n')
        tex_file.write(entry['name'] + '\n')
        tex_file.write('\\end{document}\n')


# subprocess.call(["pdflatex", filepath])