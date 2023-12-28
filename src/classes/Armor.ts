import { store } from '@/store'

class Armor {
  private category_: string
  private guard_: number
  private durability_: number
  private name_: string
  private special_: string
  private weight_: number

  public constructor() {
    this.name_ = ''
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
  get Name() {
    return this.name_
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
  }
  get ArmorHeader() {
    return '**Armor:** ' + this.guard_ + ' Guard, ' + this.durability_ + ' Durability'
  }
  get WeightHeader() {
    if (this.durability_ != 0) return '**Weight:** ' + this.weight_
  }
  get HasSpecial() {
    return this.special_ != ''
  }
  get SpecialHeader() {
    return '**Special:** ' + this.special_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(armorData: IArmorData): Armor {
    const t = new Armor()
    t.setArmorData(armorData)
    return t
  }

  public setArmorData(data: IArmorData): void {
    this.guard_ = data.guard || 0
    this.category_ = data.category || ''
    this.durability_ = data.durability || 0
    this.name_ = data.name || ''
    this.special_ = data.special || ''
    this.weight_ = data.weight || 0
  }
}
export default Armor
