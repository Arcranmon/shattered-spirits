import { store } from '@/store'

class Movement {
  private name_: string
  private encumbrance_: number
  private step_: number
  private reposition_: number
  private dash_: number
  private jump_: number
  private traits_: string[]

  // ==========================================================
  // GETTERS
  // ==========================================================
  get Name() {
    return this.name_
  }
  get Encumbrance() {
    return this.encumbrance_
  }
  get Step() {
    return this.step_
  }
  get Reposition() {
    return this.reposition_
  }
  get Dash() {
    return this.dash_
  }
  get Jump() {
    return this.jump_
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
  public static Deserialize(moveData: IMovementData): Movement {
    const t = new Movement()
    t.setMovementData(moveData)
    return t
  }

  public setMovementData(data: IMovementData): void {
    this.name_ = data.name || ''
    this.encumbrance_ = data.encumbrance || 0
    this.step_ = data.step || 0
    this.reposition_ = data.reposition || 0
    this.dash_ = data.dash || 0
    this.jump_ = data.jump || 0
    this.traits_ = data.traits || []
  }
}
export default Movement
