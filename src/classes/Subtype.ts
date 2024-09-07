import { store } from '@/store'
import { Base } from '@/class'

class Subtype extends Base {
  private defenses_: IDefenseData
  private element_: string
  private summon_effect_: string
  private manifest_effect_: string
  private traits_: string[]

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get Element() {
    return this.element_
  }
  public get HasSummonEffect() {
    return this.summon_effect_ != ''
  }
  public get HasDefenses() {
    return this.defenses_
  }
  public get DefensesHeader() {
    var header = ''
    if (this.defenses_.focus > 0) header += this.defenses_.focus + ' _Focus_'
    if (this.defenses_.grit > 0) {
      if (header.length > 0) header += ', '
      header += this.defenses_.grit + ' _Grit_'
    }
    if (this.defenses_.reflex > 0) {
      if (header.length > 0) header += ', '
      header += this.defenses_.reflex + ' _Reflex_'
    }
    return '**Defenses:** ' + header
  }
  public get SummonEffectHeader() {
    return '**Summon Effect:** ' + this.summon_effect_
  }
  public get HasManifestEffect() {
    return this.manifest_effect_ != ''
  }
  public get ManifestEffect() {
    return this.manifest_effect_ != ''
  }
  public get ManifestEffectHeader() {
    return '**Manifest Effect:** ' + this.manifest_effect_
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get Traits() {
    return this.traits_
  }
  public get TraitsText() {
    return '**Traits:** \n* _' + this.traits_.join('_\n* _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ISubtypeData): Subtype {
    const c = new Subtype(data.name)
    c.setSubtypeData(data)
    return c
  }

  private setSubtypeData(data: ISubtypeData): void {
    this.setBaseData(data)
    this.element_ = data.element || ''
    this.defenses_ = data.defenses || null
    this.summon_effect_ = data.summon_effect || ''
    this.manifest_effect_ = data.manifest_effect || ''
    this.traits_ = data.traits || []
  }
}
export default Subtype
