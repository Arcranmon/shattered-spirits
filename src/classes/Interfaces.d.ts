declare interface ITechData {
  ap: number;
  area: string;
  cost: string;
  damagetype: string;
  desc: string;
  effect: string;
  keywords: string;
  move: string;
  name: string;
  range: string;
  reqs: string;
  special: string;
  speed: string;
  target: string;
  trigger: string;
  type: string;
  chart: IChartData;
}

declare interface IStanceData {
  name: string;
  accumulate: string;
  desc: string;
  refresh: string;
  effect: string;
  special: string;
}

declare interface IChartData {
  hit: Array<string>;
  damage: Array<number>;
  status: Array<string>;
}

declare interface IDisciplineData {
  category: string;
  name: string;
  flavor: string;
  stances: IStanceData[];
  techniques: ITechData[];
}
