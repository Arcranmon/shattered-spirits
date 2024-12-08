import { store } from '@/store'
import { Base } from '@/class'

class Talent extends Base {
  private icon_: string
  private always_: string
  private push_: string
  private prereqs_: string

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Icon() {
    return require('@/assets/disciplines/' + this.icon_ + '.svg')
  }

  public get Name() {
    return this.name_
  }

  public get Desc() {
    return this.desc_
  }

  public get HasPush() {
    return this.push_ != null
  }

  public get PrereqsHeader() {
    return '**Prerequisites:** _' + this.prereqs_ + '_'
  }

  public get PushHeader() {
    return '**Push:** ' + this.push_
  }

  public get AlwaysHeader() {
    return '**Always:** ' + this.always_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ITalentData): Talent {
    const t = new Talent(data.name)
    t.setTalentData(data)
    return t
  }

  public setTalentData(data: ITalentData): void {
    this.setBaseData(data)
    this.icon_ = data.icon || ''
    this.name_ = data.name || ''
    this.desc_ = data.desc || ''
    this.always_ = data.always || null
    this.push_ = data.push || null
    this.prereqs_ = data.prereqs || 'None'
  }
}
export default Talent
