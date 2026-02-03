import { store } from '@/store'
import { AbilityPackage, Base, Bonuses } from '@/class'

class Trait extends AbilityPackage {
  private equipment_: string[]
  private bonuses_: Bonuses

  public constructor(name) {
    super(name)
  }
  // ==========================================================
  // GETTERS
  // ==========================================================
  get Bonuses() {
    return this.bonuses_
  }
  get HasEquipment() {
    return this.equipment_.length > 0
  }
  get Equipment() {
    return this.equipment_
  }
  public get HasIcon() {
    return false
  }
  public get Icon() {
    return ''
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ITraitData): Trait {
    const c = new Trait(data.name)
    c.setTraitData(data)
    return c
  }

  private setTraitData(data: ITraitData): void {
    this.setAbilityPackageData(data)
    this.equipment_ = data.equipment || []
    if (data.hasOwnProperty('bonuses')) {
      this.bonuses_ = Bonuses.Deserialize(data.bonuses)
    } else {
      this.bonuses_ = new Bonuses()
    }
    if (this.cost_ == '') this.cost_ = 'None'
  }
}
export default Trait
