declare interface IBaseData {
  name: string
  category?: string
  table?: Array<string>
  desc?: string
  effect: string
  keywords?: Array<string>
  special?: string
  tags?: string[]
  type?: string
  prereqs?: string
}

declare interface IEnhanceData {
  name: string
  cost: string
  effect: string
}

declare interface IArchetypeData extends IBaseData {
  art: string
  bonuses: IBonusesData
}

declare interface IAbilityPackageData extends IBaseData {
  abilities?: IAbilityData[]
  cost?: string
}

declare interface IBonusesData {
  focus?: number
  grit?: number
  stamina?: number
  stun?: number
  reflex?: number
  move?: number
  speed?: number
  load?: number
  equipment?: string[]
}

declare interface IEquipmentData extends IAbilityPackageData {
  durability: number
  load: number
  hands: number
  rarity: string
}

declare interface IArmorData extends IEquipmentData {
  block: number
  consumable_slots: number
  stun: number
  traits: string[]
}

declare interface ICharDisciplineData {
  name: string
  tier: number
}

declare interface IChargedEffect {
  set_up: string
  resolution: string
}

declare interface ICharacterData extends ICombatantData {
  current_stance: string
  arts: string[]
  element: string
  disciplines: ICharDisciplineData[]
  name: string
  player_character: Boolean
  spirit: ISpiritData
  talents: string[]
  wielded: string[]
  equipped: string[]
  packed: string[]
}

declare interface ICombatantData {
  stamina: number
  stun: number
  move: number
  momentum: number
  statuses?: IStatusEffect[]
}

declare interface IChartData {
  roll: Array<string>
  damage?: Array<number>
  stun?: Array<number>
  status?: Array<string>
  damage_type?: string
  keywords?: Array<string>
  material?: string
  negate?: Array<number>
  defend?: boolean
}

declare interface IDefenseData {
  stun?: number
  reflex?: number
  grit?: number
  focus?: number
  block?: number
  immunities?: string[]
  resistances?: string[]
  weaknesses?: string[]
}

interface IDisciplineTierData {
  techniques?: string[]
  attacks?: string[]
  spirit_abilities?: string[]
  stances?: string[]
  maneuvers?: string[]
  special?: string
}

declare interface IDisciplineData {
  name: string
  prereqs?: string[]
  category: string
  desc: string
  mechanics_desc: string
  tags: string[]
  primary_role: string
  secondary_role: string
  tier_1: IDisciplineTierData
  tier_2: IDisciplineTierData
  tier_3: IDisciplineTierData
  type: string
}

declare interface IGlossaryData {
  name: string
  effect?: string
  see?: string
}

declare interface INpcCombatData extends ICombatantData {
  npc_data: string
  tag: number
}

declare interface INpcData {
  abilities?: Array<IAbilityData>
  equipment?: Array<string>
  move: number
  category?: string
  desc: string
  stamina: number
  block?: number
  stun: number
  name: string
  npc_type: string
  role: string
  size: string
  defenses: IDefenseData
  stances?: Array<IStanceData>
  traits?: Array<string>
}

declare interface IAbilityData extends IBaseData {
  missile?: string
  area?: string
  defend?: string
  imbues?: IEnhanceData[]
  enhancements?: IEnhanceData[]
  cost?: string
  category: string
  move?: number
  range?: string
  reqs?: string
  type?: string
  trigger?: string
  speed?: number
  target?: string
  material?: string
  chart?: IChartData
  bonuses?: IBonusesData
}

declare interface IManeuverData extends IAbilityData {
  manifest?: string
}

declare interface ITechData extends IAbilityData {
  category: string
  type: string
  weapon?: string
}

declare interface IDefendData {
  lose: string
  tie: string
  win: string
  always: string
}

declare interface IRangeData {
  category: string
  value: number
  special: string
}

declare interface IRespiteData {
  momentum_gain: number[]
  block_clear: number[]
  conditional_momentum: string
  special: string
  movement: number
}

declare interface ISpiritData extends ICombatantData {
  name: string
  type: string
  weapons: Array<string>
  traits: Array<string>
  current_stance: string
}

declare interface ISpiritFormData extends IBaseData {
  defenses?: IDefenseData
  stamina: number
  weapons: string
  move: number
  traits: string[]
  stun: number
  range_modifier: string
}

declare interface ISubtypeData extends IBaseData {
  element: string
  defenses: IDefenseData
  traits: string[]
  conditions: string[]
  stamina: number
  weapons: number
  block: number
  stun: number
  move: number
  manifest: string
  soak: string
  growth_points: number
  speed: number
}

declare interface IStanceData extends IAbilityPackageData {
  respite?: IRespiteData
  defenses?: IDefenseData
  momentum?: string
  speed: number
  block: number
  movement: number
  guard: number
}

declare interface IStatusEffect {
  status: string
  stack: number
}

declare interface IStatusData extends IBaseData {
  negate: string
  recover: string
  remove: string
  repeat: string
  see?: string
  reacts?: Array<string>
  type?: string
}

declare interface ITalentData extends IBaseData {
  icon: string
  always: string
  push: string
  prereqs: string
}

declare interface ITerrainData extends IBaseData {
  position_effect: string
  path_effect: string
  element: string
  layer: string
  negate: string
  destroy: string
  interactions: string[]
}

declare interface IFeatureData extends IBaseData {
  damage_type: string
  destroy: string
  element: string
  forced_movement: string
  hardness: number
  interact: string
  resistances: string[]
  size: number
  traits: string
  chart: IChartData
  position_effect: string
  path_effect: string
  collision: string
}

declare interface ITraitData extends IAbilityPackageData {
  equipment: string[]
  bonuses: IBonusesData
}

declare interface IWeaponData extends IEquipmentData {
  reqs: string
  chart: IChartData
}
