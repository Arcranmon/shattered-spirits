import { store } from '@/store'

class Chart {
  private roll_: Array<string>
  private damage_: Array<number>
  private stun_: Array<number>
  private status_: Array<string>

  public constructor() {
    this.roll_ = []
    this.damage_ = []
    this.status_ = []
  }

  public Damage(i: number): string {
    if (this.roll_[i] == 'Miss') return '-'
    return this.damage_[i].toString()
  }
  public Stun(i: number): string {
    if (this.roll_[i] == 'Miss') return '-'
    return this.stun_[i].toString()
  }
  public get Roll() {
    return this.roll_
  }
  public Status(i: number): string {
    if (this.status_[i] == 'None') return '—'
    return this.status_[i]
  }
  get HasDamage() {
    return this.damage_.length > 0
  }
  get HasStun() {
    return this.stun_.length > 0
  }
  get HasRoll() {
    return this.roll_.length > 0
  }
  get HasEffect() {
    return this.status_.length > 0
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IChartData): Chart {
    const t = new Chart()
    t.setChartData(data)
    return t
  }

  public setChartData(data: IChartData): void {
    this.roll_ = data.roll || []
    this.stun_ = data.stun || []
    this.damage_ = data.damage || []
    this.status_ = data.status || []
  }
}
export default Chart
