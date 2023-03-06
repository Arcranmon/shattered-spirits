import { store } from '@/store'
import { Refresh } from '@/class'

class Stance {
  private accumulate_: string
  private desc_: string
  private effect_: string
  private refresh_: Refresh
  private reqs_: string
  private name_: string
  private special_: string

  public constructor() {
    this.accumulate_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.refresh_ = null
    this.reqs_ = ''
    this.name_ = ''
    this.special_ = ''
  }

  public get Desc() {
    return this.desc_
  }

  public get Name() {
    return this.name_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasAccumulate() {
    return this.accumulate_.length > 0
  }
  public get AccumulateHeader() {
    return '**Accumulate:** ' + this.accumulate_
  }
  public get HasEffect() {
    return this.effect_.length > 0
  }
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get HasRefresh() {
    return this.refresh_ != null
  }
  public get RefreshHeader() {
    return '**Refresh:** ' + this.refresh_.FormattedText
  }
  public get Refresh() {
    return this.refresh_
  }
  public get HasSpecial() {
    return this.special_.length > 0
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get HasRequirements() {
    return this.reqs_ != ''
  }
  public get RequirementsHeader() {
    return '**Requirements:** ' + this.reqs_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(stanceData: IStanceData): Stance {
    const t = new Stance()
    t.setStanceData(stanceData)
    return t
  }

  public setStanceData(data: IStanceData): void {
    this.accumulate_ = data.accumulate || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.name_ = data.name || ''
    this.reqs_ = data.reqs || ''
    this.special_ = data.special || ''
    if ('refresh' in data) {
      this.refresh_ = Refresh.Deserialize(data.refresh)
    }
  }
}
export default Stance
