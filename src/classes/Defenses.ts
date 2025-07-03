import { store } from '@/store'

class Defenses {
  private stun_: number
  private reflex_: number
  private grit_: number
  private focus_: number
  private resistances_: string[]
  private weaknesses_: string[]
  private immunities_: string[]

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get DefensesHeader() {
    var header = ''
    if (this.focus_ > 0) header += this.focus_ + ' _Focus_'
    if (this.grit_ > 0) {
      if (header.length > 0) header += ', '
      header += this.grit_ + ' _Grit_'
    }
    if (this.reflex_ > 0) {
      if (header.length > 0) header += ', '
      header += this.reflex_ + ' _Reflex_'
    }
    return '**Defenses:** ' + header
  }

  public get Grit() {
    return this.grit_
  }

  public get Reflex() {
    return this.reflex_
  }

  public get Focus() {
    return this.focus_
  }

  public get Stun() {
    return this.stun_
  }

  public get Immunities() {
    return this.immunities_
  }

  public get Resistances() {
    return this.resistances_
  }

  public get HasResistances() {
    return this.resistances_.length > 0
  }

  public get HasWeaknesses() {
    return this.weaknesses_.length > 0
  }

  public get ResistancesHeader() {
    return '**Resistances:** _' + this.resistances_.join('_, _')
  }

  public get WeaknessesHeader() {
    return '**Weaknesses:** _' + this.weaknesses_.join('_, _')
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IDefenseData): Defenses {
    const c = new Defenses()
    c.setDefensesData(data)
    return c
  }

  private setDefensesData(data: IDefenseData): void {
    this.grit_ = data.grit || 0
    this.reflex_ = data.reflex || 0
    this.focus_ = data.focus || 0
    this.stun_ = data.stun || 0
    this.immunities_ = data.immunities || []
    this.resistances_ = data.resistances || []
    this.weaknesses_ = data.weaknesses || []
  }
}
export default Defenses
