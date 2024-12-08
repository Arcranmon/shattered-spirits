import { store } from '@/store'
import { Base, Chart } from '@/class'

class Feature extends Base {
  private destroy_: string
  private damage_type_: string
  private element_: string
  private hardness_: number
  private resistances_: string[]
  private interact_: string
  private traits_: string
  private forced_movement_: string
  private size_: number
  private chart_: Chart
  private position_effect_: string
  private path_effect_: string
  private collision_: string

  public constructor(name) {
    super(name)
    this.element_ = ''
    this.interact_ = ''
    this.traits_ = ''
    this.forced_movement_ = ''
    this.size_ = 0
    this.chart_ = null
    this.position_effect_ = ''
    this.path_effect_ = ''
  }

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Chart() {
    return this.chart_
  }
  public get ColorHeader() {
    return this.element_ + '-Terrain'
  }
  get Traits() {
    return this.traits_
  }
  public get Icon() {
    if (!this.element_ || this.element_ == 'Mutable' || this.element_ == 'Elementless' || this.element_ == 'Special')
      return require('@/assets/terrain/BasicTerrain.svg')
    return require('@/assets/terrain/' + this.element_ + '.svg')
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  get HasChart() {
    return this.chart_ != null
  }
  get HasDamageType() {
    return this.damage_type_ != ''
  }
  get HasDestroy() {
    return this.destroy_ != ''
  }
  get HasInteract() {
    return this.interact_ != ''
  }
  get HasTraits() {
    return this.traits_ != ''
  }
  get HasForcedMovement() {
    return this.forced_movement_ != ''
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get DamageType() {
    return '**Damage Type:** ' + this.damage_type_
  }
  public get DestroyHeader() {
    return '**Destroy:** ' + this.destroy_
  }
  public get ElementHeader() {
    return '_' + this.element_ + '_ Feature'
  }
  public get InteractHeader() {
    return '**Interact:** ' + this.interact_
  }
  public get TraitsHeader() {
    return '**Traits:** ' + this.traits_
  }
  public get ForcedMovementHeader() {
    return '**Forced Movement:** ' + this.forced_movement_
  }
  public get DetailsHeader() {
    var details = 'Size ' + this.size_ + ', Hardness ' + this.hardness_
    return details
  }
  public get PositionEffectHeader() {
    return '**Position Effect:** ' + this.position_effect_
  }
  public get PathEffectHeader() {
    return '**Path Effect:** ' + this.path_effect_
  }
  public get HasResistances() {
    return this.resistances_.length > 0
  }
  public get HasCollision() {
    return this.collision_.length > 0
  }
  public get CollisionHeader() {
    return '**Collision:** ' + this.collision_
  }
  public get ResistancesHeader() {
    var resist_header = '**_Resistances_:** '

    for (var i = 0; i < this.resistances_.length; i++) {
      resist_header += '_' + this.resistances_[i].replace(' ', '_ ')
      if (i != this.resistances_.length - 1) resist_header += ', '
    }

    return resist_header
  }
  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(featureData: IFeatureData): Feature {
    const t = new Feature(featureData.name)
    t.setFeatureData(featureData)
    return t
  }

  public setFeatureData(data: IFeatureData): void {
    this.setBaseData(data)
    this.damage_type_ = data.damage_type || ''
    this.destroy_ = data.destroy || ''
    this.element_ = data.element || ''
    this.hardness_ = data.hardness || 0
    this.interact_ = data.interact || ''
    this.traits_ = data.traits || ''
    this.resistances_ = data.resistances || []
    this.forced_movement_ = data.forced_movement || ''
    this.size_ = data.size || 0
    this.path_effect_ = data.path_effect || ''
    this.position_effect_ = data.position_effect || ''
    this.collision_ = data.collision || ''
    if ('chart' in data) {
      this.chart_ = Chart.Deserialize(data.chart)
    }
  }
}
export default Feature
