import { store } from '@/store'
import { Base, Defenses } from '@/class'

class Subtype extends Base {
  private defenses_: Defenses
  private element_: string
  private stamina_: number
  private stun_: number
  private block_: number
  private move_: number
  private manifest_: string[]
  private growth_points_: number
  private traits_: string[]
  private soak_: string
  private speed_: number

  public constructor(name) {
    super(name)
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get Stamina() {
    return this.stamina_
  }

  public get SoakHeader() {
    return '**Soak:** _' + this.soak_ + '_'
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
    return this.stun_
  }

  public get Stun() {
    return this.block_
  }

  public get StanceHeader() {
    return '**Stances:**'
  }

  public get Movement() {
    return this.move_
  }

  public get MovementHeader() {
    return '**Move:** ' + this.move_
  }
  public get Speed() {
    return this.speed_
  }

  public get SpeedHeader() {
    return '**Speed:** ' + this.speed_
  }

  public get Element() {
    return this.element_
  }
  public get SpiritType() {
    return '_' + this.element_ + '_ Spirit'
  }
  public get HasDefenses() {
    return this.defenses_
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
  public get Defenses() {
    return this.defenses_
  }
  public get ManifestHeader() {
    var header = '**Manifest:** The requirements to Manifest your spirit depend on its size, as follows.'
    var labels = ['&half;', '1', '2', '3']

    this.manifest_.forEach((value, index) => {
      header += '\n* **' + labels[index] + ':** ' + value
    })

    return header
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
    this.soak_ = data.soak || ''
    this.defenses_ = data.defenses ? Defenses.Deserialize(data.defenses) : null
    this.traits_ = data.traits || []
    this.stamina_ = data.stamina || 0
    this.move_ = data.move || 0
    this.stun_ = data.block || 0
    this.block_ = data.stun || 0
    this.manifest_ = data.manifest || []
    this.speed_ = data.speed || 0
    this.growth_points_ = data.growth_points || 0
  }
}
export default Subtype
