import { store } from '@/store'
import { Combatant, SpiritType } from '@/class'

var kBasicAttacks = ['Weapon Attack', 'Brawl']
var kBasicActions = ['Prepare', 'Fight', 'Sprint', 'Raise Guard', 'Rebalance']
var kBasicStunts = ['Draw/Stow', 'Retreat', 'Leap']
var kBasicReactions = ['Opportunity Attack', 'Defend', 'Dodge']
var kBasicGambits = ['Lethal Strike', 'Seize Momentum']

class Spirit extends Combatant {
  private name_: string
  private spirit_type_: SpiritType
  private weapons_: Array<string>

  private light_weapons_: number
  private heavy_weapons_: number
  private versatile_weapons_: number

  public constructor() {
    super()
    this.light_weapons_ = 0
    this.heavy_weapons_ = 0
    this.versatile_weapons_ = 0

    this.spirit_type_ = undefined
    this.weapons_ = []
    this.name_ = ''
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get MaxStamina() {
    return 2
  }

  override get Guard() {
    return this.SpiritType.Guard
  }

  override get MaxMovement() {
    return this.spirit_type_.Movement
  }

  override get Traits() {
    var traits = [...this.spirit_type_.Traits]
    return traits
  }

  override get Weapons() {
    return store.getters.getWeaponsFromList(this.weapons_)
  }

  get Grit() {
    return this.SpiritType.Defenses.Grit
  }
  get Reflex() {
    return this.SpiritType.Defenses.Reflex
  }
  get Focus() {
    return this.SpiritType.Defenses.Focus
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================
  get Name() {
    return this.name_
  }
  set Name(name) {
    this.name_ = name
  }

  override get MaxHealth() {
    return this.SpiritType.Health
  }

  get HasSpiritType() {
    return this.spirit_type_
  }

  get SpiritType() {
    return this.spirit_type_
  }

  set SpiritType(input) {
    this.spirit_type_ = input
  }

  public AddWeapon(variable) {
    this.weapons_.push(variable)
    var weapon_stats = store.getters.getWeapon(variable)
    if (weapon_stats.Type == 'Light') this.light_weapons_++
    if (weapon_stats.Type == 'Versatile') this.versatile_weapons_++
    if (weapon_stats.Type == 'Heavy') this.heavy_weapons_++
  }

  public RemoveWeapon(idx) {
    var weapon_stats = store.getters.getWeapon(this.weapons_[idx])
    if (weapon_stats.Type == 'Light') this.light_weapons_--
    if (weapon_stats.Type == 'Versatile') this.versatile_weapons_--
    if (weapon_stats.Type == 'Heavy') this.heavy_weapons_--
    this.weapons_.splice(idx, 1)
  }

  get Actions() {
    return store.getters.getManeuversFromList(kBasicActions)
  }
  get Stunts() {
    return store.getters.getManeuversFromList(kBasicStunts)
  }
  get Reactions() {
    return store.getters.getManeuversFromList(kBasicReactions)
  }
  get Gambits() {
    return store.getters.getManeuversFromList(kBasicGambits)
  }

  // ==========================================================
  // HELPERS
  // ==========================================================

  get HasWeapons() {
    if (this.spirit_type_ == undefined) return false

    return true
  }

  private ClearWeapons() {
    this.weapons_ = []
    this.light_weapons_ = 0
    this.versatile_weapons_ = 0
    this.heavy_weapons_ = 0
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(spirit: Spirit): ISpiritData {
    return {
      ...super.Serialize(spirit),
      name: spirit.name_,
      type: '', // spirit.spirit_type_.Name,
      weapons: spirit.weapons_,
    }
  }

  public static Deserialize(data: ISpiritData): Spirit {
    const c = new Spirit()
    c.setSpiritData(data)
    return c
  }

  private setSpiritData(data: ISpiritData): void {
    this.spirit_type_ = null // ||store.getters.getSpiritType(data.type)
    this.name_ = data.name || ''
    this.weapons_ = data.weapons || []
    this.setCombatantData(data)
  }
}
export default Spirit
