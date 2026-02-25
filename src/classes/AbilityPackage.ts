import { store } from '@/store'
import { Base, Chart, Ability } from '@/class'

// Used for Arts, Spirit Traits, and Talents
class AbilityPackage extends Base {
  protected abilities_: Ability[] = []
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
  public get Cost() {
    return this.cost_
  }
  public get CostHeader() {
    return '**Cost:** ' + this.cost_
  }
  public get Header() {
    return this.Name + ' - ' + this.Category + ' ' + this.type_
  }
  public get HasIcon() {
    return this.Category != 'Trait'
  }
  public get Icon() {
    return require('@/assets/disciplines/' + this.Category + '.svg')
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
    this.prereqs_ = data.prereqs || ''
    this.cost_ = data.cost || ''
  }
}

export default AbilityPackage
