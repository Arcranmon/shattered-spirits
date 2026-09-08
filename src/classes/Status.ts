import { store } from '@/store'
import { Base, ColorMap } from '@/class'

class Status extends Base {
  private recover_: string
  private reacts_: string[]
  private repeat_: string
  private remove_: string
  private segments_: number
  private clock_: number

  public constructor(name) {
    super(name)
    this.recover_ = ''
    this.remove_ = ''
    this.reacts_ = []
    this.repeat_ = ''
    this.segments_ = 0
    this.clock_ = 0
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get Header() {
    return this.Name + ' - ' + this.Type
  }
  get NamelessHeader() {
    return this.Type
  }
  get HasRecovery() {
    return this.recover_ != ''
  }
  get Recovery() {
    return this.recover_
  }
  get HasRemove() {
    return this.remove_ != ''
  }
  get Remove() {
    return this.remove_
  }
  get HasReacts() {
    return this.reacts_.length > 0
  }
  get HasRepeat() {
    return this.repeat_ != ''
  }
  get Repeat() {
    return this.repeat_
  }
  get ShowClockOrSegment() {
    return this.segments_ + this.clock_ > 0
  }
  get Segments() {
    return this.segments_
  }
  get Clock() {
    return this.clock_
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get ReactsHeader() {
    var interact_header = '**Reacts:** ' + this.name_ + ' reacts with other effects as follows:'
    for (var react of this.reacts_) {
      interact_header += '\n* ' + react
    }
    return interact_header
  }
  public get ReactsList() {
    var interact_header = ''
    for (var react of this.reacts_) {
      interact_header += '\n* ' + react
    }
    return interact_header
  }
  public get RecoveryHeader() {
    return '**Recovery:** ' + this.recover_
  }
  get RemoveHeader() {
    return '**Remove:** ' + this.remove_
  }
  public get RepeatHeader() {
    return '**Repeated Application:** ' + this.repeat_
  }
  public get Icon() {
    if (this.Name == 'Error') return ''
    if (this.Type == 'Minor Wound') return require('@/assets/statuses/Minor Wound.svg')
    if (this.Type == 'Moderate Wound') return require('@/assets/statuses/Moderate Wound.svg')
    if (this.Type == 'Major Wound') return require('@/assets/statuses/Major Wound.svg')
    if (this.Name == 'Exhausted') return require('@/assets/statuses/Fatigue.svg')
    if (this.Name == 'Starving') return require('@/assets/statuses/Hungry.svg')
    if (this.Name == 'Dehydrated') return require('@/assets/statuses/Hungry.svg')
    if (this.Name == 'Extreme Stress') return require('@/assets/statuses/Stress.svg')
    if (this.Name == 'Grappled') return require('@/assets/statuses/Grabbed.svg')
    return require('@/assets/statuses/' + this.Name + '.svg')
  }
  public get Color() {
    if (this.Type.includes('Wound') || this.Type.includes('Condition')) return ColorMap.get('Wound')
    return ColorMap.get('Status')
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
    this.recover_ = data.recover || ''
    this.reacts_ = data.reacts || []
    this.repeat_ = data.repeat || ''
    this.segments_ = data.segments || 0
    this.clock_ = data.clock || 0
    this.remove_ = data.remove || ''
  }
}
export default Status
