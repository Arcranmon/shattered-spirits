/** @format */
// Parent class for techniques/manuevers.

import { store } from '@/store'
import { Base, Chart } from '@/class'

class Ability extends Base {
  protected area_: string
  protected boost_: string
  protected cost_: string
  protected class_: string
  protected move_: number
  protected range_: string
  protected reqs_: string
  protected target_: string
  protected chart_: Chart

  public constructor(name) {
    super(name)
    this.area_ = ''
    this.boost_ = ''
    this.cost_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.move_ = 0
    this.name_ = name
    this.range_ = ''
    this.reqs_ = ''
    this.special_ = ''
    this.target_ = ''
    this.chart_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Area() {
    return this.area_
  }
  public get Chart() {
    return this.chart_
  }
  public get Cost() {
    return this.cost_
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

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasArea() {
    return this.Area != ''
  }
  public get AreaHeader() {
    return '**_Area_:** ' + this.Area
  }
  public get HasBoost() {
    return this.boost_.length > 0
  }
  public get BoostHeader() {
    return '**_Boost_:** ' + this.boost_
  }
  public get HasChart() {
    return this.Chart != null
  }
  public get HasCost() {
    return this.cost_.length > 0
  }
  public get CostHeader() {
    return '**_Cost_:** ' + this.cost_
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
    return '**Range:** _' + this.range_.replaceAll('/', '_/_').replaceAll('-', '_-_') + '_'
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
    this.boost_ = data.boost || ''
    this.cost_ = data.cost || ''
    this.class_ = data.class || ''
    this.move_ = data.move || 0
    this.reqs_ = data.reqs || ''
    this.target_ = data.target || ''
    if ('chart' in data) this.chart_ = Chart.Deserialize(data.chart)
    this.range_ = data.range || ''
  }
}
export default Ability
