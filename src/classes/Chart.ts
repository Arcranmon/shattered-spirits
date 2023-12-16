import { store } from '@/store'

class Chart {
  private roll_: Array<string>
  private damage_: Array<number>
  private damage_type_: string
  private keywords_: Array<string>
  private status_: Array<string>

  public constructor() {
    this.roll_ = []
    this.damage_ = []
    this.status_ = []
    this.keywords_ = []
  }

  public Damage(i: number): string {
    if (this.roll_[i] == 'Miss') return '-'
    return this.damage_[i].toString()
  }
  get DamageType() {
    return this.damage_type_
  }
  get HasDamageType() {
    return this.damage_type_ != ''
  }
  get DetailsHeader() {
    if (this.damage_type_ === undefined) return
    var damage_type = '_' + this.damage_type_ + '_'
    damage_type = '**Attack Details:** ' + damage_type.replace('/', '_/_') + ' Damage'
    if (this.HasKeywords) return damage_type + ' ' + this.KeywordsHeader
    return damage_type
  }
  public get HasKeywords() {
    return this.keywords_.length > 0
  }
  public get KeywordsHeader() {
    return '[_' + this.keywords_.join('_, _') + '_]'
  }
  public get Roll() {
    return this.roll_
  }
  public Status(i: number): string {
    return this.status_[i]
  }

  public get HasDamage() {
    return this.damage_.length > 0
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(techData: IChartData): Chart {
    const t = new Chart()
    t.setChartData(techData)
    return t
  }

  public setChartData(data: IChartData): void {
    this.roll_ = data.roll || []
    this.damage_ = data.damage || []
    this.status_ = data.status || []
    this.keywords_ = data.keywords || []
    this.damage_type_ = data.damage_type || ''
  }
}
export default Chart
