import { store } from '@/store'
import { Ability, Base, Chart } from '@/class'

class Equipment extends Base {
  private notches_: number
  private durability_: number
  private load_: number
  protected abilities_: Ability[] = []
  protected chart_: Chart

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Load() {
    return this.load_
  }
  get Notches() {
    return this.notches_
  }
  get Durability() {
    return this.durability_
  }
  get Abilities() {
    return this.abilities_
  }
  public get Icon() {
    if (this.Category == 'Error' || this.Category == 'Hide') return ''
    return require('@/assets/' + this.Category + '.svg')
  }
  public get HasChart() {
    return this.Chart != null
  }
  public get Chart() {
    return this.chart_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IEquipmentData): Equipment {
    const t = new Equipment(data.name)
    t.setEquipmentData(data)
    return t
  }

  public setEquipmentData(data: IEquipmentData): void {
    this.setBaseData(data)
    this.load_ = data.load || 0
    this.durability_ = data.durability || 0
    this.notches_ = data.notches || 0
    if (data.abilities) {
      for (var ability of data.abilities) {
        this.abilities_.push(Ability.Deserialize(ability))
      }
    }
    if ('chart' in data) this.chart_ = Chart.Deserialize(data.chart)
  }
}

export default Equipment
