import { store } from '@/store'
import { Base } from '@/class'

class Terrain extends Base {
  private element_: string
  private layer_: string // Base, Field, Surface, Weather
  private negate_: string
  private interactions_: Array<string>
  private destroy_: string
  private position_effect_: string
  private path_effect_: string

  public constructor(name) {
    super(name)
    this.element_ = ''
    this.layer_ = ''
    this.interactions_ = []
    this.destroy_ = ''
    this.negate_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Icon() {
    if (!this.element_ || this.element_ == 'Mutable' || this.element_ == 'Elementless') return require('@/assets/terrain/BasicTerrain.svg')
    return require('@/assets/terrain/' + this.element_ + '.svg')
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasNegate() {
    return this.negate_ != ''
  }
  get HasInteractions() {
    return this.interactions_.length > 0
  }
  get HasDestroy() {
    return this.destroy_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get ColorHeader() {
    return this.element_ + '-Terrain'
  }
  public get DestroyHeader() {
    return '**Destroy:** ' + this.destroy_
  }
  public get InteractionsHeader() {
    return '**Interactions:** \n* _' + this.interactions_.join('_\n* _') + '_'
  }
  public get NegateHeader() {
    return '**Negate:** ' + this.negate_
  }
  public get PositionEffectHeader() {
    return '**Position Effect:** ' + this.position_effect_
  }
  public get PathEffectHeader() {
    return '**Path Effect:** ' + this.path_effect_
  }
  public get TerrainDetails() {
    return '_' + this.element_ + '_  Terrain (_' + this.layer_ + '_)'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ITerrainData): Terrain {
    const t = new Terrain(data.name)
    t.setTerrainData(data)
    return t
  }

  public setTerrainData(data: ITerrainData): void {
    this.setBaseData(data)
    this.position_effect_ = data.position_effect || ''
    this.path_effect_ = data.path_effect || ''
    this.element_ = data.element || ''
    this.layer_ = data.layer || ''
    this.negate_ = data.negate || ''
    this.destroy_ = data.destroy || ''
    this.interactions_ = data.interactions || []
  }
}
export default Terrain
