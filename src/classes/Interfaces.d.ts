declare interface ITechData {
  ap?: number;
  area?: string;
  boost?: string;
  cost?: string;
  damagetype?: string;
  desc: string;
  effect: string;
  imbue?: string;
  keywords?: Array<string>;
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
  accumulate: string;
  desc: string;
  refresh: string;
  effect: string;
  special?: string;
}

declare interface IChartData {
  hit: Array<string>;
  damage: Array<number>;
  status: Array<string>;
}

declare interface IDisciplineData {
  name: string;
  flavor: string;
  background: string;
  role?: string; //Unoptional when all categories are updated.
  stances: IStanceData[];
  techniques: ITechData[];
}

declare interface IWeaponData {
  category: string;
  chart: IChartData;
  damagetype: string;
  durability: number;
  itemtype: string;
  hands: number;
  keywords: Array<string>;
  name: string;
  range: string;
  special: string;
  speed: number;
}

declare interface IArmorData {
  armor: number;
  category: string;
  dash: number;
  durability: number;
  endurance: number;
  name: string;
  reposition: number;
  shift: number;
  special?: string;
  sprint: number;
  step: number;
}

declare interface IGlossaryData {
  effect: string;
}
