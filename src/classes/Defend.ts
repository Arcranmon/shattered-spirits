import { store } from '@/store'

// class to store potential combat bonuses that Archetypes and similar might hold.
class Defend {
  private lose_: string
  private tie_: string
  private win_: string
  private always_: string

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get DefendText() {
    var parryString = '**_Defend_**: '
    parryString += '\n* <u>Always:</u> ' + this.always_
    parryString += '\n* <u>Lose:</u> ' + this.lose_
    parryString += '\n* <u>Tie:</u> ' + this.tie_
    parryString += '\n* <u>Win:</u> ' + this.win_

    return parryString
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IDefendData): Defend {
    const t = new Defend()
    t.setDefendData(data)
    return t
  }

  public setDefendData(data: IDefendData): void {
    this.lose_ = data.lose || ''
    this.tie_ = data.tie || ''
    this.win_ = data.win || ''
    this.always_ = data.always || ''
  }
}
export default Defend
