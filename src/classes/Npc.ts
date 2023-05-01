import { store } from '@/store'
import Movement from './Movement'

class Npc {
  private actions_: Array<string>
  private ap_: number
  private attacks_: Array<string>
  private class_: string
  private desc_: string
  private durability_: number
  private endurance_: number
  private gambits_: Array<string>
  private guard_: number
  private name_: string
  private npc_type_: string
  private role_: string
  private size_: string
  private spirit_type_: string
  private stunts_: Array<string>
  private movement_: string
  private reactions_: Array<string>
  private traits_: Array<string>
  private stances_: Array<string>
  private techniques_: Array<string>
  private weapons_: Array<string>

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Actions() {
    return this.actions_
  }
  public get Ap() {
    return this.ap_
  }
  public get Attacks() {
    return this.attacks_
  }
  public get Class() {
    return this.class_
  }
  public get Desc() {
    return this.desc_
  }
  public get Endurance() {
    return this.endurance_
  }
  public get Gambits() {
    return this.gambits_
  }
  public get Movement() {
    return store.getters.getMovement(this.movement_)
  }
  public get Name() {
    return this.name_
  }
  public get NpcType() {
    return this.npc_type_
  }
  public get Reactions() {
    return this.reactions_
  }
  public get Role() {
    return this.role_
  }
  public get SpiritType() {
    if (this.spirit_type_ == 'None') return ''
    return this.spirit_type_
  }
  public get Stunts() {
    return this.stunts_
  }
  public get Traits() {
    return this.traits_
  }
  public get Stances() {
    return this.stances_
  }
  public get Techniques() {
    return this.techniques_
  }
  public get HasWeapons() {
    return this.weapons_.length > 0
  }
  public get Weapons() {
    return this.weapons_
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get ApText() {
    return '**AP:** ' + this.ap_
  }
  public get EnduranceText() {
    return '**Endurance:** ' + this.endurance_
  }
  public get ArmorText() {
    if (this.guard_ == 0) return '**Armor:** None'
    return '**Armor:** ' + this.guard_ + ' Guard, ' + this.durability_ + ' Durability'
  }
  public get SizeText() {
    return '**Size:** ' + this.size_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(discData: INpcData): Npc {
    const t = new Npc()
    t.setNpcData(discData)
    return t
  }

  public setNpcData(data: INpcData): void {
    this.actions_ = data.actions || []
    this.ap_ = data.ap || 0
    this.attacks_ = data.attacks || []
    this.class_ = data.class || ''
    this.desc_ = data.desc || ''
    this.durability_ = data.durability || 0
    this.endurance_ = data.endurance || 0
    this.gambits_ = data.gambits || []
    this.guard_ = data.guard || 0
    this.movement_ = data.movement || ''
    this.name_ = data.name || ''
    this.npc_type_ = data.npc_type || ''
    this.reactions_ = data.reactions || []
    this.role_ = data.role || ''
    this.size_ = data.size || ''
    this.spirit_type_ = data.spirit_type || ''
    this.stunts_ = data.stunts || []
    this.traits_ = data.traits || []
    this.stances_ = data.stances || []
    this.techniques_ = data.techniques || []
    this.weapons_ = data.weapons || []
  }
}
export default Npc
