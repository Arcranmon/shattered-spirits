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

  private light_limit_: number
  private versatile_limit_: number
  private heavy_limit_: number
  private light_versatile_limit_: number
  private versatile_heavy_limit_: number
  private any_limit_: number

  public constructor(name) {
    super(name)
    this.light_limit_ = 0
    this.versatile_limit_ = 0
    this.heavy_limit_ = 0
    this.light_versatile_limit_ = 0
    this.versatile_heavy_limit_ = 0
    this.any_limit_ = 0
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
  public get Guard() {
    return this.guard_
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
  public get Weapons() {
    return this.weapons_
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

  public get WeaponLimits() {
    return this.any_limit_ + this.light_limit_ + this.versatile_limit_ + this.heavy_limit_ + this.light_versatile_limit_ + this.versatile_heavy_limit_
  }

  public get AnyLimit() {
    return this.any_limit_
  }

  public get LightLimit() {
    return this.light_limit_
  }

  public get VersatileLimit() {
    return this.versatile_limit_
  }

  public get HeavyLimit() {
    return this.heavy_limit_
  }

  public get LightVersatileLimit() {
    return this.light_versatile_limit_
  }

  public get VersatileHeavyLimit() {
    return this.versatile_heavy_limit_
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

    var required_weapons = this.Weapons.replaceAll('_', '').split(', ')
    for (var weapon_reqs of required_weapons) {
      var count_class = weapon_reqs.split(' ')
      if (count_class[1] == 'Light') this.light_limit_ += Number(count_class[0])
      else if (count_class[1] == 'Versatile') this.versatile_limit_ += Number(count_class[0])
      else if (count_class[1] == 'Heavy') this.heavy_limit_ += Number(count_class[0])
      else if (count_class[1] == 'Light/Versatile') this.light_versatile_limit_ += Number(count_class[0])
      else if (count_class[1] == 'Versatile/Heavy') this.versatile_heavy_limit_ += Number(count_class[0])
      else if (count_class[1] == 'Any') this.any_limit_ += Number(count_class[0])
    }
  }
}
export default SpiritForm
