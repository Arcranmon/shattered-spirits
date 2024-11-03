declare interface IBaseData {
  name: string
  table?: Array<string>
  desc: string
  effect: string
  keywords?: Array<string>
  special?: string
}

declare interface IArmorData extends IBaseData {
  weight: number
  durability: number
  category?: string
  guard: number
  parry: string
  soak: number
  traits: string[]
}

declare interface IAttackData extends IManeuverData {
  category?: string
  chart: IChartData
  rank: string
  charged_profile?: IChargedEffect
  speed: string
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
}

declare interface ICombatantData {
  health: number
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
  on_miss: string
  material: string
}

declare interface IDefenseData {
  stamina: number
  reflex?: number
  grit?: number
  focus?: number
  hardness?: number
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
  weight: number
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
  health: number
  gambits?: Array<string>
  guard?: number
  momentum_gain?: number
  name: string
  npc_type: string
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
  target?: string
  chart?: IChartData
  material?: string
}

declare interface IManeuverData extends IAbilityData {
  manifest?: string
  trigger?: string
  type: string
  weapon?: string
}

declare interface ITechData extends IAbilityData {
  category: string
  speed: string
  type: string
  weapon?: string
}

declare interface IMovementData {
  name: string
  encumbrance: number
  movement: number
  jump: number
  manifest_range: string
  traits: string[]
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
  spirit_form: string
  subtype: string
  weapons: Array<string>
}

declare interface ISpiritFormData extends IBaseData {
  size: string
  defenses?: IDefenseData
  health: number
  weapons: string
  bonus_attack: string
  guard: number
  movement: string
  traits: string[]
}

declare interface ISubtypeData extends IBaseData {
  element: string
  summon_effect: string
  manifest_effect: string
  defenses: IDefenseData
  traits: string[]
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

declare interface ITalentData {
  name: string
  icon: string
  desc: string
  rank_0: ITalentRankData
  rank_1: ITalentRankData
}

declare interface ITalentRankData {
  dice?: string
  feats?: string
  push?: string
  other?: string
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
  weight: number
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

declare interface IWeaponData extends IAttackData {
  durability?: number
  itemtype?: string
  keywords: Array<string>
  hands: number
  hardness?: number
  material: string
  parry: string
  weight: number
}
