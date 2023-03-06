import { store } from '@/store'
import { Chart } from '@/class'

class Status {
  private desc_: string
  private effect_: string
  private special_: string
  private name_: string
  private remove_: string

  public constructor() {
    this.desc_ = ''
    this.effect_ = ''
    this.name_ = ''
    this.special_ = ''
    this.remove_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Desc() {
    return this.desc_
  }
  get Name() {
    return this.name_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasSpecial() {
    return this.special_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get RemoveHeader() {
    return '**Remove:** ' + this.remove_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(statusData: IStatusData): Status {
    const a = new Status()
    a.setStatusData(statusData)
    return a
  }

  public setStatusData(data: IStatusData): void {
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.name_ = data.name || ''
    this.special_ = data.special || ''
    this.remove_ = data.remove || ''
  }
}
export default Status
