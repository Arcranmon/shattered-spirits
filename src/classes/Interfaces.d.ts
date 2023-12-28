declare interface IArmorData {
  weight: number
  category?: string
  durability?: number
  guard: number
  name?: string
  special: string
}

declare interface IAttackData extends IManeuverData {
  category?: string
  chart: IChartData
  class: string
  charged_effect?: string
  speed: number
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
  gear: string[]
  disciplines: ICharDisciplineData[]
  poise: number
  grit: number
  max_health: number
  max_endurance: number
  momentum: number
  name: string
  player_character: Boolean
  reflex: number
  spirit: ISpiritData
  weapons: string[]
  vigor: number
}

declare interface IChartData {
  roll: Array<string>
  damage?: Array<number>
  status: Array<string>
  damage_type: string
  keywords: Array<string>
  on_miss: string
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
  primary_role: string
  secondary_role: string
  summary: string
  tier_1: IDisciplineTierData
  tier_2: IDisciplineTierData
  tier_3: IDisciplineTierData
  type: string
}

declare interface IGearData {
  desc: string
  weight: number
  effect: string
  name?: string
  special: string
}

declare interface IGlossaryData {
  name: string
  effect?: string
  see?: string
}

declare interface INpcData {
  actions: Array<string>
  ap: number
  attacks: Array<string>
  class: string
  desc: string
  durability?: number
  endurance: number
  gambits?: Array<string>
  guard?: number
  movement: string
  name: string
  npc_type: string
  reactions: Array<string>
  role: string
  size: string
  special: string
  stances?: Array<string>
  spirit_type: string
  stunts: Array<string>
  traits?: Array<string>
  techniques: Array<string>
  weapons: Array<string>
}

declare interface IAbilityData {
  area?: string
  boost?: string
  cost?: string
  desc: string
  effect: string
  keywords?: Array<string>
  move?: string
  name: string
  range?: Array<IRangeData>
  reqs?: string
  special?: string
  chart?: IChartData
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
  target?: string
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

declare interface IObstacleData {
  damage_type: string
  destroy: string
  desc: string
  forced_movement: string
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

declare interface IRangeData {
  category: string
  value: number
  special: string
}

declare interface ISpiritData {
  name: string
  spirit_form: string
  spirit_type: string
  weapons: Array<string>
  poise: number
  grit: number
  reflex: number
  vigor: number
  current_health: number
}

declare interface ISpiritFormData {
  name: string
  desc: string
  size: string
  health: number
  weapons: string
  bonus_attack: string
  guard: number
  durability: number
  movement: string
  traits: string[]
}

declare interface ISpiritTypeData {
  name: string
  desc: string
  effect: string
  summon_effect: string
  manifest_effect: string
  traits: string[]
}

declare interface IStanceData {
  name: string
  category: string
  chart: IChartData
  respite?: string
  desc: string
  maneuver?: string
  reaction?: string
  reqs?: string
  effect: string
  special?: string
  stamina?: number
  traits: string[]
}

declare interface IStatusData {
  desc: string
  effect: string
  name: string
  negate: string
  recover: string
  remove: string
  see?: string
  special?: string
  reacts?: Array<string>
  type?: string
}

declare interface ITerrainData {
  desc: string
  effect: string
  name: string
  keywords: Array<string>
  negate: string
  overrides: Array<string>
  remove: string
}

declare interface ITraitData {
  desc: string
  effect: string
  name: string
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
