import { store } from '@/store'
import { Ability, Base } from '@/class'
import { isStandardBrowserEnv } from 'vue-simple'

class Stance extends Base {
  private class_: string
  private effects_: string[]
  private respite_: IRespiteData
  private defenses_: IDefenseData
  private traits_: Array<string>
  private momentum_gain_: number
  private essence_gain_: number
  private guard_: number
  private stun_clear_: number
  private speed_: number
  private movement_: number
  protected abilities_: Ability[] = []

  public constructor(name) {
    super(name)
    this.respite_ = null
    this.defenses_ = null
    this.traits_ = []
    this.effects_ = []
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

  public get StunClear() {
    if (this.stun_clear_) return this.stun_clear_
    return 0
  }

  public get Grit() {
    if (this.defenses_) return this.defenses_.grit
    return 0
  }

  public get Speed() {
    return this.speed_
  }

  public PhaseHeader(index) {
    return '**Phase ' + (index + 1) + ':** +' + this.momentum_gain_[index] + ' _Momentum_, +' + this.essence_gain_[index] + ' _Essence_'
  }

  public get Reflex() {
    if (this.defenses_) return this.defenses_.reflex
    return 0
  }

  public get Focus() {
    if (this.defenses_) return this.defenses_.focus
    return 0
  }

  public get Momentum() {
    return this.momentum_gain_
  }

  public get Essence() {
    return this.essence_gain_
  }

  public get HasEffects() {
    return this.effects_.length > 0
  }

  public get EffectsDisplay() {
    var effect_string = ''
    for (var effect of this.effects_) {
      effect_string += '\n' + effect
    }
    return effect_string
  }

  public get Guard() {
    return this.guard_
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
    if (this.movement_) return this.movement_
    return 0
  }

  public get DefenseHeader() {
    var defense_string = '**Defenses:**'
    if (this.defenses_.focus) defense_string += ' ' + this.defenses_.focus + ' _Focus_'
    if (this.defenses_.grit) defense_string += ', ' + this.defenses_.grit + ' _Grit_'
    if (this.defenses_.reflex) defense_string += ', ' + this.defenses_.reflex + ' _Reflex_'
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
    return []
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
    this.speed_ = data.speed || 0
    this.momentum_gain_ = data.momentum_gain || 0
    this.essence_gain_ = data.essence_gain || 0
    this.stun_clear_ = data.stun_clear || 0
    this.movement_ = data.movement || 0
    this.guard_ = data.guard || 0
    if (data.abilities) {
      for (var ability of data.abilities) {
        this.abilities_.push(Ability.Deserialize(ability))
      }
    }
  }
}
export default Stance
