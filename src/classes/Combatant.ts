import { store } from '@/store'

class Combatant {
  private health_: number
  private stamina_: number
  private ap_: number
  private momentum_: number
  private statuses_: IStatusEffect[]
  private vigor_: number

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.ap_ = 0
    this.stamina_ = 0
    this.health_ = 0
    this.momentum_ = 0
    this.vigor_ = 0
  }
  // ==========================================================
  // These should be overwritten by children
  // ==========================================================
  get MaxAP() {
    return 0
  }

  get Guard() {
    return 0
  }

  get MaxHealth() {
    return 0
  }

  get MaxStamina() {
    return 0
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

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================

  public ApplyRespite() {
    this.ap_ = this.MaxAP
    this.stamina_ = this.MaxStamina
    this.momentum_ += this.MomentumGain
  }

  public ResetDefault() {
    this.ap_ = this.MaxAP
    this.health_ = this.MaxHealth
    this.stamina_ = this.MaxStamina
    this.momentum_ = 0
    this.vigor_ = 0
    this.statuses_ = []
  }

  get AP() {
    return this.ap_
  }

  set AP(ap: number) {
    if (ap > this.MaxAP) this.ap_ = this.MaxAP
    if (ap < 0) this.ap_ = 0
    this.ap_ = ap
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

  get Health() {
    return this.health_
  }

  set Health(health: number) {
    if (health > this.MaxHealth) this.health_ = this.MaxHealth
    if (health <= 0) this.health_ = 0
    this.health_ = health
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
      health: combatant.health_,
      ap: combatant.ap_,
      stamina: combatant.stamina_,
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
    this.ap_ = data.ap
    this.stamina_ = data.stamina
    this.health_ = data.health
    this.momentum_ = data.momentum
    this.statuses_ = data.statuses
    this.vigor_ = data.vigor
  }
}
export default Combatant
