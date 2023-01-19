import { store } from '@/store'
import { Technique } from '@/class'
import { Stance } from '@/class'

class Discipline {
  private name_: string
  private category_: string
  private flavor_: string
  private background_: string
  private role_: string
  private stances_: string[]
  private summary_: string
  private techniques_: string[]

  public constructor() {
    this.background_ = 'white'
    this.name_ = ''
    this.flavor_ = ''
    this.stances_ = []
    this.summary_ = ''
    this.techniques_ = []
  }

  public get Background() {
    return this.background_
  }
  public get Flavor() {
    return this.flavor_
  }
  public get Name() {
    return this.name_
  }
  public get Role() {
    return this.role_
  }
  public get Techniques() {
    return this.techniques_
  }
  public get Stances() {
    return this.stances_
  }
  public get Summary() {
    return this.summary_
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
    this.background_ = data.background || 'white'
    this.category_ = data.category || ''
    this.name_ = data.name || ''
    this.flavor_ = data.flavor || ''
    this.role_ = data.role || ''
    this.stances_ = data.stances || []
    this.summary_ = data.summary || ''
    this.techniques_ = data.techniques || []
  }
}
export default Discipline
