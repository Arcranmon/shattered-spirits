import { store } from '@/store'

class Refresh {
  private additional_: string
  private focus_: number
  private grit_: number
  private momentum_: number
  private reflex_: number

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get Additional() {
    return this.additional_
  }
  get Poise() {
    return this.focus_
  }
  get Grit() {
    return this.grit_
  }
  get Momentum() {
    return this.momentum_
  }
  get reflex() {
    return this.reflex_
  }

  public get FormattedText() {
    var formatted_string = ''
    if (this.focus_ != 0) formatted_string = this.focus_.toString() + ' _Poise_'
    if (this.grit_ != 0) formatted_string = this.SmartCommas(this.grit_.toString() + ' _Grit_', formatted_string)
    if (this.momentum_ != 0) formatted_string = this.SmartCommas(this.momentum_.toString() + ' _Momentum_', formatted_string)
    if (this.reflex_ != 0) formatted_string = this.SmartCommas(this.reflex_.toString() + ' _Reflex_', formatted_string)
    if (this.additional_ != '') formatted_string = this.SmartCommas(this.additional_, formatted_string)
    return formatted_string
  }

  // ==========================================================
  // HELPERS
  // ==========================================================
  private SmartCommas(in_string: string, out_string: string) {
    if (out_string.length > 0) return out_string + ', ' + in_string
    return out_string + in_string
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(discData: IRefreshData): Refresh {
    const t = new Refresh()
    t.setRefreshData(discData)
    return t
  }

  public setRefreshData(data: IRefreshData): void {
    this.additional_ = data.additional || ''
    this.focus_ = data.focus || 0
    this.grit_ = data.grit || 0
    this.momentum_ = data.momentum || 0
    this.reflex_ = data.reflex || 0
  }
}
export default Refresh
