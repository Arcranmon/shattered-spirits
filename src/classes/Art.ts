// Art should be comprised of the following:
// - Name X
// - Description X
// - Keywords
// - Specific Arts
//      - Attack
//      - General
//      - Movement
//      - Reaction
//      - Enhancement
import { store } from '@/store'
import { Base, Chart, Ability } from '@/class'

class Art extends Base {
  protected abilities_: Ability[] = []
  protected chart_: Chart

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Abilities() {
    return this.abilities_
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
  public static Deserialize(data: IArtData): Art {
    const t = new Art(data.name)
    t.setArtData(data)
    return t
  }

  public setArtData(data: IArtData): void {
    this.setBaseData(data)
    if (data.abilities) {
      for (var ability of data.abilities) {
        this.abilities_.push(Ability.Deserialize(ability))
      }
    }
    if ('chart' in data) this.chart_ = Chart.Deserialize(data.chart)
  }
}

export default Art
