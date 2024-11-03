/** @format */
// Parent class for all other classes, as some fields are universal.

import { store } from '@/store'

class Base {
  protected name_: string
  protected desc_: string
  protected effect_: string
  protected keywords_: Array<string>
  protected special_: string
  protected table_: Array<string>

  public constructor(name) {
    this.desc_ = ''
    this.effect_ = ''
    this.keywords_ = []
    this.name_ = name
    this.special_ = ''
    this.table_ = []
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Desc() {
    return this.desc_
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
  public get Table() {
    return this.table_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasEffect() {
    return this.effect_.length > 0
  }
  public get EffectHeader() {
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
  public get HasTable() {
    return this.table_.length > 0
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
    this.effect_ = data.effect || ''
    this.keywords_ = data.keywords || []
    this.name_ = data.name || ''
    this.special_ = data.special || ''
    this.table_ = data.table || []
  }
}
export default Base
