/** @format */

import { store } from '@/store'
import { Chart } from '@/class'

class Maneuver {
  private boost_: string
  private cost_: string
  private desc_: string
  private effect_: string
  private keywords_: Array<string>
  private move_: string
  private name_: string
  private range_: string
  private reqs_: string
  private special_: string
  private trigger_: string
  private type_: string
  private chart_: Chart

  public constructor() {
    this.boost_ = ''
    this.cost_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.keywords_ = []
    this.name_ = ''
    this.move_ = ''
    this.reqs_ = ''
    this.special_ = ''
    this.trigger_ = ''
    this.type_ = ''
    this.chart_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Chart() {
    return this.chart_
  }
  public get Cost() {
    return this.cost_
  }
  public get Desc() {
    return this.desc_
  }
  public get Effect() {
    return this.effect_
  }
  public get Keywords() {
    return this.keywords_
  }
  public get Move() {
    return this.move_
  }
  public get Name() {
    return this.name_
  }
  public get Special() {
    return this.special_
  }
  public get Type() {
    return this.type_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasBoost() {
    return this.boost_.length > 0
  }
  public get BoostHeader() {
    return '**Boost:** ' + this.boost_
  }
  public get HasChart() {
    return this.Chart != null
  }
  public get HasCost() {
    return this.cost_.length > 0
  }
  public get CostHeader() {
    return '**Cost:** ' + this.cost_
  }
  public get HasEffect() {
    return this.effect_.length > 0
  }
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get HasKeywords() {
    return this.keywords_.length > 0
  }
  public get KeywordsHeader() {
    return '_' + this.Keywords.join('_, _') + '_'
  }
  public get HasMove() {
    return this.move_.length > 0
  }
  public get MoveHeader() {
    return '**Move:** ' + this.move_
  }
  public get HasRange() {
    return this.range_.length > 0
  }
  public get RangeHeader() {
    return '**Range:** ' + this.range_
  }
  public get HasReqs() {
    return this.reqs_.length > 0
  }
  public get ReqsHeader() {
    return '**Requirements:** ' + this.reqs_
  }
  public get HasSpecial() {
    return this.special_.length > 0
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get HasTrigger() {
    return this.trigger_.length > 0
  }
  public get TriggerHeader() {
    return '**Trigger:** ' + this.trigger_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(techData: IManeuverData): Maneuver {
    const t = new Maneuver()
    t.setManeuverData(techData)
    return t
  }

  public setManeuverData(data: IManeuverData): void {
    this.boost_ = data.boost || ''
    this.cost_ = data.cost || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.keywords_ = data.keywords || []
    this.move_ = data.move || ''
    this.name_ = data.name || ''
    this.range_ = data.range || ''
    this.reqs_ = data.reqs || ''
    this.special_ = data.special || ''
    this.trigger_ = data.trigger || ''
    this.type_ = data.type || 'Maneuver'
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Maneuver
