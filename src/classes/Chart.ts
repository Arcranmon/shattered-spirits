import { store } from '@/store'

class Chart {
  private roll_: Array<string>
  private damage_: Array<number>
  private negate_: Array<number>
  private stun_: Array<number>
  private damage_type_: string
  private keywords_: Array<string>
  private defend_: Array<string>
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
  }

  public Damage(i: number): string {
    if (this.roll_[i] == 'Miss') return '-'
    return this.damage_[i].toString()
  }
  public Defend(i: number): string {
    return this.defend_[i].toString()
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
    damage_type = '**Attack Details:** ' + damage_type.replace('/', '_/_')
    if (this.HasMaterial) damage_type += ' (' + this.MaterialHeader + ')'
    damage_type += ' Damage'
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
  public Negate(i: number) {
    return this.negate_[i]
  }
  public Status(i: number): string {
    return this.status_[i]
  }
  get HasDamage() {
    return this.damage_.length > 0
  }
  get HasDefend() {
    return this.defend_.length > 0
  }
  get HasStun() {
    return this.stun_.length > 0
  }
  get HasRoll() {
    return this.roll_.length > 0
  }
  public get HasMaterial() {
    return this.material_.length > 0
  }
  public get Material() {
    return this.material_
  }
  public get MaterialHeader() {
    return '_' + this.material_.replace('/', '_/_').replace(', ', '_, _') + '_'
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
    this.defend_ = data.defend || []
    this.stun_ = data.stun || []
    this.damage_ = data.damage || []
    this.status_ = data.status || ['None', 'None', 'None', 'None']
    this.negate_ = data.negate || [2, 3, 4, 5]
    while (this.status_.length < 4) this.status_.push('None')
    this.keywords_ = data.keywords || []
    this.damage_type_ = data.damage_type || ''
    this.material_ = data.material || ''
  }
}
export default Chart
