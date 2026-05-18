/** @format */
// Parent category for all other classes, as some fields are universal.

import { store } from '@/store'

class GlossaryItem {
  protected name_: string
  protected effect_: string
  protected see_: string

  public constructor(name) {
    this.name_ = name
    this.effect_ = ''
    this.see_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Effect() {
    return this.effect_
  }
  public get Name() {
    return this.name_
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasEffect() {
    return this.effect_.length > 0
  }

  public get DisplayText() {
    return '**' + this.Name + ':** ' + (this.HasEffect ? this.effect_ : 'See _' + this.see_ + '_.')
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================

  public static Deserialize(data: IGlossaryData): GlossaryItem {
    const t = new GlossaryItem(data.name)
    t.setData(data)
    return t
  }

  public setData(data: IGlossaryData): void {
    this.effect_ = data.effect || ''
    this.name_ = data.name || ''
    this.see_ = data.see || ''
  }
}
export default GlossaryItem
