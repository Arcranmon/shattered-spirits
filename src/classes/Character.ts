import { store } from '@/store'
import { Armor, Discipline, Stance, Weapon, Technique } from '@/class'

var kExpectedDisciplineRanks = 8
var kSpiritDisciplineCategories = ['Earth']

var kBaseHealth = 10
var kBaseEndurance = 25

var kBasicTechniques = ['Unarmed Strike', 'Armed Strike', 'Run', 'Prepare']
var kBasicStratagems = ['Quicken', 'Strengthen']
var kBasicStunts = ['Aid', 'Leap', 'Retrieve', 'Tumble', 'Use Environment']
var kBasicResists = ['Armored Shell', 'Basic Counter', 'Deflect', 'Dodge', 'Shield Block']
var kBasicReactions = ['Guidance', 'Recover', 'Reorient']
var kBasicGambits = ['Basic Feint', 'Basic Sunder']
var kBasicFlourishes = ['Basic Flourish', 'Disarming Flourish']
var kBasicPunishes = ['Create Opening', 'Engage', 'Opportunity Attack']

class Character {
  private current_spirit_stance_: Stance
  private current_martial_stance_: Stance
  private current_endurance_: number
  private equipped_armor_: Armor
  private disciplines_: Array<ICharDisciplineData>
  private focus_: number
  private grit_: number
  private current_health_: number
  private main_hand_: Weapon
  private max_endurance_: number
  private max_health_: number
  private momentum_: number
  private name_: string
  private off_hand_: Weapon
  private player_character_: Boolean
  private reflex_: number
  private spirit_name_: string
  private spirit_type_: string
  private unarmed_weapons_: Array<string>
  private weapons_: Array<string>

  private weapon_weight_: number

  kMaxWeaponWeight = 8
  kMaxSpiritStances = 3
  kMaxTechniques = 6

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.current_spirit_stance_ = store.getters.getStance('No Stance')
    this.current_martial_stance_ = store.getters.getStance('No Stance')
    this.current_endurance_ = kBaseEndurance
    this.current_health_ = kBaseHealth
    this.disciplines_ = []
    this.equipped_armor_ = null
    this.focus_ = 0
    this.grit_ = 0
    this.weapon_weight_ = 0
    this.current_health_ = 0
    this.main_hand_ = null
    this.max_endurance_ = kBaseEndurance
    this.max_health_ = kBaseHealth
    this.momentum_ = 0
    this.name_ = ''
    this.off_hand_ = null
    this.player_character_ = true
    this.reflex_ = 0
    this.spirit_name_ = ''
    this.spirit_type_ = ''
    this.weapons_ = []
    this.unarmed_weapons_ = ['Body Slam', 'Grab', 'Untrained Fist']
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  get CurrentHealth() {
    return this.current_health_
  }
  set CurrentHealth(health: number) {
    this.current_health_ = health
  }
  get CurrentEndurance() {
    return this.current_endurance_
  }
  set CurrentEndurance(endurance: number) {
    this.current_endurance_ = endurance
  }
  get CurrentSpiritStance() {
    return this.current_spirit_stance_
  }
  get CurrentMartialStance() {
    return this.current_martial_stance_
  }
  get Disciplines() {
    return this.disciplines_
  }
  get EquippedArmor() {
    return this.equipped_armor_
  }
  get WeaponWeight() {
    return this.weapon_weight_
  }
  get Poise() {
    return this.focus_
  }
  set Poise(input: number) {
    this.focus_ = input
  }
  get Grit() {
    return this.grit_
  }
  set Grit(input: number) {
    this.grit_ = input
  }
  get MaxHealth() {
    return this.max_health_
  }
  get MaxEndurance() {
    return this.max_endurance_
  }
  get Momentum() {
    return this.momentum_
  }
  set Momentum(input: number) {
    this.momentum_ = input
  }
  get Name() {
    return this.name_
  }
  get reflex() {
    return this.reflex_
  }
  set reflex(input: number) {
    this.reflex_ = input
  }
  get SpiritName() {
    return this.spirit_name_
  }
  get SpiritType() {
    return this.spirit_type_
  }
  get SpiritStances() {
    var spirit_stances = []
    for (var disc of this.disciplines_) {
      if (disc.tier > 1) {
        var discipline = store.getters.getDiscipline(disc.name)
        if (kSpiritDisciplineCategories.includes(discipline.Category)) spirit_stances = spirit_stances.concat(discipline.Tier2Stances)
      }
    }
    spirit_stances.sort((a, b) => a.Name.localeCompare(b.Name))
    return spirit_stances
  }
  get MartialStances() {
    var martial_stances = []
    for (var disc of this.disciplines_) {
      if (disc.tier > 1) {
        var discipline = store.getters.getDiscipline(disc.name)
        if (!kSpiritDisciplineCategories.includes(discipline.Category)) martial_stances = martial_stances.concat(discipline.Tier2Stances)
      }
    }
    martial_stances.sort((a, b) => a.Name.localeCompare(b.Name))
    return martial_stances
  }
  get UnarmedWeapons() {
    return this.unarmed_weapons_
  }
  get UnarmedWeaponsCreation() {
    if (this.unarmed_weapons_.length == 3) return []
    return this.unarmed_weapons_.slice(3)
  }
  get MaxUnarmedCount() {
    var weaponCount = 3
    for (var disc of this.disciplines_) {
      var fullDisc = store.getters.getDiscipline(disc.name)
      if (disc.tier >= 1) if (fullDisc.Tier1Unarmed) weaponCount += fullDisc.Tier1Unarmed
      if (disc.tier >= 2) if (fullDisc.Tier2Unarmed) weaponCount += fullDisc.Tier2Unarmed
    }
    return weaponCount
  }
  get RemainingUnarmed() {
    return this.MaxUnarmedCount - this.unarmed_weapons_.length
  }
  get Techniques() {
    var techniques = store.getters.getTechniquesFromList(kBasicTechniques)
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      techniques = techniques.concat(discipline.Tier1Techniques)
      if (disc.tier > 1) techniques = techniques.concat(discipline.Tier2Techniques)
    }
    techniques.sort((a, b) => {
      if (a.Speed > b.Speed) {
        return 1
      } else if (a.Speed < b.Speed) {
        return -1
      } else {
        if (a.Name > b.Name) {
          return 1
        } else if (a.Name < b.Name) {
          return -1
        } else {
          return 0
        }
      }
    })
    return techniques
  }
  public ManeuversOfType(type: string) {
    if (type == 'Stunt') var maneuvers = store.getters.getManeuversFromList(kBasicStunts)
    if (type == 'Stratagem') var maneuvers = store.getters.getManeuversFromList(kBasicStratagems)
    if (type == 'Resist') var maneuvers = store.getters.getManeuversFromList(kBasicResists)
    if (type == 'Flourish') var maneuvers = store.getters.getManeuversFromList(kBasicFlourishes)
    if (type == 'Punish') var maneuvers = store.getters.getManeuversFromList(kBasicPunishes)
    if (type == 'Gambit') var maneuvers = store.getters.getManeuversFromList(kBasicGambits)
    if (type == 'Reaction') var maneuvers = store.getters.getManeuversFromList(kBasicReactions)
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      for (var maneuver of discipline.Tier1Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
      if (disc.tier > 1) for (var maneuver of discipline.Tier2Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
    }
    maneuvers.sort((a, b) => a.Name.localeCompare(b.Name))
    return maneuvers
  }
  get Weapons() {
    return this.weapons_
  }

  // ==========================================================
  // SETTERS
  // ==========================================================
  set CurrentSpiritStance(spirit_stance: Stance) {
    this.current_spirit_stance_ = spirit_stance
  }
  set CurrentMartialStance(martial_stance: Stance) {
    this.current_martial_stance_ = martial_stance
  }
  set EquippedArmor(armor: Armor) {
    this.equipped_armor_ = armor
  }
  set Name(name: string) {
    this.name_ = name
  }
  set SpiritName(name: string) {
    this.spirit_name_ = name
  }
  set SpiritType(spirit: string) {
    this.spirit_type_ = spirit
  }
  set Weapons(weapons: string[]) {
    this.weapons_ = weapons
  }
  public AddWeapon(weapon: Weapon) {
    if (this.weapon_weight_ + weapon.Weight > this.kMaxWeaponWeight) return
    this.weapons_.push(weapon.Name)
    this.weapon_weight_ += weapon.Weight
  }
  public AddUnarmedWeapon(weapon: Weapon) {
    if (this.HasAllUnarmed) return
    if (!this.unarmed_weapons_.includes(weapon.Name)) this.unarmed_weapons_.push(weapon.Name)
  }
  public RemoveWeapon(weapon: string) {
    var index = this.weapons_.indexOf(weapon, 0)
    if (index > -1) {
      this.weapon_weight_ -= store.getters.getWeapon(weapon).Weight
      this.weapons_.splice(index, 1)
    }
  }
  public RemoveUnarmedWeapon(weapon: Weapon) {
    if (weapon.Name != 'Hand' && weapon.Name != 'Slam') {
      var index = this.unarmed_weapons_.indexOf(weapon.Name, 0)
      if (index > -1) this.unarmed_weapons_.splice(index, 1)
    }
  }
  public AddDiscipline(discipline: Discipline) {
    var idx = this.disciplines_.findIndex((e) => e.name == discipline.Name)
    if (idx == -1) {
      var new_discipline: ICharDisciplineData = { name: discipline.Name, tier: 1 }
      this.disciplines_.push(new_discipline)
    } else {
      this.disciplines_[idx].tier += 1
    }
  }
  public RemoveDiscipline(discipline: string) {
    var idx = this.disciplines_.findIndex((e) => e.name == discipline)
    if (idx > -1) {
      this.disciplines_[idx].tier -= 1
      if (this.disciplines_[idx].tier <= 0) this.disciplines_.splice(idx)
    }
  }
  public ResetDefault() {
    this.momentum_ = 0
    this.grit_ = 0
    this.focus_ = 0
    this.reflex_ = 0
    this.current_health_ = this.max_health_
  }

  // ==========================================================
  // CONVENIENCE CHECKS
  // ==========================================================
  get HasEquippedArmor() {
    return this.equipped_armor_ != null
  }
  get HasSpirit() {
    return this.spirit_type_ != ''
  }
  public CanAddWeapon(weapon: Weapon) {
    return this.weapon_weight_ + weapon.Hands <= this.kMaxWeaponWeight
  }
  get Complete() {
    return this.HasSpirit && this.HasEquippedArmor && this.HasAllWeapons && this.HasNames
  }
  get HasAllWeapons() {
    return this.weapon_weight_ == this.kMaxWeaponWeight
  }
  get HasAllUnarmed() {
    return this.RemainingUnarmed == 0
  }
  get WeaponWeightRemaining() {
    return this.kMaxWeaponWeight - this.weapon_weight_
  }
  get AnyStanceUnequipped() {
    return this.current_spirit_stance_.Name == 'No Stance' || this.current_martial_stance_.Name == 'No Stance'
  }
  get HasNames() {
    return this.Name != '' && this.SpiritName != ''
  }
  get HasAllDisciplines() {
    var total_ranks = 0
    var has_rank_2_spirit = false
    var has_rank_2_martial = false
    for (var disc of this.disciplines_) {
      total_ranks += disc.tier
      var discipline = store.getters.getDiscipline(disc.name)
      if (disc.tier >= 2) {
        if (kSpiritDisciplineCategories.includes(discipline.Category)) has_rank_2_spirit = true
        else has_rank_2_martial = true
      }
    }
    return [
      kExpectedDisciplineRanks - total_ranks,
      has_rank_2_spirit,
      has_rank_2_martial,
      kExpectedDisciplineRanks - total_ranks == 0 && has_rank_2_spirit && has_rank_2_martial,
    ]
  }
  get RecommendedDisciplines() {
    var recs = [this.spirit_type_, 'Unarmed']
    if (this.equipped_armor_ != null) recs.push(this.equipped_armor_.Category)
    for (var weapon of this.weapons_) {
      var full_weapon = store.getters.getWeapon(weapon)
      if (!recs.includes(full_weapon.Category + ' Weapon')) recs.push(full_weapon.Category + ' Weapon')
      if (full_weapon.Keywords.some((y) => y.includes('Thrown')) && !recs.includes('Throwing Weapons')) recs.push('Throwing Weapon')
    }

    return recs
  }

  // ==========================================================
  // HELPERS
  // ==========================================================
  private SmartCommas(in_string: string, out_string: string) {
    if (out_string.length > 0) return out_string + ', ' + in_string
    return out_string + in_string
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(character: Character): ICharacterData {
    return {
      //Character Save Data
      current_spirit_stance: character.current_spirit_stance_ ? character.current_spirit_stance_.Name : '',
      current_martial_stance: character.current_martial_stance_ ? character.current_martial_stance_.Name : '',
      current_endurance: character.current_endurance_,
      disciplines: character.disciplines_,
      equipped_armor: character.equipped_armor_ ? character.equipped_armor_.Name : '',
      focus: character.focus_,
      grit: character.grit_,
      current_health: character.current_health_,
      main_hand: character.main_hand_ ? character.main_hand_.Name : '',
      max_endurance: character.max_endurance_,
      max_health: character.max_health_,
      momentum: character.momentum_,
      name: character.name_,
      off_hand: character.off_hand_ ? character.off_hand_.Name : '',
      player_character: character.player_character_,
      reflex: character.reflex_,
      spirit_name: character.spirit_name_,
      spirit_type: character.spirit_type_,
      unarmed_weapons: character.unarmed_weapons_,
      weapons: character.weapons_,
      weapon_weight: character.weapon_weight_,
    }
  }

  public static Deserialize(characterData: ICharacterData): Character {
    const c = new Character()
    c.setCharacterData(characterData)
    return c
  }

  private setCharacterData(data: ICharacterData): void {
    if ('current_spirit_stance' in data) this.current_spirit_stance_ = store.getters.getStance(data.current_spirit_stance)
    if ('current_martial_stance' in data) this.current_martial_stance_ = store.getters.getStance(data.current_martial_stance)
    this.current_endurance_ = data.current_endurance || kBaseEndurance
    if ('equipped_armor' in data) this.equipped_armor_ = store.getters.getArmor(data.equipped_armor)
    this.focus_ = data.focus || 0
    this.grit_ = data.grit || 0
    this.current_health_ = data.current_health || kBaseHealth
    if ('main_hand' in data && data.main_hand != '') this.equipped_armor_ = store.getters.getWeapon(data.main_hand)
    this.max_endurance_ = data.max_endurance || kBaseEndurance
    this.max_health_ = data.max_health || kBaseHealth
    this.momentum_ = data.momentum || 0
    this.name_ = data.name || ''
    if ('off_hand' in data && data.off_hand != '') this.equipped_armor_ = store.getters.getWeapon(data.off_hand)
    this.player_character_ = data.player_character || true
    this.reflex_ = data.reflex || 0
    this.spirit_name_ = data.spirit_name || ''
    this.spirit_type_ = data.spirit_type || ''
    this.unarmed_weapons_ = data.unarmed_weapons || []
    this.disciplines_ = data.disciplines || []
    this.weapons_ = data.weapons || []
    this.weapon_weight_ = data.weapon_weight || 0
  }
}
export default Character
