import { store } from '@/store'
import { Bonuses } from '@/class'
const interpolate = require('color-interpolate')

class Combatant {
  private hp_: number
  private stamina_: number
  private stun_: number
  private soak_: number
  private move_: number
  private momentum_: number
  private statuses_: IStatusEffect[]
  private vigor_: number

  protected combinedBonuses_: Bonuses

  // ==========================================================
  // CONSTRUCTOR
  // ==========================================================
  public constructor() {
    this.move_ = 0
    this.stamina_ = 0
    this.stun_ = 0
    this.soak_ = 0
    this.hp_ = 0
    this.momentum_ = 0
    this.vigor_ = 0
  }
  // ==========================================================
  // These should be overwritten by children
  // ==========================================================
  get MaxMovement() {
    return 0
  }

  get Guard() {
    return 0
  }

  get MaxPadding() {
    return 0
  }

  get MaxHP() {
    return 0
  }

  get MaxStun() {
    return 10
  }

  get MomentumGain() {
    return 0
  }

  get StunClear() {
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

  get BulletedTraits() {
    return '\n\n_' + this.Traits.join('_\n\n_') + '_'
  }

  get Defenses() {
    return this.Grit + ' _Grit_, ' + this.Reflex + ' _Reflex_, ' + this.Focus + ' _Focus_'
  }

  get Grit() {
    return 0
  }

  get Reflex() {
    return 0
  }

  get Focus() {
    return 0
  }

  get Arts() {
    return []
  }

  private abilityFilter(iAbilities, abilities, typeFilter, classFilter, keywordFilter, art = null) {
    for (var ability of abilities) {
      var typeMatches = typeFilter == 'All' || ability.Type == typeFilter
      var classMatches = classFilter == 'All' || classFilter == ability.Class
      var keywordMatches = keywordFilter == 'All' || ability.Keywords.includes(keywordFilter)
      if (typeMatches && classMatches && keywordMatches) {
        if (art) {
          ability.Origin = art
        }
        iAbilities.push(ability)
      }
    }
  }

  public AllKeywords(filter = '') {
    var keywords = []
    for (var art of this.AllArts) {
      for (var ability of art.Abilities) {
        if (filter == '' || ability.Type == filter) keywords = keywords.concat(ability.Keywords)
      }
    }
    keywords.sort()
    keywords.unshift('All')
    return keywords
  }

  public get Abilities() {
    return []
  }

  public get AllArts() {
    return []
  }

  public FilteredAbilities(typeFilter = 'All', classFilter = 'All', keywordFilter = 'All') {
    var abilities = []
    var basic_abilities = this.Abilities
    this.abilityFilter(abilities, basic_abilities, typeFilter, classFilter, keywordFilter)
    for (var art of this.AllArts) {
      this.abilityFilter(abilities, art.Abilities, typeFilter, classFilter, keywordFilter, art)
    }

    abilities.sort((a, b) => a.Name.localeCompare(b.Name))
    return abilities
  }

  protected setBonuses() {
    var passives = this.FilteredAbilities('Passive', 'All', 'All')
    this.combinedBonuses_ = new Bonuses()
    for (var passive of passives) {
      this.combinedBonuses_.addBonuses(passive.Bonuses)
    }
  }

  // ==========================================================
  // GETTERS/SETTERS
  // ==========================================================

  public ApplyRespite() {
    this.move_ = this.MaxMovement
    //this.momentum_ += this.MomentumGain
    this.ClearStunChunk(this.StunClear)
  }

  public ResetDefault() {
    this.move_ = this.MaxMovement
    this.hp_ = this.MaxHP
    this.stun_ = 0
    this.momentum_ = 0
    this.vigor_ = 0
    this.statuses_ = []
  }

  get Movement() {
    return this.move_
  }

  set Movement(move: number) {
    if (move > this.MaxMovement) this.move_ = this.MaxMovement
    else if (move < 0) this.move_ = 0
    else this.move_ = move
  }

  get MovePercent() {
    return (this.Movement / this.MaxMovement) * 100
  }

  get MoveColor() {
    let colormap = interpolate(['#99CCFF', '#0066CC'])
    return colormap(this.MovePercent / 100)
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

  get PaddingStunRatio() {
    return (this.MaxPadding / (this.MaxStun + this.MaxPadding)) * 100
  }

  get Padding() {
    return this.soak_
  }

  get Stun() {
    return this.stun_
  }

  set Stun(stun: number) {
    if (this.soak_ < this.MaxPadding) {
      this.soak_ += 1
    } else if (stun > this.MaxStun) this.stun_ = this.MaxStun
    else if (stun < 0) this.stun_ = 0
    else this.stun_ = stun
  }

  get HP() {
    return this.hp_
  }

  set HP(HP: number) {
    if (HP > this.MaxHP) this.hp_ = this.MaxHP
    else if (HP <= 0) this.hp_ = 0
    else this.hp_ = HP
  }

  get HPPercent() {
    return (this.HP / this.MaxHP) * 100
  }

  get HPColor() {
    let colormap = interpolate(['#FF0000', '#FFDE00', '#5bf75b', '#5bf75b'])
    return colormap(this.HPPercent / 100)
  }

  get StunPercent() {
    return (this.Stun / this.MaxStun) * 100
  }

  get StunColor() {
    let colormap = interpolate(['#FFDE00', '#ff9500', '#FF0000'])
    return colormap(this.StunPercent / 100)
  }

  get PaddingPercent() {
    return (this.Padding / this.MaxPadding) * 100
  }

  get Momentum() {
    return this.momentum_
  }

  set Momentum(input: number) {
    if (this.momentum_ < 0) this.momentum_ = 0
    this.momentum_ = input
  }

  AddStun() {
    if (this.soak_ < this.MaxPadding) {
      this.soak_ += 1
    } else if (this.stun_ == this.MaxStun) return
    else this.stun_ += 1
  }

  AddApStun() {
    if (this.stun_ == this.MaxStun) return
    else this.stun_ += 1
  }

  ClearStun() {
    if (this.stun_ == 0 && this.soak_ > 0) {
      this.soak_ -= 1
    } else if (this.stun_ > 0) this.stun_ -= 1
  }

  private ClearStunChunk(toClear: number) {
    var diff = toClear - this.stun_
    this.stun_ = Math.max(0, this.stun_ - toClear)
    toClear = diff
    if (toClear > 0) {
      this.soak_ = Math.max(0, this.soak_ - toClear)
    }
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(combatant: Combatant): ICombatantData {
    return {
      hp: combatant.hp_,
      move: combatant.move_,
      stun: combatant.stun_,
      soak: combatant.soak_,
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
    this.move_ = data.move
    this.hp_ = data.hp
    this.momentum_ = data.momentum
    this.statuses_ = data.statuses || []
    this.stun_ = data.stun
    this.soak_ = data.soak
    this.vigor_ = data.vigor
  }
}
export default Combatant
