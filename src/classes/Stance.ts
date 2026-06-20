import { store } from '@/store'
import { Ability, AbilityPackage, Base } from '@/class'
import { isStandardBrowserEnv } from 'vue-simple'

class Stance extends AbilityPackage {
  private respite_: IRespiteData
  private defenses_: IDefenseData
  private momentum_: string
  private posture_: number
  private stun_: number
  private phase_: number
  private speed_: number

  public constructor(name) {
    super(name)
    this.respite_ = null
    this.defenses_ = null
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get Header() {
    return this.Name + ' - _' + this.category_ + '_ _Stance_'
  }
  public get RespiteHeader() {
    var respite_string = '**Respite:** At _Respite_, do the following:'
    if (this.respite_.momentum_gain) respite_string += '\n* Gain ' + this.respite_.momentum_gain + ' _Momentum_.'
    if (this.respite_.conditional_momentum) respite_string += '\n* Gain ' + this.respite_.conditional_momentum
    if (this.respite_.block_clear) respite_string += '\n* Clear ' + this.respite_.block_clear + ' _Block_.'
    if (this.respite_.special) respite_string += '\n* ' + this.respite_.special
    return respite_string
  }

  public get Grit() {
    if (this.defenses_ && this.defenses_.grit) return this.defenses_.grit
    return 0
  }

  public get Phase() {
    return this.phase_
  }
  public get HasHeadline() {
    return false
  }

  public get Summary() {
    return (
      '**_phase_**: ' +
      this.Phase +
      '; **_Momentum_:** ' +
      this.Momentum +
      '; **_Speed_:** ' +
      this.Speed +
      '\n\n' +
      '**_Block_:** ' +
      this.Block +
      '; **_Focus_:** ' +
      this.Focus +
      '; **_Grit_:** ' +
      this.Grit +
      '; **_Reflex_:** ' +
      this.Reflex
    )
  }

  public get Reflex() {
    if (this.defenses_ && this.defenses_.reflex) return this.defenses_.reflex
    return 0
  }

  public get Focus() {
    if (this.defenses_ && this.defenses_.focus) return this.defenses_.focus
    return 0
  }

  public get Momentum() {
    return this.momentum_
  }

  public get Posture() {
    return this.posture_
  }

  public get Block() {
    return this.stun_
  }

  public get SpeedHeader() {
    return '**Speed:** ' + this.Speed
  }

  public get Speed() {
    if (this.speed_) return this.speed_
    return 0
  }

  public get DefenseHeader() {
    var defense_string = '**Defenses:**'
    if (this.defenses_.focus) defense_string += ' ' + this.defenses_.focus + ' _Focus_'
    if (this.defenses_.grit) defense_string += ', ' + this.defenses_.grit + ' _Grit_'
    if (this.defenses_.reflex) defense_string += ', ' + this.defenses_.reflex + ' _Reflex_'
    return defense_string
  }
  public get HasIcon() {
    return true
  }

  public get ShowPosture() {
    return true
  }

  public get Icon() {
    if (this.Category == 'Offensive') return require('@/assets/Strike.svg')
    if (this.Category == 'Mobility') return require('@/assets/Move.svg')
    return require('@/assets/' + this.Category + '.svg')
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
    this.setAbilityPackageData(data)
    this.respite_ = data.respite || null
    this.defenses_ = data.defenses || null
    this.phase_ = data.phase || 0
    this.momentum_ = data.momentum || 'N/A'
    this.speed_ = data.speed || 0
    this.stun_ = data.block || 0
    this.posture_ = data.posture || 0
  }
}
export default Stance
