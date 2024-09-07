import WeaponsJson from '@/database/items/weapons.json'
import ArmorsJson from '@/database/items/armor.json'
import Accessories from '@/database/items/accessories.json'
import DisciplinesJson from '@/database/disciplines.json'
import TechniquesJson from '@/database/techniques.json'
import Stances from '@/database/stances.json'
import Talents from '@/database/talents.json'

import DamageTypes from '@/database/glossary/damage_types.json'
import Glossary from '@/database/glossary/glossary.json'
import Traits from '@/database/traits.json'
import Statuses from '@/database/glossary/statuses.json'
import Keywords from '@/database/glossary/keywords.json'
import Resources from '@/database/glossary/resources.json'

import Obstacles from '@/database/obstacles.json'
import Terrains from '@/database/terrain.json'

import Attacks from '@/database/attacks.json'

import SubtypeJson from '@/database/subtypes.json'
import SpiritForms from '@/database/spirit_forms.json'

import MovementJson from '@/database/movement.json'
import ManeuversJson from '@/database/maneuvers.json'

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
  Talent,
  Technique,
  Terrain,
  Weapon,
} from '@/class'
import { Dictionary } from 'vue-router/types/router'

let spiritTypes: Array<string> = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood']

let skillTypes: Array<string> = ['Armor', 'Weapon', 'Martial Form', 'Stratagem']

let AllGlossaryItems: Array<Array<IGlossaryData>> = [DamageTypes, Glossary, Keywords, Traits, Resources]

@Module({
  name: 'databaseJson',
})
export class DatabaseJsonStore extends VuexModule {
  @Action({ rawError: true })
  public async loadDatabase() {
    this.LoadDatabase()
  }

  @Mutation
  private LoadDatabase(): void {
    this.Armors = ArmorsJson.map((x) => Armor.Deserialize(<IArmorData>(<unknown>x)))
    this.Maneuvers = ManeuversJson.map((x) => Maneuver.Deserialize(<IManeuverData>(<unknown>x)))
    this.Disciplines = DisciplinesJson.map((x) => Discipline.Deserialize(<IDisciplineData>(<unknown>x))).sort((a, b) => a.Name.localeCompare(b.Name))
    this.Weapons = WeaponsJson.map((x) => Weapon.Deserialize(<IWeaponData>(<unknown>x)))
    this.Techniques = TechniquesJson.map((x) => Technique.Deserialize(<ITechData>(<unknown>x)))
    this.Subtypes = SubtypeJson.map((x) => Subtype.Deserialize(<ISubtypeData>(<unknown>x)))
    this.Movements = MovementJson.map((x) => Movement.Deserialize(<IMovementData>(<unknown>x)))
  }

  private Maneuvers: Maneuver[] = []
  private Armors: Armor[] = []
  private Weapons: Weapon[] = []
  private Masteries: Discipline[] = []
  private Disciplines: Discipline[] = []
  private Techniques: Technique[] = []
  private Subtypes: Subtype[] = []
  private Movements: Movement[] = []

  // ==========================================================
  // MANEUVER TOOLS
  // ==========================================================
  get getManeuver(): any {
    return (inword: string) => {
      var maneuver = this.Maneuvers.find((x) => x.Name.trim() == inword.trim())
      if (maneuver == undefined) return new Maneuver(inword)
      return maneuver
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
      return this.Maneuvers.some((x) => x.Name == inword.trim())
    }
  }

  // ==========================================================
  // ARMOR GETTERS
  // ==========================================================
  get getPlayerArmors(): any {
    return () => {
      return this.Armors.filter((x) => x.Category.trim() !== 'NPC').map((x) => x)
    }
  }

  get getArmorByCategory(): any {
    return (category: string) => {
      return this.Armors.filter((x) => x.Category.trim() === category.trim()).map((x) => x)
    }
  }

  get getArmor(): any {
    return (inword: string) => {
      var armor = this.Armors.find((x) => x.Name.trim() == inword.trim())
      if (armor == undefined) return new Armor(inword)
      return armor
    }
  }

  get getFilteredArmors(): any {
    return (categories: Array<string>) => {
      return this.Armors.filter((x) => categories.includes(x.Category.trim())).map((x) => x)
    }
  }

  get isArmor(): any {
    return (inword: string) => {
      return this.Armors.some((x) => x.Name == inword.trim())
    }
  }

  // ==========================================================
  // WEAPON GETTERS
  // ==========================================================
  get getWeaponsByCategory(): any {
    return (category: string) => {
      return this.Weapons.filter((x) => x.Category.trim() === category.trim()).map((x) => x)
    }
  }

  get getWeaponByKeywordAndCategory(): any {
    return (keyword: string, category: string) => {
      return this.Weapons.filter((x) => x.Category.trim() === category.trim() && x.Keywords.includes(keyword))
    }
  }

  get getWeaponsForCharCreation(): any {
    return () => {
      return this.Weapons.filter((x) => x.Category.trim() !== 'Natural' && x.Category.trim() !== 'Improvised')
    }
  }

  get getWeapon(): any {
    return (inword: string) => {
      var weapon = this.Weapons.find((x) => x.Name.trim() === inword.trim())
      if (weapon == undefined) {
        return new Weapon(name)
      }
      return weapon
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
      return this.Weapons.some((x) => x.Name == inword.trim())
    }
  }

  get getFilteredWeapons(): any {
    return (categories: Array<string>, speed: any, type: string) => {
      return this.Weapons.filter(
        (x) =>
          (categories.includes(x.Category.trim()) ||
            (categories.includes('Throwing') && x.hasOwnProperty('keywords') && x.Keywords.some((y) => y.includes('Thrown')))) &&
          (speed == 'Any' || speed == x.Speed) &&
          (type == 'Any' || x.Type == type) &&
          typeof x.Range == 'string',
      )
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
      var technique = this.Techniques.find((x) => x.Name.trim() === inword.trim())
      if (technique == undefined) {
        return new Technique(inword)
      }
      return technique
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
      return this.Techniques.some((x) => x.Name.trim() == inword.trim())
    }
  }

  // ==========================================================
  // MOVEMENT TOOLS
  // ==========================================================
  get getMovement(): any {
    return (inword: string) => {
      return this.Movements.find((x) => x.Name === inword.trim())
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
      return this.Disciplines.filter((x) => x.Category.trim() === category.trim()).map((x) => x)
    }
  }

  get getDisciplinesByType(): any {
    return (type: string) => {
      return this.Disciplines.filter((x) => x.Type.trim() === type.trim()).map((x) => x)
    }
  }

  get getDiscipline(): any {
    return (inword: string) => {
      var discipline = this.Disciplines.find((x) => x.Name.trim() === inword.trim())
      return discipline
    }
  }

  get getFilteredMartialDisciplines(): any {
    return (categories: Array<string>, types: Array<string>, primary_role: string, secondary_role: string) => {
      return this.Disciplines.filter(
        (x) =>
          x.Category != 'Flame' &&
          x.Category != 'Earth' &&
          x.Category != 'Water' &&
          x.Category != 'Wind' &&
          (categories.length == 0 || categories.includes(x.Category.trim())) &&
          (types.length == 0 || types.includes(x.Type.trim())) &&
          (primary_role === 'Any' || primary_role == x.PrimaryRole.trim()) &&
          (secondary_role === 'Any' || secondary_role == x.SecondaryRole.trim()),
      )
    }
  }

  get getFilteredSpiritDisciplines(): any {
    return (categories: Array<string>, types: Array<string>, primary_role: string, secondary_role: string) => {
      return this.Disciplines.filter(
        (x) =>
          (x.Category == 'Flame' || x.Category == 'Earth' || x.Category == 'Water' || x.Category == 'Wind') &&
          (categories.length == 0 || categories.includes(x.Category.trim())) &&
          (types.length == 0 || types.includes(x.Type.trim())) &&
          (primary_role === 'Any' || primary_role == x.PrimaryRole.trim()) &&
          (secondary_role === 'Any' || secondary_role == x.SecondaryRole.trim()),
      )
    }
  }

  get getCharCreationDisciplines(): any {
    return (categories_and_types: Array<string>) => {
      return this.Disciplines.filter((x) => categories_and_types.includes(x.Category.trim()) || categories_and_types.includes(x.Type.trim()))
    }
  }

  get getDisciplines(): any {
    return () => {
      return this.Disciplines
    }
  }

  get getMastery(): any {
    return (inword: string) => {
      var discipline = this.Masteries.find((x) => x.Name.trim() === inword.trim())
      return discipline
    }
  }

  get getMasteries(): any {
    return () => {
      return this.Masteries
    }
  }

  get getFilteredMasteries(): any {
    return (categories: Array<string>, types: Array<string>, primary_role: string, secondary_role: string) => {
      return this.Masteries.filter(
        (x) =>
          (categories.length == 0 || categories.includes(x.Category.trim())) &&
          (types.length == 0 || types.includes(x.Type.trim())) &&
          (primary_role === 'Any' || primary_role == x.PrimaryRole.trim()) &&
          (secondary_role === 'Any' || secondary_role == x.SecondaryRole.trim()),
      )
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
  // TALENT GETTERS
  // ==========================================================
  get getTalents(): any {
    return () => {
      return Talents.map((x) => Talent.Deserialize(<ITalentData>x))
    }
  }

  get getTalent(): any {
    return (inword: string) => {
      var talent = Talents.find((x) => x.name.trim() === inword.trim())
      return Talent.Deserialize(<ITalentData>talent)
    }
  }

  get isTalent(): any {
    return (inword: string) => {
      return Talents.some((x) => x.name == inword.trim())
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
      for (var glossary of AllGlossaryItems) if (this.glossaryHasItem(glossary, inword)) return true
      return false
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
      for (var json of AllGlossaryItems) {
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
      var type = this.Subtypes.find((x) => x.Name === inword.trim())
      return type
    }
  }

  get getSpiritTypesByElement(): any {
    return (inword: string) => {
      return this.Subtypes.filter((x) => x.Element === inword.trim())
    }
  }

  // ==========================================================
  // SPIRIT FORM GETTERS
  // ==========================================================
  get getSpiritForm(): any {
    return (inword: string) => {
      var form = SpiritForms.find((x) => x.name.trim() === inword.trim())
      return SpiritForm.Deserialize(<ISpiritFormData>(<unknown>form))
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
