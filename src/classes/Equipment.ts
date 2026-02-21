import { store } from '@/store'
import { Ability, AbilityPackage, Chart } from '@/class'

class Equipment extends AbilityPackage {
  private durability_: number
  private load_: number
  protected hands_: number
  protected rarity_: string

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Load() {
    return this.load_
  }
  get Hands() {
    return this.hands_
  }
  get Header() {
    return this.name_ + ' - ' + this.Category
  }
  get HasHands() {
    return this.hands_ > 0
  }
  get HandsHeader() {
    return '**Hands:** _' + this.hands_ + '_'
  }

  get Durability() {
    return this.durability_
  }
  public get Icon() {
    if (this.Category == 'Error' || this.Category == 'Hide') return ''
    if (this.Category == 'Camp Item') return require('@/assets/Camp.svg')
    if (this.Category == 'Throwing') return require('@/assets/weapons/' + this.Category + '.svg')
    return require('@/assets/' + this.Category + '.svg')
  }
  public get Rarity() {
    return this.rarity_
  }
  get HasSummary() {
    return true
  }

  get Summary() {
    return '**_Rarity_:** ' + this.Rarity + '; **_Load_:** ' + this.Load + '; **_Durability_:** ' + this.Durability
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IEquipmentData): Equipment {
    const t = new Equipment(data.name)
    t.setEquipmentData(data)
    return t
  }

  public setEquipmentData(data: IEquipmentData): void {
    this.setAbilityPackageData(data)
    this.load_ = data.load || 0
    this.durability_ = data.durability || 0
    this.hands_ = data.hands || 0
    this.rarity_ = data.rarity || 'Basic'
  }
}

export default Equipment
