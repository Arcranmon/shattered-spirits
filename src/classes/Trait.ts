import { store } from '@/store'
import { Base, Bonuses } from '@/class'

class Trait extends Base {
  private reqs_: string
  private cost_: number
  private equipment_: string[]
  private bonuses_: Bonuses

  public constructor(name) {
    super(name)
  }
  // ==========================================================
  // GETTERS
  // ==========================================================
  get CostHeader() {
    return '**Cost:** ' + this.cost_
  }

  get Bonuses() {
    return this.bonuses_
  }

  get Cost() {
    return this.cost_
  }

  get RequirementsHeader() {
    return '**Requirements:** ' + this.reqs_
  }

  get HasEquipment() {
    return this.equipment_.length > 0
  }

  get Equipment() {
    return this.equipment_
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
    this.setBaseData(data)
    this.reqs_ = data.reqs || ''
    this.cost_ = data.cost || 0
    this.equipment_ = data.equipment || []
    if (data.hasOwnProperty('bonuses')) {
      this.bonuses_ = Bonuses.Deserialize(data.bonuses)
    } else {
      this.bonuses_ = new Bonuses()
    }
  }
}
export default Trait
