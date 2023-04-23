import { store } from '@/store'
import { Chart } from '@/class'

class Weapon {
  private chart_: Chart
  private category_: string
  private damagetype_: string
  private desc_: string
  private durability_: number
  private hands_: number
  private hardness_: number
  private keywords_: Array<string>
  private parry_: string
  private name_: string
  private range_: string
  private range_value_: number
  private reaction_: string
  private charged_area_: string
  private special_: string
  private speed_: number
  private weight: number

  public constructor() {
    this.chart_ = null
    this.category_ = ''
    this.damagetype_ = ''
    this.desc_ = ''
    this.hardness_ = 0
    this.hands_ = 3
    this.keywords_ = []
    this.parry_ = ''
    this.name_ = ''
    this.range_ = ''
    this.range_value_ = 0
    this.reaction_ = ''
    this.charged_area_ = ''
    this.special_ = ''
    this.speed_ = 0
    this.weight = 1
  }

  get CategoryHeader() {
    if (this.Category == 'Unarmed' || this.Category == 'Improvised') return this.category_
    return this.category_ + ', '
  }
  get Category() {
    return this.category_
  }
  get Chart() {
    return this.chart_
  }
  get DamageType() {
    return this.damagetype_
  }
  get Desc() {
    return this.desc_
  }
  get DamageTypeHeader() {
    return '**Damage Type:** ' + this.damagetype_
  }
  get HasDurability() {
    return this.durability_ != 0
  }
  get Durability() {
    return this.durability_
  }
  get DurabilityHeader() {
    if (this.durability_ != 0) return 'Durability ' + this.durability_
  }
  get Hardness() {
    return this.hardness_
  }
  get HardnessHeader() {
    if (this.hardness_ != 0) return 'Hardness ' + this.Hardness
  }
  get Hands() {
    return this.hands_
  }
  get HandsPhrase() {
    if (this.hands_ == 0) return ' _No Hands_'
    if (this.hands_ == 1) return ' _One-Handed_'
    else return ' _Two-Handed_'
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
  get Range() {
    return this.range_
  }
  get HasReaction() {
    return this.reaction_.length > 0
  }
  get Reaction() {
    return this.reaction_
  }
  get RangeHeader() {
    if (this.Range == 'Melee') return '_Reach_ ' + this.range_value_ + ', '
    return '_Range_ ' + this.range_value_ + ', '
  }
  get Speed() {
    return this.speed_
  }
  get HasChargedArea() {
    return this.charged_area_.length > 0
  }
  get ChargedAreaHeader() {
    return '**Charged Area:** ' + this.charged_area_
  }
  get HasParry() {
    return this.parry_.length > 0
  }
  get ParryHeader() {
    return '**Parry:** ' + this.parry_
  }
  get HasSpecial() {
    return this.special_.length > 0
  }
  get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  get SpeedHeader() {
    return 'Speed ' + this.speed_ + ', '
  }
  get Weight() {
    return this.weight
  }
  get WeightHeader() {
    if (this.Category == 'Unarmed') return ''
    if (this.Weight == 0) return ''
    return 'Weight ' + this.weight + ', '
  }
  public get Icon() {
    if (this.Category == 'Error') return ''
    if (this.Category == 'Unarmed') return require('@/assets/Unarmed.svg')
    return require('@/assets/' + this.Category + ' Weapon.svg')
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(weaponData: IWeaponData): Weapon {
    const t = new Weapon()
    t.setWeaponData(weaponData)
    return t
  }

  public setWeaponData(data: IWeaponData): void {
    this.category_ = data.category || ''
    this.damagetype_ = data.damagetype || ''
    this.desc_ = data.desc || ''
    this.durability_ = data.durability || 0
    this.hardness_ = data.hardness || 0
    this.hands_ = data.hands || 0
    this.keywords_ = data.keywords || []
    this.name_ = data.name || ''
    this.parry_ = data.parry || ''
    this.range_ = data.range || ''
    this.range_value_ = data.range_value || 0
    this.reaction_ = data.reaction || ''
    this.charged_area_ = data.charged_area || ''
    this.special_ = data.special || ''
    this.speed_ = data.speed || 0
    this.weight = data.weight || 0
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Weapon
