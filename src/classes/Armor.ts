import { store } from '@/store'
import { Ability, Equipment } from '@/class'

class Armor extends Equipment {
  private guard_: number
  private soak_: number
  private traits_: string[]

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================

  get Guard() {
    return this.guard_
  }
  get Soak() {
    return this.soak_
  }
  get Traits() {
    return this.traits_
  }
  public get Icon() {
    if (this.Category == 'Error') return ''
    return require('@/assets/' + this.Category + '.svg')
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================

  get HasGuard() {
    return this.guard_ > 0
  }
  get GuardHeader() {
    return '**_Guard_:** ' + this.guard_
  }
  get HasSoak() {
    return this.soak_ > 0
  }
  get SoakHeader() {
    return '**_Soak_:** ' + this.soak_
  }
  get HasTraits() {
    return this.traits_.length > 0
  }
  get TraitsHeader() {
    return '**Traits:** _' + this.traits_.join('_, _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IArmorData): Armor {
    const t = new Armor(data.name)
    t.setArmorData(data)
    return t
  }

  public setArmorData(data: IArmorData): void {
    this.setEquipmentData(data)
    this.guard_ = data.guard || 0
    this.soak_ = data.soak || 0
    this.traits_ = data.traits || []
  }
}
export default Armor
