import { store } from '@/store'
import { Ability, Base } from '@/class'

class Equipment extends Base {
  private durability_: number
  private wear_: number
  private load_: number
  protected abilities_: Ability[] = []

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Load() {
    return this.load_
  }
  get Durability() {
    return this.durability_
  }
  get Wear() {
    return this.wear_
  }
  get Abilities() {
    return this.abilities_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IEquipmentData): Equipment {
    const t = new Equipment(data.name)
    t.setEquipmentData(data)
    return t
  }

  public setEquipmentData(data: IEquipmentData): void {
    this.setBaseData(data)
    this.load_ = data.load || 0
    this.wear_ = data.wear || 0
    this.durability_ = data.durability || 0
    if (data.abilities) {
      for (var ability of data.abilities) {
        this.abilities_.push(Ability.Deserialize(ability))
      }
    }
  }
}

export default Equipment
