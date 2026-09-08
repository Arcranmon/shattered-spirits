declare interface IBaseData {
  name: string
  category?: string
  table?: Array<string>
  desc?: string
  summary?: string
  effect: string
  keywords?: Array<string>
  special?: string
  tags?: string[]
  type?: string
  prereqs?: string
  chart?: IChartData
}

declare interface IEnhanceData {
  name: string
  cost: string
  effect: string
  reactive?: boolean
  exclusive?: boolean
}

declare interface IEnhancementData {
  header: string
  enhances: IEnhanceData[]
}

declare interface IAbilityPackageData extends IBaseData {
  abilities?: IAbilityData[]
  stances?: IStanceData[]
  cost?: string
}

declare interface IWeaknessResistanceData {
  damage: string
  mod: number
}

declare interface IBonusesData {
  stamina?: number
  guard?: number
  block?: number
  speed?: number
  phase?: number
  load?: number
  equipment?: string[]
  weakness_resistance?: IWeaknessResistanceData[]
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
  guard: number
  traits: string[]
}

declare interface ICharDisciplineData {
  name: string
  tier: number
}

declare interface ICharacterData extends ICombatantData {
  current_stance: string
  arts: string[]
  element: string
  disciplines: ICharDisciplineData[]
  name: string
  player_character: Boolean
  spirit: ISpiritData
  careers: string[]
  wielded: string[]
  equipped: string[]
  packed: string[]
}

declare interface ICombatantData {
  stamina: number
  guard: number
  speed: number
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
  guard?: number
  block?: number
  immunities?: string[]
  resistances?: string[]
  weaknesses?: string[]
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
  bars: number
  equipment?: Array<string>
  speed: number
  category?: string
  desc: string
  stamina: number
  block?: number
  guard: number
  name: string
  npc_type: string
  role: string
  size: number
  defenses: IDefenseData
  stances?: Array<IStanceData>
  traits?: Array<string>
}
declare interface IEventData extends IBaseData {}

declare interface IAbilityData extends IBaseData {
  missile?: string
  area?: string
  frequency?: string
  defend?: string
  imbues?: IEnhanceData[]
  enhancements?: IEnhancementData
  cost?: string
  speed?: number
  range?: string
  reqs?: string
  trigger?: string
  phase?: number
  target?: string
  material?: string
  damage_type?: string
  bonuses?: IBonusesData
}

declare interface IRangeData {
  category: string
  value: number
  special: string
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
  speed: number
  traits: string[]
  guard: number
  range_modifier: string
}

declare interface ISubtypeData extends IBaseData {
  element: string
  stamina: number
  weapons: number
  block: number
  guard: number
  speed: number
  growth_points: number
  phase: number
}

declare interface IStanceData extends IAbilityPackageData {
  defenses?: IDefenseData
  momentum?: string
  phase: number
  block: number
  speed: number
}

declare interface IStatusEffect {
  status: string
  stack: number
}

declare interface IStatusData extends IBaseData {
  recover: string
  repeat: string
  see?: string
  reacts?: Array<string>
  type?: string
  segments?: number
  clock?: number
  remove?: string
}

declare interface ITerrainData extends IBaseData {
  engaged?: string
  enter?: string
  collide?: string
  source?: string
  eor?: string
  element: string
  layer: string
  negate: string
  destroy: string
  interactions: string[]
  threshold: number
  hardness: number
}

declare interface ITraitData extends IAbilityPackageData {
  equipment: string[]
  bonuses: IBonusesData
}

declare interface IWeaponData extends IEquipmentData {
  reqs: string
  chart: IChartData
}
