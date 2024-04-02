import { store } from '@/store'
import { SpiritForm, SpiritType } from '@/class'

var kBasicAttacks = ['Weapon Attack', 'Charged Attack', 'Quickened Attack', 'Swipe']
var kBasicActions = ['Fight', 'Shift', 'Raise Guard', 'Recover']
var kBasicStunts = ['Disengage', 'Draw/Stow', 'Combo', 'Leap', 'Sprint', 'Tumble', 'Use Environment']
var kBasicReactions = ['Flank', 'Engage', 'Opportunity Attack', 'Active Defense', 'Dodge']
var kBasicGambits = ['Basic Feint', 'Basic Flourish', 'Basic Sunder', 'Mark']

class Spirit {
  // Combat Qualities
  private vigor_: number
  private stamina_: number
  private current_health_: number

  private name_: string
  private spirit_form_: SpiritForm
  private spirit_type_: SpiritType
  private weapons_: Array<string>

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================
  get Name() {
    return this.name_
  }
  get SpiritForm() {
    return this.spirit_form_
  }
  get SpiritType() {
    return this.spirit_type_
  }
  get Weapons() {
    return this.weapons_
  }
  get Attacks() {
    var attacks = store.getters.getAttacksFromList(kBasicAttacks)
    var form_attacks = store.getters.getAttack(this.spirit_form_.BonusAttack)
    attacks = attacks.concat(form_attacks)
    attacks.sort((a, b) => a.Name.localeCompare(b.Name))
    return attacks
  }
  get Actions() {
    return store.getters.getManeuversFromList(kBasicActions)
  }
  get Stunts() {
    return store.getters.getManeuversFromList(kBasicStunts)
  }
  get Reactions() {
    return store.getters.getManeuversFromList(kBasicReactions)
  }
  get Gambits() {
    return store.getters.getManeuversFromList(kBasicGambits)
  }
  get AllTraits() {
    var traits = [...this.spirit_form_.Traits, ...this.spirit_type_.Traits]
    return traits
  }
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
  public ApplyRefresh() {}
  public ResetDefault() {
    this.vigor_ = 0
    this.current_health_ = this.spirit_form_.Health
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(spirit: Spirit): ISpiritData {
    return {
      //Character Save Data
      name: spirit.name_,
      spirit_form: spirit.spirit_form_.Name,
      spirit_type: spirit.spirit_type_.Name,
      weapons: spirit.weapons_,
      current_health: spirit.current_health_,
      stamina: spirit.stamina_,
      vigor: spirit.vigor_,
    }
  }

  public static Deserialize(data: ISpiritData): Spirit {
    const c = new Spirit()
    c.setSpiritData(data)
    return c
  }

  private setSpiritData(data: ISpiritData): void {
    this.spirit_form_ = store.getters.getSpiritForm(data.spirit_form)
    this.spirit_type_ = store.getters.getSpiritType(data.spirit_type)
    this.name_ = data.name || ''
    this.weapons_ = data.weapons || []
    this.current_health_ = data.current_health || 0
    this.stamina_ = data.stamina || 0
    this.vigor_ = data.vigor || 0
  }
}
export default Spirit
