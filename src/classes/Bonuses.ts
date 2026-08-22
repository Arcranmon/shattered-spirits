import { store } from '@/store'

// class to store potential combat bonuses that Archetypes and similar might hold.
class Bonuses {
  private stamina_: number
  private speed_: number
  private load_: number
  private phase_: number
  private block_: number
  private guard_: number
  private equipment_: string[]
  private weakness_resistance_: IWeaknessResistanceData[]

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.stamina_ = 0
    this.block_ = 0
    this.speed_ = 0
    this.load_ = 0
    this.phase_ = 0
    this.guard_ = 0
    this.equipment_ = []
    this.weakness_resistance_ = []
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get ReadableString() {
    var bonuses = []

    if (this.stamina_ > 0) bonuses.push('+' + String(this.stamina_) + ' _Stamina_')
    if (this.speed_ > 0) bonuses.push('+' + String(this.speed_) + ' _Speed_')
    if (this.load_ > 0) bonuses.push('+' + String(this.load_) + ' _Load_')
    return bonuses.join(', ')
  }

  public get Weaknesses() {
    return this.weakness_resistance_.filter((x) => x.mod < 0)
  }

  public get Resistances() {
    return this.weakness_resistance_.filter((x) => x.mod > 0)
  }

  public addBonuses(other: Bonuses) {
    this.stamina_ += other.stamina_
    this.speed_ += other.speed_
    this.load_ += other.load_
    this.phase_ += other.phase_
    this.block_ += other.block_
    this.guard_ += other.guard_
    this.equipment_ = [...this.equipment_, ...other.Equipment]

    for (var wr of other.WeaknessResistance) {
      var index = this.weakness_resistance_.findIndex((x) => x.damage == wr.damage)
      if (index != -1) {
        this.weakness_resistance_[index].mod += wr.mod
      } else {
        this.weakness_resistance_.push(wr)
      }
    }
    this.weakness_resistance_ = this.weakness_resistance_.filter((x) => x.mod != 0)
  }

  public get Equipment() {
    return this.equipment_
  }

  public get Load() {
    return this.load_
  }
  public get Speed() {
    return this.speed_
  }

  public get Phase() {
    return this.phase_
  }

  public get Stamina() {
    return this.stamina_
  }

  public get Block() {
    return this.block_
  }

  public get Guard() {
    return this.guard_
  }

  public get WeaknessResistance() {
    return this.weakness_resistance_
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
    this.stamina_ = data.stamina || 0
    this.block_ = data.block || 0
    this.guard_ = data.guard || 0
    this.speed_ = data.speed || 0
    this.load_ = data.load || 0
    this.phase_ = data.phase || 0
    this.equipment_ = data.equipment || []
    this.weakness_resistance_ = data.weakness_resistance || []
  }
}
export default Bonuses
