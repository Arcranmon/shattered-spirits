import { store } from '@/store'

class Defense {
  private poise_: number
  private block_: number
  private dodge_: number

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get Poise() {
    return this.poise_
  }
  get Block() {
    return this.block_
  }
  get Dodge() {
    return this.dodge_
  }

  public get FormattedText() {
    var formatted_string = ''
    if (this.block_ != 0) formatted_string = this.block_.toString() + ' _Block_'
    if (this.poise_ != 0) formatted_string = this.SmartCommas(this.poise_.toString() + ' _Poise_', formatted_string)
    if (this.dodge_ != 0) formatted_string = this.SmartCommas(this.dodge_.toString() + ' _Dodge_', formatted_string)
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
    this.block_ = data.block || 0
    this.dodge_ = data.dodge || 0
  }
}
export default Defense
