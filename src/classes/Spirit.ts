import { store } from '@/store'
import { SpiritForm, Subtype } from '@/class'

var kBasicAttacks = ['Weapon Attack', 'Charged Attack', 'Quickened Attack']
var kBasicActions = ['Hide', 'Fight', 'Shift', 'Raise Guard', 'Rally', 'Focus']
var kBasicStunts = ['Disengage', 'Draw/Stow', 'Combo', 'Leap', 'Sprint', 'Tumble', 'Use Environment']
var kBasicReactions = ['Flank', 'Engage', 'Opportunity Attack', 'Active Defense', 'Dodge']
var kBasicGambits = ['Aim', 'Basic Feint', 'Basic Flourish', 'Basic Sunder', 'Critical Hit', 'Mark']
class Spirit {
  // Combat Qualities
  private vigor_: number
  private stamina_: number
  private current_health_: number
  private statuses_: Array<IStatusEffect>

  private name_: string
  private form_: SpiritForm
  private subtype_: Subtype
  private weapons_: Array<string>

  private light_weapons_: number
  private heavy_weapons_: number
  private versatile_weapons_: number

  public constructor() {
    this.light_weapons_ = 0
    this.heavy_weapons_ = 0
    this.versatile_weapons_ = 0

    this.subtype_ = undefined
    this.form_ = undefined
    this.weapons_ = []
    this.name_ = ''
    this.stamina_ = 0
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

  get Stamina() {
    return this.stamina_
  }

  set Stamina(stamina: number) {
    this.stamina_ = stamina
  }

  get MaxStamina() {
    return 2
  }

  public AddStatus(status: string) {
    var idx = this.statuses_.findIndex((e) => e.status == status)
    if (idx == -1) {
      this.statuses_.push({ status: status, stack: 1 })
      idx = this.statuses_.length - 1
    } else this.statuses_[idx].stack += 1

    var status_info = store.getters.getStatus(status)

    if (status_info.Type == 'Status Effect') this.statuses_[idx].stack = 777

    this.statuses_.sort((a, b) => a.status.localeCompare(b.status))
  }

  public RemoveStatus(status: string) {
    var idx = this.statuses_.findIndex((e) => e.status == status)
    if (idx == -1) return
    else if (this.statuses_[idx].stack == 777) this.statuses_.splice(idx, 1)
    else {
      this.statuses_[idx].stack -= 1
      if (this.statuses_[idx].stack == 0) this.statuses_.splice(idx, 1)
    }
  }

  public get StatusEffects() {
    return this.statuses_
  }

  get Form() {
    return this.form_
  }
  set Form(form) {
    this.ClearWeapons()
    this.form_ = form
    this.current_health_ = this.Form.Health
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

  get Weapons() {
    return this.weapons_
  }

  get PrettyWeaponOptions() {
    var pretty_weapons = this.Form.Weapons.split(', ')
    return 'Your spirit may select ' + pretty_weapons[0] + ' Weapon and ' + pretty_weapons[1] + ' Weapon.'
  }

  get Attacks() {
    var attacks = store.getters.getAttacksFromList(kBasicAttacks)
    var form_attacks = store.getters.getAttack(this.form_.BonusAttack)
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
    var traits = [...this.form_.Traits, ...this.subtype_.Traits]
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
    this.current_health_ = this.form_.Health
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
      //Character Save Data
      name: spirit.name_,
      spirit_form: spirit.form_.Name,
      subtype: spirit.subtype_.Name,
      weapons: spirit.weapons_,
      current_health: spirit.current_health_,
      stamina: spirit.stamina_,
      statuses: spirit.statuses_,
      vigor: spirit.vigor_,
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
    this.current_health_ = data.current_health || 0
    this.stamina_ = data.stamina || 0
    this.statuses_ = data.statuses || []
    this.vigor_ = data.vigor || 0
  }
}
export default Spirit
