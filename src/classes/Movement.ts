import { store } from '@/store'

class Movement {
  private name_: string
  private encumbrance_: number
  private movement_: number
  private jump_: number
  private manifest_range_: string
  private traits_: string[]

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Name() {
    return this.name_
  }
  get HasEncumbrance() {
    return this.encumbrance_ != -1
  }
  get Encumbrance() {
    return this.encumbrance_
  }
  get ManifestRange() {
    return this.manifest_range_
  }
  get HasManifestRange() {
    return this.manifest_range_ != ''
  }
  get Movement() {
    return this.movement_
  }
  get Jump() {
    return this.jump_
  }
  get Traits() {
    return this.traits_
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================

  get TraitsList() {
    if (this.traits_.length == 0) return 'None'
    return '_' + this.traits_.join('_, _') + '_'
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IMovementData): Movement {
    const t = new Movement()
    t.setMovementData(data)
    return t
  }

  public setMovementData(data: IMovementData): void {
    this.name_ = data.name || ''
    this.manifest_range_ = data.manifest_range || ''
    this.movement_ = data.movement || 0
    this.encumbrance_ = data.encumbrance || -1
    this.jump_ = data.jump || 0
    this.traits_ = data.traits || []
  }
}
export default Movement
