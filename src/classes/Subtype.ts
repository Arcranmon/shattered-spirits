import { store } from '@/store'
import { Base, Defenses } from '@/class'

class Subtype extends Base {
  private defenses_: Defenses
  private element_: string
  private health_: number
  private guard_: number
  private soak_: number
  private move_: number
  private range_: string
  private traits_: string[]

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get Health() {
    return this.health_
  }

  public get HealthHeader() {
    return '**Health:** ' + this.Health
  }

  public get Guard() {
    return this.guard_
  }

  public get ArmorHeader() {
    return '**Armor:** ' + this.guard_ + ' _Guard_, ' + this.soak_ + ' _Soak_'
  }

  public get Soak() {
    return this.soak_
  }

  public get Movement() {
    return this.move_
  }

  public get MovementHeader() {
    return '**Move:** ' + this.move_
  }

  public get Element() {
    return this.element_
  }
  public get SpiritType() {
    return '_' + this.element_ + '_ Spirit'
  }
  public get HasDefenses() {
    return this.defenses_
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get Traits() {
    return this.traits_
  }
  public get TraitsText() {
    return '**Traits:** \n* _' + this.traits_.join('_\n* _') + '_'
  }
  public get Defenses() {
    return this.defenses_
  }
  public get RangeHeader() {
    return '**Manifest Range:** ' + this.range_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ISubtypeData): Subtype {
    const c = new Subtype(data.name)
    c.setSubtypeData(data)
    return c
  }

  private setSubtypeData(data: ISubtypeData): void {
    this.setBaseData(data)
    this.element_ = data.element || ''
    this.defenses_ = data.defenses ? Defenses.Deserialize(data.defenses) : null
    this.traits_ = data.traits || []
    this.health_ = data.health || 0
    this.move_ = data.move || 0
    this.guard_ = data.guard || 0
    this.soak_ = data.soak || 0
    this.range_ = data.range || ''
  }
}
export default Subtype
