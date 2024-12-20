import { store } from '@/store'
import { Base } from '@/class'

class Status extends Base {
  private negate_: string
  private recover_: string
  private reacts_: string[]
  private repeat_: string
  private remove_: string
  private type_: string

  public constructor(name) {
    super(name)
    this.recover_ = ''
    this.reacts_ = []
    this.remove_ = ''
    this.repeat_ = ''
    this.type_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
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
  get HasRepeat() {
    return this.repeat_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get NegateHeader() {
    return '**Negate:** ' + this.negate_
  }
  public get ReactsHeader() {
    var interact_header = '**Reacts:** ' + this.name_ + ' reacts with other effects as follows:'
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
  public get RepeatHeader() {
    return '**Repeated Application:** ' + this.repeat_
  }
  public get Icon() {
    if (this.Name == 'Error') return ''
    return require('@/assets/statuses/' + this.Name + '.svg')
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IStatusData): Status {
    const a = new Status(data.name)
    a.setStatusData(data)
    return a
  }

  public setStatusData(data: IStatusData): void {
    this.setBaseData(data)
    this.negate_ = data.negate || ''
    this.recover_ = data.recover || ''
    this.reacts_ = data.reacts || []
    this.repeat_ = data.repeat || ''
    this.remove_ = data.remove || ''
    this.type_ = data.type || ''
  }
}
export default Status
