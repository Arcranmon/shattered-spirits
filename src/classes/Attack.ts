import { store } from '@/store'
import { Chart, Maneuver } from '@/class'

class Attack extends Maneuver {
  protected chart_: Chart
  protected category_: string
  protected class_: string
  protected damagetype_: string
  protected charged_effect_: string
  protected speed_: number
  protected type_: string

  get CategoryHeader() {
    if (this.Category == 'Natural' || this.Category == 'Improvised') return this.category_ + ' Weapon'
    return this.category_ + ' Weapon, '
  }
  get Category() {
    return this.category_
  }
  get HasChart() {
    return this.chart_ != null
  }
  get Chart() {
    return this.chart_
  }
  get Class() {
    return '_' + this.class_ + '_'
  }
  get DamageType() {
    return this.damagetype_
  }
  get HasDamageType() {
    return this.damagetype_ != ''
  }
  get HasSpeed() {
    return this.speed_ != 0
  }
  get DamageTypeHeader() {
    return '**Damage Type:** ' + this.damagetype_
  }
  get Speed() {
    return this.speed_
  }
  get HasChargedEffect() {
    return this.charged_effect_.length > 0
  }
  get ChargedEffectHeader() {
    return '**Charged Effect:** ' + this.charged_effect_
  }
  get SpeedHeader() {
    if (this.speed_ == -1) return 'See Effect For Speed, '
    return 'Speed ' + this.speed_ + ', '
  }
  get TypeHeader() {
    return '_' + this.type_ + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(attackData: IAttackData): Attack {
    const t = new Attack()
    t.setAttackData(attackData)
    return t
  }

  public setAttackData(data: IAttackData): void {
    this.setManeuverData(data)
    this.category_ = data.category || 'Attack'
    this.class_ = data.class || ''
    this.damagetype_ = data.damagetype || ''
    this.charged_effect_ = data.charged_effect || ''
    this.speed_ = data.speed || 0
    if ('chart' in data && data.chart != null) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Attack
