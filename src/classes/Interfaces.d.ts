declare interface IBaseData {
  name: string
  category?: string
  table?: Array<string>
  desc: string
  effect: string
  keywords?: Array<string>
  special?: string
}

declare interface IArchetypeData extends IBaseData {
  maneuver: string
  bonuses: IBonusesData
}

declare interface IArtData extends IBaseData {
  abilities: IAbilityData[]
  chart?: IChartData
}

declare interface IBonusesData {
  focus: number
  grit: number
  health: number
  reflex: number
  move: number
  load: number
}

declare interface IArmorData extends IBaseData {
  durability: number
  guard: number
  load: number
  sacrifice: string
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
  current_spirit_stance: string
  current_martial_stance: string
  armor: string[]
  element: string
  accessories: string[]
  disciplines: ICharDisciplineData[]
  name: string
  player_character: Boolean
  spirit: ISpiritData
  weapons: string[]
  archetypes: string[]
  talents: string[]
}

declare interface ICombatantData {
  Health: number
  stamina: number
  stun: number
  move: number
  momentum: number
  statuses?: IStatusEffect[]
  vigor: number
}

declare interface IChartData {
  roll: Array<string>
  damage?: Array<number>
  stun?: Array<number>
  status: Array<string>
  damage_type: string
  keywords: Array<string>
  material: string
}

declare interface IDefenseData {
  stun: number
  reflex?: number
  grit?: number
  focus?: number
  hardness?: number
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

declare interface IAccessoryData extends IBaseData {
  load: number
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
  actions: Array<string>
  move: number
  jump: number
  attacks: Array<string>
  class: string
  desc: string
  durability?: number
  Health: number
  gambits?: Array<string>
  guard?: number
  max_stun: number
  momentum_gain?: number
  name: string
  npc_type: string
  pattern: string
  reactions: Array<string>
  role: string
  size: string
  special?: string
  defenses: IDefenseData
  stances?: Array<string>
  subtype: string
  stunts: Array<string>
  traits?: Array<string>
  techniques: Array<string>
  weapons: Array<string>
}

declare interface IAbilityData extends IBaseData {
  area?: string
  boost?: string
  cost?: string
  class: string
  move?: number
  range?: string
  reqs?: string
  type?: string
  trigger?: string
  speed?: number
  target?: string
  material?: string
}

declare interface IManeuverData extends IAbilityData {
  manifest?: string
  defend?: IDefendData
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
  momentum_gain: number
  conditional_momentum: string
  special: string
}

declare interface ISpiritData extends ICombatantData {
  name: string
  type: string
  weapons: Array<string>
}

declare interface ISubtypeData extends IBaseData {
  element: string
  defenses: IDefenseData
  traits: string[]
  conditions: string[]
  health: number
  weapons: number
  guard: number
  soak: number
  move: number
}

declare interface IStanceData extends IBaseData {
  class: string
  respite?: IRespiteData
  defenses?: IDefenseData
  traits: string[]
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

declare interface ITraitData extends IBaseData {
  reqs: string
  cost: number
}

declare interface IWeaponData extends IArtData {
  durability?: number
  keywords: Array<string>
  hands: number
  load: number
  reqs: string
}
