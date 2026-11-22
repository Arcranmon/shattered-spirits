import json
import math
from termcolor import colored
import argparse
import re
import tkinter as tk
from tkinter import ttk, scrolledtext
from ttkthemes import ThemedTk
import sys

# Momentum is 'worth' this much
momentum_value = 1
stun_scale = 0.5 # Guard is worth less (not sure how much)
gambit_worth = 2*momentum_value*(1/6 + 1/12)


# Statistics for a given roll based on dis/advantage.
straight = [0.0277777777778, 0.0555555555556, 0.0833333333333, 0.111111111111, 0.138888888889, 0.146666666667, 0.138888888889, 0.111111111111, 0.0833333333333, 0.0555555555556, 0.0277777777778]
advantage = [0.00462962962963, 0.0138888888889, 0.0324074074074, 0.0555555555556, 0.087962962963, 0.125, 0.157407407407, 0.146666666667, 0.157407407407, 0.125, 0.0740740740741]
disadvantage = [0.0740740740741, 0.125, 0.157407407407, 0.146666666667, 0.157407407407, 0.125, 0.087962962963, 0.0555555555556, 0.0324074074074, 0.0138888888889, 0.00462962962963]

# In theory, Advantage is 'worth' ~1/2 Momentum just in terms of the increased likelihood of a Gambit. Actual worth depends heavily on the applicable attack.

status_multipliers = {
    "Bleeding": 3,
    "Poisoned": 1.5,
    "Alight": 3,
    "Entangled": 3,
    "Frozen": 3,
    "Soaked": 0.5,
    "Exposed": 1.5,
    "Impaired": 1.5,
    "Push": 2,
    "Disarm": 2,
    "Pull": 2,
    "Prone": 2,
    "Shatter": 2,
    "Grabbed": 2,
}

instant_statuses = ["Defending"]

# How much 'damage' these are worth
keyword_modifiers = {
    "Brawling": 0.15, # Pretty niche
    "Remote": 0.25,
    "Glancing": -1,
    "Piercing": 1,
    "Natural": 0,
    "Martial": 0,
    "Unarmed": 0,
    "Spirit": 0,
    "Safe": 0, # Attacks with Safe just have it so you can spend Speed to use 'em
    "Siege": 0.25,
    "Stab": 0,
    "Slash": 0,
    "Crush": 0
}

attack_range_multiplier = {
    "Special": 0,
    "Melee": 1,
    "0": 0.95,
    "1": 0.9,
    "2": 0.85,
    "3": 0.8
}

STANDARD_NEGATE = [0, 0, 0, 0]


def get_status_magnitude(status):
    if(not status): return 0
    magnitude = 0
    split_status = status.split(' ')
    if len(split_status) == 1: 
        magnitude  = status_multipliers[split_status[0].strip()]
    elif len(split_status) == 2 and '[' in split_status[1]: 
        if('/' in split_status[0].strip()):
            status_options = split_status[0].strip().split('/')
            magnitude = max(status_multipliers[status_options[0]], status_multipliers[status_options[1]])
        else:
            magnitude = status_multipliers[split_status[0].strip()]
    elif len(split_status) == 2 : 
        magnitude = status_multipliers[split_status[0].strip()] * int(split_status[1].strip())
    elif len(split_status) == 3: # I'm lazy
        magnitude = status_multipliers[split_status[0].strip() ] * int(split_status[1].strip()) 

    negate_dc = re.search(r"\[([^\]]+)\]", split_status[1])
    if negate_dc:
        if '/' in negate_dc.group(1):
            negate = int(negate_dc.group(1).split('/')[1]) * stun_scale
        else:
            negate = int(negate_dc.group(1)) * stun_scale
    else:
        negate = 0

    if negate == 0 or magnitude == 0:
        return 0
    return (negate + negate + magnitude) / 3  if negate < magnitude else (negate + magnitude)/2 
    
def get_status_damage(status_string,  index):
    # Split individual statuses out
    status_string = status_string.replace('_', '')
    
    statuses = status_string.split(', ')

    estimated_damage = 0
    no_save_damage = 0
    # TODO: Add something about no-save
    for status in statuses: 
        if status == 'None': continue        
        if('Momentum' in status):
            # Gaining Momentum should be worth a little less; if gaining momentum if worth the same as spending, there's no escalation
            no_save_damage += int(status[1]) * momentum_value * 0.75
        else:
            estimated_damage += get_status_magnitude(status.strip())

    return  estimated_damage

def get_databases():
    # Open the appropriate database.
    merged_data = json.load(open('.\src\database\items\weapons.json'))
    merged_data.extend(json.load(open('.\src\database\items\equipment.json')))
    merged_data.extend(json.load(open('.\src\database\\ability_packages.json')))
    merged_data.extend(json.load(open('.\src\database\\traits.json')))
    merged_data.extend(json.load(open('.\src\database\\npcs\\npcs.json')))
    return merged_data

class Attack:
    name: str = ""
    cost: int = 0
    roll_chart = ['0']*4
    damage_chart = [0]*4
    stun_chart = [0]*4
    status_chart = ['']*4
    bonus_damage =  [0]*4
    multi_attack =  1
    keywords = []
    keyword_bonus = 0
    expected_targets = 1
    range = 'Melee'
    override_range = ""
    cost_adjust = 0
    target_damage = 0
    straight_damage = 0
    advantage_damage = 0
    disadvantage_damage = 0
    damage_diff = 0
    estimated_damage_chart = [0]*11
    full_damage = [0]*11
    full_stun = [0]*11
    full_status = [0]*11
    enhancement_ev = [0]*10

    def rangeMultiplier(self):
        if len(self.override_range) > 0: return attack_range_multiplier[self.override_range]
        return attack_range_multiplier[self.range]
    
    def gambitAdjust(self):
        adjust = 0
        if self.roll_chart[3].split('-')[0] == '10':
            adjust = 1/9 #4+6 and 6+4 is two more potential Gambits, x2 for 2 Momentum
        if self.multi_attack > 1:
            adjust = adjust * self.multi_attack + gambit_worth*(self.multi_attack-1)
        return adjust

    def hasRollChart(self):
        return self.roll_chart[0] == self.roll_chart[1]


    def __init__(self, jsonAttack):
    # Set up better parsing of cost
        self.name = jsonAttack.get("name", "NA")
        self.cost = int(jsonAttack.get("cost", [0])[0])
        if "chart" in jsonAttack:
            chart = jsonAttack.get("chart")
            self.roll_chart = chart.get("roll", ['0']*4)
            self.damage_chart = chart.get("damage", [0]*4)
            self.stun_chart = chart.get("stun", [0]*4)
            self.status_chart = chart.get("status", ['']*4)                
        if("analysis_notes" in jsonAttack):
            analysis_notes = jsonAttack["analysis_notes"]
            self.cost_adjust = analysis_notes.get("fudge", 0)
            self.cost += self.cost_adjust
            self.expected_targets = analysis_notes.get("expected_targets", 1)
            self.multi_attack = analysis_notes.get("multi_attack", 1)
            if("bonus_damage" in analysis_notes):
                bonus_damage = analysis_notes.get("bonus_damage", 0)
                if(isinstance(bonus_damage, float) or isinstance(bonus_damage, int)):
                    self.bonus_damage = [bonus_damage]*11
                else:
                    self.bonus_damage = bonus_damage
            self.override_range = analysis_notes.get("range", "")       
        for keyword in jsonAttack.get("keywords", []):       
            keyword = keyword.replace('_', '')
            self.keywords.append(keyword)
            split_keywords = keyword.split(' ')
            if not split_keywords[0] in keyword_modifiers:
                print("WARNING: Keyword " + split_keywords[0] + " does not have a listed cost.")
                continue
            if len(split_keywords) > 1:
                self.keyword_bonus += keyword_modifiers.get(split_keywords[0], 0) * int(split_keywords[1])
            else:
                self.keyword_bonus += keyword_modifiers.get(split_keywords[0], 0)

        attack_ranges = jsonAttack.get("range", "Special").replace('_', '').replace('-', '').split('/')
        self.range = attack_ranges[-1]    
        if "(" in  self.range :
             self.range  =  self.range .split("(")[0].replace(' ', '')

        self.target_damage =  (self.cost * (pow(self.cost, 1/3))) / self.multi_attack * self.rangeMultiplier() - self.gambitAdjust()
        if(not self.hasRollChart()):
            self.target_damage += gambit_worth/2 # Give back half the damage of a gambit
        
        roll_map = 11 * [0]
        for i, roll in enumerate(self.roll_chart):
            if roll == 0:
                continue
            roll_range = roll.split('-')
            if(len(roll_range) == 1):
                roll_map[int(roll_range[0])-2] = i
            else:
                for j in range(int(roll_range[0]), int(roll_range[1]) + 1):
                    roll_map[j-2] = i

        for roll_index in range(10,-1,-1):
            index = roll_map[roll_index]
            damage = self.damage_chart[index]
            damage += self.stun_chart[index] * stun_scale
            damage += get_status_damage(self.status_chart[index], index)
            damage += self.bonus_damage[index]
            if(damage != 0): 
                damage += self.keyword_bonus 
            self.straight_damage += straight[roll_index]*damage
            self.advantage_damage += advantage[roll_index]*damage
            self.disadvantage_damage += disadvantage[roll_index]*damage
            self.estimated_damage_chart[roll_index] = damage
            self.full_damage[roll_index] = self.damage_chart[index]
            self.full_stun[roll_index] = self.stun_chart[index]
            self.full_status[roll_index] = self.status_chart[index].replace('_', '')

        self.damage_diff = self.straight_damage - self.target_damage
        
        expected_damage_no_fudge =  ((self.cost - self.cost_adjust) * (pow(self.cost - self.cost_adjust, 1/3))) * self.rangeMultiplier() - self.gambitAdjust()
        for num in range(1,11):
            expected_damage_higher_cost = ((self.cost + num) * (pow(self.cost+ num, 1/3))) * self.rangeMultiplier()- self.gambitAdjust()
            self.enhancement_ev[num-1] = expected_damage_higher_cost - expected_damage_no_fudge


def find_attack(parent, name):
    data = []
    target = {}
    if len(parent) == 0:        
        f = open('.\src\database\\abilities.json')
        data = json.load(f)
        for ability in data:
            if ability["name"] == name:
                target = ability
    else:
        data = get_databases()
        for ap in data:
            if ap["name"] == parent:
                for ability in ap["abilities"]:
                    if ability["name"] == name:
                        target = ability
                    
    if len(target.keys()) == 0:        
        raise Exception("Attack not found.")
    if not target["type"] == 'Attack':
        raise Exception("Ability is not an attack.")
    
    return Attack(target)

def estimate_all_damage(threshold):
    invalid_attacks = {}

    abilities = json.load(open('.\src\database\\abilities.json'))
    traits = json.load(open('.\src\database\\traits.json'))
    equipment = json.load(open('.\src\database\\items\\equipment.json'))
    weapons = json.load(open('.\src\database\\items\\weapons.json'))
    abilityPackages = json.load(open('.\src\database\\ability_packages.json'))

    for database in [abilityPackages, traits, equipment, weapons]:
        for item in database:            
            for el in item.get("abilities", []):
                if el.get("type", "") == 'Attack':
                    key = el["name"]+ " (" + item["name"] + ")"
                    if  "chart" in el:
                        diff = attack.target_damage
                        if(abs(diff) > threshold):
                            invalid_attacks[key] = diff
                    elif "analysis_notes" in el:
                        if "status" in el["analysis_notes"]:
                            diff = attack.target_damage
                            if(abs(diff) > threshold):
                                invalid_attacks[key] = diff

    for database in [abilities]:
        for el in database:
            if el.get("type", "") == 'Attack':
                if "chart" in el:
                    diff = attack.target_damage
                    if(abs(diff) > threshold):
                        invalid_attacks[el["name"]] = diff
                elif "analysis_notes" in el:
                    if "status" in el["analysis_notes"]:
                        diff = attack.target_damage
                        if(abs(diff) > threshold):
                            invalid_attacks[el["name"]] = diff


    for key in dict(sorted(invalid_attacks.items())):
        value = invalid_attacks[key]
        print(("    " + key + ": ").ljust(50 + (0 if value > 0 else -1)) + colored("{:.3f}".format(value), 'magenta' if value > threshold else 'red' if value < -threshold else 'green'))

def print_attack(attack):     
    colors = ["red", "yellow", "green", "magenta"]
    hit_string = colored("|", 'red')
    damage_string = colored("|", 'red')
    for index, item in enumerate(attack.roll_chart):            
        a, b = item.split('-') if '-' in item else [item, item ]         
        a, b = int(a), int(b)
        for num in range(a, b+1):
            hit_string += colored("   " + str(num) + "  |", colors[index])
            pad = "" if num < 10 else " "
            damage_string += colored(" " + "{:.2f}".format(attack.estimated_damage_chart[index]) + pad + " |", colors[index])
    print(hit_string)
    print(damage_string)
    print(colored("Expected Damage:        " +  "{:.3f}".format(attack.target_damage), 'blue'))
    print(colored("Straight Attack:        " +  "{:.3f}".format(attack.straight_damage), 'white'))
    print(colored("Advantage Attack:       " +  "{:.3f}".format(attack.advantage_damage), 'green'))
    print(colored("Disadvantage Attack:    " +  "{:.3f}".format(attack.disadvantage_damage), 'red'))
    print()
    print("Expected Damage Difference: " + "{:.3f}".format(attack.damage_diff) + "") 
    print()
    print("ENHANCEMENT EXPECTED VALUE") 
    for i, item in enumerate(attack.enhancement_ev):
        print("+" + str(i) +  ": {:.3f}".format(item))

class RedirectText:
    def __init__(self, text_widget):
        self.text_widget = text_widget

    def write(self, string):
        self.text_widget.insert(tk.END, string)
        self.text_widget.see(tk.END)  # Scroll to the end

    def flush(self):
        pass  # No operation needed for flush

# Should expand this to show keywords, fudge, and bonus damage
def launch_gui ():    
    root = tk.Tk()

    # root window title and dimension
    root.title("Shattered Spirits Damage Estimator")
    root.geometry('1400x800')

    attacks = []    
    # Maybe break this chunk out into its own thing
    abilities = json.load(open('.\src\database\\abilities.json'))
    traits = json.load(open('.\src\database\\traits.json'))
    equipment = json.load(open('.\src\database\\items\\equipment.json'))
    weapons = json.load(open('.\src\database\\items\\weapons.json'))
    abilityPackages = json.load(open('.\src\database\\ability_packages.json'))
    for database in [abilityPackages, traits, equipment, weapons]:
        for item in database:            
            for el in item.get("abilities", []):
                if el.get("type", "") == 'Attack':
                    attacks.append((el["name"], item["name"]))
    for el in abilities:
        if el.get("type", "") == 'Attack':
            attacks.append((el["name"], ""))
    
    listbox = tk.Listbox(
        root,
        listvariable=tk.Variable(value=sorted(attacks)),
        height=40, font=('Arial', 12)
    )
    listbox.grid(column=0, row=0, padx=10, ipadx=40, sticky="n", rowspan=100 )

    name_lbl = tk.Label(root, text="NA", font=('Arial', 24, 'bold'))
    name_lbl.grid(column=1, row=0, columnspan=6 )

    expectedHeader = tk.Label(root, text="Expected Damage", font=('Arial', 12, 'bold'))
    expectedHeader.grid(column=1, row=1, padx=10, ipadx=40 )
    straightHeader = tk.Label(root, text="Straight Damage", font=('Arial', 12, 'bold'))
    straightHeader.grid(column=1, row=2, padx=10, ipadx=40 )
    diffHeader = tk.Label(root, text="Delta", font=('Arial', 12, 'bold'))
    diffHeader.grid(column=1, row=3, padx=10, ipadx=40, pady=10 )
    advantageHeader = tk.Label(root, text="Advantage", font=('Arial', 12, 'bold'))
    advantageHeader.grid(column=1, row=4, padx=10, ipadx=40 )
    disadvantageHeader = tk.Label(root, text="Disadvantage", font=('Arial', 12, 'bold'))
    disadvantageHeader.grid(column=1, row=5, padx=10, ipadx=40 )

    enhancementHeader = tk.Label(root, text="Enhancement Targets", font=('Arial', 12, 'bold'))
    enhancementHeader.grid(column=4, row=1, padx=10, ipadx=40, columnspan=3 )
    
    rollHeader = tk.Label(root, text="Roll", font=('Arial', 14, 'bold'))
    rollHeader.grid(column=1, row=6, padx=10, ipadx=40, pady=10 )
    stunHeader = tk.Label(root, text="Stun", font=('Arial', 14, 'bold'))
    stunHeader.grid(column=2, row=6, padx=10, ipadx=40, pady=10 )
    damageHeader = tk.Label(root, text="Damage", font=('Arial', 14, 'bold'))
    damageHeader.grid(column=3, row=6, padx=10, ipadx=40, pady=10 )
    statusHeader = tk.Label(root, text="Status", font=('Arial', 14, 'bold'))
    statusHeader.grid(column=4, row=6, padx=10, ipadx=40, pady=10 )
    evHeader = tk.Label(root, text="Value", font=('Arial', 14, 'bold'))
    evHeader.grid(column=5, row=6, padx=10, ipadx=40, pady=10 )
    weightHeader = tk.Label(root, text="Normalized", font=('Arial', 14, 'bold'))
    weightHeader.grid(column=6, row=6, padx=10, ipadx=40, pady=10 )

    quickAdjustHeader = tk.Label(root, text="Quick Adjust", font=('Arial', 14, 'bold')) 
    quickAdjustHeader.grid(column=1, row=19, padx=10, ipadx=40, columnspan=6)
    damageAddedHeader = tk.Label(root, text="Damage Adjustment", font=('Arial', 14, 'bold')) 
    damageAddedHeader.grid(column=1, row=20, padx=10, ipadx=40)
    missHeader = tk.Label(root, text="Miss", font=('Arial', 14, 'bold')) 
    missHeader.grid(column=2, row=20, padx=10, ipadx=40)
    grazeHeader = tk.Label(root, text="Graze", font=('Arial', 14, 'bold')) 
    grazeHeader.grid(column=3, row=20, padx=10, ipadx=40)
    hitHeader = tk.Label(root, text="Hit", font=('Arial', 14, 'bold')) 
    hitHeader.grid(column=4, row=20, padx=10, ipadx=40)
    critHeader = tk.Label(root, text="Crit", font=('Arial', 14, 'bold')) 
    critHeader.grid(column=5, row=20, padx=10, ipadx=40)
    allHeader = tk.Label(root, text="All", font=('Arial', 14, 'bold')) 
    allHeader.grid(column=6, row=20, padx=10, ipadx=40)


    def selectAttack(event):
        selected = listbox.get(listbox.curselection())
        attack = find_attack(selected[1], selected[0])
        
        if attack.damage_diff < -0.1:
            listbox.itemconfig(listbox.curselection(), bg = "red")
        elif attack.damage_diff > 0.1:
            listbox.itemconfig(listbox.curselection(), bg = "green")
        else:                
            listbox.itemconfig(listbox.curselection(), bg = "white")

        name_lbl.configure(text=attack.name)
        expectedText = tk.Label(root, text=str(f'{attack.target_damage:.4f}'))
        expectedText.grid(column=2, row=1, padx=10, ipadx=40, pady=10 )
        straightText = tk.Label(root, text=str(f'{attack.straight_damage:.4f}'))
        straightText.grid(column=2, row=2, padx=10, ipadx=40, pady=10 )
        diffText = tk.Label(root, text=str(f'{attack.damage_diff:.4f}'), fg="green" if attack.damage_diff >= 0.1 else"red" if attack.damage_diff <= -0.1 else "black") 
        diffText.grid(column=2, row=3, padx=10, ipadx=40, pady=10 )
        advantageText = tk.Label(root, text=str(f'{attack.advantage_damage:.4f}'))
        advantageText.grid(column=2, row=4, padx=10, ipadx=40, pady=10 )
        disadvantageText = tk.Label(root, text=str(f'{attack.disadvantage_damage:.4f}'))
        disadvantageText.grid(column=2, row=5, padx=10, ipadx=40, pady=10 )
        for i in range(10):   
            enhancementText = tk.Label(root, text=str(i+1) + ": " + str(f'{attack.enhancement_ev[i]:.3f}'), width=14, height=1)
            enhancementText.grid(row=2+(i%4),column=4+int(i/4), sticky="w")       
        for i in range(11):   
            rowOffset = 7       
            rollText = tk.Label(root, text=str(i+2), width=14, height=1)
            rollText.grid(row=rowOffset+i,column=1)
            stunText = tk.Label(root, text=str(attack.full_stun[i]), width=14, height=1)
            stunText.grid(row=rowOffset+i,column=2)
            damageText = tk.Label(root, text=str(attack.full_damage[i]), width=14, height=1)
            damageText.grid(row=rowOffset+i,column=3)
            statusText = tk.Label(root, text=str(attack.full_status[i] if len(attack.full_status[i]) > 0 else '-'), width=14, height=1)
            statusText.grid(row=rowOffset+i,column=4)
            evText = tk.Label(root, text=str(f'{attack.estimated_damage_chart[i]:.4f}'), width=14, height=1)
            evText.grid(row=rowOffset+i,column=5)
            weightText = tk.Label(root, text=str(f'{attack.estimated_damage_chart[i]*straight[i]:.4f}'), width=14, height=1)
            weightText.grid(row=rowOffset+i,column=6)
        
  

        for i in range(11):   
            rowOffset = 21      
            if i == 5: continue 
            mod = (i-5)/2            
            adjusts = [0,0,0,0]
            for j in range(4):
                roll_range = attack.roll_chart[j].split('-')
                if(len(roll_range) == 1):
                    roll = int(roll_range[0])-2
                    if mod < 0 and abs(mod) > attack.estimated_damage_chart[roll]:
                         adjusts[j] += -attack.estimated_damage_chart[roll]*straight[roll] 
                    else:
                        adjusts[j] += mod*straight[roll]
                else:
                    for k in range(int(roll_range[0]), int(roll_range[1]) + 1):
                        roll = int(k)-2
                        if mod < 0 and abs(mod) > attack.estimated_damage_chart[roll]:
                             adjusts[j] += -attack.estimated_damage_chart[roll]*straight[roll] 
                        else:
                            adjusts[j] += mod*straight[roll]

            damageAddText = tk.Label(root, text=str(f'{mod:.4f}'), width=14, height=1)
            damageAddText.grid(row=rowOffset+i,column=1)
            missText = tk.Label(root, text=str(f'{adjusts[0]:.4f}'), width=14, height=1)
            missText.grid(row=rowOffset+i,column=2)
            grazeText = tk.Label(root, text=str(f'{adjusts[1]:.4f}'), width=14, height=1)
            grazeText.grid(row=rowOffset+i,column=3)
            hitText = tk.Label(root, text=str(f'{adjusts[2]:.4f}'), width=14, height=1)
            hitText.grid(row=rowOffset+i,column=4)
            critText = tk.Label(root, text=str(f'{adjusts[3]:.4f}'), width=14, height=1)
            critText.grid(row=rowOffset+i,column=5)
            allText = tk.Label(root, text=str(f'{sum(adjusts):.4f}'), width=14, height=1)
            allText.grid(row=rowOffset+i,column=6)


    listbox.bind('<<ListboxSelect>>', selectAttack)
    listbox.selection_set(0)  
    listbox.event_generate("<<ListboxSelect>>")

    
    for i, item in enumerate(listbox.get(0,tk.END)):
        temp_attack = find_attack(item[1], item[0])
        if temp_attack.damage_diff < -0.1:
            listbox.itemconfig(i, bg = "red")
        elif temp_attack.damage_diff > 0.1:
            listbox.itemconfig(i, bg = "green")
        else:                
            listbox.itemconfig(i, bg = "white")

    root.mainloop()


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("--analyze_all", help="Analyze everything of that type.", action='store_true')
    parser.add_argument("--threshold", help="How large of a gap between expected and actual damage to flag.", type=float, default=0.1)
    parser.add_argument("--parent", help="What the parent to this ability is.", type=str, default="")
    parser.add_argument("--name", help="Name of the ability.", type=str)
    parser.add_argument("--gui", action='store_true' )
    args = parser.parse_args()

    if args.analyze_all:
        estimate_all_damage(args.threshold)
    elif args.gui:
        launch_gui()
    else:        
        attack = find_attack(args.parent, args.name)
        print_attack(attack)