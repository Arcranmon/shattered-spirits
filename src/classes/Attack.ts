import { store } from '@/store'
import { Chart } from '@/class'

class Attack {
  protected chart_: Chart
  protected category_: string
  protected class_: string
  protected damagetype_: string
  protected effect_: string
  protected desc_: string
  protected keywords_: Array<string>
  protected name_: string
  protected range_: string
  protected range_value_: number
  protected charged_effect_: string
  protected special_: string
  protected speed_: number
  protected type_: string

  public constructor() {
    this.chart_ = null
    this.category_ = ''
    this.damagetype_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.keywords_ = []
    this.name_ = ''
    this.range_ = ''
    this.range_value_ = 0
    this.charged_effect_ = ''
    this.special_ = ''
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
  get Desc() {
    return this.desc_
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
  get HasEffect() {
    return this.effect_.length > 0
  }
  get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  get HasKeywords() {
    return this.keywords_.length > 0
  }
  get Keywords() {
    return this.keywords_
  }
  get KeywordsHeader() {
    return '_' + this.Keywords.join('_, _') + '_'
  }
  get Name() {
    return this.name_
  }
  get HasRange() {
    return this.range_.length > 0
  }
  get Range() {
    return this.range_
  }
  get RangeHeader() {
    if (this.Range == 'Melee') return '**Range:** _Melee_, _Reach_ ' + this.range_value_
    return '**Range**: ' + this.range_value_
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
  get HasSpecial() {
    return this.special_.length > 0
  }
  get SpecialHeader() {
    return '**Special:** ' + this.special_
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
    this.category_ = data.category || 'Attack'
    this.class_ = data.class || ''
    this.damagetype_ = data.damagetype || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.keywords_ = data.keywords || []
    this.name_ = data.name || ''
    this.range_ = data.range || ''
    this.range_value_ = data.range_value || 0
    this.charged_effect_ = data.charged_effect || ''
    this.special_ = data.special || ''
    this.speed_ = data.speed || 0
    this.type_ = data.type || ''
    if ('chart' in data && data.chart != null) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Attack
