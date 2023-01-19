/** @format */

import { store } from '@/store'
import { Chart } from '@/class'

class Technique {
  private ap_: number
  private area_: string
  private boost_: string
  private cost_: string
  private damagetype_: string
  private discipline_: string
  private enhancement_: string
  private desc_: string
  private effect_: string
  private imbue_: string
  private keywords_: Array<string>
  private linked_: string
  private move_: string
  private name_: string
  private range_: string
  private reaction_: string
  private reqs_: string
  private special_: string
  private speed_: string
  private target_: string
  private trigger_: string
  private type_: string
  private chart_: Chart

  public constructor() {
    this.ap_ = 4
    this.area_ = ''
    this.boost_ = ''
    this.cost_ = ''
    this.damagetype_ = ''
    this.desc_ = ''
    this.effect_ = ''
    this.enhancement_ = ''
    this.imbue_ = ''
    this.keywords_ = []
    this.linked_ = ''
    this.move_ = ''
    this.name_ = ''
    this.range_ = ''
    this.reaction_ = null
    this.reqs_ = ''
    this.special_ = ''
    this.speed_ = ''
    this.target_ = ''
    this.trigger_ = ''
    this.type_ = ''
    this.chart_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get AP() {
    return this.ap_
  }
  public get Area() {
    return this.area_
  }
  public get Attack() {
    return this.type_ == 'Attack'
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
  public get DamageType() {
    return this.damagetype_
  }
  public get Effect() {
    return this.effect_
  }
  public get Enhancement() {
    return this.enhancement_
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
  public get Reaction() {
    return this.reaction_
  }
  public get Reqs() {
    return this.reqs_
  }
  public get Special() {
    return this.special_
  }
  public get Speed() {
    return this.speed_
  }
  public get Trigger() {
    return this.trigger_
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
  public get Discipline() {
    return this.discipline_
  }
  public get HasDamageType() {
    return this.damagetype_.length > 0
  }
  public get DamageTypeHeader() {
    return this.damagetype_ + ' Damage'
  }
  public get HasEffect() {
    return this.effect_.length > 0
  }
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get EnhancementHeader() {
    return '**Enhance:** '
  }
  public get HasEnhancement() {
    return this.enhancement_.length > 0
  }
  public get HasImbue() {
    return this.imbue_.length > 0
  }
  public get ImbueHeader() {
    return '**Imbue:** ' + this.imbue_
  }
  public get HasKeywords() {
    return this.keywords_.length > 0
  }
  public get KeywordsHeader() {
    return '_' + this.Keywords.join('_, _') + '_'
  }
  public get HasLinked() {
    return this.linked_.length > 0
  }
  public get LinkedHeader() {
    return '**Linked:** ' + this.linked_
  }
  public get HasMove() {
    return this.move_.length > 0
  }
  public get MoveHeader() {
    return '**Move:** _' + this.Move + '_'
  }
  public get HasRange() {
    return this.Range != ''
  }
  public get RangeHeader() {
    if (this.Range.includes('Weapon')) return 'Weapon Range'
    else if (this.Range.length <= 2) return '_Range_ ' + this.range_
    else return '_' + this.range_ + '_'
  }
  public get HasReaction() {
    return this.reaction_.length > 0
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
  public get SpeedHeader() {
    if (this.Speed.length == 1) return 'Speed ' + this.Speed
    else return this.speed_
  }
  public get HasTarget() {
    return this.target_.length > 0
  }
  public get TargetHeader() {
    return '**Target:** ' + this.target_
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

  public static Deserialize(techData: ITechData): Technique {
    const t = new Technique()
    t.setTechData(techData)
    return t
  }

  public setTechData(data: ITechData): void {
    this.ap_ = data.ap != null ? data.ap : 4
    this.area_ = data.area || ''
    this.boost_ = data.boost || ''
    this.cost_ = data.cost || ''
    this.damagetype_ = data.damagetype || ''
    this.discipline_ = data.discipline || ''
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.enhancement_ = data.enhancement || ''
    this.imbue_ = data.imbue || ''
    this.keywords_ = data.keywords || []
    this.linked_ = data.linked || ''
    this.move_ = data.move || ''
    this.name_ = data.name || ''
    this.range_ = data.range || ''
    this.reaction_ = data.reaction || ''
    this.reqs_ = data.reqs || ''
    this.special_ = data.special || ''
    this.speed_ = data.speed || ''
    this.trigger_ = data.trigger || ''
    this.target_ = data.target || ''
    this.type_ = data.type || ''
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Technique
