import { store } from '@/store'
import { Base } from '@/class'

class SpiritForm extends Base {
  private stamina_: number
  private block_: number
  private defenses_: IDefenseData
  private weapons_: string
  private move_: number
  private traits_: string[]
  private range_modifier_: string

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Movement() {
    return this.move_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================

  public get HasDefenses() {
    return this.defenses_
  }
  public get DefensesHeader() {
    var header = ''
    if (this.defenses_.focus > 0) {
      if (header.length > 0) header += ', '
      header += this.defenses_.focus + ' _Focus_'
    }
    if (this.defenses_.grit > 0) {
      if (header.length > 0) header += ', '
      header += this.defenses_.grit + ' _Grit_'
    }
    if (this.defenses_.reflex > 0) {
      if (header.length > 0) header += ', '
      header += this.defenses_.reflex + ' _Reflex_'
    }
    return '**Defenses:** ' + header
  }
  public get StaminaHeader() {
    return '**Stamina:** ' + this.stamina_
  }
  public get BlockHeader() {
    return '**Stun:** ' + this.block_
  }
  public get MovementHeader() {
    return '**Move:** ' + this.move_
  }
  public get Stamina() {
    return this.stamina_
  }
  public get Weapons() {
    return this.weapons_
  }
  public get WeaponsHeader() {
    return '**Weapons:** ' + this.weapons_
  }
  public get RangeHeader() {
    return '**Summon Range:** ' + this.range_modifier_
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get Traits() {
    return this.traits_
  }
  public get TraitsHeader() {
    return '**Traits:** \n* _' + this.traits_.join('_\n* _') + '_'
  }
  public get Grit() {
    if (this.defenses_.grit) return this.defenses_.grit
    return 0
  }

  public get Reflex() {
    if (this.defenses_.reflex) return this.defenses_.reflex
    return 0
  }

  public get Focus() {
    if (this.defenses_.focus) return this.defenses_.focus
    return 0
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ISpiritFormData): SpiritForm {
    const c = new SpiritForm(data.name)
    c.setSpiritFormData(data)
    return c
  }

  private setSpiritFormData(data: ISpiritFormData): void {
    this.setBaseData(data)
    this.stamina_ = data.stamina
    this.block_ = data.stun
    this.defenses_ = data.defenses || null
    this.weapons_ = data.weapons || ''
    this.move_ = data.move || 0
    this.traits_ = data.traits || []
    this.range_modifier_ = data.range_modifier || ''
  }
}
export default SpiritForm
