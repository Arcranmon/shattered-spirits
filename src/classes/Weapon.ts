import { store } from '@/store'
import { Attack, Chart } from '@/class'

class Weapon extends Attack {
  private durability_: number
  private hands_: number
  private hardness_: number
  private parry_: string
  private material_: string
  private weight_: number

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
    if (this.category_ == 'Natural') return ''
    if (this.hands_ == 0) return '_No Hands_, '
    if (this.hands_ == 1) return '_One-Handed_, '
    else return '_Two-Handed_, '
  }
  get HasParry() {
    return this.parry_.length > 0
  }
  get ParryHeader() {
    return '**Parry:** ' + this.parry_
  }
  get HasMaterial() {
    return this.material_ != ''
  }
  get MaterialHeader() {
    return '**Material:** ' + this.material_
  }
  get Weight() {
    return this.weight_
  }
  get WeightHeader() {
    if (this.Category == 'Unarmed') return ''
    if (this.Weight == 0) return ''
    return 'Weight ' + this.weight_
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
    this.setAttackData(data)
    this.durability_ = data.durability || 0
    this.hardness_ = data.hardness || 0
    this.hands_ = data.hands || 0
    this.material_ = data.material || ''
    this.parry_ = data.parry || ''
    this.weight_ = data.weight || 0
  }
}
export default Weapon
