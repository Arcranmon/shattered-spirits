import { store } from '@/store'
import { Armor, Bonuses, Combatant, Stance, Weapon, Spirit } from '@/class'

var kBaseStamina = 10
var kBaseStun = 15
var kBaseMovement = 2
var kLoadBands = 5

class Character extends Combatant {
  // Level Up Qualities
  private current_stance_: Stance
  private disciplines_: Array<ICharDisciplineData>
  private minor_disciplines_: Array<ICharDisciplineData>
  private name_: string
  private arts_: Array<string>
  private player_character_: Boolean
  private element_: string
  private weapons_: Array<Weapon>
  private armor_: Array<Armor>
  private wielded_: Array<string>
  private equipped_: Array<string>
  private packed_: Array<string>
  private talents_: Array<string>

  private spirit_: Spirit

  private bonuses_: Bonuses

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    super()
    this.current_stance_ = null
    this.minor_disciplines_ = []
    this.disciplines_ = []
    this.armor_ = []
    this.spirit_ = new Spirit()
    this.name_ = ''
    this.player_character_ = true
    this.element_ = ''
    this.weapons_ = []
    this.arts_ = []
  }

  // ==========================================================
  // COMBATANT OVERRIDES
  // ==========================================================
  override get Size() {
    return '1'
  }

  override get Block() {
    var block = this.current_stance_.Block
    for (var armor of this.armor_) {
      block += armor.Block
    }
    return block
  }

  override get MaxMovement() {
    let maxMovement = kBaseMovement + this.combinedBonuses_.Movement + this.current_stance_.Movement
    return maxMovement
  }

  override get Traits() {
    var traits = ['_Bend_ (' + this.element_ + ', _Close_-)']
    for (var armor of this.armor_) {
      traits = [...traits, ...armor.Traits]
    }
    return traits
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================

  public get LoadAbilities() {
    if (this.Load <= kLoadBands) return ['Traveling Light', 'Unencumbered']
    else if (this.Load <= kLoadBands * 2) return []
    else if (this.Load <= kLoadBands * 3) return ['Traveling Heavy', 'Heavily Encumbered']
  }

  public get Abilities() {
    var abilities = store.getters.basicAbilities
    abilities = abilities.concat(store.getters.playerAbilities)
    abilities = abilities.concat(this.LoadAbilities)

    return store.getters.getAbilitiesFromList(abilities)
  }

  get CurrentStance(): Stance {
    return this.current_stance_
  }
  get Disciplines() {
    return this.disciplines_
  }

  override get AllArts() {
    var arts = store.getters.getAPsFromList(this.Arts)
    arts = arts.concat(store.getters.getAnyEquipmentFromList(this.Worn))
    if (this.CurrentStance) {
      arts = arts.concat(this.CurrentStance)
    }

    return arts
  }

  get Arts() {
    var arts = [] //= [...store.getters.playerArts]
    for (var art of this.arts_) {
      arts.push(art)
    }
    arts.sort()
    return arts
  }

  get SpiritArts() {
    var arts = []
    for (var art of this.AllArts) {
      if (art.Category === this.element_) arts.push(art.Name)
    }
    arts.sort()
    return arts
  }

  get Stances() {
    var stances = [...store.getters.basicStances]
    // Collect from Disciplines
    // Collect from Archetypes
    return store.getters.getStancesFromList(stances)
  }

  get SortedPackedEquipment() {
    return this.SortedEquipment(this.Packed)
  }

  get SortedWornEquipment() {
    return this.SortedEquipment(this.Worn)
  }

  private SortedEquipment(equipment) {
    equipment = store.getters.getAnyEquipmentFromList(equipment)
    equipment.sort((a, b) => {
      var aRank = a instanceof Weapon ? 1 : a instanceof Armor ? 2 : 3
      var bRank = b instanceof Weapon ? 1 : b instanceof Armor ? 2 : 3
      if (aRank > bRank) {
        return 1
      } else if (aRank < bRank) {
        return -1
      } else {
        if (a.Name > b.Name) {
          return 1
        } else if (a.Name < b.Name) {
          return -1
        } else {
          return 0
        }
      }
    })
    return equipment
  }

  get Load() {
    var load = 0 //this.equipped_armor_.Load
    for (var equipment of store.getters.getAnyEquipmentFromList(this.Worn)) {
      load += equipment.Load
    }
    return load
  }

  get PackedLoad() {
    var load = 0 //this.equipped_armor_.Load
    for (var equipment of store.getters.getAnyEquipmentFromList(this.Packed)) {
      load += equipment.Load
    }
    return load
  }

  override get MaxStamina() {
    return kBaseStamina + this.combinedBonuses_.Stamina
  }

  override get MaxStun() {
    var maxStun = kBaseStun + this.combinedBonuses_.Stun
    for (var armor of this.armor_) {
      maxStun += armor.Stun
    }
    return maxStun
  }

  get Name() {
    return this.name_
  }

  get Spirit() {
    return this.spirit_
  }

  get Element() {
    return this.element_
  }

  get Worn() {
    return this.equipped_
  }
  get Packed() {
    return this.packed_
  }

  get Techniques() {
    var techniques = [...store.getters.basicTechniques]

    techniques.sort((a, b) => {
      if (a.Speed > b.Speed) {
        return 1
      } else if (a.Speed < b.Speed) {
        return -1
      } else {
        if (a.Name > b.Name) {
          return 1
        } else if (a.Name < b.Name) {
          return -1
        } else {
          return 0
        }
      }
    })
    return techniques
  }
  get Talents() {
    return this.talents_
  }
  get Weapons() {
    return this.weapons_
  }
  get Armors() {
    return this.armor_
  }
  get Grit() {
    return this.CurrentStance.Grit
  }
  get Reflex() {
    return this.CurrentStance.Reflex
  }
  get Focus() {
    return this.CurrentStance.Focus
  }

  // ==========================================================
  // SETTERS
  // ==========================================================
  set CurrentStance(stance: Stance | string) {
    if (stance instanceof Stance) {
      this.current_stance_ = stance
    } else {
      this.current_stance_ = store.getters.getStance(stance)
    }
    if (this.Movement > this.MaxMovement) this.Movement = this.MaxMovement
  }

  set Name(name: string) {
    this.name_ = name
  }
  set Element(spirit: string) {
    this.element_ = spirit
  }

  public RemoveDiscipline(discipline: string) {
    var idx = this.disciplines_.findIndex((e) => e.name == discipline)
    if (idx > -1) {
      this.disciplines_[idx].tier -= 1
      if (this.disciplines_[idx].tier <= 0) this.disciplines_.splice(idx)
    }
  }

  override ApplyRespite() {
    super.ApplyRespite()
    this.spirit_.ApplyRespite()
  }

  override get BlockClear() {
    return 0
  }

  override get MomentumGain() {
    return 0
    //return this.CurrentStance.MomentumGain
  }

  public ClearSpiritInfo() {
    this.spirit_ = new Spirit()
    this.ClearSpiritAbilities()
  }

  public ClearSpiritAbilities() {
    this.minor_disciplines_ = this.minor_disciplines_.filter((art) => store.getters.getArt(art.name).Type == 'Style')
    this.disciplines_ = this.disciplines_.filter((discipline) => store.getters.getDiscipline(discipline.name).Type == 'Style')
  }

  // ==========================================================
  // CONVENIENCE CHECKS
  // ==========================================================
  get HasSpirit() {
    return this.element_ != ''
  }

  get Complete() {
    return this.HasSpirit && this.HasNames
  }

  get HasNames() {
    return this.Name != ''
  }

  get RecommendedDisciplines() {
    var recs = [this.element_, 'Unarmed']
    //if (this.equipped_armor_ != null) recs.push(this.equipped_armor_.category)
    for (var weapon of this.weapons_) {
      var full_weapon = store.getters.getWeapon(weapon)
      if (!recs.includes(full_weapon.category + ' Weapon')) recs.push(full_weapon.category + ' Weapon')
      if (full_weapon.Keywords.some((y) => y.includes('Thrown')) && !recs.includes('Throwing Weapons')) recs.push('Throwing Weapon')
    }

    return recs
  }

  // ==========================================================
  // HELPERS
  // ==========================================================
  private SmartCommas(in_string: string, out_string: string) {
    if (out_string.length > 0) return out_string + ', ' + in_string
    return out_string + in_string
  }

  private getArmor() {
    for (var item of this.equipped_) {
      if (store.getters.isArmor(item)) {
        this.armor_.push(store.getters.getArmor(item))
      }
    }
  }

  private getWeapons() {
    for (var item of this.equipped_) {
      if (store.getters.isWeapon(item)) {
        this.weapons_.push(store.getters.getWeapon(item))
      }
    }
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(character: Character): ICharacterData {
    return {
      //Character Save Data
      ...super.Serialize(character),
      spirit: Spirit.Serialize(character.spirit_),
      current_stance: character.current_stance_ ? character.current_stance_.Name : '',
      disciplines: character.disciplines_,
      element: character.element_,
      name: character.name_,
      player_character: character.player_character_,
      talents: character.talents_,
      wielded: character.wielded_,
      equipped: character.equipped_,
      packed: character.packed_,
      arts: character.arts_,
    }
  }

  public static Deserialize(data: ICharacterData): Character {
    const c = new Character()
    c.setCharacterData(data)
    return c
  }

  private setCharacterData(data: ICharacterData): void {
    if ('current_stance' in data) this.current_stance_ = store.getters.getStance(data.current_stance)
    this.element_ = data.element || ''
    this.name_ = data.name || ''
    this.player_character_ = data.player_character || true
    this.disciplines_ = data.disciplines || []
    this.talents_ = data.talents || []
    this.wielded_ = data.wielded || []
    this.equipped_ = data.equipped || []
    this.packed_ = data.packed || []
    this.arts_ = data.arts || []
    this.setCombatantData(data)
    this.setBonuses()
    this.getArmor()
    this.getWeapons()
    this.spirit_ = Spirit.CreateFromCharacter(this, data.spirit)
  }
}
export default Character
