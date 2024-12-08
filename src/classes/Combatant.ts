import { store } from '@/store'

class Combatant {
  private Health_: number
  private stamina_: number
  private stun_: number
  private move_: number
  private momentum_: number
  private statuses_: IStatusEffect[]
  private vigor_: number

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.move_ = 0
    this.stamina_ = 0
    this.stun_ = 0
    this.Health_ = 0
    this.momentum_ = 0
    this.vigor_ = 0
  }
  // ==========================================================
  // These should be overwritten by children
  // ==========================================================
  get MaxMovement() {
    return 0
  }

  get Guard() {
    return 0
  }

  get Soak() {
    return 0
  }

  get MaxHealth() {
    return 0
  }

  get MaxStamina() {
    return 0
  }

  get MaxStun() {
    return 10
  }

  get MomentumGain() {
    return 0
  }

  get Jump() {
    return 0
  }

  get Size() {
    return '0'
  }

  get Traits() {
    return []
  }

  get MoveChart() {
    return null
  }

  get Weapons() {
    return []
  }

  get BulletedTraits() {
    return '\n\n_' + this.Traits.join('_\n\n_') + '_'
  }

  get Defenses() {
    return this.Grit + ' _Grit_, ' + this.Reflex + ' _Reflex_, ' + this.Focus + ' _Focus_'
  }

  get Grit() {
    return 0
  }

  get Reflex() {
    return 0
  }

  get Focus() {
    return 0
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================

  public ApplyRespite() {
    this.move_ = this.MaxMovement
    this.stamina_ = this.MaxStamina
    this.momentum_ += this.MomentumGain
  }

  public ResetDefault() {
    this.move_ = this.MaxMovement
    this.Health_ = this.MaxHealth
    this.stamina_ = this.MaxStamina
    this.stun_ = 0
    this.momentum_ = 0
    this.vigor_ = 0
    this.statuses_ = []
  }

  get Movement() {
    return this.move_
  }

  set Movement(move: number) {
    if (move > this.MaxMovement) this.move_ = this.MaxMovement
    if (move < 0) this.move_ = 0
    this.move_ = move
  }

  public AddStatus(status: string) {
    var idx = this.statuses_.findIndex((e) => e.status == status)
    if (idx == -1) {
      this.statuses_.push({ status: status, stack: 1 })
      idx = this.statuses_.length - 1
    } else this.statuses_[idx].stack += 1

    var status_info = store.getters.getStatus(status)

    if (status_info.Type == 'Status Effect') this.statuses_[idx].stack = 777

    this.statuses_.sort((a, b) => a.status.localeCompare(b.status))
  }

  public RemoveStatus(status: string) {
    if (this.statuses_) {
      var idx = this.statuses_.findIndex((e) => e.status == status)
      if (idx == -1) return
      else if (this.statuses_[idx].stack == 777) this.statuses_.splice(idx, 1)
      else {
        this.statuses_[idx].stack -= 1
        if (this.statuses_[idx].stack <= 0) this.statuses_.splice(idx, 1)
      }
    }
  }

  public get StatusEffects() {
    return this.statuses_
  }

  get Vigor() {
    return this.vigor_
  }

  set Vigor(vigor: number) {
    if (vigor < 0) this.vigor_ = 0
    this.vigor_ = vigor
  }

  get Stamina() {
    return this.stamina_
  }

  set Stamina(stamina: number) {
    if (stamina > this.MaxStamina) this.stamina_ = this.MaxStamina
    if (stamina <= 0) this.stamina_ = 0
    this.stamina_ = stamina
  }

  get Stun() {
    return this.stun_
  }

  set Stun(stun: number) {
    if (stun > this.MaxStun) this.move_ = this.MaxStun
    if (stun < 0) this.stun_ = 0
    this.stun_ = stun
  }

  get Health() {
    return this.Health_
  }

  set Health(Health: number) {
    if (Health > this.MaxHealth) this.Health_ = this.MaxHealth
    if (Health <= 0) this.Health_ = 0
    this.Health_ = Health
  }

  get Momentum() {
    return this.momentum_
  }

  set Momentum(input: number) {
    if (this.momentum_ < 0) this.momentum_ = 0
    this.momentum_ = input
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(combatant: Combatant): ICombatantData {
    return {
      Health: combatant.Health_,
      move: combatant.move_,
      stamina: combatant.stamina_,
      stun: combatant.stun_,
      momentum: combatant.momentum_,
      statuses: combatant.statuses_,
      vigor: combatant.vigor_,
    }
  }

  public static Deserialize(data: ICombatantData): Combatant {
    const c = new Combatant()
    c.setCombatantData(data)
    return c
  }

  public setCombatantData(data: ICombatantData): void {
    this.move_ = data.move
    this.stamina_ = data.stamina
    this.Health_ = data.Health
    this.momentum_ = data.momentum
    this.statuses_ = data.statuses
    this.stun_ = data.stun
    this.vigor_ = data.vigor
  }
}
export default Combatant
