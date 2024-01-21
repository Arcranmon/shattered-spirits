import { store } from '@/store'
import { Chart, Maneuver } from '@/class'

class Attack extends Maneuver {
  protected chart_: Chart
  protected category_: string
  protected rank_: string
  protected charged_effect_: string
  protected speed_: number
  protected type_: string

  public constructor(name) {
    super(name)
    this.chart_ = new Chart()
    this.type_ = ''
    this.rank_ = ''
    this.speed_ = 0
  }

  get CategoryHeader() {
    if (this.Category == 'Natural' || this.Category == 'Improvised') return this.category_ + ' Weapon'
    return this.category_ + ' Weapon, '
  }
  get Category() {
    return this.category_
  }
  get HasChart() {
    return this.chart_.Roll.length > 0
  }
  get Chart() {
    return this.chart_
  }
  get Rank() {
    return '_' + this.rank_ + '_'
  }
  get HasSpeed() {
    return this.speed_ != 0
  }
  get HasType() {
    return this.type_ != ''
  }
  get HasSpeedOrType() {
    return this.HasSpeed || this.HasType
  }
  get Speed() {
    return this.speed_
  }
  get HasChargedEffect() {
    return this.charged_effect_ && this.charged_effect_.length > 0
  }
  get ChargedEffectHeader() {
    return '**Charged Effect:** ' + this.charged_effect_
  }
  public get SpeedHeader() {
    if (/^\d+$/.test(this.speed_[0])) return '**Speed ' + this.Speed + '**'
    return '**' + this.Speed + ' Speed**'
  }
  get TypeHeader() {
    if (this.type_ != 'Maneuver') return '_' + this.type_ + '_'
    return ''
  }
  get ClassHeader() {
    return '_' + this.class_ + '_ _' + this.rank_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IAttackData): Attack {
    const t = new Attack(data.name)
    t.setAttackData(data)
    return t
  }

  public setAttackData(data: IAttackData): void {
    this.setManeuverData(data)
    this.category_ = data.category || 'Attack'
    this.rank_ = data.rank || ''
    this.charged_effect_ = data.charged_effect || ''
    this.speed_ = data.speed || 0
    this.type_ = data.type || ''
    if ('chart' in data && data.chart != null) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Attack
