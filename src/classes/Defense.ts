import { store } from '@/store'

class Defense {
  private poise_: number
  private grit_: number
  private reflex_: number

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get Poise() {
    return this.poise_
  }
  get Grit() {
    return this.grit_
  }
  get Reflex() {
    return this.reflex_
  }

  public get FormattedText() {
    var formatted_string = ''
    if (this.grit_ != 0) formatted_string = this.grit_.toString() + ' _Grit_'
    if (this.poise_ != 0) formatted_string = this.SmartCommas(this.poise_.toString() + ' _Poise_', formatted_string)
    if (this.reflex_ != 0) formatted_string = this.SmartCommas(this.reflex_.toString() + ' _Reflex_', formatted_string)
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
  public static Deserialize(discData: IDefenseData): Defense {
    const t = new Defense()
    t.setRefreshData(discData)
    return t
  }

  public setRefreshData(data: IDefenseData): void {
    this.poise_ = data.poise || 0
    this.grit_ = data.grit || 0
    this.reflex_ = data.reflex || 0
  }
}
export default Defense
