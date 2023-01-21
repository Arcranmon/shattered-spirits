declare interface IAfflictionData {
  desc: string
  effect: string
  name: string
  purge: string
  reacts: Array<string>
  remove: string
  special?: string
  type: string
}

declare interface IArmorData {
  armor: number
  category?: string
  durability?: number
  endurance: number
  jump: number
  name?: string
  reaction?: string
  reposition: number
  dash: number
  special?: string
  sprint: number
  step: number
}

declare interface ICharacterData {
  current_stance: string
  current_style: string
  current_endurance: number
  equipped_armor: string
  focus: number
  grit: number
  current_health: number
  main_hand: string
  martial_forms: number
  max_health: number
  momentum: number
  name: string
  off_hand: string
  player_character: Boolean
  reflex: number
  enhancements: string[]
  reactions: string[]
  skill_techniques: string[]
  spirit_name: string
  spirit_techniques: string[]
  spirit_type: string
  stances: string[]
  styles: string[]
  unarmed_weapons: string[]
  weapons: string[]
  weapon_weight: number
}

declare interface IChartData {
  roll: Array<string>
  damage?: Array<number>
  status: Array<string>
}

declare interface IDisciplineData {
  name: string
  category: string
  flavor: string
  background: string
  role?: string //Unoptional when all categories are updated.
  stances: string[]
  summary: string
  techniques: string[]
}

declare interface IEnhancementData {
  ap: number
  boost?: string
  cost?: string
  desc: string
  effect: string
  from: string
  keywords?: Array<string>
  move?: string
  name: string
  reqs?: string
  special: string
  chart?: IChartData
}

declare interface IGlossaryData {
  name: string
  effect?: string
  see?: string
}

declare interface INpcData {
  ap: number
  armor: string // Name of armor for lookup.
  endurance: number
  desc: string
  name: string
  npc_type: string
  optional_stances?: Array<string>
  optional_techniques?: Array<string>
  role: string
  size: string
  spirit_type: string
  enhancements: Array<string>
  reactions: Array<string>
  stances: Array<string>
  styles: Array<string>
  techniques: Array<string>
  weapons: Array<string>
}

declare interface IObstacleData {
  desc: string
  durability: number
  height: number
  interact: string
  name: string
  keywords: Array<string>
  size: number
  resistances: string
  special: string
  speed: number
  chart: IChartData
}

declare interface IReactionData {
  boost?: string
  cost?: string
  desc: string
  effect: string
  keywords?: Array<string>
  move?: string
  name: string
  reqs?: string
  trigger?: string
  chart?: IChartData
}

declare interface IRefreshData {
  additional?: string
  focus?: number
  grit?: number
  momentum?: number
  reflex?: number
}

declare interface IStanceData {
  name: string
  category: string
  chart: IChartData
  accumulate?: string
  desc: string
  discipline: string
  enhancement?: string
  reaction?: string
  reqs?: string
  refresh: IRefreshData
  effect: string
  special?: string
}

declare interface IStatusData {
  desc: string
  effect: string
  name: string
  remove: string
}

declare interface ITechData {
  ap?: number
  area?: string
  boost?: string
  category: string
  cost?: string
  damagetype?: string
  desc: string
  discipline: string
  effect: string
  enhancement?: string
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
  trigger?: string
  type: string
  chart?: IChartData
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
  keywords: Array<string>
  name: string
  range: string
  reaction?: string
  special?: string
  speed: number
  encumbrance: number
}
