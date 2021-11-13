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
    tex_file.write('\\begin{document}\n')

    # Create information for Stances
    for filename in glob.glob(os.path.join(filepath, '*.json')):
        with open(filename) as read_file:
            data = json.load(read_file)
            for entry in data:
                tex_file.write(entry['name'] + '\n')
                
    tex_file.write('\\end{document}\n')

subprocess.call(["pdflatex", './' + category + '/' + discipline + '/cards.tex'])