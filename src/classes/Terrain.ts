import { store } from '@/store'
import { Chart } from '@/class'

class Terrain {
  private desc_: string
  private effect_: string
  private element_: string
  private name_: string
  private layer_: string // Base, Overlay, Surface, Haze
  private negate_: string
  private keywords_: string[]
  private reacts_: string
  private remove_: string
  private overrides_: string[]

  public constructor() {
    this.desc_ = ''
    this.element_ = ''
    this.layer_ = ''
    this.effect_ = ''
    this.name_ = ''
    this.keywords_ = []
    this.overrides_ = []
    this.negate_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Desc() {
    return this.desc_
  }
  get Name() {
    return this.name_
  }
  public get Keywords() {
    return this.keywords_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasNegate() {
    return this.negate_ != ''
  }
  get HasOverrides() {
    return this.overrides_.length > 0
  }
  get HasRemove() {
    return this.remove_.length > 0
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get EffectHeader() {
    if (this.effect_ && this.effect_.length > 0) return '**Effect:** ' + this.effect_
    return ''
  }
  public get NegateHeader() {
    return '**Negate:** ' + this.negate_
  }
  public get TerrainDetails() {
    return '_' + this.element_ + '_  Terrain (_' + this.layer_ + '_)'
  }
  public get OverridesHeader() {
    return '**Overrides:** _' + this.overrides_.join('_, _') + '_'
  }
  public get RemoveHeader() {
    return '**Remove:** ' + this.remove_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(disciplineData: ITerrainData): Terrain {
    const t = new Terrain()
    t.setTerrainData(disciplineData)
    return t
  }

  public setTerrainData(data: ITerrainData): void {
    this.desc_ = data.desc || ''
    this.effect_ = data.effect || ''
    this.name_ = data.name || ''
    this.element_ = data.element || ''
    this.layer_ = data.layer || ''
    this.negate_ = data.negate || ''
    this.remove_ = data.remove || ''
    this.keywords_ = data.keywords || []
  }
}
export default Terrain
