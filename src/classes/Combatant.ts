import { store } from '@/store'
import { Bonuses } from '@/class'
const interpolate = require('color-interpolate')

class Combatant {
  private stamina_: number
  private stun_: number
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
    this.momentum_ = 0
    this.vigor_ = 0
  }
  // ==========================================================
  // These should be overwritten by children
  // ==========================================================
  get MaxMovement() {
    return 0
  }

  get Block() {
    return 0
  }

  get MaxSoak() {
    return 0
  }

  get MaxStamina() {
    return 0
  }

  get MaxStun() {
    return 10
  }

  get MomentumGain() {
    return 0
  }

  get BlockClear() {
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

  private abilityFilter(iAbilities, abilities, typeFilter, categoryFilter, keywordFilter, art = null) {
    for (var ability of abilities) {
      var typeMatches = typeFilter == 'All' || ability.Type == typeFilter
      var categoryMatches = categoryFilter == 'All' || categoryFilter == ability.category
      var keywordMatches = keywordFilter == 'All' || ability.Keywords.includes(keywordFilter)
      if (typeMatches && categoryMatches && keywordMatches) {
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

  public FilteredAbilities(typeFilter = 'All', categoryFilter = 'All', keywordFilter = 'All') {
    var abilities = []
    var basic_abilities = this.Abilities
    this.abilityFilter(abilities, basic_abilities, typeFilter, categoryFilter, keywordFilter)
    for (var art of this.AllArts) {
      this.abilityFilter(abilities, art.Abilities, typeFilter, categoryFilter, keywordFilter, art)
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
    //this.ClearBlockChunk(this.BlockClear)
  }

  public ResetDefault() {
    this.move_ = this.MaxMovement
    this.stamina_ = this.MaxStamina
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

  get SoakBlockRatio() {
    return (this.MaxSoak / (this.MaxStun + this.MaxSoak)) * 100
  }

  get Stun() {
    return this.stun_
  }

  set Stamina(Stamina: number) {
    if (Stamina > this.MaxStamina) this.stamina_ = this.MaxStamina
    else if (Stamina <= 0) this.stamina_ = 0
    else this.stamina_ = Stamina
  }

  get StaminaPercent() {
    return (this.Stamina / this.MaxStamina) * 100
  }

  get StaminaColor() {
    let colormap = interpolate(['#FF0000', '#FFDE00', '#5bf75b', '#5bf75b'])
    return colormap(this.StaminaPercent / 100)
  }

  get BlockPercent() {
    return (this.Stun / this.MaxStun) * 100
  }

  get BlockColor() {
    let colormap = interpolate(['#FFDE00', '#ff9500', '#FF0000'])
    return colormap(this.BlockPercent / 100)
  }

  get Momentum() {
    return this.momentum_
  }

  set Momentum(input: number) {
    if (this.momentum_ < 0) this.momentum_ = 0
    this.momentum_ = input
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Serialize(combatant: Combatant): ICombatantData {
    return {
      stamina: combatant.stamina_,
      move: combatant.move_,
      stun: combatant.stun_,
      momentum: combatant.momentum_,
      statuses: combatant.statuses_,
    }
  }

  public static Deserialize(data: ICombatantData): Combatant {
    const c = new Combatant()
    c.setCombatantData(data)
    return c
  }

  public setCombatantData(data: ICombatantData): void {
    this.move_ = data.move
    this.stamina_ = data.stamina
    this.momentum_ = data.momentum
    this.statuses_ = data.statuses || []
    this.stun_ = data.stun
  }
}
export default Combatant
