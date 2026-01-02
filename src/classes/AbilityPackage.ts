import { store } from '@/store'
import { Base, Chart, Ability } from '@/class'

// Used for Arts, Spirit Traits, and Talents
class AbilityPackage extends Base {
  protected abilities_: Ability[] = []
  protected chart_: Chart
  protected type_: string
  protected prereqs_: string
  protected cost_: string

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Abilities() {
    return this.abilities_
  }
  public get HasPrereqs() {
    return this.prereqs_ != ''
  }
  public get PrereqsHeader() {
    return '**Prerequisites:** ' + this.prereqs_
  }
  public get HasCost() {
    return this.cost_ != ''
  }
  public get CostHeader() {
    return '**Cost:** ' + this.cost_
  }
  public get HasChart() {
    return this.Chart != null
  }
  public get Chart() {
    return this.chart_
  }
  public get Category() {
    return this.category_
  }
  public get Header() {
    return this.Category + ' ' + this.type_
  }
  public get Icon() {
    return require('@/assets/disciplines/' + this.Category + '.svg')
  }
  public get Type() {
    return this.type_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IAbilityPackageData): AbilityPackage {
    const t = new AbilityPackage(data.name)
    t.setAbilityPackageData(data)
    return t
  }

  public setAbilityPackageData(data: IAbilityPackageData): void {
    this.setBaseData(data)
    if (data.abilities) {
      for (var ability of data.abilities) {
        this.abilities_.push(Ability.Deserialize(ability))
      }
    }
    if ('chart' in data) this.chart_ = Chart.Deserialize(data.chart)
    this.type_ = data.type || 'Art'
    this.prereqs_ = data.prereqs || ''
    this.cost_ = data.cost || ''
  }
}

export default AbilityPackage
