import { store } from '@/store'
import { Ability, AbilityPackage, Base } from '@/class'
import { isStandardBrowserEnv } from 'vue-simple'

class Stance extends AbilityPackage {
  private respite_: IRespiteData
  private defenses_: IDefenseData
  private traits_: Array<string>
  private momentum_: number
  private ward_: number
  private stun_: number
  private block_clear_: number
  private speed_: number
  private movement_: number
  private display_type_: string

  public constructor(name) {
    super(name)
    this.respite_ = null
    this.defenses_ = null
    this.traits_ = []
    this.display_type_ = 'Player'
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

  public get BlockClear() {
    if (this.block_clear_) return this.block_clear_
    return 0
  }

  public get Grit() {
    if (this.defenses_ && this.defenses_.grit) return this.defenses_.grit
    return 0
  }

  public get Speed() {
    return this.speed_
  }
  public get HasSummary() {
    return false
  }

  public get Summary() {
    return (
      '**_Speed_**: ' +
      this.Speed +
      '; **_Momentum_:** ' +
      this.Momentum +
      '; **_Movement_:** ' +
      this.Movement +
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

  public get Guard() {
    return this.ward_
  }

  public get Block() {
    return this.stun_
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
  public get HasIcon() {
    return true
  }

  public get ShowMomentum() {
    return this.display_type_ == 'Player' || this.display_type_ == 'Spirit'
  }
  public get ShowWard() {
    return true
  }

  public get ColsHelper() {
    if (this.display_type_ == 'Player') {
      return 2
    }
    if (this.display_type_ == 'NPC') {
      return 3
    }
    return 2
  }

  public get Icon() {
    if (this.Category == 'Offensive') return require('@/assets/Strike.svg')
    if (this.Category == 'Mobility') return require('@/assets/Move.svg')
    return require('@/assets/' + this.Category + '.svg')
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
    this.setAbilityPackageData(data)
    this.respite_ = data.respite || null
    this.defenses_ = data.defenses || null
    this.traits_ = data.traits || []
    this.speed_ = data.speed || 0
    this.momentum_ = data.momentum || 0
    this.block_clear_ = data.block_clear || 0
    this.movement_ = data.movement || 0
    this.stun_ = data.block || 0
    this.ward_ = data.guard || 0
    this.display_type_ = data.display_type || 'Player'
  }
}
export default Stance
