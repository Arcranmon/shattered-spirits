import { store } from '@/store'
import { Armor, Combatant, Discipline, Stance, Weapon, Spirit, Technique } from '@/class'

var kSpiritDisciplineCategories = ['Earth']

var kBaseHealth = 25

var kBasicTechniques = ['Shift', 'Rally', 'Improvise', 'Skirmish', 'Combination Strike', 'Smash']
var kBasicStances = ['Balanced Stance', "Summoner's Stance"]
var kBasicAttacks = ['Weapon Attack', 'Brawl']
var kBasicActions = ['Prepare', 'Fight', 'Sprint', 'Raise Guard', 'Rebalance', 'Spirit Summon']
var kBasicStunts = ['Draw/Stow', 'Retreat', 'Leap']
var kBasicReactions = ['Opportunity Attack', 'Defend', 'Dodge', 'Partnership']
var kBasicGambits = ['Lethal Strike', 'Gather Momentum']

class Character extends Combatant {
  // Level Up Qualities
  private current_spirit_stance_: Stance
  private current_martial_stance_: Stance
  private disciplines_: Array<ICharDisciplineData>
  private minor_disciplines_: Array<ICharDisciplineData>
  private name_: string
  private player_character_: Boolean
  private element_: string
  private weapons_: Array<string>
  private accessories_: Array<string>
  private armor_: Array<string>

  private spirit_: Spirit

  kMoveChart = [
    store.getters.getMovement('Unencumbered'),
    store.getters.getMovement('Light Load'),
    store.getters.getMovement('Medium Load'),
    store.getters.getMovement('Heavy Load'),
  ]

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    super()
    this.current_spirit_stance_ = store.getters.getStance('No Stance')
    this.current_martial_stance_ = store.getters.getStance('No Stance')
    this.minor_disciplines_ = []
    this.disciplines_ = []
    this.armor_ = []
    this.spirit_ = new Spirit()
    this.name_ = ''
    this.player_character_ = true
    this.element_ = ''
    this.weapons_ = []
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get MaxStamina() {
    return this.CurrentSpiritStance.Stamina + this.CurrentMartialStance.Stamina
  }

  override get Size() {
    return '1'
  }

  override get Guard() {
    var guard = 0
    for (var armor of this.armor_) {
      guard += store.getters.getArmor(armor).Guard
    }
    return guard
  }

  override get Soak() {
    var soak = 0
    for (var armor of this.armor_) {
      soak += store.getters.getArmor(armor).Soak
    }
    return soak
  }

  override get MaxMovement() {
    return this.MoveChart.Movement
  }

  override get Jump() {
    return this.MoveChart.Jump
  }

  override get MoveChart() {
    for (var movement of this.kMoveChart) {
      if (this.Weight <= movement.Encumbrance) return movement
    }
  }

  override get Traits() {
    var traits = this.MoveChart.Traits
    for (var armor of this.armor_) {
      traits = [...traits, ...store.getters.getArmor(armor).Traits]
    }
    return traits
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================

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
    for (var art of this.minor_disciplines_) {
      var art_info = store.getters.getArt(art.name)
      for (var maneuver of art_info.Tier1Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
      if (art.tier > 1) for (var maneuver of art_info.Tier2Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
    }
    maneuvers.sort((a, b) => a.Name.localeCompare(b.Name))
    return maneuvers
  }

  get CurrentSpiritStance() {
    // TODO: This is a hack
    var spirit_disc = this.disciplines_.filter((discipline) => store.getters.getDiscipline(discipline.name).Type != 'Style')
    return store.getters.getStance("Summoner's Stance")
  }
  get CurrentMartialStance() {
    // TODO: This is a hack
    var style_disc = this.disciplines_.filter((discipline) => store.getters.getDiscipline(discipline.name).Type == 'Style')
    return store.getters.getStance('Balanced Stance')
  }
  get Disciplines() {
    return this.disciplines_
  }

  get Weight() {
    var weight = 0 //this.equipped_armor_.Weight
    for (var weapon of this.weapons_) {
      weight += store.getters.getWeapon(weapon).Weight
    }
    for (var armor of this.armor_) {
      weight += store.getters.getArmor(armor).Weight
    }
    return weight
  }

  override get MaxHealth() {
    return 25
  }

  get Name() {
    return this.name_
  }

  get Spirit() {
    return this.spirit_
  }

  get Element() {
    return this.element_
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

  get SpiritTechniques() {
    var techniques = store.getters.getTechniquesFromList(kBasicTechniques)
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      if (discipline.Type == 'Style') continue
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

  public SpiritManeuversOfType(type: string) {
    if (type == 'Action') var maneuvers = this.Spirit.Actions
    if (type == 'Stunt') var maneuvers = this.Spirit.Stunts
    if (type == 'Reaction') var maneuvers = this.Spirit.Reactions
    if (type == 'Gambit') var maneuvers = this.Spirit.Gambits
    for (var disc of this.disciplines_) {
      var discipline = store.getters.getDiscipline(disc.name)
      if (discipline.Category != this.Element) continue
      for (var maneuver of discipline.Tier1Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
      if (disc.tier > 1) for (var maneuver of discipline.Tier2Maneuvers) if (maneuver.Type == type) maneuvers.push(maneuver)
    }
    maneuvers.sort((a, b) => a.Name.localeCompare(b.Name))
    return maneuvers
  }
  get Weapons() {
    return this.weapons_
  }
  get Armor() {
    return this.armor_
  }
  get Grit() {
    return this.CurrentMartialStance.Grit + this.CurrentSpiritStance.Grit
  }
  get Reflex() {
    return this.CurrentMartialStance.Reflex + this.CurrentSpiritStance.Reflex
  }
  get Focus() {
    return this.CurrentMartialStance.Focus + this.CurrentSpiritStance.Focus
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

  set Name(name: string) {
    this.name_ = name
  }
  set Element(spirit: string) {
    this.element_ = spirit
  }
  set Weapons(weapons: string[]) {
    this.weapons_ = weapons
  }
  public AddWeapon(weapon: Weapon) {
    this.weapons_.push(weapon.Name)
  }

  public RemoveWeapon(index: number) {
    if (index > -1) {
      this.weapons_.splice(index, 1)
    }
  }

  public AddArt(art: Discipline) {
    var idx = this.minor_disciplines_.findIndex((e) => e.name == art.Name)
    if (idx == -1) {
      var new_discipline: ICharDisciplineData = { name: art.Name, tier: 1 }
      this.minor_disciplines_.push(new_discipline)
    } else {
      this.minor_disciplines_[idx].tier += 1
    }
  }

  public AddDiscipline(discipline: Discipline) {
    var idx = this.disciplines_.findIndex((e) => e.name == discipline.Name)
    console.log('Add: ' + idx)
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

  override ApplyRespite() {
    super.ApplyRespite()
    this.spirit_.ApplyRespite()
  }

  override get MomentumGain() {
    return this.CurrentMartialStance.MomentumGain + this.CurrentSpiritStance.MomentumGain
  }

  public ClearSpiritInfo() {
    this.spirit_ = new Spirit()
    this.ClearSpiritAbilities()
  }

  public ClearSpiritAbilities() {
    this.minor_disciplines_ = this.minor_disciplines_.filter((art) => store.getters.getArt(art.name).Type == 'Style')
    this.disciplines_ = this.disciplines_.filter((discipline) => store.getters.getDiscipline(discipline.name).Type == 'Style')
  }

  // ==========================================================
  // CONVENIENCE CHECKS
  // ==========================================================
  get HasSpirit() {
    return this.element_ != ''
  }

  public CanAddDiscipline(discipline: Discipline) {
    var idx = this.disciplines_.findIndex((e) => e.name == discipline.Name)
    if (idx > -1 && this.disciplines_[idx].tier == 3) return false

    if (discipline.Type != 'Style' && this.HasSpiritDisciplines) return false
    if (discipline.Type == 'Style' && this.HasStyleDisciplines) return false

    return true
  }

  public CanAddWeapon(weapon: Weapon) {
    return 16 - this.Weight >= weapon.Weight
  }

  public CanAddArmor(armor: Armor) {
    return 16 - this.Weight >= armor.Weight
  }

  // TODO: Update when character advancement is a thing.
  get HasSpiritDisciplines() {
    var disciplines_check = this.disciplines_.filter((discipline) => store.getters.getDiscipline(discipline.name).Type != 'Style')
    return disciplines_check.length == 1
  }

  // TODO: Update when character advancement is a thing.
  get HasStyleDisciplines() {
    var disciplines_check = this.disciplines_.filter((discipline) => store.getters.getDiscipline(discipline.name).Type == 'Style')
    return disciplines_check.length == 1
  }

  get HasDisciplines() {
    return this.HasSpiritDisciplines && this.HasStyleDisciplines
  }

  get Complete() {
    return this.HasSpirit && this.HasNames
  }

  get AnyStanceUnequipped() {
    return this.current_spirit_stance_.Name == 'No Stance' || this.current_martial_stance_.Name == 'No Stance'
  }

  get HasNames() {
    return this.Name != ''
  }

  get RecommendedDisciplines() {
    var recs = [this.element_, 'Unarmed']
    //if (this.equipped_armor_ != null) recs.push(this.equipped_armor_.Category)
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
      ...super.Serialize(character),
      spirit: Spirit.Serialize(character.spirit_),
      current_spirit_stance: character.current_spirit_stance_ ? character.current_spirit_stance_.Name : '',
      current_martial_stance: character.current_martial_stance_ ? character.current_martial_stance_.Name : '',
      disciplines: character.disciplines_,
      armor: character.armor_,
      element: character.element_,
      accessories: character.accessories_,
      name: character.name_,
      player_character: character.player_character_,
      weapons: character.weapons_,
    }
  }

  public static Deserialize(data: ICharacterData): Character {
    const c = new Character()
    c.setCharacterData(data)
    return c
  }

  private setCharacterData(data: ICharacterData): void {
    this.spirit_ = Spirit.Deserialize(data.spirit)
    if ('current_spirit_stance' in data) this.current_spirit_stance_ = store.getters.getStance(data.current_spirit_stance)
    if ('current_martial_stance' in data) this.current_martial_stance_ = store.getters.getStance(data.current_martial_stance)
    this.accessories_ = data.accessories || []
    this.element_ = data.element || ''
    this.name_ = data.name || ''
    this.player_character_ = data.player_character || true
    this.disciplines_ = data.disciplines || []
    this.armor_ = data.armor || []
    this.weapons_ = data.weapons || []
    this.setCombatantData(data)
  }
}
export default Character
