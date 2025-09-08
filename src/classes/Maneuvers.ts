/** @format */

import { store } from '@/store'
import Ability from './Ability'
import Defend from './Defend'

class Maneuver extends Ability {
  protected manifest_: string
  protected weapon_: string

  public constructor(name) {
    super(name)
    this.type_ = ''
    this.weapon_ = ''
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasManifest() {
    return this.manifest_ && this.manifest_.length > 0
  }
  public get ManifestHeader() {
    return '**Manifest:** ' + this.manifest_
  }
  public get HasWeapon() {
    return this.weapon_.length > 0
  }
  public get WeaponHeader() {
    return '**Weapon:** ' + this.weapon_
  }
  public get TypeHeader() {
    return '_' + this.class_ + '_ _' + this.type_ + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IManeuverData): Maneuver {
    const m = new Maneuver(data.name)
    m.setManeuverData(data)
    return m
  }

  public setManeuverData(data: IManeuverData): void {
    this.setAbilityData(data)
    this.manifest_ = data.manifest || ''
    //this.defend_ = data.defend ? Defend.Deserialize(data.defend) : null
  }
}
export default Maneuver
