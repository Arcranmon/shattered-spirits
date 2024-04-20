import { store } from '@/store'
import { Base } from '@/class'

class Accessory extends Base {
  private weight_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Weight() {
    return this.weight_
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get WeightHeader() {
    if (this.weight_ != 0) return 'Weight ' + this.weight_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IAccessoryData): Accessory {
    const t = new Accessory(data.name)
    t.setAccessoryData(data)
    return t
  }

  public setAccessoryData(data: IAccessoryData): void {
    this.setBaseData(data)
    this.weight_ = data.weight || 0
  }
}
export default Accessory
