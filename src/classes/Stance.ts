import { store } from '@/store'
import { AbilityPackage, ColorMap } from '@/class'
import { isStandardBrowserEnv } from 'vue-simple'

class Stance extends AbilityPackage {
  private defenses_: IDefenseData
  private momentum_: string
  private stun_: number
  private phase_: number
  private speed_: number

  public constructor(name) {
    super(name)
    this.defenses_ = null
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get Header() {
    return this.Name + ' - _' + this.category_ + '_ _Stance_'
  }

  public get Phase() {
    return this.phase_
  }
  public get HasHeadline() {
    return false
  }

  public get Summary() {
    return '**_phase_**: ' + this.Phase + '; **_Momentum_:** ' + this.Momentum + '; **_Speed_:** ' + this.Speed + '\n\n' + '**_Block_:** ' + this.Block + ';'
  }

  public get Momentum() {
    return this.momentum_
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
    return defense_string
  }
  public get HasIcon() {
    return true
  }

  public get Icon() {
    if (this.Category == 'Offensive') return require('@/assets/Strike.svg')
    if (this.Category == 'Mobility') return require('@/assets/Move.svg')
    return require('@/assets/' + this.Category + '.svg')
  }

  public get Color() {
    return ColorMap.get('Stance')
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
    this.defenses_ = data.defenses || null
    this.phase_ = data.phase || 0
    this.momentum_ = data.momentum || 'N/A'
    this.speed_ = data.speed || 0
    this.stun_ = data.block || 0
  }
}
export default Stance
