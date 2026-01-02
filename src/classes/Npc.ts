import { store } from '@/store'
import Combatant from './Combatant'

class Npc extends Combatant {
  private npc_data_: INpcData
  private tag_: number

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    super()
    this.tag_ = 0
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get MomentumGain() {
    if (this.npc_data_.momentum_gain) return this.npc_data_.momentum_gain
    return 0
  }

  override get Guard() {
    if (this.npc_data_.guard) return this.npc_data_.guard
    return 0
  }

  override get MaxHealth() {
    return this.npc_data_.health
  }

  override get Size() {
    return this.npc_data_.size
  }

  override get Traits() {
    return this.npc_data_.traits
  }

  override get MaxMovement() {
    return this.npc_data_.move
  }

  override get MaxStun() {
    if (this.npc_data_.defenses.stun) return this.npc_data_.defenses.stun
    return 0
  }

  override get Weapons() {
    return store.getters.getWeaponsFromList(this.npc_data_.weapons)
  }

  get Grit() {
    if (this.npc_data_.defenses.grit) return this.npc_data_.defenses.grit
    return 0
  }
  get Reflex() {
    if (this.npc_data_.defenses.reflex) return this.npc_data_.defenses.reflex
    return 0
  }
  get Focus() {
    if (this.npc_data_.defenses.focus) return this.npc_data_.defenses.focus
    return 0
  }

  override get Abilities() {
    var ability_names = store.getters.basicAbilities
    ability_names = ability_names.concat(this.npc_data_.abilities)
    return store.getters.getAbilitiesFromList(ability_names)
  }

  override get AllArts() {
    return [this.Armor].concat(this.Weapons)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Armor() {
    return store.getters.getArmor(this.npc_data_.armor)
  }

  public get Class() {
    return this.npc_data_.class
  }

  public get Desc() {
    return this.npc_data_.desc
  }

  public get Pattern() {
    return '**' + this.npc_data_.pattern + '**'
  }

  public get MomentumGainText() {
    return '**_Momentum_ Gain:** ' + this.npc_data_.momentum_gain
  }
  public get StunText() {
    return '**_Stun_:** ' + this.MaxStun
  }
  public get Name() {
    return this.npc_data_.name
  }
  public get NpcType() {
    return this.npc_data_.npc_type
  }
  public get Role() {
    return this.npc_data_.role
  }
  public get SpiritType() {
    if (this.npc_data_.subtype == 'None') return ''
    return this.npc_data_.subtype
  }

  public get SpecialText() {
    if (this.npc_data_.special) return this.npc_data_.special
    return ''
  }

  public get Tag() {
    return this.tag_
  }

  public set Tag(tag) {
    this.tag_ = tag
  }

  public get Stances() {
    return this.npc_data_.stances
  }

  public get HasWeapons() {
    return this.npc_data_.weapons.length > 0
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get MoveText() {
    return '**Move:** ' + this.npc_data_.move
  }
  public get HealthText() {
    return '**Health:** ' + this.npc_data_.health
  }
  public get ArmorText() {
    if (this.npc_data_.guard) return '**Armor:** ' + this.npc_data_.guard + ' Guard'
    else return '**Armor:** None'
  }
  public get SizeText() {
    return '**Size:** ' + this.npc_data_.size
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(npc: Npc): INpcCombatData {
    return {
      ...super.Serialize(npc),
      npc_data: npc.npc_data_.name,
      tag: npc.tag_,
    }
  }

  public static CreateFromBaseData(data: INpcData): Npc {
    const t = new Npc()
    t.npc_data_ = data
    return t
  }

  public static Deserialize(data: INpcCombatData): Npc {
    const t = store.getters.getNpc(data.npc_data)
    t.setNpcData(data)
    return t
  }

  public setNpcData(data: INpcCombatData): void {
    this.setCombatantData(data)
    this.tag_ = data.tag
  }
}
export default Npc
