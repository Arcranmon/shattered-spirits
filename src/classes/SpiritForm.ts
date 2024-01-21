import { store } from '@/store'
import { Base } from '@/class'

class SpiritForm extends Base {
  private size_: string
  private health_: number
  private weapons_: string
  private bonus_attack_: string
  private guard_: number
  private durability_: number
  private movement_: string
  private traits_: string[]

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Movement() {
    return this.movement_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasArmor() {
    return this.guard_ != 0
  }
  public get ArmorHeader() {
    return '**Armor:** ' + this.guard_ + ' Guard, ' + this.durability_ + ' Durability'
  }
  public get SizeHeader() {
    return '**Size:** ' + this.size_
  }
  public get HealthHeader() {
    return '**Health:** ' + this.health_
  }
  public get Health() {
    return this.health_
  }
  public get WeaponsHeader() {
    return '**Weapons:** ' + this.weapons_
  }
  public get BonusAttackHeader() {
    return '**Bonus Attack:** _' + this.bonus_attack_ + '_'
  }
  public get BonusAttack() {
    return this.bonus_attack_
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get Traits() {
    return this.traits_
  }
  public get TraitsHeader() {
    return '**Traits:** ' + '_' + this.traits_.join('_, _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ISpiritFormData): SpiritForm {
    const c = new SpiritForm(data.name)
    c.setSpiritFormData(data)
    return c
  }

  private setSpiritFormData(data: ISpiritFormData): void {
    this.setBaseData(data)
    this.size_ = data.size || ''
    this.health_ = data.health || 0
    this.weapons_ = data.weapons || ''
    this.bonus_attack_ = data.bonus_attack || ''
    this.guard_ = data.guard || 0
    this.durability_ = data.durability || 0
    this.movement_ = data.movement || ''
    this.traits_ = data.traits || []
  }
}
export default SpiritForm
