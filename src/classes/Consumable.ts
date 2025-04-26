import { store } from '@/store'
import { Equipment } from '@/class'

class Consumable extends Equipment {
  private hands_: number

  public constructor(name) {
    super(name)
  }

  get Hands() {
    return this.hands_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IConsumableData): Consumable {
    const t = new Consumable(data.name)
    t.setConsumableData(data)
    return t
  }

  public setConsumableData(data: IConsumableData): void {
    this.setEquipmentData(data)
    this.hands_ = data.hands
  }
}
export default Consumable
