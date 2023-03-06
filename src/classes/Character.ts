import { store } from '@/store'
import { Armor, Stance, Weapon, Technique } from '@/class'

class Character {
  private current_spirit_stance_: Stance
  private current_martial_stance_: Stance
  private current_endurance_: number
  private equipped_armor_: Armor
  private focus_: number
  private grit_: number
  private current_health_: number
  private main_hand_: Weapon
  private martial_forms_: number
  private max_health_: number
  private momentum_: number
  private name_: string
  private off_hand_: Weapon
  private player_character_: Boolean
  private reflex_: number
  private maneuvers_: Array<string>
  private reactions_: Array<string>
  private skill_techniques_: Array<string>
  private spirit_name_: string
  private spirit_type_: string
  private spirit_techniques_: Array<string>
  private spirit_stances_: Array<string>
  private martial_stances_: Array<string>
  private unarmed_weapons_: Array<string>
  private weapons_: Array<string>

  private weapon_weight_: number

  kDefaultManeuvers = ['Quick Strike', 'Strong Strike', 'Leap']
  kDefaultReactions = ['Retrieve', 'Reorient', 'Deflect', 'Dodge', 'Opportunity Attack', 'Counter']

  kMaxWeaponWeight = 8
  kMaxSpiritStances = 3
  kMaxTechniques = 6

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.current_spirit_stance_ = store.getters.getSpiritStance('No SpiritStance')
    this.current_martial_stance_ = store.getters.getSpiritStance('No MartialStance')
    this.current_endurance_ = 0
    this.equipped_armor_ = null
    this.focus_ = 0
    this.grit_ = 0
    this.weapon_weight_ = 0
    this.current_health_ = 0
    this.main_hand_ = null
    this.martial_forms_ = 0
    this.max_health_ = 0
    this.momentum_ = 0
    this.name_ = ''
    this.off_hand_ = null
    this.player_character_ = true
    this.reflex_ = 0
    this.maneuvers_ = this.kDefaultManeuvers
    this.reactions_ = this.kDefaultReactions
    this.skill_techniques_ = []
    this.spirit_name_ = ''
    this.spirit_techniques_ = []
    this.spirit_type_ = ''
    this.spirit_stances_ = ['No SpiritStance']
    this.martial_stances_ = ['No MartialStance']
    this.weapons_ = []
    this.unarmed_weapons_ = ['Hand', 'Slam']
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
  get EquippedArmor() {
    return this.equipped_armor_
  }
  get WeaponWeight() {
    return this.weapon_weight_
  }
  get Health() {
    return this.max_health_
  }
  get Focus() {
    return this.focus_
  }
  set Focus(input: number) {
    this.focus_ = input
  }
  get Grit() {
    return this.grit_
  }
  set Grit(input: number) {
    this.grit_ = input
  }
  get MartialForms() {
    return this.martial_forms_
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
  get RefreshText() {
    var refresh = ''
    if (this.current_spirit_stance_.Refresh.Momentum != 0 || this.current_martial_stance_.Refresh.Momentum != 0)
      refresh = this.SmartCommas(this.current_spirit_stance_.Refresh.Momentum + this.current_martial_stance_.Refresh.Momentum + ' Momentum', refresh)
    if (this.current_spirit_stance_.Refresh.Focus != 0 || this.current_martial_stance_.Refresh.Focus != 0)
      refresh = this.SmartCommas(this.current_spirit_stance_.Refresh.Focus + this.current_martial_stance_.Refresh.Focus + ' Focus', refresh)
    if (this.current_spirit_stance_.Refresh.Grit != 0 || this.current_martial_stance_.Refresh.Grit != 0)
      refresh = this.SmartCommas(this.current_spirit_stance_.Refresh.Grit + this.current_martial_stance_.Refresh.Grit + ' Grit', refresh)
    if (this.current_spirit_stance_.Refresh.reflex != 0 || this.current_martial_stance_.Refresh.reflex != 0)
      refresh = this.SmartCommas(this.current_spirit_stance_.Refresh.reflex + this.current_martial_stance_.Refresh.reflex + ' reflex', refresh)
    if (this.current_spirit_stance_.Refresh.Additional != '') refresh = this.SmartCommas(this.current_spirit_stance_.Refresh.Additional, refresh)
    if (this.current_martial_stance_.Refresh.Additional != '') refresh = this.SmartCommas(this.current_martial_stance_.Refresh.Additional, refresh)

    return refresh
  }
  public ApplyRefresh() {
    this.momentum_ += this.current_spirit_stance_.Refresh.Momentum + this.current_martial_stance_.Refresh.Momentum
    this.grit_ += this.current_spirit_stance_.Refresh.Grit + this.current_martial_stance_.Refresh.Grit
    this.focus_ += this.current_spirit_stance_.Refresh.Focus + this.current_martial_stance_.Refresh.Focus
    this.reflex_ += this.current_spirit_stance_.Refresh.reflex + this.current_martial_stance_.Refresh.reflex
  }
  public ResetDefault() {
    this.momentum_ = 0
    this.grit_ = 0
    this.focus_ = 0
    this.reflex_ = 0
    this.current_health_ = this.max_health_
    this.current_endurance_ = this.EquippedArmor.Endurance
  }
  get Maneuvers() {
    return this.maneuvers_
  }
  get Reactions() {
    return this.reactions_
  }
  get SkillTechniques() {
    return this.skill_techniques_
  }
  get SpiritName() {
    return this.spirit_name_
  }
  get SpiritType() {
    return this.spirit_type_
  }
  get SpiritTechniques() {
    return this.spirit_techniques_
  }
  get SpiritStances() {
    return this.spirit_stances_
  }
  get SpiritStancesCreation() {
    if (this.spirit_stances_.length == 1) return []
    return this.spirit_stances_.slice(1)
  }
  get MartialStances() {
    return this.martial_stances_
  }
  get MartialStancesCreation() {
    if (this.martial_stances_.length == 1) return []
    return this.martial_stances_.slice(1)
  }
  get UnarmedWeapons() {
    return this.unarmed_weapons_
  }
  get UnarmedWeaponsCreation() {
    if (this.unarmed_weapons_.length == 2) return []
    return this.unarmed_weapons_.slice(2)
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
    if (this.equipped_armor_ != null && this.equipped_armor_.HasManeuver) this.RemoveReaction(this.equipped_armor_.Maneuver)
    this.equipped_armor_ = armor
    if (armor.HasManeuver) this.AddReaction(armor.Maneuver)
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
  public AddReaction(reaction: string) {
    if (!this.reactions_.includes(reaction)) this.reactions_.push(reaction)
  }
  public RemoveReaction(reaction: string) {
    var index = this.reactions_.indexOf(reaction, 0)
    if (index > -1) {
      this.reactions_.splice(index, 1)
    }
  }
  public AddManeuver(maneuver: string) {
    if (!this.maneuvers_.includes(maneuver)) this.maneuvers_.push(maneuver)
  }
  public RemoveManeuver(maneuver: string) {
    var index = this.maneuvers_.indexOf(maneuver, 0)
    if (index > -1) {
      this.maneuvers_.splice(index, 1)
    }
  }
  public AddWeapon(weapon: Weapon) {
    if (this.weapon_weight_ + weapon.Encumbrance > this.kMaxWeaponWeight) return
    this.weapons_.push(weapon.Name)
    this.weapon_weight_ += weapon.Encumbrance
    if (weapon.HasReaction) this.AddReaction(weapon.Reaction)
  }
  public AddUnarmedWeapon(weapon: Weapon) {
    if (this.HasAllUnarmed) return
    if (!this.unarmed_weapons_.includes(weapon.Name)) this.unarmed_weapons_.push(weapon.Name)
  }
  public RemoveWeapon(weapon: Weapon) {
    var index = this.weapons_.indexOf(weapon.Name, 0)
    if (index > -1) {
      this.weapons_.splice(index, 1)
      this.weapon_weight_ -= weapon.Encumbrance
      if (weapon.HasReaction) this.RemoveReaction(weapon.Reaction)
    }
  }
  public RemoveUnarmedWeapon(weapon: Weapon) {
    if (weapon.Name != 'Hand' && weapon.Name != 'Slam') {
      var index = this.unarmed_weapons_.indexOf(weapon.Name, 0)
      if (index > -1) this.unarmed_weapons_.splice(index, 1)
    }
  }
  public AddSpiritStance(spirit_stance: Stance) {
    if (this.spirit_stances_.length == this.kMaxSpiritStances) return
    if (this.spirit_stances_.includes(spirit_stance.Name)) return
    this.spirit_stances_.push(spirit_stance.Name)
    if (spirit_stance.SpecialHeader.includes('Martial Form')) this.martial_forms_ += 2
  }
  public AddMartialStance(martial_stance: Stance) {
    if (this.martial_stances_.length == this.kMaxSpiritStances) return
    if (this.martial_stances_.includes(martial_stance.Name)) return
    this.martial_stances_.push(martial_stance.Name)
    if (martial_stance.SpecialHeader.includes('Martial Form')) this.martial_forms_ += 2
  }
  public AddSkillTech(tech: Technique) {
    if (this.HasAllTechniques) return
    if (this.skill_techniques_.includes(tech.Name)) return
    this.skill_techniques_.push(tech.Name)
    if (tech.Keywords.includes('Martial Form')) this.martial_forms_++
  }
  public AddSpiritTech(tech: Technique) {
    if (this.HasAllTechniques) return
    if (this.spirit_techniques_.includes(tech.Name)) return
    this.spirit_techniques_.push(tech.Name)
    if (tech.Keywords.includes('Martial Form')) this.martial_forms_++
  }
  public RemoveSpiritStance(spirit_stance: Stance) {
    if (spirit_stance.Name != 'No SpiritStance') {
      var index = this.spirit_stances_.indexOf(spirit_stance.Name, 0)
      if (index > -1) {
        this.spirit_stances_.splice(index, 1)
      }
    }
  }
  public RemoveMartialStance(martial_stance: Stance) {
    if (martial_stance.Name != 'No Martial Stance') {
      var index = this.martial_stances_.indexOf(martial_stance.Name, 0)
      if (index > -1) {
        this.martial_stances_.splice(index, 1)
        if (martial_stance.SpecialHeader.includes('Martial Form')) this.martial_forms_--
      }
    }
  }
  public RemoveSkillTech(tech: Technique) {
    var index = this.skill_techniques_.indexOf(tech.Name, 0)
    if (index > -1) {
      this.skill_techniques_.splice(index, 1)
      if (tech.Keywords.includes('Martial Form')) this.martial_forms_--
    }
  }
  public RemoveSpiritTech(tech: Technique) {
    var index = this.spirit_techniques_.indexOf(tech.Name, 0)
    if (index > -1) {
      this.spirit_techniques_.splice(index, 1)
      if (tech.Keywords.includes('Martial Form')) this.martial_forms_--
    }
  }
  public ClearSpiritInfo() {
    this.spirit_techniques_ = []
    this.spirit_stances_ = ['No Stance']
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
  public CanAddUnarmedWeapon() {
    return this.unarmed_weapons_.length - 2 <= this.martial_forms_
  }
  get Complete() {
    return this.HasSpirit && this.HasEquippedArmor && this.HasAllWeapons && this.HasAllSpiritStancesMartialStances && this.HasAllTechniques && this.HasNames
  }
  get HasAllWeapons() {
    return this.weapon_weight_ == this.kMaxWeaponWeight
  }
  get HasAllUnarmed() {
    return this.unarmed_weapons_.length == this.martial_forms_ + 2
  }
  get WeaponWeightRemaining() {
    return this.kMaxWeaponWeight - this.weapon_weight_
  }
  get HasAllSpiritStancesMartialStances() {
    return this.SpiritStancesRemaining == 0 && this.MartialStancesRemaining == 0
  }
  get AnyStanceUnequipped() {
    return this.current_spirit_stance_.Name == 'No Stance' || this.current_martial_stance_.Name == 'No Stance'
  }
  get SpiritStancesRemaining() {
    return Math.min(this.kMaxSpiritStances - this.spirit_stances_.length)
  }
  get MartialStancesRemaining() {
    return Math.min(this.kMaxSpiritStances - this.martial_stances_.length)
  }
  get HasNames() {
    return this.Name != '' && this.SpiritName != ''
  }
  get HasAllTechniques() {
    return this.TechniquesRemaining == 0
  }
  get TechniquesRemaining() {
    return this.kMaxTechniques - this.skill_techniques_.length - this.spirit_techniques_.length
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
      equipped_armor: character.equipped_armor_ ? character.equipped_armor_.Name : '',
      focus: character.focus_,
      grit: character.grit_,
      current_health: character.current_health_,
      main_hand: character.main_hand_ ? character.main_hand_.Name : '',
      martial_forms: character.martial_forms_,
      max_health: character.max_health_,
      momentum: character.momentum_,
      name: character.name_,
      off_hand: character.off_hand_ ? character.off_hand_.Name : '',
      player_character: character.player_character_,
      reflex: character.reflex_,
      maneuvers: character.maneuvers_,
      reactions: character.reactions_,
      skill_techniques: character.skill_techniques_,
      spirit_name: character.spirit_name_,
      spirit_techniques: character.spirit_techniques_,
      spirit_type: character.spirit_type_,
      spirit_stances: character.spirit_stances_,
      martial_stances: character.martial_stances_,
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
    if ('current_spirit_stance' in data) this.current_spirit_stance_ = store.getters.getSpiritStance(data.current_spirit_stance)
    if ('current_martial_stance' in data) this.current_martial_stance_ = store.getters.getSpiritStance(data.current_martial_stance)
    this.current_endurance_ = data.current_endurance
    if ('equipped_armor' in data) this.equipped_armor_ = store.getters.getArmor(data.equipped_armor)
    this.focus_ = data.focus || 0
    this.grit_ = data.grit || 0
    this.current_health_ = data.current_health || 15
    if ('main_hand' in data && data.main_hand != '') this.equipped_armor_ = store.getters.getWeapon(data.main_hand)
    this.martial_forms_ = data.martial_forms || 0
    this.max_health_ = data.max_health || 15
    this.momentum_ = data.momentum || 0
    this.name_ = data.name || ''
    if ('off_hand' in data && data.off_hand != '') this.equipped_armor_ = store.getters.getWeapon(data.off_hand)
    this.player_character_ = data.player_character || true
    this.reflex_ = data.reflex || 0
    this.maneuvers_ = data.maneuvers || []
    this.reactions_ = data.reactions || []
    this.skill_techniques_ = data.skill_techniques || []
    this.spirit_name_ = data.spirit_name || ''
    this.spirit_techniques_ = data.spirit_techniques || []
    this.spirit_type_ = data.spirit_type || ''
    this.spirit_stances_ = data.spirit_stances || []
    this.martial_stances_ = data.martial_stances || []
    this.unarmed_weapons_ = data.unarmed_weapons || []
    this.weapons_ = data.weapons || []
    this.weapon_weight_ = data.weapon_weight || 0
  }
}
export default Character
