import { store } from '@/store'
import { Base, Defenses } from '@/class'

class Subtype extends Base {
  private element_: string
  private stamina_: number
  private guard_: number
  private block_: number
  private speed_: number
  private growth_points_: number
  private traits_: string[]
  private phase_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get Stamina() {
    return this.stamina_
  }

  public get GrowthHeader() {
    return '**_Growth Points_:** ' + this.growth_points_
  }

  public get GrowthPoints() {
    return this.growth_points_
  }

  public get StaminaHeader() {
    return '**Stamina:** ' + this.Stamina
  }

  public get Block() {
    return this.block_
  }

  public get Guard() {
    return this.guard_
  }

  public get StanceHeader() {
    return '**Stances:**'
  }

  public get Speed() {
    return this.speed_
  }

  public get SpeedHeader() {
    return '**Move:** ' + this.speed_
  }
  public get Phase() {
    return this.phase_
  }

  public get PhaseHeader() {
    return '**Phase:** ' + this.phase_
  }

  public get Element() {
    return this.element_
  }
  public get SpiritType() {
    return '_' + this.element_ + '_ Spirit'
  }
  public get HasTraits() {
    return this.traits_.length > 0
  }
  public get Traits() {
    return this.traits_
  }
  public get Icon() {
    return require('@/assets/disciplines/' + this.Name.split(' ')[0] + '.svg')
  }
  public get TraitsHeader() {
    return '**Traits:** \n* _' + this.traits_.join('_\n* _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ISubtypeData): Subtype {
    const c = new Subtype(data.name)
    c.setSubtypeData(data)
    return c
  }

  private setSubtypeData(data: ISubtypeData): void {
    this.setBaseData(data)
    this.element_ = data.element || ''
    this.stamina_ = data.stamina || 0
    this.speed_ = data.speed || 0
    this.guard_ = data.guard || 0
    this.block_ = data.block || 0
    this.phase_ = data.phase || 0
    this.growth_points_ = data.growth_points || 0
  }
}
export default Subtype
