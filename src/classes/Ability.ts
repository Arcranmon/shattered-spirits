/** @format */
// Parent category for techniques/maneuvers.

import { store } from '@/store'
import { Base, AbilityPackage, Chart, Bonuses } from '@/class'

class Ability extends Base {
  protected missile_: string
  protected area_: string
  protected defend_: string
  protected enhancements_: IEnhanceData[]
  protected imbues_: IEnhanceData[]
  protected cost_: string
  protected category_: string
  protected move_: number
  protected range_: string
  protected reqs_: string
  protected target_: string
  protected speed_: number
  protected type_: string
  protected trigger_: string
  protected origin_: AbilityPackage
  protected chart_: Chart
  protected bonuses_: Bonuses

  public constructor(name) {
    super(name)
    this.area_ = ''
    this.enhancements_ = []
    this.cost_ = ''
    this.chart_ = null
    this.desc_ = ''
    this.effect_ = ''
    this.move_ = 0
    this.name_ = name
    this.range_ = ''
    this.reqs_ = ''
    this.special_ = ''
    this.target_ = ''
    this.origin_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Area() {
    return this.area_
  }
  public get Bonuses() {
    return this.bonuses_
  }
  public get Cost() {
    return this.cost_
  }
  public get HasChart() {
    return this.chart_ != null
  }
  public get Chart() {
    return this.chart_
  }
  public get category() {
    return this.category_
  }
  public get Header() {
    var header = this.Name
    if (this.HasSpeed) header += 'Speed ' + this.speed_ + ' '
    if (this.Type != 'Skill') {
      header += ' - ' + this.category_ + ' ' + this.type_
    }
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
  public get Origin() {
    return this.origin_
  }
  public set Origin(origin: AbilityPackage) {
    this.origin_ = origin
  }
  public get Icon() {
    if (this.category_ === 'Defensive') return require('@/assets/Defensive.svg')
    if (this.category_ === 'Offensive' || this.type_ === 'Attack') return require('@/assets/Offensive.svg')
    if (this.category_ === 'Mobility') return require('@/assets/Move.svg')
    if (this.category_ === 'Recovery') return require('@/assets/Recovery.svg')
    if (this.type_ === 'Skill') return require('@/assets/Skill.svg')
    if (this.type_ === 'Power') return require('@/assets/disciplines/' + this.Category + '.svg')
    return require('@/assets/General.svg')
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasArea() {
    return this.Area != ''
  }
  public get UsesChart() {
    return this.Type == 'Attack' || (this.Type == 'Reaction' && (this.keywords_.includes('Block') || this.keywords_.includes('Dodge')))
  }
  public get AreaHeader() {
    return '**_Area_:** ' + this.Area
  }
  public get Enhancements() {
    return this.enhancements_
  }
  public get HasEnhancements() {
    return this.enhancements_.length > 0
  }
  public get EnhancementsHeader() {
    var text = '**_Enhancements_:** '
    for (var enhance of this.enhancements_) {
      text += '\n * **' + enhance.name + ' - ' + enhance.cost + ':** ' + enhance.effect
    }
    return text
  }
  public get HasImbues() {
    return this.imbues_.length > 0
  }
  public get ImbuesHeader() {
    var text = '**_Imbues_:** '
    for (var imbue of this.imbues_) {
      text += '\n * **' + imbue.name + ' - ' + imbue.cost + ':** ' + imbue.effect
    }
    return text
  }
  public get HasDefend() {
    return this.defend_
  }
  public get Defend() {
    return this.defend_
  }
  public get DefendHeader() {
    return '**_Defend_:** ' + this.defend_
  }
  public get HasCost() {
    return this.cost_.length > 0 && this.cost_ != 'None'
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
  public get HasRangeOrTarget() {
    return this.HasRange || this.HasTarget
  }
  public get HasRange() {
    return this.range_.length > 0
  }
  get RangeOrTargetHeader() {
    var header = ''
    if (this.HasRange) header += '**Range:** _' + this.range_.replaceAll('/', '_/_').replaceAll('-', '_-_') + '_'
    if (this.HasRange && this.HasTarget) header += '; '
    if (this.HasTarget) header += this.TargetHeader
    return header
  }
  get RangeHeader() {
    var header = '**Range:** _' + this.range_.replaceAll('/', '_/_').replaceAll('-', '_-_') + '_'
    // if (this.HasTarget) header += ', ' + this.target_
    return header
  }
  public get HasMissile() {
    return this.missile_.length > 0
  }
  public get MissileHeader() {
    return '**Missile:** ' + this.missile_
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
    this.missile_ = data.missile || ''
    this.area_ = data.area || ''
    this.enhancements_ = data.enhancements || []
    this.imbues_ = data.imbues || []
    this.defend_ = data.defend || ''
    this.cost_ = data.cost || ''
    this.category_ = data.category || ''
    this.type_ = data.type || 'MISSING'
    this.move_ = data.move || 0
    this.reqs_ = data.reqs || ''
    this.speed_ = data.speed || 0
    this.target_ = data.target || ''
    this.trigger_ = data.trigger || ''
    this.range_ = data.range || ''
    this.bonuses_ = 'bonuses' in data ? Bonuses.Deserialize(data.bonuses) : new Bonuses()
    if ('chart' in data) this.chart_ = Chart.Deserialize(data.chart)
  }
}
export default Ability
