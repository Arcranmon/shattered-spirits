/** @format */

import { store } from '@/store'
import Ability from './Ability'

class Maneuver extends Ability {
  protected manifest_: string
  protected trigger_: string
  protected weapon_: string
  protected type_: string

  public constructor(name) {
    super(name)
    this.trigger_ = ''
    this.type_ = ''
    this.weapon_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Type() {
    return this.type_
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
  public get HasTrigger() {
    return this.trigger_.length > 0
  }
  public get TriggerHeader() {
    return '**Trigger:** ' + this.trigger_
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

  public static Deserialize(manData: IManeuverData): Maneuver {
    const m = new Maneuver(manData.name)
    m.setManeuverData(manData)
    return m
  }

  public setManeuverData(data: IManeuverData): void {
    this.setAbilityData(data)
    this.manifest_ = data.manifest || ''
    this.trigger_ = data.trigger || ''
    this.type_ = data.type || 'Maneuver'
    this.weapon_ = data.weapon || ''
  }
}
export default Maneuver
