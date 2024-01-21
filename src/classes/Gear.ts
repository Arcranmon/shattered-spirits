import { store } from '@/store'
import { Base } from '@/class'

class Gear extends Base {
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
  public static Deserialize(data: IGearData): Gear {
    const t = new Gear(data.name)
    t.setGearData(data)
    return t
  }

  public setGearData(data: IGearData): void {
    this.setBaseData(data)
    this.weight_ = data.weight || 0
  }
}
export default Gear
