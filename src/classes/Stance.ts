import { store } from '@/store'
import { Ability, Base } from '@/class'

class Stance extends Base {
  private class_: string
  private effects_: string[]
  private respite_: IRespiteData
  private defenses_: IDefenseData
  private traits_: Array<string>
  protected abilities_: Ability[] = []

  public constructor(name) {
    super(name)
    this.respite_ = null
    this.defenses_ = null
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
    if (this.respite_.stun_clear) respite_string += '\n* Clear ' + this.respite_.stun_clear + ' _Stun_.'
    if (this.respite_.special) respite_string += '\n* ' + this.respite_.special
    return respite_string
  }

  public get Stun() {
    if (this.respite_.stun_clear) return this.respite_.stun_clear
    return 0
  }

  public get Grit() {
    if (this.defenses_.grit) return this.defenses_.grit
    return 0
  }

  public get Reflex() {
    if (this.defenses_.reflex) return this.defenses_.reflex
    return 0
  }

  public get Focus() {
    if (this.defenses_.focus) return this.defenses_.focus
    return 0
  }

  public get HasEffects() {
    return this.effects_.length > 0
  }

  public get Effects() {
    return this.effects_
  }

  public get Abilities() {
    return this.abilities_
  }

  public get MovementHeader() {
    return '**Movement:** ' + this.Movement
  }

  public get Movement() {
    if (this.respite_.movement) return this.respite_.movement
    return 0
  }

  public get DefenseHeader() {
    var defense_string = '**Defenses:**'
    if (this.defenses_.focus) defense_string += '\n* ' + this.defenses_.focus + ' _Focus_'
    if (this.defenses_.grit) defense_string += '\n* ' + this.defenses_.grit + ' _Grit_'
    if (this.defenses_.reflex) defense_string += '\n* ' + this.defenses_.reflex + ' _Reflex_'
    return defense_string
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
    this.effects_ = data.effects || []
    this.defenses_ = data.defenses || null
    this.traits_ = data.traits || []
    if (data.abilities) {
      for (var ability of data.abilities) {
        this.abilities_.push(Ability.Deserialize(ability))
      }
    }
  }
}
export default Stance
