import { store } from '@/store'
import { Combatant, SpiritForm, Subtype } from '@/class'

var kBasicAttacks = ['Weapon Attack', 'Brawl']
var kBasicActions = ['Prepare', 'Fight', 'Sprint', 'Raise Guard', 'Rebalance']
var kBasicStunts = ['Draw/Stow', 'Retreat', 'Leap']
var kBasicReactions = ['Opportunity Attack', 'Defend', 'Dodge']
var kBasicGambits = ['Lethal Strike', 'Gather Momentum']

class Spirit extends Combatant {
  private name_: string
  private form_: SpiritForm
  private subtype_: Subtype
  private weapons_: Array<string>

  private light_weapons_: number
  private heavy_weapons_: number
  private versatile_weapons_: number

  public constructor() {
    super()
    this.light_weapons_ = 0
    this.heavy_weapons_ = 0
    this.versatile_weapons_ = 0

    this.subtype_ = undefined
    this.form_ = undefined
    this.weapons_ = []
    this.name_ = ''
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get MaxStamina() {
    return 2
  }

  override get Guard() {
    return this.Form.Guard
  }

  override get Size() {
    return this.Form.Size
  }

  override get MoveChart() {
    return store.getters.getMovement(this.Form.Movement)
  }

  override get MaxMovement() {
    return this.MoveChart.Movement
  }

  override get Traits() {
    var traits = [...this.form_.Traits, ...this.subtype_.Traits]
    return traits
  }

  override get Weapons() {
    return store.getters.getWeaponsFromList(this.weapons_)
  }

  get Grit() {
    return this.Form.Grit + this.Subtype.Grit
  }
  get Reflex() {
    return this.Form.Reflex + this.Subtype.Reflex
  }
  get Focus() {
    return this.Form.Focus + this.Subtype.Focus
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================
  get Name() {
    return this.name_
  }
  set Name(name) {
    this.name_ = name
  }

  override get MaxHealth() {
    return this.Form.Health
  }

  get Form() {
    return this.form_
  }

  set Form(form) {
    this.ClearWeapons()
    this.form_ = form
    this.Health = this.Form.Health
  }

  get HasSubtype() {
    return this.subtype_
  }

  get Subtype() {
    return this.subtype_
  }

  set Subtype(input) {
    this.subtype_ = input
  }

  public AddWeapon(variable) {
    this.weapons_.push(variable)
    var weapon_stats = store.getters.getWeapon(variable)
    if (weapon_stats.Type == 'Light') this.light_weapons_++
    if (weapon_stats.Type == 'Versatile') this.versatile_weapons_++
    if (weapon_stats.Type == 'Heavy') this.heavy_weapons_++
  }

  public RemoveWeapon(idx) {
    var weapon_stats = store.getters.getWeapon(this.weapons_[idx])
    if (weapon_stats.Type == 'Light') this.light_weapons_--
    if (weapon_stats.Type == 'Versatile') this.versatile_weapons_--
    if (weapon_stats.Type == 'Heavy') this.heavy_weapons_--
    this.weapons_.splice(idx, 1)
  }

  get PrettyWeaponOptions() {
    var pretty_weapons = this.Form.Weapons.split(', ')
    return 'Your spirit may select ' + pretty_weapons[0] + ' Weapon and ' + pretty_weapons[1] + ' Weapon.'
  }

  get Attacks() {
    var attacks = store.getters.getAttacksFromList(kBasicAttacks)
    // var form_attacks = store.getters.getAttack(this.form_.BonusAttack)
    // attacks = attacks.concat(form_attacks)
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

  // ==========================================================
  // HELPERS
  // ==========================================================
  get HasForm() {
    return this.form_ != undefined
  }

  get HasWeapons() {
    if (this.form_ == undefined) return false
    if (this.weapons_.length != this.form_.WeaponLimits) return false

    return true
  }

  get HasFormAndWeapons() {
    return this.HasForm && this.HasWeapons
  }

  public CanAddWeapon(weapon) {
    if (this.weapons_.length >= this.Form.WeaponLimits) return false

    var type = weapon.Type
    console.log(type)

    if (type == 'Light') {
      if (this.light_weapons_ < this.Form.LightLimit) return true
      if (this.light_weapons_ == this.Form.LightLimit && this.light_weapons_ < this.Form.LightLimit + this.Form.LightVersatileLimit) return true
    }

    if (type == 'Versatile') {
      if (this.versatile_weapons_ < this.Form.VersatileLimit) return true
      if (this.versatile_weapons_ == this.Form.VersatileLimit && this.versatile_weapons_ < this.Form.VersatileLimit + this.Form.LightVersatileLimit) return true
      if (this.versatile_weapons_ == this.Form.VersatileLimit && this.versatile_weapons_ < this.Form.VersatileLimit + this.Form.VersatileHeavyLimit) return true
    }

    if (type == 'Heavy') {
      if (this.heavy_weapons_ < this.Form.HeavyLimit) {
        return true
      }
      if (this.heavy_weapons_ == this.Form.HeavyLimit && this.heavy_weapons_ < this.Form.HeavyLimit + this.Form.VersatileHeavyLimit) {
        return true
      }
    }

    if (
      this.heavy_weapons_ <= this.Form.HeavyLimit &&
      this.light_weapons_ <= this.Form.LightLimit &&
      this.versatile_weapons_ <= this.Form.VersatileLimit &&
      this.Form.AnyLimit > 0
    ) {
      return true
    }

    return false
  }

  private ClearWeapons() {
    this.weapons_ = []
    this.light_weapons_ = 0
    this.versatile_weapons_ = 0
    this.heavy_weapons_ = 0
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(spirit: Spirit): ISpiritData {
    return {
      ...super.Serialize(spirit),
      name: spirit.name_,
      spirit_form: spirit.form_.Name,
      subtype: spirit.subtype_.Name,
      weapons: spirit.weapons_,
    }
  }

  public static Deserialize(data: ISpiritData): Spirit {
    const c = new Spirit()
    c.setSpiritData(data)
    return c
  }

  private setSpiritData(data: ISpiritData): void {
    this.form_ = store.getters.getSpiritForm(data.spirit_form)
    this.subtype_ = store.getters.getSubtype(data.subtype)
    this.name_ = data.name || ''
    this.weapons_ = data.weapons || []
    this.setCombatantData(data)
  }
}
export default Spirit
