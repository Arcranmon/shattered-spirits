/** @format */
// Parent category for all other classes, as some fields are universal.

import { store } from '@/store'

class Base {
  protected name_: string
  protected category_: string
  protected desc_: string
  protected effect_: string
  protected keywords_: Array<string>
  protected special_: string
  protected tags_: Array<string>
  protected type_: string
  protected prereqs_: string

  public constructor(name) {
    this.desc_ = ''
    this.effect_ = ''
    this.keywords_ = []
    this.name_ = name
    this.special_ = ''
    this.type_ = ''
    this.prereqs_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Desc() {
    return this.desc_
  }
  get Category() {
    return this.category_
  }
  public get Effect() {
    return this.effect_
  }
  public get Keywords() {
    return this.keywords_
  }
  public get Name() {
    return this.name_
  }
  public get Special() {
    return this.special_
  }
  public get Tags() {
    return this.tags_
  }
  public get Type() {
    return this.type_
  }
  public get HasSummary() {
    return false
  }
  public get HasIcon() {
    return true
  }
  public get ColorName() {
    return 'derived'
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasEffect() {
    return this.effect_.length > 0
  }
  public get EffectHeader() {
    if (this.Type == 'Skill') {
      return this.effect_
    }
    return '**_Effect_:** ' + this.effect_
  }
  public get HasKeywords() {
    return this.keywords_.length > 0
  }
  public get HasSpecial() {
    return this.special_.length > 0
  }
  public get SpecialHeader() {
    return '**Special:** ' + this.special_
  }
  public get HasPrereqs() {
    return this.prereqs_.length > 0
  }
  public get PrereqsHeader() {
    return '**Prerequisites:** ' + this.prereqs_
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IBaseData): Base {
    const t = new Base(data.name)
    t.setBaseData(data)
    return t
  }

  public setBaseData(data: IBaseData): void {
    this.desc_ = data.desc || ''
    this.category_ = data.category || 'MISSING'
    this.effect_ = data.effect || ''
    this.keywords_ = data.keywords || []
    this.name_ = data.name || ''
    this.special_ = data.special || ''
    this.tags_ = data.tags || []
    this.type_ = data.type || ''
    this.prereqs_ = data.prereqs || ''
  }
}
export default Base
