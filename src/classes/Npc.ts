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
    return this.npc_data_.Health
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
    return this.npc_data_.max_stun
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

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Actions() {
    return store.getters.getManeuversFromList(this.npc_data_.actions)
  }

  public get Attacks() {
    return
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

  public get HasGambits() {
    if (this.npc_data_.gambits === undefined) return false
    return this.npc_data_.gambits.length > 0
  }

  public get Gambits() {
    return store.getters.getManeuversFromList(this.npc_data_.gambits)
  }

  public get MomentumGainText() {
    return '**_Momentum_ Gain:** ' + this.npc_data_.momentum_gain
  }
  public get Name() {
    return this.npc_data_.name
  }
  public get NpcType() {
    return this.npc_data_.npc_type
  }
  public get Reactions() {
    return store.getters.getManeuversFromList(this.npc_data_.reactions)
  }
  public get Role() {
    return this.npc_data_.role
  }
  public get SpiritType() {
    if (this.npc_data_.subtype == 'None') return ''
    return this.npc_data_.subtype
  }

  public get Stunts() {
    return store.getters.getManeuversFromList(this.npc_data_.stunts)
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

  public get Techniques() {
    return store.getters.getTechniquesFromList(this.npc_data_.techniques)
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
    return '**Health:** ' + this.npc_data_.Health
  }
  public get ArmorText() {
    if (this.npc_data_.guard) return '**Armor:** ' + this.npc_data_.guard + ' Guard'
    else return '**Armor:** None'
  }
  public get SizeText() {
    return '**Size:** ' + this.npc_data_.size
  }
  public get MaxStaminaText() {
    return '**Max Stamina:** ' + this.MaxStamina
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
