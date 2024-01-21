import { store } from '@/store'
import { Base } from '@/class'

class Trait extends Base {
  private reqs_: string
  private cost_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ITraitData): Trait {
    const c = new Trait(data.name)
    c.setSpiritTypeData(data)
    return c
  }

  private setSpiritTypeData(data: ITraitData): void {
    this.setBaseData(data)
    this.reqs_ = data.reqs || ''
    this.cost_ = data.cost || 0
  }
}
export default Trait
