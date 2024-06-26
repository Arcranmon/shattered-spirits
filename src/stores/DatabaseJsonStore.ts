import Weapons from '@/database/items/weapons.json'
import Armors from '@/database/items/armor.json'
import Accessories from '@/database/items/accessories.json'
import Disciplines from '@/database/disciplines.json'
import Arts from '@/database/arts.json'
import Techniques from '@/database/techniques.json'
import Stances from '@/database/stances.json'

import Glossary from '@/database/glossary/glossary.json'
import Traits from '@/database/traits.json'
import Statuses from '@/database/glossary/statuses.json'
import Keywords from '@/database/glossary/keywords.json'
import Resources from '@/database/glossary/resources.json'

import Obstacles from '@/database/obstacles.json'
import Terrains from '@/database/terrain.json'

import Attacks from '@/database/attacks.json'

import Subtypes from '@/database/subtypes.json'
import SpiritForms from '@/database/spirit_forms.json'

import Movements from '@/database/movement.json'
import Maneuvers from '@/database/maneuvers.json'

import NPCs from '@/database/npcs/npcs.json'

import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import {
  Armor,
  Attack,
  Discipline,
  Accessory,
  Maneuver,
  Movement,
  Npc,
  Obstacle,
  SpiritForm,
  Subtype,
  Stance,
  Status,
  Technique,
  Terrain,
  Weapon,
} from '@/class'
import { Dictionary } from 'vue-router/types/router'

let spiritTypes: Array<string> = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood']

let skillTypes: Array<string> = ['Armor', 'Weapon', 'Martial Form', 'Stratagem']

let allGlossaryItems: Array<Array<IGlossaryData>> = [Glossary, Keywords, Traits, Resources]

@Module({
  name: 'databaseJson',
})
export class DatabaseJsonStore extends VuexModule {
  // ==========================================================
  // MANEUVER TOOLS
  // ==========================================================
  get getManeuver(): any {
    return (inword: string) => {
      var maneuver = Maneuvers.find((x) => x.name.trim() == inword.trim())
      if (maneuver == undefined) return new Maneuver(inword)
      return Maneuver.Deserialize(<IManeuverData>maneuver)
    }
  }

  get getManeuversFromList(): any {
    return (maneuver_list: Array<any>) => {
      if (maneuver_list == undefined) return []
      let maneuvers: Array<Maneuver> = []
      for (var maneuver of maneuver_list) {
        maneuvers.push(this.getManeuver(maneuver))
      }
      return maneuvers
    }
  }

  get isManeuver(): any {
    return (inword: string) => {
      return Maneuvers.some((x) => x.name == inword.trim())
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
      if (armor == undefined) return new Armor(inword)
      return Armor.Deserialize(<IArmorData>armor)
    }
  }

  get getFilteredArmors(): any {
    return (categories: Array<string>) => {
      return Armors.filter((x) => categories.includes(x.category.trim())).map((x) => Armor.Deserialize(<IArmorData>x))
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
      return Weapons.filter((x) => x.category.trim() === category.trim()).map((x) => Weapon.Deserialize(<IWeaponData>(<unknown>x)))
    }
  }

  get getWeaponByKeywordAndCategory(): any {
    return (keyword: string, category: string) => {
      return Weapons.filter((x) => x.category.trim() === category.trim() && x.keywords.includes(keyword)).map((x) =>
        Weapon.Deserialize(<IWeaponData>(<unknown>x)),
      )
    }
  }

  get getWeaponsForCharCreation(): any {
    return () => {
      return Weapons.filter((x) => x.category.trim() !== 'Natural' && x.category.trim() !== 'Improvised').map((x) =>
        Weapon.Deserialize(<IWeaponData>(<unknown>x)),
      )
    }
  }

  get getWeapon(): any {
    return (inword: string) => {
      var weapon = Weapons.find((x) => x.name.trim() === inword.trim())
      if (weapon == undefined) {
        return new Weapon(name)
      }
      return Weapon.Deserialize(<IWeaponData>(<unknown>weapon))
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

  get getFilteredWeapons(): any {
    return (categories: Array<string>, speed: any, type: string) => {
      return Weapons.filter(
        (x) =>
          (categories.includes(x.category.trim()) ||
            (categories.includes('Throwing') && x.hasOwnProperty('keywords') && x.keywords.some((y) => y.includes('Thrown')))) &&
          (speed == 'Any' || speed == x.speed) &&
          (type == 'Any' || x.type == type),
      ).map((x) => Weapon.Deserialize(<IWeaponData>(<unknown>x)))
    }
  }

  // ==========================================================
  // ATTACK TOOLS
  // ==========================================================
  get getAttacksFromList(): any {
    return (attack_list: Array<any>) => {
      if (attack_list == undefined) return []
      let attacks: Array<Attack> = []
      for (var attack of attack_list) {
        attacks.push(this.getAttack(attack))
      }
      return attacks
    }
  }

  get getAttack(): any {
    return (inword: string) => {
      var attack = Attacks.find((x) => x.name.trim() === inword.trim())
      if (attack == undefined) {
        return new Attack(inword)
      }
      return Attack.Deserialize(<IAttackData>attack)
    }
  }

  get isAttack(): any {
    return (inword: string) => {
      return Attacks.some((x) => x.name == inword.trim())
    }
  }

  // ==========================================================
  // STANCE TOOLS
  // ==========================================================
  get getStance(): any {
    return (inword: string) => {
      var stance = Stances.find((x) => x.name.trim() === inword.trim())
      if (stance == undefined) return new Stance(inword)
      return Stance.Deserialize(<IStanceData>(<unknown>stance))
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

  get getAllMartialStances(): any {
    return () => {
      var stances = []
      for (var category of skillTypes) {
        for (var disc of this.getDisciplinesByCategory(category)) {
          stances = stances.concat(this.getStancesFromList(disc.Stances))
        }
      }
      return stances
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
        return new Technique(inword)
      }
      return Technique.Deserialize(<ITechData>(<unknown>technique))
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
  // MOVEMENT TOOLS
  // ==========================================================
  get getMovement(): any {
    return (inword: string) => {
      var move = Movements.find((x) => x.name.trim() === inword.trim())
      return Movement.Deserialize(<IMovementData>move)
    }
  }

  get getMovementsFromList(): any {
    return (move_list: Array<string>) => {
      if (move_list == undefined) return []
      let moves: Array<Movement> = []
      for (var move of move_list) {
        var temp = this.getMovement(move)
        if (temp != undefined) moves.push(temp)
      }
      return moves
    }
  }

  // ==========================================================
  // DISCIPLINE TOOLS
  // ==========================================================
  get getDisciplinesByCategory(): any {
    return (category: string) => {
      return Disciplines.filter((x) => x.category.trim() === category.trim()).map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x)))
    }
  }

  get getDisciplinesByType(): any {
    return (type: string) => {
      return Disciplines.filter((x) => x.type.trim() === type.trim()).map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x)))
    }
  }

  get getDiscipline(): any {
    return (inword: string) => {
      var discipline = Disciplines.find((x) => x.name.trim() === inword.trim())
      return Discipline.Deserialize(<IDisciplineData>(<unknown>discipline))
    }
  }

  get getFilteredDisciplines(): any {
    return (categories: Array<string>, types: Array<string>, primary_role: string, secondary_role: string) => {
      return Disciplines.filter(
        (x) =>
          categories.includes(x.category.trim()) &&
          types.includes(x.type.trim()) &&
          (primary_role === 'Any' || primary_role == x.primary_role.trim()) &&
          (secondary_role === 'Any' || secondary_role == x.primary_role.trim()),
      ).map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x)))
    }
  }

  get getCharCreationDisciplines(): any {
    return (categories_and_types: Array<string>) => {
      return Disciplines.filter((x) => categories_and_types.includes(x.category.trim()) || categories_and_types.includes(x.type.trim())).map((x) =>
        Discipline.Deserialize(<IDisciplineData>(<unknown>x)),
      )
    }
  }

  get getDisciplines(): any {
    return () => {
      return Disciplines.map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x)))
    }
  }

  get getArt(): any {
    return (inword: string) => {
      var discipline = Arts.find((x) => x.name.trim() === inword.trim())
      return Discipline.Deserialize(<IDisciplineData>(<unknown>discipline))
    }
  }

  get getArts(): any {
    return () => {
      return Arts.map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x)))
    }
  }

  get getFilteredArts(): any {
    return (types: Array<string>) => {
      return Arts.filter((x) => types.includes(x.type.trim())).map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x)))
    }
  }
  // ==========================================================
  // OBSTACLE TOOLS
  // ==========================================================
  get getAccessories(): any {
    return () => {
      return Accessories.map((x) => Accessory.Deserialize(<IAccessoryData>(<unknown>x)))
    }
  }

  get getAccessory(): any {
    return (inword: string) => {
      var accessory = Accessories.find((x) => x.name.trim() === inword.trim())
      if (accessory == undefined) {
        return new Accessory(inword)
      }
      return Accessory.Deserialize(<IAccessoryData>(<unknown>accessory))
    }
  }

  get getAccessoryFromList(): any {
    return (accessory_list: Array<any>) => {
      if (accessory_list == undefined) return []
      let Accessories: Array<Accessory> = []
      for (var accessory of accessory_list) {
        Accessories.push(this.getAccessory(accessory))
      }
      return Accessories
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
  get isStatus(): any {
    return (inword: string) => {
      return Statuses.some((x) => x.name == inword.trim())
    }
  }

  get getStatus(): any {
    return (inword: string) => {
      var status = Statuses.find((x) => x.name.trim() === inword.trim())
      if (status.hasOwnProperty('see')) return this.getStatus(status.see)
      return Status.Deserialize(<IStatusData>status)
    }
  }

  get getStatuses(): any {
    return () => {
      return Statuses.map((x) => Status.Deserialize(<IStatusData>x))
    }
  }

  get getFullStatuses(): any {
    return () => {
      return Statuses.filter((x) => !x.hasOwnProperty('see')).map((x) => Status.Deserialize(<IStatusData>x))
    }
  }

  get getStatusesByType(): any {
    return (type: string) => {
      return Statuses.filter((x) => x.type.trim() === type.trim()).map((x) => Status.Deserialize(<IStatusData>x))
    }
  }

  get getFilteredStatuses(): any {
    return (types: Array<string>) => {
      return Statuses.filter((x) => !x.hasOwnProperty('see') && types.includes(x.type.trim())).map((x) => Status.Deserialize(<IStatusData>x))
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
        this.glossaryHasItem(Keywords, inword) ||
        this.glossaryHasItem(Traits, inword) ||
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
  get getNpcs(): any {
    return () => {
      return NPCs.map((x) => Npc.CreateFromBaseData(<INpcData>x))
    }
  }

  get getNpc(): any {
    return (inword: string) => {
      var npc = NPCs.find((x) => x.name.trim() === inword.trim())
      return Npc.CreateFromBaseData(<INpcData>npc)
    }
  }

  // ==========================================================
  // SPIRIT TYPE GETTERS
  // ==========================================================
  get getSubtype(): any {
    return (inword: string) => {
      var type = Subtypes.find((x) => x.name.trim() === inword.trim())
      return Subtype.Deserialize(<ISubtypeData>type)
    }
  }

  get getSpiritTypesByElement(): any {
    return (inword: string) => {
      return Subtypes.filter((x) => x.element.trim() === inword.trim()).map((x) => Subtype.Deserialize(<ISubtypeData>x))
    }
  }

  // ==========================================================
  // SPIRIT FORM GETTERS
  // ==========================================================
  get getSpiritForm(): any {
    return (inword: string) => {
      var form = SpiritForms.find((x) => x.name.trim() === inword.trim())
      return SpiritForm.Deserialize(<ISpiritFormData>form)
    }
  }

  get getTrait(): any {
    return (inword: string) => {
      var trait = Traits.find((x) => x.name == inword)
      if (trait) return trait.effect
      return 'Trait not found!'
    }
  }
}
