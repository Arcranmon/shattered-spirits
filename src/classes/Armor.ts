import { store } from '@/store'
import { Ability, Equipment } from '@/class'

class Armor extends Equipment {
  private stun_: number
  private block_: number
  private consumable_slots_: number
  private traits_: string[]

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================

  get Block() {
    return this.block_
  }
  get Stun() {
    return this.stun_
  }
  get Header() {
    return this.name_ + ' - ' + this.Category
  }
  get Traits() {
    return this.traits_
  }
  get Summary() {
    return (
      '**_Rarity_:** ' +
      this.Rarity +
      '; **_Stun_:** ' +
      this.Stun +
      '; **_Block_:** ' +
      this.Block +
      '; **_Load_:** ' +
      this.Load +
      '; **_Durability_:** ' +
      this.Durability
    )
  }
  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================

  get HasDefense() {
    return this.stun_ > 0
  }
  get DefenseHeader() {
    return '**_Block_:** ' + this.stun_
  }
  get HasBlock() {
    return this.block_ > 0
  }
  get HasSlots() {
    return this.consumable_slots_ > 0
  }
  get ArmorHeader() {
    return '**_Block_:** ' + this.block_
  }
  get HasTraits() {
    return this.traits_.length > 0
  }
  get TraitsHeader() {
    return '**Traits:** _' + this.traits_.join('_, _') + '_'
  }
  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IArmorData): Armor {
    const t = new Armor(data.name)
    t.setArmorData(data)
    return t
  }

  public setArmorData(data: IArmorData): void {
    this.setEquipmentData(data)
    this.stun_ = data.stun || 0
    this.block_ = data.block || 0
    this.consumable_slots_ = data.consumable_slots || 0
    this.traits_ = data.traits || []
  }
}
export default Armor
