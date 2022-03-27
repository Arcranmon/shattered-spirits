/** @format */

import { store } from "@/store";
import { Chart } from "@/class";

class Technique {
  private _ap: number;
  private _area: string;
  private _boost: string;
  private _cost: string;
  private _damagetype: string;
  private _desc: string;
  private _effect: string;
  private _imbue: string;
  private _keywords: Array<string>;
  private _move: string;
  private _name: string;
  private _range: string;
  private _reqs: string;
  private _special: string;
  private _speed: string;
  private _target: string;
  private _trigger: string;
  private _type: string;
  private _chart: Chart;

  public constructor() {
    this._ap = 4;
    this._area = "";
    this._boost = "";
    this._cost = "";
    this._damagetype = "";
    this._desc = "";
    this._effect = "";
    this._imbue = "";
    this._keywords = [];
    this._move = "";
    this._name = "";
    this._range = "";
    this._reqs = "";
    this._special = "";
    this._speed = "";
    this._target = "";
    this._trigger = "";
    this._type = "";
    this._chart = null;
  }

  public get AP() {
    return this._ap;
  }
  public get Area() {
    return this._area;
  }
  public get Attack() {
    return this._type == "Attack";
  }
  public get Chart() {
    return this._chart;
  }
  public get Cost() {
    return this._cost;
  }
  public get Desc() {
    return this._desc;
  }
  public get DamageType() {
    return this._damagetype;
  }
  public get Effect() {
    return this._effect;
  }
  public get Keywords() {
    return this._keywords;
  }
  public get Name() {
    return this._name;
  }
  public get Move() {
    return this._move;
  }
  public get Range() {
    return this._range;
  }
  public get Reqs() {
    return this._reqs;
  }
  public get Special() {
    return this._special;
  }
  public get Speed() {
    return this._speed;
  }
  public get Trigger() {
    return this._trigger;
  }
  public get Type() {
    return this._type;
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasArea() {
    return this.Area != "";
  }
  public get HasBoost() {
    return this._boost.length > 0;
  }
  public get BoostHeader() {
    return "**Boost:** " + this._boost;
  }
  public get HasChart() {
    return this.Chart != null;
  }
  public get HasCost() {
    return this._cost.length > 0;
  }
  public get CostHeader() {
    return "**Cost:** " + this._cost;
  }
  public get HasEffect() {
    return this._effect.length > 0;
  }
  public get EffectHeader() {
    return "**Effect:** " + this._effect;
  }
  public get HasImbue() {
    return this._imbue.length > 0;
  }
  public get ImbueHeader() {
    return "**Imbue:** " + this._imbue;
  }
  public get HasKeywords() {
    return this._keywords.length > 0;
  }
  public get KeywordsHeader() {
    return "_" + this.Keywords.join("_, _") + "_";
  }
  public get HasMove() {
    return this._move.length > 0;
  }
  public get MoveHeader() {
    return "**Move:** " + this.Move;
  }
  public get HasRange() {
    return this.Range != "";
  }
  public get HasReqs() {
    return this._reqs.length > 0;
  }
  public get RangeHeader() {
    if (this.Range.includes("Weapon")) return "Weapon Range";
    else if (this.Range.length <= 2) return "Range " + this._range;
    else return this._range;
  }
  public get ReqsHeader() {
    return "**Requirements:** " + this._reqs;
  }
  public get HasSpecial() {
    return this._special.length > 0;
  }
  public get SpecialHeader() {
    return "**Special:** " + this._special;
  }
  public get SpeedHeader() {
    if (this.Speed.length == 1) return "Speed " + this.Speed;
    else return this._speed;
  }
  public get HasTarget() {
    return this._target.length > 0;
  }
  public get TargetHeader() {
    return "**Target:** " + this._target;
  }
  public get HasTrigger() {
    return this._trigger.length > 0;
  }
  public get TriggerHeader() {
    return "**Trigger:** " + this._trigger;
  }

  // In the database, all keywords in effect text and the like should be underlined, giving us an easy character to search for.
  public KeywordParsedArray(input: string, header: string) {
    return (header + input).split("_");
  }

  public static Deserialize(techData: ITechData): Technique {
    const t = new Technique();
    t.setTechData(techData);
    return t;
  }

  public setTechData(data: ITechData): void {
    this._ap = data.ap || 4;
    this._area = data.area || "";
    this._boost = data.boost || "";
    this._cost = data.cost || "";
    this._damagetype = data.damagetype || "";
    this._desc = data.desc || "";
    this._effect = data.effect || "";
    this._imbue = data.imbue || "";
    this._keywords = data.keywords || [];
    this._move = data.move || "";
    this._name = data.name || "";
    this._range = data.range || "";
    this._reqs = data.reqs || "";
    this._special = data.special || "";
    this._speed = data.speed || "";
    this._trigger = data.trigger || "";
    this._target = data.target || "";
    this._type = data.type || "";
    if ("chart" in data) {
      this._chart = Chart.Deserialize(data.chart);
    }
  }
}
export default Technique;
