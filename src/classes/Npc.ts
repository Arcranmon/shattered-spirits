import { store } from '@/store'
import Armor from './Armor'

var kBasicNpcTechniques = ['Armed Strike', 'Unarmed Strike', 'Run', 'Prepare']
var kBasicNpcStunts = ['Leap', 'Retrieve', 'Use Environment']
var kBasicNpcStratagems = ['Quicken', 'Strengthen']
var kBasicNpcResists = ['Basic Counter', 'Deflect', 'Dodge']
var kBasicNpcReactions = ['Recover', 'Reorient']
var kBasicNpcGambits = ['Basic Feint', 'Basic Sunder']
var kBasicNpcFlourishes = ['Basic Flourish']
var kBasicNpcPunishes = ['Create Opening', 'Engage', 'Opportunity Attack']

class Npc {
  private ap_: number
  private armor_: Armor
  private class_: string
  private desc_: string
  private endurance_: number
  private name_: string
  private npc_type_: string
  private optional_stances_: Array<string>
  private optional_techniques_: Array<string>
  private role_: string
  private size_: string
  private spirit_type_: string
  private maneuvers_: Array<string>
  private traits_: Array<string>
  private spirit_stances_: Array<string>
  private martial_stances_: Array<string>
  private techniques_: Array<string>
  private weapons_: Array<string>

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Ap() {
    return this.ap_
  }
  public get Armor() {
    return this.armor_
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
  public get Name() {
    return this.name_
  }
  public get NpcType() {
    return this.npc_type_
  }
  public get OptionalStances() {
    return this.optional_stances_
  }
  public get OptionalTechniques() {
    return this.optional_techniques_
  }
  public get Role() {
    return this.role_
  }
  public get SpiritType() {
    return this.spirit_type_
  }
  public ManeuversOfType(type: string) {
    if (type == 'Stunt') var maneuvers = store.getters.getManeuversFromList(kBasicNpcStunts)
    if (type == 'Stratagem') var maneuvers = store.getters.getManeuversFromList(kBasicNpcStratagems)
    if (type == 'Resist') var maneuvers = store.getters.getManeuversFromList(kBasicNpcResists)
    if (type == 'Flourish') var maneuvers = store.getters.getManeuversFromList(kBasicNpcFlourishes)
    if (type == 'Punish') var maneuvers = store.getters.getManeuversFromList(kBasicNpcPunishes)
    if (type == 'Gambit') var maneuvers = store.getters.getManeuversFromList(kBasicNpcGambits)
    if (type == 'Reaction') var maneuvers = store.getters.getManeuversFromList(kBasicNpcReactions)
    for (var man of this.maneuvers_) {
      var maneuver = store.getters.getManeuver(man)
      if (maneuver.Type == type) maneuvers.push(maneuver)
    }
    maneuvers.sort((a, b) => a.Name.localeCompare(b.Name))
    return maneuvers
  }
  public get Traits() {
    return this.traits_
  }
  public get SpiritStances() {
    return this.spirit_stances_
  }
  public get MartialStances() {
    return this.martial_stances_
  }
  public get Techniques() {
    return this.techniques_.concat(kBasicNpcTechniques)
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
    this.armor_ = store.getters.getArmor(data.armor)
    this.ap_ = data.ap || 0
    this.class_ = data.class || ''
    this.desc_ = data.desc || ''
    this.endurance_ = data.endurance || 0
    this.name_ = data.name || ''
    this.npc_type_ = data.npc_type || ''
    this.optional_stances_ = data.optional_stances || []
    this.optional_techniques_ = data.optional_techniques || []
    this.role_ = data.role || ''
    this.size_ = data.size || ''
    this.spirit_type_ = data.spirit_type || ''
    this.maneuvers_ = data.maneuvers || []
    this.traits_ = data.traits || []
    this.spirit_stances_ = data.spirit_stances || []
    this.martial_stances_ = data.martial_stances || []
    this.techniques_ = data.techniques || []
    this.weapons_ = data.weapons || []
  }
}
export default Npc
