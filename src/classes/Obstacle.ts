import { store } from '@/store'
import { Base, Chart } from '@/class'

class Obstacle extends Base {
  private destroy_: string
  private damage_type_: string
  private element_: string
  private hardness_: number
  private height_: number
  private interact_: string
  private traits_: string
  private forced_movement_: string
  private size_: number
  private chart_: Chart

  public constructor(name) {
    super(name)
    this.element_ = ''
    this.hardness_ = 0
    this.height_ = 0
    this.interact_ = ''
    this.traits_ = ''
    this.forced_movement_ = ''
    this.size_ = 0
    this.chart_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Chart() {
    return this.chart_
  }
  public get ColorHeader() {
    return this.element_ + '-Terrain'
  }
  get Traits() {
    return this.traits_
  }
  public get Icon() {
    if (!this.element_ || this.element_ == 'Derived' || this.element_ == 'Elementless' || this.element_ == 'Special')
      return require('@/assets/terrain/BasicTerrain.svg')
    return require('@/assets/terrain/' + this.element_ + '.svg')
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasChart() {
    return this.chart_ != null
  }
  get HasDamageType() {
    return this.damage_type_ != ''
  }
  get HasDestroy() {
    return this.destroy_ != ''
  }
  get HasInteract() {
    return this.interact_ != ''
  }
  get HasTraits() {
    return this.traits_ != ''
  }
  get HasForcedMovement() {
    return this.forced_movement_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get DamageType() {
    return '**Damage Type:** ' + this.damage_type_
  }
  public get DestroyHeader() {
    return '**Destroy:** ' + this.destroy_
  }
  public get ElementHeader() {
    return '_' + this.element_ + '_ Obstacle'
  }
  public get HardnessHeader() {
    if (this.hardness_ == 0) return 'See Special for Hardness'
    return 'Hardness ' + this.hardness_
  }
  public get InteractHeader() {
    return '**Interact:** ' + this.interact_
  }
  public get HeightHeader() {
    return 'Height ' + this.height_
  }
  public get TraitsHeader() {
    return '**Traits:** ' + this.traits_
  }
  public get ForcedMovementHeader() {
    return '**Forced Movement:** ' + this.forced_movement_
  }
  public get SizeHeader() {
    return 'Size ' + this.size_
  }
  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(obstacleData: IObstacleData): Obstacle {
    const t = new Obstacle(obstacleData.name)
    t.setObstacleData(obstacleData)
    return t
  }

  public setObstacleData(data: IObstacleData): void {
    this.setBaseData(data)
    this.damage_type_ = data.damage_type || ''
    this.desc_ = data.desc || ''
    this.destroy_ = data.destroy || ''
    this.element_ = data.element || ''
    this.hardness_ = data.hardness || 0
    this.height_ = data.height || 0
    this.interact_ = data.interact || ''
    this.name_ = data.name || ''
    this.keywords_ = data.keywords || []
    this.traits_ = data.traits || ''
    this.forced_movement_ = data.forced_movement || ''
    this.size_ = data.size || 0
    this.special_ = data.special || ''
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Obstacle
