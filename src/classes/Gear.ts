import { store } from '@/store'

class Gear {
  private name_: string
  private desc_: string
  private effect_: string
  private special_: string
  private weight_: number

  public constructor() {
    this.name_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================

  get Name() {
    return this.name_
  }
  get Desc() {
    return this.desc_
  }
  get Weight() {
    return this.weight_
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get WeightHeader() {
    if (this.weight_ != 0) return 'Weight ' + this.weight_
  }
  get HasSpecial() {
    return this.special_ != ''
  }
  get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(armorData: IGearData): Gear {
    const t = new Gear()
    t.setGearData(armorData)
    return t
  }

  public setGearData(data: IGearData): void {
    this.name_ = data.name || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.special_ = data.special || ''
    this.weight_ = data.weight || 0
  }
}
export default Gear
