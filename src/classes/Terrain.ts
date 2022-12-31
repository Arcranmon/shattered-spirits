import { store } from '@/store'
import { Chart } from '@/class'

class Terrain {
  private desc_: string
  private effect_: string
  private name_: string
  private negate_: string
  private keywords_: string[]
  private reacts_: string
  private removed_: string
  private overrides_: string[]

  public constructor() {
    this.desc_ = ''
    this.effect_ = ''
    this.name_ = ''
    this.keywords_ = []
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

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasKeywords() {
    return this.keywords_.length > 0
  }
  get HasNegate() {
    return this.negate_ != ''
  }
  get HasOverrides() {
    return this.overrides_.length > 0
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get EffectHeader() {
    return '**Effect:** ' + this.effect_
  }
  public get NegateHeader() {
    return '**Negate:** ' + this.negate_
  }
  public get OverridesHeader() {
    return '**Overrides:** _' + this.overrides_.join('_, _') + '_'
  }
  public get KeywordsHeader() {
    return '_' + this.keywords_.join('_, _') + '_'
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
    this.negate_ = data.negate || ''
    this.overrides_ = data.overrides || []
    this.keywords_ = data.keywords || []
  }
}
export default Terrain
