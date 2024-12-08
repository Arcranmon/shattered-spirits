import { store } from '@/store'

// Class to store potential combat bonuses that Archetypes and similar might hold.
class Bonuses {
  private focus_: number
  private grit_: number
  private health_: number
  private reflex_: number
  private move_: number
  private load_: number

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get ReadableString() {
    var bonuses = []

    if (this.health_ > 0) bonuses.push('+' + String(this.health_) + ' _Health_')
    if (this.focus_ > 0) bonuses.push('+' + String(this.focus_) + ' _Focus_')
    if (this.grit_ > 0) bonuses.push('+' + String(this.grit_) + ' _Grit_')
    if (this.reflex_ > 0) bonuses.push('+' + String(this.reflex_) + ' _Reflex_')
    if (this.move_ > 0) bonuses.push('+' + String(this.move_) + ' _Move_')
    if (this.load_ > 0) bonuses.push('+' + String(this.load_) + ' _Load_')
    return bonuses.join(', ')
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IBonusesData): Bonuses {
    const t = new Bonuses()
    t.setBonusesData(data)
    return t
  }

  public setBonusesData(data: IBonusesData): void {
    this.focus_ = data.focus || 0
    this.grit_ = data.grit || 0
    this.health_ = data.health || 0
    this.reflex_ = data.reflex || 0
    this.move_ = data.move || 0
    this.load_ = data.load || 0
  }
}
export default Bonuses
