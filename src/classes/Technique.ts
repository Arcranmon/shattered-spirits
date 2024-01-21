/** @format */

import { store } from '@/store'
import { Ability, Chart } from '@/class'

class Technique extends Ability {
  private speed_: string
  private type_: string
  private weapon_: string

  public constructor(name) {
    super(name)
    this.speed_ = ''
    this.target_ = ''
    this.type_ = ''
    this.weapon_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Speed() {
    return this.speed_
  }
  public get Type() {
    return this.type_
  }
  public get ClassHeader() {
    return '_' + this.class_ + '_ _Technique_'
  }
  public get Image() {
    if (!this.Type || this.Type == 'Error') return require('@/assets/General.svg')
    return require('@/assets/' + this.Type + '.svg')
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get SpeedHeader() {
    if (/^\d+$/.test(this.speed_[0])) return '**Speed ' + this.Speed + '**'
    return '**' + this.Speed + ' Speed**'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: ITechData): Technique {
    const t = new Technique(data.name)
    t.setTechData(data)
    return t
  }

  public setTechData(data: ITechData): void {
    this.setAbilityData(data)
    this.speed_ = data.speed || ''
    this.type_ = data.type || ''
    this.weapon_ = data.weapon || ''
  }
}
export default Technique
