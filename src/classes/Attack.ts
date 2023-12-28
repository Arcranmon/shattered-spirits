import { store } from '@/store'
import { Chart, Maneuver } from '@/class'

class Attack extends Maneuver {
  protected chart_: Chart
  protected category_: string
  protected class_: string
  protected charged_effect_: string
  protected speed_: number
  protected type_: string

  public constructor(name) {
    super(name)
    this.chart_ = new Chart()
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
  get Class() {
    return '_' + this.class_ + '_'
  }
  get HasSpeed() {
    return this.speed_ != 0
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
  get SpeedHeader() {
    if (this.speed_ < 1) return ''
    return 'Speed ' + this.speed_
  }
  get TypeHeader() {
    if (this.type_ != 'Maneuver') return '_' + this.type_ + '_'
    return ''
  }
  get Header() {
    var header = this.SpeedHeader
    header += ' ' + this.TypeHeader
    header += ' ' + this.class_
    return header
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(attackData: IAttackData): Attack {
    const t = new Attack(attackData.name)
    t.setAttackData(attackData)
    return t
  }

  public setAttackData(data: IAttackData): void {
    this.setManeuverData(data)
    this.category_ = data.category || 'Attack'
    this.class_ = data.class || ''
    this.charged_effect_ = data.charged_effect || ''
    this.speed_ = data.speed || 0
    if ('chart' in data && data.chart != null) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Attack
