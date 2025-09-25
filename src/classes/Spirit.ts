import { store } from '@/store'
import { Combatant, Character, Subtype } from '@/class'

var kBasicAttacks = ['Weapon Attack', 'Brawl']
var kBasicActions = ['Prepare', 'Fight', 'Sprint', 'Raise Guard', 'Rebalance']
var kBasicStunts = ['Draw/Stow', 'Retreat', 'Leap']
var kBasicReactions = ['Opportunity Attack', 'Defend', 'Dodge']
var kBasicGambits = ['Lethal Strike', 'Seize Momentum']

class Spirit extends Combatant {
  private name_: string
  private traits_: Array<string>
  private spirit_type_: Subtype
  private weapons_: Array<string>
  private character_: Character

  public constructor() {
    super()
    this.spirit_type_ = undefined
    this.weapons_ = []
    this.name_ = ''
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get Guard() {
    var guard = 0
    for (var equipment of this.Equipment) {
      if (store.getters.isArmor(equipment.Name)) guard += equipment.Guard
    }
    return guard
  }

  override get MaxMovement() {
    var movement = this.spirit_type_.Movement
    for (var trait of this.Traits) {
      movement += store.getters.getSpiritTrait(trait).Bonuses.Movement
    }
    return movement
  }

  override get Traits() {
    var traits = [...this.spirit_type_.Traits]
    traits = traits.concat(this.traits_)
    return traits
  }

  override get MaxSoak() {
    var soak = 0
    for (var equipment of this.Equipment) {
      if (store.getters.isArmor(equipment.Name)) soak += equipment.Soak
    }
    return soak
  }

  override get Weapons() {
    return store.getters.getWeaponsFromList(this.weapons_)
  }

  override get Abilities() {
    var abilities = store.getters.basicAbilities
    abilities = abilities.concat(store.getters.spiritAbilities)

    return store.getters.getAbilitiesFromList(abilities)
  }

  override get AllArts() {
    var arts = store.getters.getArtsFromList(this.Arts)
    arts = arts.concat(this.Equipment)
    arts = arts.concat(this.character_.SpiritArts)

    return arts
  }

  get Grit() {
    return this.SpiritType.Defenses.Grit
  }

  get Reflex() {
    var reflex = this.SpiritType.Defenses.Reflex
    for (var trait of this.Traits) {
      reflex += store.getters.getSpiritTrait(trait).Bonuses.Reflex
    }
    return reflex
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

  set Character(character) {
    this.character_ = character
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

  get Equipment() {
    var equipment = store.getters.getWeaponsFromList(this.weapons_)
    for (var trait of store.getters.getSpiritTraitsFromList(this.Traits)) {
      if (trait.HasEquipment) {
        equipment = equipment.concat(store.getters.getEquipmentFromList(trait.Equipment))
      }
    }

    return equipment
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
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(spirit: Spirit): ISpiritData {
    return {
      ...super.Serialize(spirit),
      name: spirit.name_,
      type: spirit.spirit_type_.Name,
      weapons: spirit.weapons_,
      traits: spirit.traits_,
    }
  }

  public static Deserialize(data: ISpiritData): Spirit {
    const c = new Spirit()
    c.setSpiritData(data)
    return c
  }

  private setSpiritData(data: ISpiritData): void {
    this.spirit_type_ = store.getters.getSpiritType(data.type)
    this.traits_ = data.traits || []
    this.name_ = data.name || ''
    this.weapons_ = data.weapons || []
    this.setCombatantData(data)
  }
}
export default Spirit
