import WeaponsJson from '@/database/items/weapons.json'
import ArmorsJson from '@/database/items/armor.json'
import EquipmentJson from '@/database/items/equipment.json'
import StancesJson from '@/database/stances.json'
import TraitsJson from '@/database/traits.json'

import AbilityPackageJson from '@/database/ability_packages.json'
import AbilitiesJson from '@/database/abilities.json'

import Glossary from '@/database/glossary/glossary.json'
import StatusJson from '@/database/glossary/statuses.json'

import TerrainJson from '@/database/terrain.json'

import SpiritTypeJson from '@/database/spirit_types.json'

import NPCs from '@/database/npcs/npcs.json'

import { Module, VuexModule, Action, Mutation } from 'vuex-module-decorators'
import { AbilityPackage, Armor, Equipment, GlossaryItem, Npc, SpiritForm, Subtype, Stance, Status, Terrain, Trait, Weapon, Ability } from '@/class'
import { Dictionary } from 'vue-router/types/router'

let spiritTypes: Array<string> = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood']

let skillTypes: Array<string> = ['Armor', 'Weapon', 'Martial Form', 'Stratagem']

let AllGlossaryItems: Array<Array<IGlossaryData>> = [Glossary]

const kPlayerAbilities = [
  'Gain Advantage',
  'Accelerate',
  'Adrenaline Rush',
  'Spiritcraft',
  'Manipulate',
  'Size Up',
  'Encourage',
  'Swift Recall',
  'Unbalance',
  'Press Advantage',
  'Spiritbound',
  'Drop',
  'Equip',
  'Flurry',
  'Staggering Impact',
  'Perfect Parry',
  'Perfect Dodge',
  'Counter',
  'Delay',
  'Flank',
  'Concentrate',
]

const kSpiritAbilities = [
  'Return',
  'Channel Elements',
  'Perfect Parry',
  'Perfect Dodge',
  'Gain Advantage',
  'Accelerate',
  'Spiritcraft',
  'Drop',
  'Equip',
  'Spiritbound',
  'Flank',
  'Delay',
]

const kBasicAbilities = ['Brawl', 'Improvised Attack', 'Deflect', 'Breather', 'Disengage', 'Opportunity Attack', 'Lethal Strike', 'Evade', 'Interact']

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
    this.GlossaryItems = Glossary.map((x) => GlossaryItem.Deserialize(<IGlossaryData>(<unknown>x)))
    this.Abilities = AbilitiesJson.map((x) => Ability.Deserialize(<IAbilityData>(<unknown>x)))
    this.Armors = ArmorsJson.map((x) => Armor.Deserialize(<IArmorData>(<unknown>x)))
    this.Weapons = WeaponsJson.map((x) => Weapon.Deserialize(<IWeaponData>(<unknown>x)))
    this.Subtypes = SpiritTypeJson.map((x) => Subtype.Deserialize(<ISubtypeData>(<unknown>x)))
    this.AbilityPackages = AbilityPackageJson.map((x) => AbilityPackage.Deserialize(<IAbilityPackageData>(<unknown>x)))
    this.Equipments = EquipmentJson.map((x) => Equipment.Deserialize(<IEquipmentData>(<unknown>x)))
    this.Traits = TraitsJson.map((x) => Trait.Deserialize(<ITraitData>(<unknown>x)))
    this.Stances = StancesJson.map((x) => Stance.Deserialize(<IStanceData>(<unknown>x)))
    this.Terrains = TerrainJson.map((x) => Terrain.Deserialize(<ITerrainData>(<unknown>x)))
    this.Statuses = StatusJson.map((x) => Status.Deserialize(<IStatusData>(<unknown>x)))
    this.Everything = this.Everything.concat(
      this.GlossaryItems,
      this.Armors,
      this.Abilities,
      this.Weapons,
      this.Equipments,
      this.AbilityPackages,
      this.Stances,
      this.Traits,
      this.Terrains,
      this.Statuses,
    )

    this.Everything.sort((a, b) => a.Name.localeCompare(b.Name))
  }

  private Everything: Array<any> = []
  private GlossaryItems: GlossaryItem[] = []
  private Armors: Armor[] = []
  private Weapons: Weapon[] = []
  private Subtypes: Subtype[] = []
  private SpiritForms: SpiritForm[] = []
  private Stances: Stance[] = []
  private AbilityPackages: AbilityPackage[] = []
  private Equipments: Equipment[] = []
  private Traits: Trait[] = []
  private Abilities: Ability[] = []
  private Terrains: Terrain[] = []
  private Statuses: Status[] = []

  get basicStances() {
    return ['Open Stance', 'Focused Stance', 'Guarded Stance', 'Hostile Stance', 'Rallying Stance', 'Agile Stance']
  }

  get basicSpiritStances() {
    return ['Skirmisher Spirit', 'Directed Spirit', 'Sprinting Spirit', 'Surviving Spirit', 'Questing Spirit', 'Spiritual Essence']
  }

  get playerArts() {
    return []
  }

  get basicAbilities() {
    return kBasicAbilities
  }

  get playerAbilities() {
    return kPlayerAbilities
  }

  get spiritAbilities() {
    return kSpiritAbilities
  }

  // ==========================================================
  // FULL SEARCH TOOLS
  // ==========================================================
  get getEverything(): any {
    return () => {
      return this.Everything
    }
  }

  get getFromEverything(): any {
    return (inword: string) => {
      var item = this.Everything.find((x) => x.Name.trim() == inword.trim())
      if (item == undefined) return false
      return item
    }
  }

  get getFromEverythingFromList(): any {
    return (ability_list: Array<any>) => {
      if (ability_list == undefined) return []
      let abilities: Array<Ability> = []
      for (var ability of ability_list) {
        abilities.push(this.getFromEverything(ability))
      }
      return abilities
    }
  }

  // ==========================================================
  // BASIC ABILITY TOOLS
  // ==========================================================
  get getAbilities(): any {
    return () => {
      return this.Abilities
    }
  }

  get getAbility(): any {
    return (inword: string) => {
      var ability = this.Abilities.find((x) => x.Name.trim() == inword.trim())
      if (ability == undefined) return new Ability(inword)
      return ability
    }
  }

  get getAbilitiesFromList(): any {
    return (ability_list: Array<any>) => {
      if (ability_list == undefined) return []
      let abilities: Array<Ability> = []
      for (var ability of ability_list) {
        abilities.push(this.getAbility(ability))
      }
      return abilities
    }
  }

  get isBasicAbility(): any {
    return (inword: string) => {
      return this.Abilities.some((x) => x.Name == inword.trim())
    }
  }

  // ==========================================================
  // ABILITY PACKAGE TOOLS
  // ==========================================================
  get getAP(): any {
    return (inword: string) => {
      var art = this.AbilityPackages.find((x) => x.Name.trim() == inword.trim())
      if (art == undefined) return new AbilityPackage(inword)
      return art
    }
  }

  get getAPsFromList(): any {
    return (ap_list: Array<any>) => {
      if (ap_list == undefined) return []
      let aps: Array<AbilityPackage> = []
      for (var ap of ap_list) {
        aps.push(this.getAP(ap))
      }
      return aps
    }
  }

  get getAPsFromListPreserveType(): any {
    return (ap_list: Array<any>) => {
      if (ap_list == undefined) return []
      let aps: Array<any> = []
      for (var ap of ap_list) {
        if (this.isTrait(ap)) {
          aps.push(this.getTrait(ap))
          continue
        }
        aps.push(this.getAP(ap))
      }
      return aps
    }
  }

  get getArts(): any {
    return () => {
      return this.AbilityPackages.filter((x) => x.Type.trim() === 'Art')
    }
  }

  get getSpiritArtsByType(): any {
    return (type: String) => {
      return this.AbilityPackages.filter((x) => x.Type.trim() === 'Spirit Art' && x.Category == type)
    }
  }

  get getCareers(): any {
    return () => {
      return this.AbilityPackages.filter((x) => x.Type.trim() === 'Career')
    }
  }

  get getArchetypes(): any {
    return () => {
      return this.AbilityPackages.filter((x) => x.Category.trim() === 'Archetype')
    }
  }

  get getDisciplines(): any {
    return () => {
      return this.AbilityPackages.filter((x) => x.Type.trim() === 'Discipline')
    }
  }

  get getDisciplinesByType(): any {
    return (type: String) => {
      return this.AbilityPackages.filter((x) => x.Type.trim() === 'Discipline' && x.Category == type)
    }
  }

  // ==========================================================
  // TRAITS GETTERS
  // ==========================================================
  get getSpiritTraits(): any {
    return () => {
      return this.Traits.filter((x) => x.Type.trim() === 'Spirit Trait')
    }
  }

  get getTrait(): any {
    return (inword: string) => {
      var trait = this.Traits.find((x) => x.Name.trim() == inword.trim())
      if (trait == undefined) return new Trait(inword)
      return trait
    }
  }

  get getTraitsFromList(): any {
    return (trait_list: Array<any>) => {
      if (trait_list == undefined) return []
      let traits: Array<Trait> = []
      for (var trait of trait_list) {
        traits.push(this.getTrait(trait))
      }
      return traits
    }
  }

  get getSpiritTraitsByTagAndCost(): any {
    return (tag: string, cost: string) => {
      return <Array<Trait>>this.Traits.filter((x) => x.Type.trim() === 'Spirit Trait' && x.Category == tag.trim() && x.CostHeader.includes(cost.trim()))
    }
  }

  get getTraitsByTagAndCost(): any {
    return (tag: string, cost: string) => {
      return this.Traits.filter((x) => x.Type.trim() === 'Trait' && x.Category == tag.trim() && x.CostHeader.includes(cost.trim()))
    }
  }

  get isArt(): any {
    return (inword: string) => {
      return this.Traits.some((x) => x.Name == inword.trim())
    }
  }
  // ==========================================================
  // EQUIPMENT GETTERS
  // ==========================================================
  get getAnyEquipmentFromList(): any {
    return (equipment_list: Array<any>) => {
      if (equipment_list == undefined) return []
      let equipment: Array<any> = []
      for (var item of equipment_list) {
        if (this.isWeapon(item)) {
          equipment.push(this.getWeapon(item))
        }
        if (this.isArmor(item)) {
          equipment.push(this.getArmor(item))
        }
        if (this.isEquipment(item)) {
          equipment.push(this.getEquipment(item))
        }
      }
      return equipment
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

  get getArmorFromList(): any {
    return (armor_list: Array<any>) => {
      if (armor_list == undefined) return []
      let armors: Array<Armor> = []
      for (var armor of armor_list) {
        armors.push(this.getArmor(armor))
      }
      return armors
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
    return (categories: Array<string>, type: string) => {
      return this.Weapons.filter((x) => x.Abilities.length > 0 && categories.includes(x.Category.trim()))
    }
  }

  // ==========================================================
  // STANCE TOOLS
  // ==========================================================
  get getStance(): any {
    return (inword: string) => {
      var stance = StancesJson.find((x) => x.name.trim() === inword.trim())
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

  get isStance(): any {
    return (inword: string) => {
      return StancesJson.some((x) => x.name == inword.trim())
    }
  }

  // ==========================================================
  // EQUIPMENT TOOLS
  // ==========================================================
  get isEquipment(): any {
    return (inword: string) => {
      return this.Equipments.some((x) => x.Name == inword.trim())
    }
  }

  get getEquipments(): any {
    return () => {
      return this.Equipments
    }
  }

  get getEquipment(): any {
    return (inword: string) => {
      return this.Equipments.find((x) => x.Name === inword.trim())
    }
  }

  get getFilteredEquipments(): any {
    return (categories: Array<string>) => {
      return this.Equipments.filter((x) => categories.length == 0 || categories.includes(x.Category.trim()))
    }
  }

  get getEquipmentFromList(): any {
    return (equipment_list: Array<any>) => {
      if (equipment_list == undefined) return []
      let equipments: Array<Equipment> = []
      for (var equipment of equipment_list) {
        equipments.push(this.getEquipment(equipment))
      }
      return equipments
    }
  }

  // ==========================================================
  // TERRAIN TOOLS
  // ==========================================================
  get isTerrain(): any {
    return (inword: string) => {
      return this.Terrains.some((x) => x.Name == inword.trim())
    }
  }

  get getTerrain(): any {
    return (inword: string) => {
      return this.Terrains.find((x) => x.Name === inword.trim())
    }
  }

  get getTerrains(): any {
    return () => {
      return this.Terrains
    }
  }

  // ==========================================================
  // AFFLICTION TOOLS
  // ==========================================================
  get isStatus(): any {
    return (inword: string) => {
      return this.Statuses.some((x) => x.Name == inword.trim())
    }
  }

  get getStatus(): any {
    return (inword: string) => {
      return this.Statuses.find((x) => x.Name === inword.trim())
    }
  }

  get getStatusesFromList(): any {
    return (status_list: Array<string>) => {
      if (status_list == undefined) return []
      let statuses: Array<Status> = []
      for (var status of status_list) {
        var temp = this.getStatus(status)
        if (temp != undefined) statuses.push(temp)
      }
      return statuses
    }
  }

  get getStatuses(): any {
    return () => {
      return this.Statuses
    }
  }

  get getFullStatuses(): any {
    return () => {
      return StatusJson.filter((x) => !x.hasOwnProperty('see')).map((x) => Status.Deserialize(<IStatusData>x))
    }
  }

  get getStatusesByType(): any {
    return (type: string) => {
      return StatusJson.filter((x) => x.type.trim() === type.trim()).map((x) => Status.Deserialize(<IStatusData>x))
    }
  }

  get getFilteredStatuses(): any {
    return (types: Array<string>) => {
      return StatusJson.filter((x) => !x.hasOwnProperty('see') && types.includes(x.type.trim())).map((x) => Status.Deserialize(<IStatusData>x))
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

  get getGlossaryItem(): any {
    return (inword: string) => {
      var effect
      for (var json of AllGlossaryItems) {
        effect = this.getGlossaryItemFromJson(json, inword)
        if (effect != undefined) return effect
      }
    }
  }

  get getGlossaryItemWithHeader(): any {
    return (inword: string) => {
      return '**' + inword + ':** ' + this.getGlossaryItem(inword)
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
  get getSpiritType(): any {
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
      var type = this.SpiritForms.find((x) => x.Name === inword.trim())
      return type
    }
  }

  get getSpiritFormsFromList(): any {
    return (spirit_forms: Array<string>) => {
      if (spirit_forms == undefined) return []
      let forms: Array<SpiritForm> = []
      for (var form of spirit_forms) {
        forms.push(this.getSpiritForm(form))
      }
      return forms
    }
  }

  // ==========================================================
  // SPIRIT TRAITS GETTERS
  // ==========================================================
  get getSpiritTrait(): any {
    return (inword: string) => {
      var type = this.Traits.find((x) => x.Name === inword.trim())
      return type
    }
  }

  get getSpiritTraitsFromList(): any {
    return (spirit_traits: Array<string>) => {
      if (spirit_traits == undefined) return []
      let traits: Array<Trait> = []
      for (var trait of spirit_traits) {
        traits.push(this.getSpiritTrait(trait))
      }
      return traits
    }
  }

  get isTrait(): any {
    return (inword: string) => {
      return this.Traits.some((x) => x.Name == inword.trim())
    }
  }
}
