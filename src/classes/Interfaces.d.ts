declare interface IArmorData {
  weight: number
  category?: string
  durability?: number
  guard: number
  name?: string
  special: string
}

declare interface ICharDisciplineData {
  name: string
  tier: number
}

declare interface ICharacterData {
  current_spirit_stance: string
  current_martial_stance: string
  current_endurance: number
  current_health: number
  equipped_armor: string
  disciplines: ICharDisciplineData[]
  focus: number
  grit: number
  main_hand: string
  max_health: number
  max_endurance: number
  momentum: number
  name: string
  off_hand: string
  player_character: Boolean
  reflex: number
  spirit_name: string
  spirit_type: string
  unarmed_weapons: string[]
  weapons: string[]
  weapon_weight: number
}

declare interface IChartData {
  roll: Array<string>
  damage?: Array<number>
  status: Array<string>
}
declare interface IDefenseData {
  additional?: string
  poise?: number
  block?: number
  dodge?: number
}

interface IDisciplineTierData {
  techniques?: string[]
  stances?: string[]
  maneuvers?: string[]
  special?: string
  unarmed: number
}

declare interface IDisciplineData {
  name: string
  category: string
  flavor: string
  primary_role: string
  secondary_role: string
  summary: string
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

declare interface INpcData {
  ap: number
  armor: string // Name of armor for lookup.
  class: string
  desc: string
  endurance: number
  maneuvers: Array<string>
  martial_stances: Array<string>
  name: string
  npc_type: string
  optional_stances?: Array<string>
  optional_techniques?: Array<string>
  role: string
  size: string
  spirit_stances: Array<string>
  spirit_type: string
  traits?: Array<string>
  techniques: Array<string>
  weapons: Array<string>
}

declare interface IObstacleData {
  desc: string
  hardness: number
  height: number
  interact: string
  name: string
  keywords: Array<string>
  size: number
  resistances: string
  special: string
  chart: IChartData
}

declare interface IManeuverData {
  boost?: string
  cost?: string
  desc: string
  effect: string
  keywords?: Array<string>
  move?: string
  name: string
  range?: string
  reqs?: string
  special: string
  chart?: IChartData
  trigger: string
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

declare interface IStanceData {
  name: string
  category: string
  chart: IChartData
  accumulate?: string
  desc: string
  maneuver?: string
  reaction?: string
  reqs?: string
  defense: IDefenseData
  effect: string
  special?: string
}

declare interface IStatusData {
  desc: string
  effect: string
  name: string
  recover: string
  remove: string
  see?: string
  special?: string
  reacts?: Array<string>
  type?: string
}

declare interface ITechData {
  ap?: number
  area?: string
  boost?: string
  category: string
  cost?: string
  damagetype?: string
  desc: string
  effect: string
  maneuver?: string
  imbue?: string
  keywords?: Array<string>
  linked?: string
  move?: string
  name: string
  reaction?: string
  range?: string
  reqs?: string
  special?: string
  speed: string
  target?: string
  type: string
  chart?: IChartData
  weapon?: string
}

declare interface ITerrainData {
  desc: string
  effect: string
  name: string
  keywords: Array<string>
  negate: string
  overrides: Array<string>
}

declare interface IWeaponData {
  category: string
  chart: IChartData
  damagetype: string
  desc?: string
  durability?: number
  itemtype?: string
  hands: number
  hardness?: number
  keywords: Array<string>
  name: string
  parry: string
  range: string
  range_value: number
  reaction?: string
  charged_area: string
  special?: string
  speed: number
  weight: number
}
