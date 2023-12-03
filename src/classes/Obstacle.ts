import { store } from '@/store'
import { Chart } from '@/class'

class Obstacle {
  private desc_: string
  private destroy_: string
  private damage_type_: string
  private hardness_: number
  private height_: number
  private interact_: string
  private name_: string
  private keywords_: string[]
  private resistances_: string
  private forced_movement_: string
  private size_: number
  private special_: string
  private chart_: Chart

  public constructor() {
    this.desc_ = ''
    this.hardness_ = 0
    this.height_ = 0
    this.interact_ = ''
    this.name_ = ''
    this.keywords_ = []
    this.resistances_ = ''
    this.forced_movement_ = ''
    this.size_ = 0
    this.special_ = ''
    this.chart_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Chart() {
    return this.chart_
  }
  get Desc() {
    return this.desc_
  }
  get Name() {
    return this.name_
  }
  get Resistances() {
    return this.resistances_
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
  get HasKeywords() {
    return this.keywords_.length > 0
  }
  get HasResistances() {
    return this.resistances_ != ''
  }
  get HasForcedMovement() {
    return this.forced_movement_ != ''
  }
  get HasSpecial() {
    return this.special_ != ''
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
  public get ResistancesHeader() {
    return '**Resistances:** ' + this.resistances_
  }
  public get ForcedMovementHeader() {
    return '**Forced Movement:** ' + this.forced_movement_
  }
  public get SizeHeader() {
    return 'Size ' + this.size_
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get KeywordsHeader() {
    return '_' + this.keywords_.join('_, _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(disciplineData: IObstacleData): Obstacle {
    const t = new Obstacle()
    t.setObstacleData(disciplineData)
    return t
  }

  public setObstacleData(data: IObstacleData): void {
    this.damage_type_ = data.damage_type || ''
    this.desc_ = data.desc || ''
    this.destroy_ = data.destroy || ''
    this.hardness_ = data.hardness || 0
    this.height_ = data.height || 0
    this.interact_ = data.interact || ''
    this.name_ = data.name || ''
    this.keywords_ = data.keywords || []
    this.resistances_ = data.resistances || ''
    this.forced_movement_ = data.forced_movement || ''
    this.size_ = data.size || 0
    this.special_ = data.special || ''
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Obstacle
