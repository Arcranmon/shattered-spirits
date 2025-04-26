import { store } from '@/store'
import { Base, Bonuses } from '@/class'

class Archetype extends Base {
  private art_: string
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

  public get Bonuses() {
    return this.bonuses_
  }

  public get ArtHeader() {
    return '**Art:** _' + this.art_ + '_'
  }

  public get Art() {
    return this.art_
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
    this.art_ = data.art || ''
    this.bonuses_ = Bonuses.Deserialize(data.bonuses) || null
  }
}
export default Archetype
