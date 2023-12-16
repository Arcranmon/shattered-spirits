/** @format */

import { store } from '@/store'
import { Ability, Chart } from '@/class'

class Technique extends Ability {
  private speed_: string
  private target_: string
  private type_: string
  private weapon_: string

  public constructor() {
    super()
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

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get SpeedHeader() {
    if (/^\d+$/.test(this.speed_[0])) return '**Speed ' + this.Speed + '**'
    return '**' + this.Speed + ' Speed**'
  }
  public get HasTarget() {
    return this.target_.length > 0
  }
  public get TargetHeader() {
    return '**Target:** ' + this.target_
  }
  public get HasWeapon() {
    return this.weapon_.length > 0
  }
  public get WeaponHeader() {
    return '**Weapon:** ' + this.weapon_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(techData: ITechData): Technique {
    const t = new Technique()
    t.setTechData(techData)
    return t
  }

  public setTechData(data: ITechData): void {
    this.setAbilityData(data)
    this.speed_ = data.speed || ''
    this.target_ = data.target || ''
    this.type_ = data.type || ''
    this.weapon_ = data.weapon || ''
  }
}
export default Technique
