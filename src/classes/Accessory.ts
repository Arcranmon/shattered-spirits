import { store } from '@/store'
import { Equipment } from '@/class'

class Accessory extends Equipment {
  public constructor(name) {
    super(name)
  }
  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IEquipmentData): Accessory {
    const t = new Accessory(data.name)
    t.setAccessoryData(data)
    return t
  }

  public setAccessoryData(data: IEquipmentData): void {
    this.setEquipmentData(data)
  }
}
export default Accessory
