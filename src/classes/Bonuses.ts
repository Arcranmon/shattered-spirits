import { store } from '@/store'

// class to store potential combat bonuses that Archetypes and similar might hold.
class Bonuses {
  private focus_: number
  private grit_: number
  private stamina_: number
  private reflex_: number
  private move_: number
  private load_: number
  private speed_: number
  private block_: number
  private equipment_: string[]

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.focus_ = 0
    this.grit_ = 0
    this.stamina_ = 0
    this.block_ = 0
    this.reflex_ = 0
    this.move_ = 0
    this.load_ = 0
    this.speed_ = 0
    this.equipment_ = []
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get ReadableString() {
    var bonuses = []

    if (this.stamina_ > 0) bonuses.push('+' + String(this.stamina_) + ' _Stamina_')
    if (this.focus_ > 0) bonuses.push('+' + String(this.focus_) + ' _Focus_')
    if (this.grit_ > 0) bonuses.push('+' + String(this.grit_) + ' _Grit_')
    if (this.reflex_ > 0) bonuses.push('+' + String(this.reflex_) + ' _Reflex_')
    if (this.move_ > 0) bonuses.push('+' + String(this.move_) + ' _Move_')
    if (this.load_ > 0) bonuses.push('+' + String(this.load_) + ' _Load_')
    return bonuses.join(', ')
  }

  public addBonuses(other) {
    this.focus_ += other.focus_
    this.grit_ += other.grit_
    this.stamina_ += other.stamina_
    this.reflex_ += other.reflex_
    this.move_ += other.move_
    this.load_ += other.load_
    this.speed_ += other.speed_
    this.equipment_ = [...this.equipment_, ...other.Equipment]
  }

  public get Equipment() {
    return this.equipment_
  }

  public get Reflex() {
    return this.reflex_
  }

  public get Movement() {
    return this.move_
  }

  public get Speed() {
    return this.speed_
  }

  public get Stamina() {
    return this.stamina_
  }

  public get Stun() {
    return this.block_
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
    this.stamina_ = data.stamina || 0
    this.reflex_ = data.reflex || 0
    this.move_ = data.move || 0
    this.load_ = data.load || 0
    this.speed_ = data.speed || 0
    this.equipment_ = data.equipment || []
  }
}
export default Bonuses
