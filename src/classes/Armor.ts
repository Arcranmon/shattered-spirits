import { store } from '@/store'
import { Base } from '@/class'

class Armor extends Base {
  private category_: string
  private guard_: number
  private soak_: number
  private weight_: number
  private parry_: string
  private durability_: number
  private traits_: string[]

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================

  get Category() {
    return this.category_
  }
  get Guard() {
    return this.guard_
  }
  get Soak() {
    return this.soak_
  }
  get Weight() {
    return this.weight_
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
  get DurabilityHeader() {
    return '**Durability:** ' + this.durability_
  }
  get WeightHeader() {
    return '**Weight:** ' + this.weight_
  }
  get HasParry() {
    return this.parry_.length > 0
  }
  get ParryHeader() {
    return '**Parry:** ' + this.parry_
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
    this.setBaseData(data)
    this.guard_ = data.guard || 0
    this.soak_ = data.soak || 0
    this.durability_ = data.durability || 0
    this.category_ = data.category || ''
    this.weight_ = data.weight || 0
    this.parry_ = data.parry || ''
    this.traits_ = data.traits || []
  }
}
export default Armor
