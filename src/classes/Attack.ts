import { store } from '@/store'
import { Chart, Maneuver } from '@/class'

class Attack extends Maneuver {
  protected chart_: Chart
  protected category_: string
  protected charged_profile_: IChargedEffect
  protected speed_: string
  protected tier_: string

  public constructor(name) {
    super(name)
    this.chart_ = new Chart()
    this.tier_ = ''
    this.speed_ = ''
  }

  get CategoryHeader() {
    if (this.Category == 'Natural' || this.Category == 'Improvised') return this.category_ + ' Weapon'
    return this.category_ + ' Weapon'
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
  get HasSpeed() {
    return this.speed_.length > 0 && this.speed_ != 'undefined'
  }
  get HasTier() {
    return this.tier_ != ''
  }
  get HasSpeedOrTier() {
    return this.HasSpeed || this.HasTier
  }
  get Speed() {
    return this.speed_
  }
  get HasChargedEffect() {
    return this.charged_profile_
  }
  get ChargedEffectHeader() {
    return '**_Charged Profile_:**'
  }
  get ChargedEffectResolution() {
    return '<u>Resolution:</u> ' + this.charged_profile_.resolution
  }
  get ChargedEffectSetUp() {
    return '<u>Set-Up:</u> ' + this.charged_profile_.set_up
  }
  get SpeedHeader() {
    var header = ''
    if (this.HasSpeed) header = 'Speed ' + this.speed_
    if (header.length > 0 && this.HasTier) header += ', '
    header += this.TierHeader

    return header
  }
  get TierHeader() {
    if (this.tier_ != 'Maneuver') return '_' + this.tier_ + '_'
    return ''
  }
  get ClassHeader() {
    return '_' + this.class_ + '_ Attack'
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
    this.charged_profile_ = data.charged_profile || null
    this.speed_ = String(data.speed) || ''
    this.tier_ = data.tier || ''
    if ('chart' in data && data.chart != null) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Attack
