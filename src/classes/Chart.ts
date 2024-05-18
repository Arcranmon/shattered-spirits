import { store } from '@/store'

class Chart {
  private roll_: Array<string>
  private damage_: Array<number>
  private stun_: Array<number>
  private damage_type_: string
  private keywords_: Array<string>
  private status_: Array<string>
  private on_miss_: string
  private material_: string

  public constructor() {
    this.roll_ = []
    this.damage_ = []
    this.status_ = []
    this.keywords_ = []
    this.on_miss_ = ''
    this.damage_type_ = ''
    this.material_ = ''
  }

  public Damage(i: number): string {
    if (this.roll_[i] == 'Miss') return '-'
    return this.damage_[i].toString()
  }
  public Stun(i: number): string {
    if (this.roll_[i] == 'Miss') return '-'
    return this.stun_[i].toString()
  }
  get DamageType() {
    return this.damage_type_
  }
  get HasDamageType() {
    return this.damage_type_ != ''
  }
  get DetailsHeader() {
    var damage_type = '_' + this.damage_type_ + '_'
    damage_type = '**Attack Details:** ' + damage_type.replace('/', '_/_') + ' Damage'
    if (this.damage_type_ == 'Varying') damage_type += ' Type'
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
  get HasDamage() {
    return this.damage_.length > 0
  }
  get HasStun() {
    return this.stun_.length > 0
  }
  get HasOnMiss() {
    return this.on_miss_ != ''
  }
  public get OnMissHeader() {
    return '**_On Miss_:** ' + this.on_miss_
  }
  public get HasMaterial() {
    return this.material_.length > 0
  }
  public get Material() {
    return this.material_
  }
  public get MaterialHeader() {
    return '**Material:** ' + this.material_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IChartData): Chart {
    const t = new Chart()
    t.setChartData(data)
    return t
  }

  public setChartData(data: IChartData): void {
    this.roll_ = data.roll || []
    this.stun_ = data.stun || []
    this.damage_ = data.damage || []
    this.status_ = data.status || []
    this.keywords_ = data.keywords || []
    this.damage_type_ = data.damage_type || ''
    this.on_miss_ = data.on_miss || ''
    this.material_ = data.material || ''
  }
}
export default Chart
