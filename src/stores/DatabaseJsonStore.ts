import Weapons from '@/database/items/weapons.json'
import Armors from '@/database/items/armor.json'
import Disciplines from '@/database/disciplines.json'
import Techniques from '@/database/techniques.json'
import Stances from '@/database/stances.json'

import Glossary from '@/database/glossary/glossary.json'
import InstantEffects from '@/database/glossary/instant_effects.json'
import Statuses from '@/database/glossary/statuses.json'
import Afflictions from '@/database/glossary/afflictions.json'
import Keywords from '@/database/glossary/keywords.json'
import Resources from '@/database/glossary/resources.json'

import Obstacles from '@/database/obstacles.json'
import Terrains from '@/database/terrain.json'

import Reactions from '@/database/reactions.json'
import Enhancements from '@/database/enhancements.json'

import NPCs from '@/database/npcs/npcs.json'

import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { Affliction, Armor, Discipline, Enhancement, Npc, Obstacle, Reaction, Stance, Status, Technique, Terrain, Weapon } from '@/class'
import { Dictionary } from 'vue-router/types/router'

let spiritTypes: Array<string> = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood']

let skillTypes: Array<string> = ['Armor', 'Weapon', 'Martial Form', 'Stratagem']

let allGlossaryItems: Array<Array<IGlossaryData>> = [Glossary, InstantEffects, Keywords, Resources]

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

  get getEnhancementsFromList(): any {
    return (enhancement_list: Array<any>) => {
      if (enhancement_list == undefined) return []
      let enhancements: Array<Enhancement> = []
      for (var enhancement of enhancement_list) {
        enhancements.push(this.getEnhancement(enhancement))
      }
      return enhancements
    }
  }

  get isEnhancement(): any {
    return (inword: string) => {
      return Enhancements.some((x) => x.name == inword.trim())
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

  get getReactionsFromList(): any {
    return (reaction_list: Array<any>) => {
      if (reaction_list == undefined) return []
      let reactions: Array<Reaction> = []
      for (var reaction of reaction_list) {
        reactions.push(this.getReaction(reaction))
      }
      return reactions
    }
  }

  get isReaction(): any {
    return (inword: string) => {
      return Reactions.some((x) => x.name == inword.trim())
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

  get isArmor(): any {
    return (inword: string) => {
      return Armors.some((x) => x.name == inword.trim())
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
      return Weapons.filter((x) => x.category.trim() !== 'Unarmed' && x.category.trim() !== 'Improvised' && !x.flag).map((x) =>
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

  get isWeapon(): any {
    return (inword: string) => {
      return Weapons.some((x) => x.name == inword.trim())
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

  get isStance(): any {
    return (inword: string) => {
      return Stances.some((x) => x.name == inword.trim())
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

  get isTechnique(): any {
    return (inword: string) => {
      return Techniques.some((x) => x.name == inword.trim())
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
  // OBSTACLE TOOLS
  // ==========================================================
  get isObstacle(): any {
    return (inword: string) => {
      return Obstacles.some((x) => x.name == inword.trim())
    }
  }

  get getObstacle(): any {
    return (inword: string) => {
      var obstacle = Obstacles.find((x) => x.name.trim() === inword.trim())
      return Obstacle.Deserialize(<IObstacleData>obstacle)
    }
  }

  get getObstacles(): any {
    return () => {
      return Obstacles.map((x) => Obstacle.Deserialize(<IObstacleData>x))
    }
  }

  // ==========================================================
  // TERRAIN TOOLS
  // ==========================================================
  get isTerrain(): any {
    return (inword: string) => {
      return Terrains.some((x) => x.name == inword.trim())
    }
  }

  get getTerrain(): any {
    return (inword: string) => {
      var obstacle = Terrains.find((x) => x.name.trim() === inword.trim())
      return Terrain.Deserialize(<ITerrainData>obstacle)
    }
  }

  get getTerrains(): any {
    return () => {
      return Terrains.map((x) => Terrain.Deserialize(<ITerrainData>x))
    }
  }

  // ==========================================================
  // AFFLICTION TOOLS
  // ==========================================================
  get isAffliction(): any {
    return (inword: string) => {
      return Afflictions.some((x) => x.name == inword.trim())
    }
  }

  get getAffliction(): any {
    return (inword: string) => {
      var obstacle = Afflictions.find((x) => x.name.trim() === inword.trim())
      return Affliction.Deserialize(<IAfflictionData>obstacle)
    }
  }

  get getAfflictions(): any {
    return () => {
      return Afflictions.map((x) => Affliction.Deserialize(<IAfflictionData>x))
    }
  }

  get getAfflictionsByType(): any {
    return (type: string) => {
      return Afflictions.filter((x) => x.type.trim() === type.trim()).map((x) => Affliction.Deserialize(<IAfflictionData>x))
    }
  }

  // ==========================================================
  // STATUS TOOLS
  // ==========================================================
  get isStatus(): any {
    return (inword: string) => {
      return Statuses.some((x) => x.name == inword.trim())
    }
  }

  get getStatus(): any {
    return (inword: string) => {
      var obstacle = Statuses.find((x) => x.name.trim() === inword.trim())
      if (obstacle.hasOwnProperty('see')) obstacle = Statuses.find((x) => x.name.trim() === obstacle.see.trim())
      return Status.Deserialize(<IStatusData>obstacle)
    }
  }

  get getStatuses(): any {
    return () => {
      return Statuses.filter((x) => !x.hasOwnProperty('see')).map((x) => Status.Deserialize(<IStatusData>x))
    }
  }

  // ==========================================================
  // BASIC GLOSSARY TOOLS
  // ==========================================================
  get glossaryHasItem(): any {
    return (source: Array<IGlossaryData>, inword: string) => {
      return source.some((x) => x.name === inword)
    }
  }

  get getGlossaryItemFromJson(): any {
    return (source: Array<IGlossaryData>, inword: string) => {
      var name = source.find((x) => x.name.trim() === inword.trim())
      if (name == undefined) return undefined
      if (name.hasOwnProperty('see')) return this.getGlossaryItemFromJson(source, name.see)
      return name.effect
    }
  }

  get existsInAnyGlossary(): any {
    return (inword: string) => {
      return (
        this.glossaryHasItem(Glossary, inword) ||
        this.glossaryHasItem(InstantEffects, inword) ||
        this.glossaryHasItem(Keywords, inword) ||
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

  get getKeywords(): any {
    return () => {
      return Keywords
    }
  }

  get getInstantEffects(): any {
    return () => {
      return InstantEffects
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
