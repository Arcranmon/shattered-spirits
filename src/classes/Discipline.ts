import { store } from '@/store'

class Discipline {
  private name_: string
  private prereqs_: String[]
  private category_: string
  private desc_: string
  private mechanics_desc_: string
  private tags_: string[]
  private primary_role_: String
  private secondary_role_: String
  private tier_1_: IDisciplineTierData
  private tier_2_: IDisciplineTierData
  private tier_3_: IDisciplineTierData
  private type_: string

  public constructor() {
    this.name_ = ''
    this.desc_ = ''
    this.tags_ = []
    this.tier_1_ = null
    this.tier_2_ = null
    this.tier_3_ = null
  }

  public get Category() {
    return this.category_
  }
  public get Flavor() {
    return this.desc_
  }
  public get IsMajor() {
    return this.tier_2_ != null
  }
  public get Mechanics() {
    return this.mechanics_desc_
  }
  public get TagsHeader() {
    return '**Primary Mechanics**: [_' + this.tags_.join('_, _') + '_]'
  }
  public get Name() {
    return this.name_
  }
  public get PrimaryRole() {
    return this.primary_role_
  }
  public get SecondaryRole() {
    return this.secondary_role_
  }
  public get RoleHeader() {
    if (this.secondary_role_ != '') return '_' + this.primary_role_ + '_/_' + this.secondary_role_ + '_'
    return this.primary_role_
  }
  public get DescriptiveHeader() {
    if (this.primary_role_ == this.type_) {
      return this.RoleHeader + '_ Discipline'
    } else {
      return this.RoleHeader + ' ' + this.TypeHeader
    }
  }
  public get TypeHeader() {
    return '_' + this.type_ + '_ Discipline'
  }
  public get Type() {
    return this.type_
  }
  public get PrereqsHeader() {
    if (this.prereqs_.length == 0) return '**Prerequisites:** None.'
    return '**Prerequisites:** _' + this.prereqs_.join('_, _') + '_'
  }
  public get Icon() {
    console.log(this.Name)
    if (this.Type == 'Undefined') return ''
    if (this.Category == 'Martial') {
      if (this.Type == 'Striker' || this.Type == 'Artillery') return require('@/assets/disciplines/' + this.Type + '.svg')
      return require('@/assets/weapons/' + this.Type + '.svg')
    }
    if (this.Type == 'General' || this.Type == 'Style') return require('@/assets/disciplines/' + this.primary_role_ + '.svg')
    return require('@/assets/disciplines/' + this.Type + '.svg')
  }

  // ==========================================================
  // TIER GETTERS
  // ==========================================================

  public get TotalTier1Items() {
    return this.tier_1_.techniques.length + this.tier_1_.maneuvers.length
  }
  public get HasTier1Attacks() {
    return this.tier_1_.attacks != undefined
  }
  public get Tier1Attacks() {
    return store.getters.getAttacksFromList(this.tier_1_.attacks)
  }
  public get HasTier1SpiritAbilities() {
    return this.tier_1_.spirit_abilities != undefined
  }
  public get Tier1SpiritAbilities() {
    return store.getters.getManeuversFromList(this.tier_1_.spirit_abilities)
  }
  public get HasTier1Techniques() {
    return this.tier_1_.techniques != undefined
  }
  public get Tier1Techniques() {
    return store.getters.getTechniquesFromList(this.tier_1_.techniques)
  }
  public get HasTier1Maneuvers() {
    return this.tier_1_.maneuvers != undefined
  }
  public get Tier1Maneuvers() {
    return store.getters.getManeuversFromList(this.tier_1_.maneuvers)
  }
  public get HasTier1Special() {
    return this.tier_1_.special != undefined
  }
  public get Tier1Special() {
    return this.tier_1_.special
  }
  public get Tier1Stances() {
    return store.getters.getStancesFromList(this.tier_1_.stances)
  }
  public get HasTier2Stances() {
    return this.tier_2_ && this.tier_2_.stances != undefined
  }
  public get Tier2Stances() {
    return store.getters.getStancesFromList(this.tier_2_.stances)
  }
  public get HasTier2Attacks() {
    return this.tier_2_.attacks != undefined
  }
  public get Tier2Attacks() {
    return store.getters.getAttacksFromList(this.tier_2_.attacks)
  }
  public get HasTier2SpiritAbilities() {
    return this.tier_2_.spirit_abilities != undefined
  }
  public get Tier2SpiritAbilities() {
    return store.getters.getManeuversFromList(this.tier_2_.spirit_abilities)
  }
  public get HasTier2Techniques() {
    return this.tier_2_.techniques != undefined
  }
  public get Tier2Techniques() {
    return store.getters.getTechniquesFromList(this.tier_2_.techniques)
  }
  public get HasTier2Maneuvers() {
    return this.tier_2_.maneuvers != undefined
  }
  public get Tier2Maneuvers() {
    return store.getters.getManeuversFromList(this.tier_2_.maneuvers)
  }
  public get HasTier2Special() {
    return this.tier_2_.special != undefined
  }
  public get Tier2Special() {
    return this.tier_2_.special
  }
  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: IDisciplineData): Discipline {
    const t = new Discipline()
    t.setDisciplineData(data)
    return t
  }

  public setDisciplineData(data: IDisciplineData): void {
    this.category_ = data.category || ''
    this.name_ = data.name || ''
    this.desc_ = data.desc || ''
    this.mechanics_desc_ = data.mechanics_desc || ''
    this.prereqs_ = data.prereqs || []
    this.tags_ = data.tags || []
    this.primary_role_ = data.primary_role || ''
    this.secondary_role_ = data.secondary_role || ''
    this.tier_1_ = data.tier_1 || null
    this.tier_2_ = data.tier_2 || null
    this.tier_3_ = data.tier_3 || null
    this.type_ = data.type || 'Undefined'
  }
}
export default Discipline
