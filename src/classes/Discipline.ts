import { store } from '@/store'

class Discipline {
  private name_: string
  private category_: string
  private flavor_: string
  private primary_role_: String
  private secondary_role_: String
  private summary_: string
  private tier_1_: IDisciplineTierData
  private tier_2_: IDisciplineTierData
  private tier_3_: IDisciplineTierData
  private type_: string

  public constructor() {
    this.name_ = ''
    this.flavor_ = ''
    this.summary_ = ''
    this.tier_1_ = null
    this.tier_2_ = null
    this.tier_3_ = null
  }

  public get Category() {
    return this.category_
  }
  public get Flavor() {
    return this.flavor_
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
    if (this.Type == 'Error') return ''
    return require('@/assets/' + this.Type + '.svg')
  }

  // ==========================================================
  // TIER GETTERS
  // ==========================================================

  public get TotalTier1Items() {
    return this.tier_1_.techniques.length + this.tier_1_.maneuvers.length
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
  public get Tier1Unarmed() {
    if (!Number.isNaN(this.tier_1_.unarmed)) return this.tier_1_.unarmed
    return 0
  }
  public get HasTier2Stances() {
    return this.tier_2_.stances != undefined
  }
  public get Tier2Stances() {
    return store.getters.getStancesFromList(this.tier_2_.stances)
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
  public get Tier2Unarmed() {
    if (!Number.isNaN(this.tier_2_.unarmed)) return this.tier_2_.unarmed
    return 0
  }
  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(discData: IDisciplineData): Discipline {
    const t = new Discipline()
    t.setDisciplineData(discData)
    return t
  }

  public setDisciplineData(data: IDisciplineData): void {
    this.category_ = data.category || ''
    this.name_ = data.name || ''
    this.flavor_ = data.flavor || ''
    this.primary_role_ = data.primary_role || ''
    this.secondary_role_ = data.secondary_role || ''
    this.summary_ = data.summary || ''
    this.tier_1_ = data.tier_1 || null
    this.tier_2_ = data.tier_2 || null
    this.tier_3_ = data.tier_3 || null
    this.type_ = data.type || ''
  }
}
export default Discipline
