import { store } from '@/store'
import { Base } from '@/class'

class Stance extends Base {
  private class_: string
  private respite_: string
  private stamina_: number
  private traits_: Array<string>

  public constructor(name) {
    super(name)
    this.respite_ = ''
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
    if (this.respite_.length > 0) return '**Respite:** ' + this.respite_
    return ''
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
    this.respite_ = data.respite || ''
    this.stamina_ = data.stamina || 0
    this.traits_ = data.traits || []
  }
}
export default Stance
