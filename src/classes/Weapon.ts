import { store } from '@/store'
import { Attack } from '@/class'

class Weapon extends Attack {
  private durability_: number
  private hands_: number
  private weight_: number
  private sacrifice_: string

  get HasDurability() {
    return this.durability_ != 0
  }
  get Durability() {
    return this.durability_
  }
  get ClassHeader() {
    return this.HandsPhrase + this.CategoryHeader
  }
  get Hands() {
    return this.hands_
  }
  get HandsPhrase() {
    if (this.category_ == 'Natural') return ''
    if (this.hands_ == 0) return '_No Handed_ '
    if (this.hands_ == 1) return '_One-Handed_ '
    else return '_Two-Handed_ '
  }
  get Weight() {
    return this.weight_
  }
  get HasSacrifice() {
    return this.sacrifice_ != ''
  }
  get SacrificeHeader() {
    return '**Sacrifice:** ' + this.sacrifice_
  }
  get TraitsHeader() {
    var traits_string = '**Traits:** '
    if (this.HasWeight) {
      traits_string += this.WeightHeader
      if (this.HasDurability) traits_string += ', '
    }
    if (this.HasDurability) {
      traits_string += '_Durability_ ' + this.durability_
    }
    return traits_string
  }
  get HasWeight() {
    return this.Weight > 0
  }
  get WeightHeader() {
    if (this.Category == 'Unarmed') return ''
    if (this.Weight == 0) return ''
    return 'Weight ' + this.weight_
  }
  public get Icon() {
    if (this.Category == 'Error') return ''
    return require('@/assets/weapons/' + this.Category + '.svg')
  }
  public get KeywordsHeader() {
    return '_' + this.keywords_.join('_, _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IWeaponData): Weapon {
    const t = new Weapon(data.name)
    t.setWeaponData(data)
    return t
  }

  public setWeaponData(data: IWeaponData): void {
    this.setAttackData(data)
    this.durability_ = data.durability || 0
    this.hands_ = data.hands || 0
    this.weight_ = data.weight || 0
    this.sacrifice_ = data.sacrifice || ''
  }
}
export default Weapon
