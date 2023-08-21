import { store } from '@/store'

class Trait {
  private name_: string
  private desc_: string
  private effect_: string
  private reqs_: string
  private cost_: number

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Desc() {
    return this.desc_
  }
  public get Name() {
    return this.name_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(characterData: ITraitData): Trait {
    const c = new Trait()
    c.setSpiritTypeData(characterData)
    return c
  }

  private setSpiritTypeData(data: ITraitData): void {
    this.name_ = data.name || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.reqs_ = data.reqs || ''
    this.cost_ = data.cost || 0
  }
}
export default Trait
