import Weapons from '@/database/items/weapons.json'
import Armors from '@/database/items/armor.json'
import Disciplines from '@/database/disciplines.json'
import Techniques from '@/database/techniques.json'
import Stances from '@/database/stances.json'

import Glossary from '@/database/glossary/glossary.json'
import Statuses from '@/database/glossary/statuses.json'
import Conditions from '@/database/glossary/conditions.json'
import ElementalConditions from '@/database/glossary/elemental_conditions.json'
import MentalConditions from '@/database/glossary/mental_conditions.json'
import Keywords from '@/database/glossary/keywords.json'
import Obstacles from '@/database/glossary/obstacles.json'
import Terrains from '@/database/glossary/terrain.json'
import Resources from '@/database/glossary/resources.json'

import Reactions from '@/database/reactions.json'
import Enhancements from '@/database/enhancements.json'

import NPCs from '@/database/npcs/npcs.json'

import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { Discipline, Enhancement, Technique, Stance, Armor, Weapon, Npc, Reaction } from '@/class'
import { Dictionary } from 'vue-router/types/router'

let spiritTypes: Array<string> = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood']

let skillTypes: Array<string> = ['Armor', 'Weapon', 'Martial', 'Stratagem']

let allGlossaryItems: Array<Array<IGlossaryData>> = [Glossary, Statuses, Conditions, ElementalConditions, MentalConditions, Keywords, Terrains, Resources]

@Module({
  name: 'databaseJson',
})
export class DatabaseJsonStore extends VuexModule {
  // ==========================================================
  // ENHANCEMENT TOOLS
  // ==========================================================
  get getEnhancement(): any {
    return (inword: string) => {
      var enhancement = Enhancements.find((x) => x.name.trim() == inword.trim())
      if (enhancement == undefined)
        enhancement = {
          ap: 0,
          desc: 'Missing!',
          boost: 'None',
          keywords: [],
          name: inword,
          cost: 'None',
          reqs: 'None',
          effect: 'This enhancement could not be found!',
        }
      return Enhancement.Deserialize(<IEnhancementData>enhancement)
    }
  }

  // ==========================================================
  // REACTION TOOLS
  // ==========================================================
  get getReaction(): any {
    return (inword: string) => {
      var reaction = Reactions.find((x) => x.name.trim() == inword.trim())
      if (reaction == undefined)
        reaction = {
          name: inword,
          desc: 'Missing!',
          cost: 'None',
          trigger: 'None',
          keywords: [],
          effect: 'This reaction could not be found!',
        }
      return Reaction.Deserialize(<IReactionData>reaction)
    }
  }

  // ==========================================================
  // ARMOR GETTERS
  // ==========================================================
  get getPlayerArmors(): any {
    return () => {
      return Armors.filter((x) => x.category.trim() !== 'NPC').map((x) => Armor.Deserialize(<IArmorData>x))
    }
  }

  get getArmorByCategory(): any {
    return (category: string) => {
      return Armors.filter((x) => x.category.trim() === category.trim()).map((x) => Armor.Deserialize(<IArmorData>x))
    }
  }

  get getArmor(): any {
    return (inword: string) => {
      var armor = Armors.find((x) => x.name.trim() == inword.trim())
      if (armor == undefined) {
        armor.name = inword
        armor.category = 'This armor could not be found!'
      }
      return Armor.Deserialize(<IArmorData>armor)
    }
  }

  // ==========================================================
  // WEAPON GETTERS
  // ==========================================================
  get getWeaponsByCategory(): any {
    return (category: string) => {
      return Weapons.filter((x) => x.category.trim() === category.trim() && !x.flag).map((x) => Weapon.Deserialize(<IWeaponData>x))
    }
  }

  get getWeaponsByFlag(): any {
    return (flag: string) => {
      return Weapons.filter((x) => x.flag === flag).map((x) => Weapon.Deserialize(<IWeaponData>x))
    }
  }

  get getWeaponsForCharCreation(): any {
    return () => {
      return Weapons.filter((x) => x.category.trim() !== 'Unarmed' && x.category.trim() !== 'Improvised' && x.category.trim() !== 'NPC').map((x) =>
        Weapon.Deserialize(<IWeaponData>x),
      )
    }
  }

  get getWeapon(): any {
    return (inword: string) => {
      var weapon = Weapons.find((x) => x.name.trim() === inword.trim())
      if (weapon == undefined) {
        weapon.name = inword
        weapon.special = 'This weapon could not be found!'
      }
      return Weapon.Deserialize(<IWeaponData>weapon)
    }
  }

  get getWeaponsFromList(): any {
    return (weapon_list: Array<any>) => {
      if (weapon_list == undefined) return []
      let weapons: Array<Weapon> = []
      for (var weapon of weapon_list) {
        weapons.push(this.getWeapon(weapon))
      }
      return weapons
    }
  }

  // ==========================================================
  // STANCE TOOLS
  // ==========================================================
  get getStance(): any {
    return (inword: string) => {
      var stance = Stances.find((x) => x.name.trim() === inword.trim())
      if (stance == undefined)
        stance = {
          name: inword,
          desc: 'Error',
          discipline: 'Error',
          effect: 'This stance could not be found!',
          accumulate: 'Error',
          refresh: { focus: 0, grit: 0 },
        }
      return Stance.Deserialize(<IStanceData>stance)
    }
  }

  get getStancesFromList(): any {
    return (stance_list: Array<string>) => {
      if (stance_list == undefined) return []
      let stances: Array<Stance> = []
      for (var stance of stance_list) {
        var temp = this.getStance(stance)
        if (temp != undefined) stances.push(temp)
      }
      return stances
    }
  }

  get getStancesByDiscipline(): any {
    return (discipline: string) => {
      return Stances.filter((x) => x.discipline.trim() === discipline.trim()).map((x) => Stance.Deserialize(<IStanceData>x))
    }
  }

  get getAllStyles(): any {
    return () => {
      var styles = []
      for (var category of skillTypes) {
        for (var disc of this.getDisciplinesByCategory(category)) {
          styles = styles.concat(this.getStancesFromList(disc.Stances))
        }
      }
      return styles
    }
  }

  // ==========================================================
  // TECHNIQUE TOOLS
  // ==========================================================
  get getTechnique(): any {
    return (inword: string) => {
      var technique = Techniques.find((x) => x.name.trim() === inword.trim())
      if (technique == undefined) {
        technique = {
          name: inword,
          desc: 'Error',
          discipline: 'Error',
          keywords: [],
          type: 'Error',
          speed: 'Error',
          range: 'Error',
          move: 'Error',
          cost: 'Error',
          effect: 'This technique could not be found!',
          trigger: 'Error',
          boost: 'Error',
        }
      }
      return Technique.Deserialize(<ITechData>technique)
    }
  }

  get getTechniquesFromList(): any {
    return (tech_list: Array<string>) => {
      if (tech_list == undefined) return []
      let techs: Array<Technique> = []
      for (var skill of tech_list) {
        techs.push(this.getTechnique(skill))
      }
      return techs
    }
  }

  get getTechniquesByDiscipline(): any {
    return (discipline: string) => {
      return Techniques.filter((x) => x.discipline.trim() === discipline.trim()).map((x) => Technique.Deserialize(<ITechData>x))
    }
  }

  get getAllSkillTechniques(): any {
    return () => {
      var techs = []
      for (var category of skillTypes) {
        for (var disc of this.getDisciplinesByCategory(category)) {
          techs = techs.concat(this.getTechniquesFromList(disc.Techniques))
        }
      }
      return techs
    }
  }

  // ==========================================================
  // DISCIPLINE TOOLS
  // ==========================================================
  get getDisciplinesByCategory(): any {
    return (category: string) => {
      return Disciplines.filter((x) => x.category.trim() === category.trim()).map((x) => Discipline.Deserialize(<IDisciplineData>x))
    }
  }

  get getDiscipline(): any {
    return (inword: string) => {
      var discipline = Disciplines.find((x) => x.name.trim() === inword.trim())
      return Discipline.Deserialize(<IDisciplineData>discipline)
    }
  }

  get getDisciplines(): any {
    return () => {
      return Disciplines.map((x) => Discipline.Deserialize(<IDisciplineData>x))
    }
  }

  // ==========================================================
  // BASIC GLOSSARY TOOLS
  // ==========================================================
  get glossaryHasItem(): any {
    return (source: Array<IGlossaryData>, inword: string) => {
      return source.some((x) => x.keyword === inword)
    }
  }

  get getGlossaryItemFromJson(): any {
    return (source: Array<IGlossaryData>, inword: string) => {
      var keyword = source.find((x) => x.keyword.trim() === inword.trim())
      if (keyword == undefined) return undefined
      if (keyword.hasOwnProperty('see')) return this.getGlossaryItemFromJson(source, keyword.see)
      return keyword.effect
    }
  }

  get existsInAnyGlossary(): any {
    return (inword: string) => {
      return (
        this.glossaryHasItem(Glossary, inword) ||
        this.glossaryHasItem(Statuses, inword) ||
        this.glossaryHasItem(Conditions, inword) ||
        this.glossaryHasItem(ElementalConditions, inword) ||
        this.glossaryHasItem(MentalConditions, inword) ||
        this.glossaryHasItem(Keywords, inword) ||
        this.glossaryHasItem(Terrains, inword) ||
        this.glossaryHasItem(Obstacles, inword) ||
        this.glossaryHasItem(Resources, inword)
      )
    }
  }

  // ==========================================================
  // GLOSSARY GETTERS
  // ==========================================================
  get getGlossary(): any {
    return () => {
      return Glossary
    }
  }

  get getStatuses(): any {
    return () => {
      return Statuses.filter((x) => x.see === undefined)
    }
  }

  get getConditions(): any {
    return () => {
      return Conditions
    }
  }

  get getElementalConditions(): any {
    return () => {
      return ElementalConditions
    }
  }

  get getMentalConditions(): any {
    return () => {
      return MentalConditions
    }
  }

  get getKeywords(): any {
    return () => {
      return Keywords
    }
  }

  get getTerrains(): any {
    return () => {
      return Terrains
    }
  }

  get getObstacles(): any {
    return () => {
      return Obstacles
    }
  }

  get getResources(): any {
    return () => {
      return Resources
    }
  }

  get getGlossaryItem(): any {
    return (inword: string) => {
      var effect
      for (var json of allGlossaryItems) {
        effect = this.getGlossaryItemFromJson(json, inword)
        if (effect != undefined) return effect
      }
    }
  }

  // ==========================================================
  // NPC GETTERS
  // ==========================================================
  get getSpiritBeasts(): any {
    return () => {
      return NPCs.filter((x) => x.npc_type.trim() === 'Spirit Beast').map((x) => Npc.Deserialize(<INpcData>x))
    }
  }
}
