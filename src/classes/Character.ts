import { store } from '@/store'
import { Armor, Discipline, Stance, Weapon, Spirit, Technique } from '@/class'

var kSpiritDisciplineCategories = ['Earth']

var kBaseHealth = 10
var kBaseEndurance = 25

var kBasicTechniques = ['Swift Strike', 'Basic Strike', 'Strong Strike']
var kBasicAttacks = ['Weapon Attack', 'Charged Attack', 'Quickened Attack', 'Punch', 'Grapple', 'Slam']
var kBasicActions = ['Skirmish', 'Swift Manifestation', 'Reorient', 'Raise Guard', 'Recover', 'Prepare']
var kBasicStunts = ['Disengage', 'Draw/Stow', 'Improvised Combo', 'Leap', 'Sprint', 'Tumble', 'Use Environment']
var kBasicReactions = ['Flank', 'Engage', 'Opportunity Attack', 'Active Defense', 'Dodge', 'Spiritual Interdiction', 'Spirit Summon']
var kBasicGambits = ['Basic Feint', 'Basic Flourish', 'Basic Sunder', 'Marking Strike']

class Character {
  // Combat Qualities
  private current_endurance_: number
  private current_health_: number
  private max_endurance_: number
  private max_health_: number
  private vigor_: number
  private poise_: number
  private grit_: number
  private reflex_: number

  // Level Up Qualities
  private current_spirit_stance_: Stance
  private current_martial_stance_: Stance
  private equipped_armor_: Armor
  private disciplines_: Array<ICharDisciplineData>
  private momentum_: number
  private name_: string
  private player_character_: Boolean
  private spirit_type_: string
  private weapons_: Array<string>
  private gear_: Array<string>

  private spirit_: Spirit

  kMaxWeaponWeight = 8
  kMaxSpiritStances = 3
  kMaxTechniques = 6

  kMoveCharts = [
    store.getters.getMovement('Unencumbered'),
    store.getters.getMovement('Light Load'),
    store.getters.getMovement('Medium Load'),
    store.getters.getMovement('Heavy Load'),
  ]

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
    this.poise_ = 0
    this.grit_ = 0
    this.current_health_ = 0
    this.max_endurance_ = kBaseEndurance
    this.max_health_ = kBaseHealth
    this.momentum_ = 0
    this.name_ = ''
    this.player_character_ = true
    this.reflex_ = 0
    this.spirit_type_ = ''
    this.weapons_ = []
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================
  get Vigor() {
    return this.vigor_
  }
  set Vigor(vigor: number) {
    this.vigor_ = vigor
  }
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
    return store.getters.getDiscipline(this.disciplines_[0].name).Tier2Stances[0]
    // return this.current_spirit_stance_
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
  get MoveChart() {
    for (var movement of this.kMoveCharts) {
      if (this.Weight <= movement.Encumbrance) return movement
    }
  }
  get Weight() {
    var weight = this.equipped_armor_.Weight
    for (var weapon of this.weapons_) {
      weight += store.getters.getWeapon(weapon).Weight
    }
    return weight
  }
  get Poise() {
    return this.poise_
  }
  set Poise(input: number) {
    this.poise_ = input
  }
  get Gear() {
    return this.gear_
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
  get Reflex() {
    return this.reflex_
  }
  set Reflex(input: number) {
    this.reflex_ = input
  }
  get Spirit() {
    return this.spirit_
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
  get MaxUnarmedCount() {
    var weaponCount = 3
    for (var disc of this.disciplines_) {
      var fullDisc = store.getters.getDiscipline(disc.name)
      if (disc.tier >= 1) if (fullDisc.Tier1Unarmed) weaponCount += fullDisc.Tier1Unarmed
      if (disc.tier >= 2) if (fullDisc.Tier2Unarmed) weaponCount += fullDisc.Tier2Unarmed
    }
    return weaponCount
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
  get Attacks() {
    var attacks = store.getters.getAttacksFromList(kBasicAttacks)
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      attacks = attacks.concat(discipline.Tier1Attacks)
      if (disc.tier > 1) attacks = attacks.concat(discipline.Tier2Attacks)
    }
    attacks.sort((a, b) => a.Name.localeCompare(b.Name))
    return attacks
  }
  get MinorAttacks() {
    return this.Attacks.filter((x) => x.Class == '_Minor Attack_')
  }
  get MajorAttacks() {
    return this.Attacks.filter((x) => x.Class == '_Major Attack_')
  }
  get SpiritAttacks() {
    var attacks = this.Spirit.Attacks
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      attacks = attacks.concat(discipline.Tier1Attacks)
      if (disc.tier > 1) attacks = attacks.concat(discipline.Tier2Attacks)
    }
    attacks.sort((a, b) => a.Name.localeCompare(b.Name))
    return attacks
  }
  get SpiritMinorAttacks() {
    return this.SpiritAttacks.filter((x) => x.Class == '_Minor Attack_')
  }
  get SpiritMajorAttacks() {
    return this.SpiritAttacks.filter((x) => x.Class == '_Major Attack_')
  }
  public ManeuversOfType(type: string) {
    if (type == 'Action') var maneuvers = store.getters.getManeuversFromList(kBasicActions)
    if (type == 'Stunt') var maneuvers = store.getters.getManeuversFromList(kBasicStunts)
    if (type == 'Reaction') var maneuvers = store.getters.getManeuversFromList(kBasicReactions)
    if (type == 'Gambit') var maneuvers = store.getters.getManeuversFromList(kBasicGambits)
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      for (var maneuver of discipline.Tier1Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
      if (disc.tier > 1) for (var maneuver of discipline.Tier2Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
    }
    maneuvers.sort((a, b) => a.Name.localeCompare(b.Name))
    return maneuvers
  }
  public SpiritManeuversOfType(type: string) {
    // TODO: Split this between actual and spirit disciplines.
    if (type == 'Action') var maneuvers = this.Spirit.Actions
    if (type == 'Stunt') var maneuvers = this.Spirit.Stunts
    if (type == 'Reaction') var maneuvers = this.Spirit.Reactions
    if (type == 'Gambit') var maneuvers = this.Spirit.Gambits
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
  set SpiritType(spirit: string) {
    this.spirit_type_ = spirit
  }
  set Weapons(weapons: string[]) {
    this.weapons_ = weapons
  }
  public AddWeapon(weapon: Weapon) {
    this.weapons_.push(weapon.Name)
  }
  public RemoveWeapon(weapon: string) {
    var index = this.weapons_.indexOf(weapon, 0)
    if (index > -1) {
      this.weapons_.splice(index, 1)
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
  public ApplyRefresh() {
    this.grit_ = this.current_spirit_stance_.Defense.Grit
    this.poise_ = this.current_spirit_stance_.Defense.Poise
    this.reflex_ = this.current_spirit_stance_.Defense.Reflex
  }
  public ResetDefault() {
    this.momentum_ = 0
    this.vigor_ = 0
    this.grit_ = this.current_spirit_stance_.Defense.Grit
    this.poise_ = this.current_spirit_stance_.Defense.Poise
    this.reflex_ = this.current_spirit_stance_.Defense.Reflex
    this.current_health_ = this.max_health_
    this.current_endurance_ = this.max_endurance_
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
  get Complete() {
    return this.HasSpirit && this.HasEquippedArmor && this.HasNames
  }
  get AnyStanceUnequipped() {
    return this.current_spirit_stance_.Name == 'No Stance' || this.current_martial_stance_.Name == 'No Stance'
  }
  get HasNames() {
    return this.Name != ''
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
      poise: character.poise_,
      grit: character.grit_,
      gear: character.gear_,
      current_health: character.current_health_,
      max_endurance: character.max_endurance_,
      max_health: character.max_health_,
      momentum: character.momentum_,
      name: character.name_,
      player_character: character.player_character_,
      reflex: character.reflex_,
      spirit: Spirit.Serialize(character.spirit_),
      weapons: character.weapons_,
      vigor: character.vigor_,
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
    this.poise_ = data.poise || 0
    this.gear_ = data.gear || []
    this.grit_ = data.grit || 0
    this.current_health_ = data.current_health || kBaseHealth
    this.max_endurance_ = data.max_endurance || kBaseEndurance
    this.max_health_ = data.max_health || kBaseHealth
    this.momentum_ = data.momentum || 0
    this.name_ = data.name || ''
    this.player_character_ = data.player_character || true
    this.reflex_ = data.reflex || 0
    this.spirit_ = Spirit.Deserialize(data.spirit)
    this.disciplines_ = data.disciplines || []
    this.weapons_ = data.weapons || []
    this.vigor_ = data.vigor || 0
  }
}
export default Character
