import { store } from '@/store'

class Stance {
  private respite_: string
  private desc_: string
  private effect_: string
  private name_: string
  private special_: string
  private stamina_: number
  private traits_: Array<string>

  public constructor() {
    this.respite_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.stamina_ = 0
    this.name_ = ''
    this.special_ = ''
    this.traits_ = []
  }

  public get Desc() {
    return this.desc_
  }

  public get Name() {
    return this.name_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get RespiteHeader() {
    if (this.respite_.length > 0) return '**Respite:** ' + this.respite_
    return ''
  }
  public get HasEffect() {
    return this.effect_.length > 0
  }
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get StaminaHeader() {
    return '**Stamina:** ' + this.stamina_
  }
  public get HasSpecial() {
    return this.special_.length > 0
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get TraitsHeader() {
    return '**Traits:** ' + '_' + this.traits_.join('_, _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(stanceData: IStanceData): Stance {
    const t = new Stance()
    t.setStanceData(stanceData)
    return t
  }

  public setStanceData(data: IStanceData): void {
    this.respite_ = data.respite || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.name_ = data.name || ''
    this.special_ = data.special || ''
    this.stamina_ = data.stamina || 0
    this.traits_ = data.traits || []
  }
}
export default Stance
