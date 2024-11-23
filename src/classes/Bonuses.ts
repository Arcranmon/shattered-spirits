import { store } from '@/store'

// Class to store potential combat bonuses that Archetypes and similar might hold.
class Bonuses {
  private grit_: number
  private reflex_: number
  private move_: number
  private load_: number

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IBonusesData): Bonuses {
    const t = new Bonuses()
    t.setBonusesData(data)
    return t
  }

  public setBonusesData(data: IBonusesData): void {
    this.grit_ = data.grit || 0
    this.reflex_ = data.reflex || 0
    this.move_ = data.move || 0
    this.load_ = data.load || 0
  }
}
export default Bonuses
