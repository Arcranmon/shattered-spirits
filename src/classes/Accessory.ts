import { store } from '@/store'
import { Base } from '@/class'

class Accessory extends Base {
  private load_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Load() {
    return this.load_
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  get LoadHeader() {
    if (this.load_ != 0) return 'Load ' + this.load_
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
    this.load_ = data.load || 0
  }
}
export default Accessory
