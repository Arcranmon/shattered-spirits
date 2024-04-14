import { store } from '@/store'
import { Base } from '@/class'

class Armor extends Base {
  private category_: string
  private guard_: number
  private durability_: number
  private weight_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================

  get Category() {
    return this.category_
  }
  get Defenses() {
    return this.guard_
  }
  get Durability() {
    return this.durability_
  }
  get Weight() {
    return this.weight_
  }
  public get Icon() {
    if (this.Category == 'Error') return ''
    return require('@/assets/' + this.Category + '.svg')
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get GuardHeader() {
    return '**Guard:** ' + this.guard_
  }
  get DurabilityHeader() {
    if (this.durability_ != 0) return ', Durability ' + this.durability_
    return ''
  }
  get ArmorHeader() {
    return '**Armor:** ' + this.guard_ + ' Guard' + this.DurabilityHeader
  }
  get WeightHeader() {
    return '**Weight:** ' + this.weight_
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
    this.category_ = data.category || ''
    this.durability_ = data.durability || 0
    this.weight_ = data.weight || 0
  }
}
export default Armor
