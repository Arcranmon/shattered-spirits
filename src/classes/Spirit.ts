import { store } from '@/store'
import { Combatant, Character, Subtype, Stance, Bonuses } from '@/class'

class Spirit extends Combatant {
  private name_: string
  private traits_: Array<string>
  private spirit_type_: Subtype
  private weapons_: Array<string>
  private character_: Character
  private current_stance_: Stance

  public constructor() {
    super()
    this.spirit_type_ = undefined
    this.weapons_ = []
    this.name_ = ''
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get Block() {
    var block = this.current_stance_.Block + this.spirit_type_.Defenses.Block
    for (var equipment of this.Equipment) {
      if (store.getters.isArmor(equipment.Name)) block += equipment.Block
    }
    return block
  }

  override get MaxMovement() {
    var movement = this.spirit_type_.Movement + this.combinedBonuses_.Movement + this.current_stance_.Movement
    return movement
  }

  override get MaxStun() {
    var stun = this.spirit_type_.Stun + this.combinedBonuses_.Stun
    for (var item of this.combinedBonuses_.Equipment) {
      if (store.getters.isArmor(item)) {
        stun += store.getters.getArmor(item).Stun
      }
    }
    return stun
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

  get Arts() {
    var arts = this.character_.SpiritArts
    for (var trait of this.traits_) {
      arts.push(trait)
    }
    arts.sort()
    return arts
  }

  override get AllArts() {
    var arts = store.getters.getAPsFromListPreserveType([...this.Traits, ...this.character_.SpiritArts, this.character_.Element + 'born'])
    arts = arts.concat(this.Equipment)

    return arts
  }

  get Stances() {
    var stances = [...store.getters.basicSpiritStances]
    // Collect from Disciplines
    // Collect from Archetypes
    return store.getters.getStancesFromList(stances)
  }

  get Grit() {
    return this.SpiritType.Defenses.Grit + this.current_stance_.Grit + this.combinedBonuses_.Grit
  }

  get Reflex() {
    return this.SpiritType.Defenses.Reflex + this.current_stance_.Reflex + this.combinedBonuses_.Reflex
  }

  get Focus() {
    return this.SpiritType.Defenses.Focus + this.current_stance_.Focus + this.combinedBonuses_.Focus
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

  get GrowthPoints() {
    var gp = 0
    for (var trait of store.getters.getAPsFromListPreserveType(this.Traits)) {
      if (trait.HasCost && trait.Cost != 'None') {
        gp += Number(trait.Cost[0])
      }
    }
    return gp
  }

  set Character(character) {
    this.character_ = character
  }

  get CurrentStance() {
    return this.current_stance_
  }

  set CurrentStance(stance: Stance | string) {
    if (stance instanceof Stance) {
      this.current_stance_ = stance
    } else {
      this.current_stance_ = store.getters.getStance(stance)
    }
    if (this.Movement > this.MaxMovement) this.Movement = this.MaxMovement
  }

  override get MaxStamina() {
    return this.SpiritType.Stamina + this.combinedBonuses_.Stamina
  }

  get HasSpiritType() {
    return this.spirit_type_
  }

  get SpiritType() {
    return this.spirit_type_
  }

  get Speed() {
    return this.spirit_type_.Speed + this.combinedBonuses_.Speed
  }

  set SpiritType(input) {
    this.spirit_type_ = input
  }

  get Equipment() {
    var equipment = store.getters.getAnyEquipmentFromList(this.weapons_)
    if (this.combinedBonuses_ && this.combinedBonuses_.Equipment.length > 0) {
      equipment = equipment.concat(store.getters.getAnyEquipmentFromList(this.combinedBonuses_.Equipment))
    }

    return equipment
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
      current_stance: spirit.current_stance_.Name,
    }
  }

  public static CreateFromCharacter(char: Character, data: ISpiritData): Spirit {
    const c = new Spirit()
    c.character_ = char
    c.setSpiritData(data)
    return c
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
    if ('current_stance' in data) this.current_stance_ = store.getters.getStance(data.current_stance)
    this.setCombatantData(data)
    this.setBonuses()
  }
}
export default Spirit
