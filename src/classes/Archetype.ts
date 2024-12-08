import { store } from '@/store'
import { Base, Bonuses } from '@/class'

class Archetype extends Base {
  private maneuver_: string
  private bonuses_: Bonuses

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get HasBonuses() {
    return this.bonuses_
  }

  public get BonusesHeader() {
    return '**Bonuses:** ' + this.bonuses_.ReadableString
  }

  public get ManeuverHeader() {
    return '**Maneuver:** _' + this.maneuver_ + '_'
  }

  public get Manuever() {
    return this.maneuver_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IArchetypeData): Archetype {
    const t = new Archetype(data.name)
    t.setArchetypeData(data)
    return t
  }

  public setArchetypeData(data: IArchetypeData): void {
    this.setBaseData(data)
    this.maneuver_ = data.maneuver || ''
    this.bonuses_ = Bonuses.Deserialize(data.bonuses) || null
  }
}
export default Archetype
