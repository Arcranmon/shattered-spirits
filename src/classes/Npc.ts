import { store } from '@/store'
import Movement from './Movement'
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
    return this.npc_data_.momentum_gain
  }

  override get MoveChart() {
    return store.getters.getMovement(this.npc_data_.movement)
  }

  override get Guard() {
    return this.npc_data_.guard
  }

  override get MaxAP() {
    return this.npc_data_.ap
  }

  override get MaxHealth() {
    return this.npc_data_.health
  }

  override get MaxStamina() {
    return this.npc_data_.max_stamina
  }

  override get Size() {
    return this.npc_data_.size
  }

  override get Traits() {
    return this.npc_data_.traits
  }

  override get Weapons() {
    return store.getters.getWeaponsFromList(this.npc_data_.weapons)
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Actions() {
    return store.getters.getManeuversFromList(this.npc_data_.actions)
  }

  public get Attacks() {
    return store.getters.getAttacksFromList(this.npc_data_.attacks)
  }

  public get MinorAttacks() {
    return this.Attacks.filter((x) => x.Rank == '_Minor Attack_')
  }
  public get MajorAttacks() {
    return this.Attacks.filter((x) => x.Rank == '_Major Attack_')
  }
  public get Class() {
    return this.npc_data_.class
  }
  public get Desc() {
    return this.npc_data_.desc
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
    return this.npc_data_.special
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
  public get ApText() {
    return '**AP:** ' + this.npc_data_.ap
  }
  public get HealthText() {
    return '**Health:** ' + this.npc_data_.health
  }
  public get ArmorText() {
    if (this.npc_data_.guard == 0) return '**Armor:** None'
    return '**Armor:** ' + this.npc_data_.guard + ' Guard, ' + this.npc_data_.durability + ' Durability'
  }
  public get SizeText() {
    return '**Size:** ' + this.npc_data_.size
  }
  public get MaxStaminaText() {
    return '**Max Stamina:** ' + this.npc_data_.max_stamina
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
