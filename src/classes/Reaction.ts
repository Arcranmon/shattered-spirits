/** @format */

import { store } from '@/store'
import { Chart } from '@/class'

class Reaction {
  private boost_: string
  private cost_: string
  private effect_: string
  private keywords_: Array<string>
  private name_: string
  private move_: string
  private trigger_: string
  private chart_: Chart

  public constructor() {
    this.boost_ = ''
    this.cost_ = ''
    this.effect_ = ''
    this.keywords_ = []
    this.name_ = ''
    this.move_ = ''
    this.trigger_ = ''
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
  public get Trigger() {
    return this.trigger_
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
  public get HasTrigger() {
    return this.trigger_.length > 0
  }
  public get TriggerHeader() {
    return '**Trigger:** ' + this.trigger_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(techData: IReactionData): Reaction {
    const t = new Reaction()
    t.setReactionData(techData)
    return t
  }

  public setReactionData(data: IReactionData): void {
    this.boost_ = data.boost || ''
    this.cost_ = data.cost || ''
    this.effect_ = data.effect || ''
    this.keywords_ = data.keywords || []
    this.move_ = data.move || ''
    this.name_ = data.name || ''
    this.trigger_ = data.trigger || ''
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Reaction
