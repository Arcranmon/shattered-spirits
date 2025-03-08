import { store } from '@/store'
import { Art } from '@/class'

class Weapon extends Art {
  private durability_: number
  private hands_: number
  private load_: number
  private reqs_: string

  get HasDurability() {
    return this.durability_ != 0
  }
  get Durability() {
    return this.durability_
  }
  get CategoryHeader() {
    if (this.Category == 'Natural' || this.Category == 'Improvised') return this.category_ + ' Weapon'
    return this.category_ + ' Weapon'
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
  get Load() {
    return this.load_
  }
  get TraitsHeader() {
    var traits_string = '**Traits:** '
    if (this.HasLoad) {
      traits_string += this.LoadHeader
      if (this.HasDurability) traits_string += ', '
    }
    if (this.HasDurability) {
      traits_string += '_Durability_ ' + this.durability_
    }
    return traits_string
  }
  get HasLoad() {
    return this.Load > 0
  }
  get LoadHeader() {
    if (this.Category == 'Unarmed') return ''
    if (this.Load == 0) return ''
    return 'Load ' + this.load_
  }
  public get Icon() {
    if (this.Category == 'Error') return ''
    return require('@/assets/weapons/' + this.Category + '.svg')
  }
  public get KeywordsHeader() {
    return '_' + this.keywords_.join('_, _') + '_'
  }
  public get HasReqs() {
    return this.reqs_ != ''
  }
  public get ReqsHeader() {
    return '**Requirements:** ' + this.reqs_
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
    this.setArtData(data)
    this.durability_ = data.durability || 0
    this.hands_ = data.hands || 0
    this.load_ = data.load || 0
    this.reqs_ = data.reqs || ''
  }
}
export default Weapon
