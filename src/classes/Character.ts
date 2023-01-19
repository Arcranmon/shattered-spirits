import { store } from '@/store'
import { Armor, Stance, Weapon, Technique } from '@/class'

class Character {
  private current_stance_: Stance
  private current_style_: Stance
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
  private enhancements_: Array<string>
  private reactions_: Array<string>
  private skill_techniques_: Array<string>
  private spirit_name_: string
  private spirit_type_: string
  private spirit_techniques_: Array<string>
  private stances_: Array<string>
  private styles_: Array<string>
  private unarmed_weapons_: Array<string>
  private weapons_: Array<string>

  private weapon_weight_: number

  kDefaultEnhancements = ['Quick Strike', 'Strong Strike', 'Leap']
  kDefaultReactions = ['Retrieve', 'Reorient', 'Deflect', 'Dodge', 'Opportunity Attack', 'Counter']

  kMaxWeaponWeight = 8
  kMaxStances = 3
  kMaxTechniques = 6

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.current_stance_ = store.getters.getStance('No Stance')
    this.current_style_ = store.getters.getStance('No Style')
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
    this.enhancements_ = this.kDefaultEnhancements
    this.reactions_ = this.kDefaultReactions
    this.skill_techniques_ = []
    this.spirit_name_ = ''
    this.spirit_techniques_ = []
    this.spirit_type_ = ''
    this.stances_ = ['No Stance']
    this.styles_ = ['No Style']
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
  get CurrentStance() {
    return this.current_stance_
  }
  get CurrentStyle() {
    return this.current_style_
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
    if (this.current_stance_.Refresh.Momentum != 0 || this.current_style_.Refresh.Momentum != 0)
      refresh = this.SmartCommas(this.current_stance_.Refresh.Momentum + this.current_style_.Refresh.Momentum + ' Momentum', refresh)
    if (this.current_stance_.Refresh.Focus != 0 || this.current_style_.Refresh.Focus != 0)
      refresh = this.SmartCommas(this.current_stance_.Refresh.Focus + this.current_style_.Refresh.Focus + ' Focus', refresh)
    if (this.current_stance_.Refresh.Grit != 0 || this.current_style_.Refresh.Grit != 0)
      refresh = this.SmartCommas(this.current_stance_.Refresh.Grit + this.current_style_.Refresh.Grit + ' Grit', refresh)
    if (this.current_stance_.Refresh.reflex != 0 || this.current_style_.Refresh.reflex != 0)
      refresh = this.SmartCommas(this.current_stance_.Refresh.reflex + this.current_style_.Refresh.reflex + ' reflex', refresh)
    if (this.current_stance_.Refresh.Additional != '') refresh = this.SmartCommas(this.current_stance_.Refresh.Additional, refresh)
    if (this.current_style_.Refresh.Additional != '') refresh = this.SmartCommas(this.current_style_.Refresh.Additional, refresh)

    return refresh
  }
  public ApplyRefresh() {
    this.momentum_ += this.current_stance_.Refresh.Momentum + this.current_style_.Refresh.Momentum
    this.grit_ += this.current_stance_.Refresh.Grit + this.current_style_.Refresh.Grit
    this.focus_ += this.current_stance_.Refresh.Focus + this.current_style_.Refresh.Focus
    this.reflex_ += this.current_stance_.Refresh.reflex + this.current_style_.Refresh.reflex
  }
  public ResetDefault() {
    this.momentum_ = 0
    this.grit_ = 0
    this.focus_ = 0
    this.reflex_ = 0
    this.current_health_ = this.max_health_
    this.current_endurance_ = this.EquippedArmor.Endurance
  }
  get Enhancements() {
    return this.enhancements_
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
  get Stances() {
    return this.stances_
  }
  get StancesCreation() {
    if (this.stances_.length == 1) return []
    return this.stances_.slice(1)
  }
  get Styles() {
    return this.styles_
  }
  get StylesCreation() {
    if (this.styles_.length == 1) return []
    return this.styles_.slice(1)
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
  set CurrentStance(stance: Stance) {
    this.current_stance_ = stance
  }
  set CurrentStyle(stance: Stance) {
    this.current_style_ = stance
  }
  set EquippedArmor(armor: Armor) {
    if (this.equipped_armor_ != null && this.equipped_armor_.HasReaction) this.RemoveReaction(this.equipped_armor_.Reaction)
    this.equipped_armor_ = armor
    if (armor.HasReaction) this.AddReaction(armor.Reaction)
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
  public AddEnhancement(enhancement: string) {
    if (!this.enhancements_.includes(enhancement)) this.enhancements_.push(enhancement)
  }
  public RemoveEnhancement(enhancement: string) {
    var index = this.enhancements_.indexOf(enhancement, 0)
    if (index > -1) {
      this.enhancements_.splice(index, 1)
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
  public AddStance(stance: Stance) {
    if (this.stances_.length == this.kMaxStances) return
    if (this.stances_.includes(stance.Name)) return
    this.stances_.push(stance.Name)
    if (stance.SpecialHeader.includes('Martial Form')) this.martial_forms_ += 2
    if (stance.HasEnhancement) this.AddEnhancement(stance.Enhancement)
    if (stance.HasReaction) this.AddReaction(stance.Reaction)
  }
  public AddStyle(stance: Stance) {
    if (this.styles_.length == this.kMaxStances) return
    if (this.styles_.includes(stance.Name)) return
    this.styles_.push(stance.Name)
    if (stance.SpecialHeader.includes('Martial Form')) this.martial_forms_ += 2
    if (stance.HasEnhancement) this.AddEnhancement(stance.Enhancement)
    if (stance.HasReaction) this.AddReaction(stance.Reaction)
  }
  public AddSkillTech(tech: Technique) {
    if (this.HasAllTechniques) return
    if (this.skill_techniques_.includes(tech.Name)) return
    this.skill_techniques_.push(tech.Name)
    if (tech.Keywords.includes('Martial Form')) this.martial_forms_++
    if (tech.HasEnhancement) this.AddEnhancement(tech.Enhancement)
    if (tech.HasReaction) this.AddReaction(tech.Reaction)
  }
  public AddSpiritTech(tech: Technique) {
    if (this.HasAllTechniques) return
    if (this.spirit_techniques_.includes(tech.Name)) return
    this.spirit_techniques_.push(tech.Name)
    if (tech.Keywords.includes('Martial Form')) this.martial_forms_++
    if (tech.HasEnhancement) this.AddEnhancement(tech.Enhancement)
    if (tech.HasReaction) this.AddReaction(tech.Reaction)
  }
  public RemoveStance(stance: Stance) {
    if (stance.Name != 'No Stance') {
      var index = this.stances_.indexOf(stance.Name, 0)
      if (index > -1) {
        this.stances_.splice(index, 1)
        if (stance.HasEnhancement) this.RemoveEnhancement(stance.Enhancement)
        if (stance.HasReaction) this.RemoveReaction(stance.Reaction)
      }
    }
  }
  public RemoveStyle(stance: Stance) {
    if (stance.Name != 'No Style') {
      var index = this.styles_.indexOf(stance.Name, 0)
      if (index > -1) {
        this.styles_.splice(index, 1)
        if (stance.SpecialHeader.includes('Martial Form')) this.martial_forms_--
        if (stance.HasEnhancement) this.RemoveEnhancement(stance.Enhancement)
        if (stance.HasReaction) this.RemoveReaction(stance.Reaction)
      }
    }
  }
  public RemoveSkillTech(tech: Technique) {
    var index = this.skill_techniques_.indexOf(tech.Name, 0)
    if (index > -1) {
      this.skill_techniques_.splice(index, 1)
      if (tech.Keywords.includes('Martial Form')) this.martial_forms_--
      if (tech.HasEnhancement) this.RemoveEnhancement(tech.Enhancement)
      if (tech.HasReaction) this.RemoveReaction(tech.Reaction)
    }
  }
  public RemoveSpiritTech(tech: Technique) {
    var index = this.spirit_techniques_.indexOf(tech.Name, 0)
    if (index > -1) {
      this.spirit_techniques_.splice(index, 1)
      if (tech.Keywords.includes('Martial Form')) this.martial_forms_--
      if (tech.HasEnhancement) this.RemoveEnhancement(tech.Enhancement)
      if (tech.HasReaction) this.RemoveReaction(tech.Reaction)
    }
  }
  public ClearSpiritInfo() {
    this.spirit_techniques_ = []
    this.stances_ = ['No Stance']
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
    return this.HasSpirit && this.HasEquippedArmor && this.HasAllWeapons && this.HasAllStancesStyles && this.HasAllTechniques && this.HasNames
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
  get HasAllStancesStyles() {
    return this.StancesRemaining == 0 && this.StylesRemaining == 0
  }
  get HasNoEquippedStanceOrStyle() {
    return this.current_stance_.Name == 'No Stance' || this.current_style_.Name == 'No Style'
  }
  get StancesRemaining() {
    return Math.min(this.kMaxStances - this.stances_.length)
  }
  get StylesRemaining() {
    return Math.min(this.kMaxStances - this.styles_.length)
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
      current_stance: character.current_stance_ ? character.current_stance_.Name : '',
      current_style: character.current_style_ ? character.current_style_.Name : '',
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
      enhancements: character.enhancements_,
      reactions: character.reactions_,
      skill_techniques: character.skill_techniques_,
      spirit_name: character.spirit_name_,
      spirit_techniques: character.spirit_techniques_,
      spirit_type: character.spirit_type_,
      stances: character.stances_,
      styles: character.styles_,
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
    if ('current_stance' in data) this.current_stance_ = store.getters.getStance(data.current_stance)
    if ('current_style' in data) this.current_style_ = store.getters.getStance(data.current_style)
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
    this.enhancements_ = data.enhancements || []
    this.reactions_ = data.reactions || []
    this.skill_techniques_ = data.skill_techniques || []
    this.spirit_name_ = data.spirit_name || ''
    this.spirit_techniques_ = data.spirit_techniques || []
    this.spirit_type_ = data.spirit_type || ''
    this.stances_ = data.stances || []
    this.styles_ = data.styles || []
    this.unarmed_weapons_ = data.unarmed_weapons || []
    this.weapons_ = data.weapons || []
    this.weapon_weight_ = data.weapon_weight || 0
  }
}
export default Character
