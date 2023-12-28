import { store } from '@/store'

class SpiritType {
  private name_: string
  private desc_: string
  private effect_: string
  private summon_effect_: string
  private manifest_effect_: string
  private traits_: string[]

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
  public get HasEffect() {
    return this.effect_ != ''
  }
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get HasSummonEffect() {
    return this.summon_effect_ != ''
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
  public static Deserialize(characterData: ISpiritTypeData): SpiritType {
    const c = new SpiritType()
    c.setSpiritTypeData(characterData)
    return c
  }

  private setSpiritTypeData(data: ISpiritTypeData): void {
    this.name_ = data.name || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.summon_effect_ = data.summon_effect || ''
    this.manifest_effect_ = data.manifest_effect || ''
    this.traits_ = data.traits || []
  }
}
export default SpiritType
