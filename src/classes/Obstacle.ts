import { store } from '@/store'
import { Chart } from '@/class'

class Obstacle {
  private desc_: string
  private durability_: number
  private height_: number
  private interact_: string
  private name_: string
  private keywords_: string[]
  private size_: number
  private special_: string
  private speed_: number
  private chart_: Chart

  public constructor() {
    this.desc_ = ''
    this.durability_ = 0
    this.height_ = 0
    this.interact_ = ''
    this.name_ = ''
    this.keywords_ = []
    this.size_ = 0
    this.special_ = ''
    this.speed_ = -1
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

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasChart() {
    return this.chart_ != null
  }
  get HasInteract() {
    return this.interact_ != ''
  }
  get HasKeywords() {
    return this.keywords_.length > 0
  }
  get HasSpecial() {
    return this.special_ != ''
  }
  get HasSpeed() {
    return this.speed_ != -1
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get DurabilityHeader() {
    return 'Durability ' + this.durability_
  }
  public get InteractHeader() {
    return '**Interact:** ' + this.interact_
  }
  public get HeightHeader() {
    return 'Height ' + this.height_
  }
  public get SizeHeader() {
    return 'Size ' + this.size_
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get SpeedHeader() {
    return 'Speed ' + this.speed_
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
    this.desc_ = data.desc || ''
    this.durability_ = data.durability || 0
    this.height_ = data.height || 0
    this.interact_ = data.interact || ''
    this.name_ = data.name || ''
    this.keywords_ = data.keywords || []
    this.size_ = data.size || 0
    this.special_ = data.special || ''
    this.speed_ = data.speed || -1
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Obstacle
