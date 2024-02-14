import { store } from '@/store'

class Discipline {
  private name_: string
  private category_: string
  private desc_: string
  private primary_role_: String
  private secondary_role_: String
  private summary_: string
  private tier_1_: IDisciplineTierData
  private tier_2_: IDisciplineTierData
  private tier_3_: IDisciplineTierData
  private type_: string

  public constructor() {
    this.name_ = ''
    this.desc_ = ''
    this.summary_ = ''
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
  public get Name() {
    return this.name_
  }
  public get RoleHeader() {
    if (this.secondary_role_ != '') return this.primary_role_ + '/' + this.secondary_role_
    return this.primary_role_
  }
  public get Summary() {
    return this.summary_
  }
  public get TypeHeader() {
    return this.type_ + ' Discipline'
  }
  public get Type() {
    return this.type_
  }
  public get Icon() {
    if (this.Type == 'Style') return require('@/assets/disciplines/' + this.primary_role_ + '.svg')
    if (this.Type == 'Style' || this.Type == 'Undefined') return ''
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
  public get HasTier2Stances() {
    return this.tier_2_.stances != undefined
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
    this.primary_role_ = data.primary_role || ''
    this.secondary_role_ = data.secondary_role || ''
    this.summary_ = data.summary || ''
    this.tier_1_ = data.tier_1 || null
    this.tier_2_ = data.tier_2 || null
    this.tier_3_ = data.tier_3 || null
    this.type_ = data.type || 'Undefined'
  }
}
export default Discipline
