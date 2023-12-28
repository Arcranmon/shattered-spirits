/** @format */
// Parent class for techniques/manuevers.

import { store } from '@/store'
import { Chart } from '@/class'

class Ability {
  protected area_: string
  protected boost_: string
  protected cost_: string
  protected desc_: string
  protected effect_: string
  protected keywords_: Array<string>
  protected move_: string
  protected name_: string
  protected range_: Array<IRangeData>
  protected reqs_: string
  protected special_: string
  protected chart_: Chart

  public constructor(name) {
    this.area_ = ''
    this.boost_ = ''
    this.cost_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.keywords_ = []
    this.move_ = ''
    this.name_ = name
    this.range_ = null
    this.reqs_ = ''
    this.special_ = ''
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
  public get Desc() {
    return this.desc_
  }
  public get Effect() {
    return this.effect_
  }
  public get Keywords() {
    return this.keywords_
  }
  public get Name() {
    return this.name_
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
  public get Special() {
    return this.special_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasArea() {
    return this.Area != ''
  }
  public get AreaHeader() {
    if (this.Area && this.Area != '') return '**Area:** ' + this.Area
  }
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
  public get ManeuverHeader() {
    return '**Enhance:** '
  }
  public get HasKeywords() {
    return this.keywords_.length > 0
  }
  public get KeywordsHeader() {
    return '[_' + this.Keywords.join('_, _') + '_]'
  }
  public get HasMove() {
    return this.move_.length > 0
  }
  public get MoveHeader() {
    return '**_Move_:** _' + this.Move + '_'
  }
  public get HasRange() {
    return this.range_ && this.range_.length > 0
  }
  get RangeHeader() {
    var range_string = '**Range:** '
    for (var range_ele of this.range_) {
      if (range_ele.category == 'Melee') range_string += '_Melee_, _Reach_ ' + range_ele.value
      else if (range_ele.category == 'Self') range_string += '_Self_'
      else range_string += 'Ranged ' + range_ele.value
      if (range_ele.special != undefined) {
        range_string += ' (' + range_ele.special + ')'
      }
      if (range_ele != this.range_[this.range_.length - 1]) range_string += '/'
    }
    return range_string
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

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(abilityData: IAbilityData): Ability {
    const t = new Ability(abilityData.name)
    t.setAbilityData(abilityData)
    return t
  }

  public setAbilityData(data: IAbilityData): void {
    this.area_ = data.area || ''
    this.boost_ = data.boost || ''
    this.cost_ = data.cost || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.keywords_ = data.keywords || []
    this.move_ = data.move || ''
    this.name_ = data.name || ''
    this.reqs_ = data.reqs || ''
    this.special_ = data.special || ''
    if ('chart' in data) this.chart_ = Chart.Deserialize(data.chart)
    this.range_ = data.range || []
  }
}
export default Ability
