import { store } from '@/store'
import { Base } from '@/class'

class Terrain extends Base {
  private element_: string
  private layer_: string // Base, Field, Surface, Weather
  private negate_: string
  private interactions_: Array<string>
  private destroy_: string
  private hardness_: number
  private threshold_: number
  private engaged_: string
  private collide_: string
  private enter_: string
  private eor_: string
  private source_: string

  public constructor(name) {
    super(name)
    this.element_ = ''
    this.layer_ = ''
    this.interactions_ = []
    this.destroy_ = ''
    this.negate_ = ''
    this.engaged_ = ''
    this.collide_ = ''
    this.enter_ = ''
    this.source_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Icon() {
    if (!this.element_ || this.element_ == 'Mutable' || this.element_ == 'Elementless' || this.element_ == 'Arena')
      return require('@/assets/terrain/BasicTerrain.svg')
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
  get HasHardness() {
    return this.hardness_ != 0
  }
  get HasEnter() {
    return this.enter_ != '' && this.enter_ != this.collide_
  }
  get HasCollide() {
    return this.collide_ != ''
  }
  get HasEngaged() {
    return this.engaged_ != ''
  }
  get HasSource() {
    return this.source_ != ''
  }
  get HasEor() {
    return this.eor_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get ColorHeader() {
    if (this.element_ == 'Arena') return 'Elementless-Terrain'
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
  public get SourceHeader() {
    return '**Source:** ' + this.source_
  }
  public get EngagedHeader() {
    return '**Engaged:** ' + this.engaged_
  }
  public get EnterHeader() {
    return '**Enter:** ' + this.enter_
  }
  public get CollideHeader() {
    if (this.collide_ == this.enter_) return '**Collide/Enter:** ' + this.collide_
    return '**Collide:** ' + this.collide_
  }
  public get EorHeader() {
    return '**End of Round:** ' + this.eor_
  }
  public get HardnessHeader() {
    return '**Hardness:** ' + this.hardness_ + '; **Threshold:** ' + this.threshold_
  }
  public get Header() {
    return this.Name + ' - _' + this.element_ + '_ ' + this.layer_
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
    this.element_ = data.element || ''
    this.layer_ = data.layer || ''
    this.negate_ = data.negate || ''
    this.destroy_ = data.destroy || ''
    this.interactions_ = data.interactions || []
    this.hardness_ = data.hardness || 0
    this.threshold_ = data.threshold || 0
    this.collide_ = data.collide || ''
    this.enter_ = data.enter || ''
    this.engaged_ = data.engaged || ''
    this.source_ = data.source || ''
    this.eor_ = data.eor || ''
  }
}
export default Terrain
