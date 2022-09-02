declare interface ITechData {
  ap?: number;
  area?: string;
  boost?: string;
  category: string;
  cost?: string;
  damagetype?: string;
  desc: string;
  discipline: string;
  effect: string;
  imbue?: string;
  keywords?: Array<string>;
  linked?: string;
  move?: string;
  name: string;
  range?: string;
  reqs?: string;
  special?: string;
  speed: string;
  target?: string;
  trigger?: string;
  type: string;
  chart?: IChartData;
}

declare interface IStanceData {
  name: string;
  category: string;
  accumulate?: string;
  desc: string;
  discipline: string;
  refresh: IRefreshData;
  effect: string;
  special?: string;
}

declare interface IChartData {
  roll: Array<string>;
  damage?: Array<number>;
  status: Array<string>;
}

declare interface IDisciplineData {
  name: string;
  category: string;
  flavor: string;
  background: string;
  role?: string; //Unoptional when all categories are updated.
  stances: string[];
  techniques: string[];
}

declare interface IWeaponData {
  category: string;
  chart: IChartData;
  damagetype: string;
  desc?: string;
  durability?: number;
  itemtype?: string;
  hands: number;
  keywords: Array<string>;
  name: string;
  range: string;
  special?: string;
  speed: number;
}

declare interface IArmorData {
  armor: number;
  category?: string;
  durability?: number;
  endurance: number;
  jump: number;
  name?: string;
  reposition: number;
  shift: number;
  special?: string;
  sprint: number;
  step: number;
}

declare interface INpcData {
  ap: number;
  armor: string; // Name of armor for lookup.
  desc: string;
  name: string;
  npc_type: string;
  optional_stances?: Array<string>;
  optional_techniques?: Array<string>;
  role: string;
  size: string;
  spirit_type: string;
  stances: Array<string>;
  styles: Array<string>;
  techniques: Array<string>;
  weapons: Array<string>;
}

declare interface IRefreshData {
  additional?: string;
  focus?: number;
  grit?: number;
  momentum?: number;
  reflex?: number;
}

declare interface IGlossaryData {
  keyword: string;
  effect?: string;
  see?: string;
}

declare interface ICharacterData {
  current_stance: string;
  current_style: string;
  current_endurance: number;
  equipped_armor: string;
  focus: number;
  grit: number;
  current_health: number;
  main_hand: string;
  martial: number;
  max_health: number;
  momentum: number;
  name: string;
  off_hand: string;
  player_character: Boolean;
  reflex: number;
  skill_techniques: string[];
  spirit_name: string;
  spirit_techniques: string[];
  spirit_type: string;
  stances: string[];
  styles: string[];
  unarmed_weapons: string[];
  weapons: string[];
}
