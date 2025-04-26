import { store } from '@/store'
const interpolate = require('color-interpolate')

class Combatant {
  private health_: number
  private stamina_: number
  private stun_: number
  private soak_: number
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
    this.soak_ = 0
    this.health_ = 0
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

  get MaxSoak() {
    return 0
  }

  get MaxHealth() {
    return 0
  }

  get MaxStun() {
    return 10
  }

  get MomentumGain() {
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
    this.momentum_ += this.MomentumGain
  }

  public ResetDefault() {
    this.move_ = this.MaxMovement
    this.health_ = this.MaxHealth
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
    else if (move < 0) this.move_ = 0
    else this.move_ = move
  }

  get MovePercent() {
    return (this.Movement / this.MaxMovement) * 100
  }

  get MoveColor() {
    let colormap = interpolate(['#99CCFF', '#0066CC'])
    return colormap(this.MovePercent / 100)
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

  get SoakStunRatio() {
    return (this.MaxSoak / (this.MaxStun + this.MaxSoak)) * 100
  }

  get Soak() {
    return this.soak_
  }

  get Stun() {
    return this.stun_
  }

  set Stun(stun: number) {
    if (this.soak_ < this.MaxSoak) {
      this.soak_ += 1
    } else if (stun > this.MaxStun) this.stun_ = this.MaxStun
    else if (stun < 0) this.stun_ = 0
    else this.stun_ = stun
  }

  get Health() {
    return this.health_
  }

  set Health(Health: number) {
    if (Health > this.MaxHealth) this.health_ = this.MaxHealth
    else if (Health <= 0) this.health_ = 0
    else this.health_ = Health
  }

  get HealthPercent() {
    return (this.Health / this.MaxHealth) * 100
  }

  get HealthColor() {
    let colormap = interpolate(['#FF0000', '#FFDE00', '#5bf75b', '#5bf75b'])
    return colormap(this.HealthPercent / 100)
  }

  get StunPercent() {
    return (this.Stun / this.MaxStun) * 100
  }

  get StunColor() {
    let colormap = interpolate(['#FFDE00', '#ff9500', '#FF0000'])
    return colormap(this.StunPercent / 100)
  }

  get SoakPercent() {
    return (this.Soak / this.MaxSoak) * 100
  }

  get Momentum() {
    return this.momentum_
  }

  set Momentum(input: number) {
    if (this.momentum_ < 0) this.momentum_ = 0
    this.momentum_ = input
  }

  AddStun() {
    if (this.soak_ < this.MaxSoak) {
      this.soak_ += 1
    } else if (this.stun_ == this.MaxStun) return
    else this.stun_ += 1
  }

  AddApStun() {
    if (this.stun_ == this.MaxStun) return
    else this.stun_ += 1
  }

  ClearStun() {
    if (this.stun_ == 0 && this.soak_ > 0) {
      this.soak_ -= 1
    } else if (this.stun_ > 0) this.stun_ -= 1
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(combatant: Combatant): ICombatantData {
    return {
      health: combatant.health_,
      move: combatant.move_,
      stun: combatant.stun_,
      soak: combatant.soak_,
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
    this.health_ = data.health
    this.momentum_ = data.momentum
    this.statuses_ = data.statuses || []
    this.stun_ = data.stun
    this.soak_ = data.soak
    this.vigor_ = data.vigor
  }
}
export default Combatant
