import { store } from '@/store'
import { Base } from '@/class'

class Event extends Base {
  private time_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get Header() {
    var header = this.Name + ' - ' + this.Type
    if (this.type_ != 'Encounter') header += ' (' + this.category_ + ')'
    return header
  }

  get Icon() {
    if (this.Type != 'Danger' && this.Type != 'Augment') return require('@/assets/Neutral.svg')
    return require('@/assets/' + this.Type + '.svg')
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IEventData): Event {
    const a = new Event(data.name)
    a.setEventData(data)
    return a
  }

  public setEventData(data: IEventData): void {
    this.setBaseData(data)
  }
}
export default Event
