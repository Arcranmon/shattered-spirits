import { store } from '@/store'
import { Base } from '@/class'

class Trait extends Base {
  private reqs_: string
  private cost_: number
  private equipment_: string[]
  private bonuses_: IBonusesData

  public constructor(name) {
    super(name)
  }
  // ==========================================================
  // GETTERS
  // ==========================================================
  get CostHeader() {
    return '**Cost:** ' + this.cost_
  }

  get RequirementsHeader() {
    return '**Requirements:** ' + this.reqs_
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
    this.equipment_ = data.equipment
    this.bonuses_ = data.bonuses
  }
}
export default Trait
