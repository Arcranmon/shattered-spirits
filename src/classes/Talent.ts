import { store } from '@/store'

class Talent {
  private icon_: string
  private name_: string
  private desc_: string
  private rank_0_: ITalentRankData
  private rank_1_: ITalentRankData

  public constructor() {
    this.name_ = ''
    this.desc_ = ''
    this.rank_0_ = null
    this.rank_1_ = null
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Icon() {
    return require('@/assets/disciplines/' + this.icon_ + '.svg')
  }

  public get Name() {
    return this.name_
  }

  public get Desc() {
    return this.desc_
  }

  // ==========================================================
  // RANK GETTERS
  // ==========================================================
  public Rank(index) {
    if (index == 0) return this.rank_0_
    if (index == 1) return this.rank_1_
  }

  public DiceHeader(index) {
    return '**Dice:** ' + this.Rank(index).dice
  }

  public FeatsHeader(index) {
    return '**Feats:** ' + this.Rank(index).feats
  }

  public PushHeader(index) {
    return '**Push:** ' + this.Rank(index).push
  }

  public OtherHeader(index) {
    return '**Other:** ' + this.Rank(index).other
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(data: ITalentData): Talent {
    const t = new Talent()
    t.setTalentData(data)
    return t
  }

  public setTalentData(data: ITalentData): void {
    this.icon_ = data.icon || ''
    this.name_ = data.name || ''
    this.desc_ = data.desc || ''
    this.rank_0_ = data.rank_0 || null
    this.rank_1_ = data.rank_1 || null
  }
}
export default Talent
