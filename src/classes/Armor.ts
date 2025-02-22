import { store } from '@/store'
import { Base } from '@/class'

class Armor extends Base {
  private category_: string
  private load_: number
  private guard_: number
  private sacrifice_: string
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
  get ArmorSummary() {
    return '**Armor:** ' + this.guard_ + ' _Guard_, ' + this.durability_ + ' _Durability_, ' + this.load_ + ' _Load_'
  }
  get HasGuard() {
    return this.guard_ > 0
  }
  get GuardHeader() {
    return '**_Guard_:** ' + this.guard_
  }
  get DurabilityHeader() {
    return '**Durability:** ' + this.durability_
  }
  get HasTraits() {
    return this.traits_.length > 0
  }
  get TraitsHeader() {
    return '**Traits:** _' + this.traits_.join('_, _') + '_'
  }
  get HasSacrifice() {
    return this.sacrifice_.length > 0
  }
  get SacrificeHeader() {
    return '**_Sacrifice_:** ' + this.sacrifice_
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
    this.load_ = data.load || 0
    this.durability_ = data.durability || 0
    this.category_ = data.category || ''
    this.traits_ = data.traits || []
    this.sacrifice_ = data.sacrifice || ''
  }
}
export default Armor
