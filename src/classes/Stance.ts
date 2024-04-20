import { store } from '@/store'
import { Base } from '@/class'

class Stance extends Base {
  private class_: string
  private respite_: IRespiteData
  private stamina_: number
  private traits_: Array<string>

  public constructor(name) {
    super(name)
    this.respite_ = null
    this.stamina_ = 0
    this.traits_ = []
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get ClassHeader() {
    return '_' + this.class_ + '_ _Stance_'
  }
  public get RespiteHeader() {
    var respite_string = '**Respite:** At _Respite_, do the following:'
    if (this.respite_.momentum_gain) respite_string += '\n* Gain ' + this.respite_.momentum_gain + ' _Momentum_.'
    if (this.respite_.conditional_momentum) respite_string += '\n* Gain ' + this.respite_.conditional_momentum
    if (this.respite_.special) respite_string += '\n* ' + this.respite_.special
    return respite_string
  }

  public get Stamina() {
    return this.stamina_
  }

  public get StaminaHeader() {
    return '**Stamina:** ' + this.stamina_
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get TraitsHeader() {
    return '**Traits:** ' + '_' + this.traits_.join('_, _') + '_'
  }

  public get MomentumGain() {
    if (this.respite_.momentum_gain) return this.respite_.momentum_gain
    return 0
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IStanceData): Stance {
    const t = new Stance(data.name)
    t.setStanceData(data)
    return t
  }

  public setStanceData(data: IStanceData): void {
    this.setBaseData(data)
    this.class_ = data.class || ''
    this.respite_ = data.respite || null
    this.stamina_ = data.stamina || 0
    this.traits_ = data.traits || []
  }
}
export default Stance
