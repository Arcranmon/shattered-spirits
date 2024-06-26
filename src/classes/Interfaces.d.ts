declare interface IBaseData {
  name: string
  desc: string
  effect: string
  keywords?: Array<string>
  special?: string
}

declare interface IArmorData extends IBaseData {
  weight: number
  category?: string
  durability?: number
  guard: number
}

declare interface IAttackData extends IManeuverData {
  category?: string
  chart: IChartData
  rank: string
  charged_effect?: string
  speed: string
}

declare interface ICharDisciplineData {
  name: string
  tier: number
}

declare interface ICharacterData extends ICombatantData {
  current_spirit_stance: string
  current_martial_stance: string
  equipped_armor: string
  element: string
  accessories: string[]
  disciplines: ICharDisciplineData[]
  arts: ICharDisciplineData[]
  name: string
  player_character: Boolean
  spirit: ISpiritData
  used_manifest: boolean
  weapons: string[]
}

declare interface ICombatantData {
  health: number
  stamina: number
  ap: number
  momentum: number
  statuses: IStatusEffect[]
  vigor: number
}

declare interface IChartData {
  roll: Array<string>
  damage?: Array<number>
  status: Array<string>
  damage_type: string
  keywords: Array<string>
  on_miss: string
  material: string
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
  ap: number
  attacks: Array<string>
  class: string
  desc: string
  durability?: number
  health: number
  gambits?: Array<string>
  guard?: number
  momentum_gain: number
  movement: string
  name: string
  npc_type: string
  reactions: Array<string>
  role: string
  size: string
  special: string
  max_stamina: number
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
  move?: string
  range?: Array<IRangeData>
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
  step: number
  reposition: number
  dash: number
  jump: number
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
  health: number
  weapons: string
  bonus_attack: string
  guard: number
  durability: number
  movement: string
  traits: string[]
}

declare interface ISubtypeData extends IBaseData {
  element: string
  summon_effect: string
  manifest_effect: string
  traits: string[]
}

declare interface IStanceData extends IBaseData {
  category: string
  class: string
  respite?: IRespiteData
  maneuver?: string
  stamina?: number
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
  see?: string
  reacts?: Array<string>
  type?: string
}

declare interface ITerrainData extends IBaseData {
  element: string
  layer: string
  negate: string
  destroy: string
  interactions: string[]
}

declare interface IObstacleData extends IBaseData {
  damage_type: string
  destroy: string
  element: string
  forced_movement: string
  hardness: number
  height: number
  interact: string
  size: number
  traits: string
  chart: IChartData
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
