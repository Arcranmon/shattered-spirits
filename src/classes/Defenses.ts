import { store } from '@/store'

class Defenses {
  private stun_: number
  private block_: number
  private resistances_: string[]
  private weaknesses_: string[]
  private immunities_: string[]

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get DefensesHeader() {
    var header = ''
    return '**Defenses:** ' + header
  }

  public get Block() {
    return this.block_
  }

  public get Guard() {
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

  public get HasImmunities() {
    return this.immunities_.length > 0
  }

  public get ResistancesHeader() {
    return '**Resistances:** _' + this.resistances_.join('_, _')
  }

  public get WeaknessesHeader() {
    return '**Weaknesses:** _' + this.weaknesses_.join('_, _')
  }

  public get ImmunitiesHeader() {
    return '**Immunities:** _' + this.immunities_.join('_, _')
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
    this.block_ = data.block || 0
    this.stun_ = data.guard || 0
    this.immunities_ = data.immunities || []
    this.resistances_ = data.resistances || []
    this.weaknesses_ = data.weaknesses || []
  }
}
export default Defenses
