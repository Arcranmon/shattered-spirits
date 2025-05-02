/** @format */
// Parent class for techniques/maneuvers.

import { store } from '@/store'
import { Base, Chart } from '@/class'

class Ability extends Base {
  protected area_: string
  protected boosts_: IBoostData[]
  protected cost_: string
  protected class_: string
  protected gambit_: string[] // Only for Attacks
  protected move_: number
  protected range_: string
  protected reqs_: string
  protected target_: string
  protected speed_: number
  protected type_: string
  protected trigger_: string

  public constructor(name) {
    super(name)
    this.area_ = ''
    this.boosts_ = []
    this.cost_ = ''
    this.desc_ = ''
    this.gambit_ = []
    this.effect_ = ''
    this.move_ = 0
    this.name_ = name
    this.range_ = ''
    this.reqs_ = ''
    this.special_ = ''
    this.target_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Area() {
    return this.area_
  }
  public get Cost() {
    return this.cost_
  }
  public get Header() {
    var header = this.Name + ' - '
    if (this.HasSpeed) header += 'Speed ' + this.speed_ + ' '
    header += this.class_ + ' ' + this.type_
    return header
  }
  public get SpeedHeader() {
    return '**Speed ' + this.speed_ + '**'
  }
  public get Move() {
    return this.move_
  }
  public get Range() {
    return this.range_
  }
  public get Reqs() {
    return this.reqs_
  }
  public get Type() {
    return this.type_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasArea() {
    return this.Area != ''
  }
  public get AreaHeader() {
    return '**_Area_:** ' + this.Area
  }
  public get Boosts() {
    return this.boosts_
  }
  public get HasBoosts() {
    return this.boosts_.length > 0
  }
  public get BoostsHeader() {
    var text = '**_Boosts_:** '
    for (var boost of this.boosts_) {
      text += '\n * **' + boost.name + ' - ' + boost.cost + ':** ' + boost.effect
    }
    return text
  }
  public get HasCost() {
    return this.cost_.length > 0
  }
  public get CostHeader() {
    return '**_Cost_:** ' + this.cost_
  }
  public get HasGambit() {
    return this.gambit_.length > 0
  }
  public get GambitHeader() {
    return '**_Gambit_:** ' + this.gambit_
  }
  public get HasMove() {
    return this.move_ > 0
  }
  public get MoveHeader() {
    return '**_Move_:** _' + this.Move + '_'
  }
  public get HasRange() {
    return this.range_.length > 0
  }
  get RangeHeader() {
    var header = '**Range:** _' + this.range_.replaceAll('/', '_/_').replaceAll('-', '_-_') + '_'
    if (this.HasTarget) header += ', ' + this.target_
    return header
  }
  public get HasReqs() {
    return this.reqs_.length > 0
  }
  public get ReqsHeader() {
    return '**Requirements:** ' + this.reqs_
  }
  public get HasTarget() {
    return this.target_.length > 0
  }
  public get TargetHeader() {
    return '**Target:** ' + this.target_
  }
  get HasSpeed() {
    return this.speed_ != 0
  }
  public get Speed() {
    return this.speed_
  }
  get HasTrigger() {
    return this.trigger_ != ''
  }
  public get Trigger() {
    return this.trigger_
  }
  public get TriggerHeader() {
    return '**Trigger:** ' + this.trigger_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IAbilityData): Ability {
    const t = new Ability(data.name)
    t.setAbilityData(data)
    return t
  }

  public setAbilityData(data: IAbilityData): void {
    this.setBaseData(data)
    this.area_ = data.area || ''
    this.boosts_ = data.boosts || []
    this.cost_ = data.cost || ''
    this.class_ = data.class || 'MISSING'
    this.type_ = data.type || 'MISSING'
    this.gambit_ = data.gambit || []
    this.move_ = data.move || 0
    this.reqs_ = data.reqs || ''
    this.speed_ = data.speed || 0
    this.target_ = data.target || ''
    this.trigger_ = data.trigger || ''
    this.range_ = data.range || ''
  }
}
export default Ability
