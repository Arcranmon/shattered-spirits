import { store } from '@/store'
import { Chart } from '@/class'

class Status {
  private desc_: string
  private effect_: string
  private special_: string
  private name_: string
  private negate_: string
  private recover_: string
  private reacts_: string[]
  private remove_: string
  private type_: string

  public constructor() {
    this.desc_ = ''
    this.effect_ = ''
    this.name_ = ''
    this.recover_ = ''
    this.reacts_ = []
    this.remove_ = ''
    this.special_ = ''
    this.type_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Desc() {
    return this.desc_
  }
  get Name() {
    return this.name_
  }
  get Type() {
    return this.type_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasNegate() {
    return this.negate_ != ''
  }
  get HasRecovery() {
    return this.recover_ != ''
  }
  get HasReacts() {
    return this.reacts_.length > 0
  }
  get HasRemove() {
    return this.remove_ != ''
  }
  get HasSpecial() {
    return this.special_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get NegateHeader() {
    return '**Negate:** ' + this.negate_
  }
  public get ReactsHeader() {
    var interact_header = '**Reacts:** ' + this.name_ + ' reacts with other Afflictions as follows:'
    for (var react of this.reacts_) {
      interact_header += '\n* ' + react
    }
    return interact_header
  }
  public get RecoveryHeader() {
    return '**Recovery:** ' + this.recover_
  }
  public get RemoveHeader() {
    return '**Remove:** ' + this.remove_
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get Icon() {
    if (this.Name == 'Error') return ''
    return require('@/assets/' + this.Name + '.svg')
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(statusData: IStatusData): Status {
    const a = new Status()
    a.setStatusData(statusData)
    return a
  }

  public setStatusData(data: IStatusData): void {
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.name_ = data.name || ''
    this.negate_ = data.negate || ''
    this.recover_ = data.recover || ''
    this.reacts_ = data.reacts || []
    this.remove_ = data.remove || ''
    this.special_ = data.special || ''
    this.type_ = data.type || ''
  }
}
export default Status
