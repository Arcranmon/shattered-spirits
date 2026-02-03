import { store } from '@/store'
import { Ability, Chart, Equipment } from '@/class'

class Weapon extends Equipment {
  private reqs_: string

  get CategoryHeader() {
    if (this.Category == 'Natural' || this.Category == 'Improvised') return this.category_ + ' Weapon'
    return this.category_ + ' Weapon'
  }
  public get Header() {
    var header = this.Name + ' - '
    header += this.CategoryHeader
    return header
  }
  public get Summary() {
    var header = '**Rarity:** ' + this.rarity_ + '; **Load:** ' + this.Load + '; **Durability:** ' + this.Durability
    return header
  }
  get HandString() {
    return String(this.hands_)
  }
  get HandsPhrase() {
    if (this.category_ == 'Natural') return ''
    if (this.hands_ == 0) return '_No Handed_ '
    if (this.hands_ == 1) return '_One-Handed_ '
    else return '_Two-Handed_ '
  }
  public get Icon() {
    if (this.Category == 'Error') return ''
    return require('@/assets/weapons/' + this.Category + '.svg')
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
    this.setEquipmentData(data)
    this.reqs_ = data.reqs || ''
  }
}
export default Weapon
