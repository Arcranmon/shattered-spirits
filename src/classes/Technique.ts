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
  public get BoostArray() {
    return this.KeywordParsedArray(this._boost, "**Boost:** ");
  }
  public get HasChart() {
    return this.Chart != null;
  }
  public get HasCost() {
    return this._cost.length > 0;
  }
  public get CostText() {
    return "**Cost:** " + this._cost;
  }
  public get HasEffect() {
    return this._effect.length > 0;
  }
  public get EffectArray() {
    return this.KeywordParsedArray(this._effect, "**Effect:** ");
  }
  public get HasKeywords() {
    return this._keywords.length > 0;
  }
  public get HasMove() {
    return this._move.length > 0;
  }
  public get MoveText() {
    return "**Movement:** " + this._move;
  }
  public get HasRange() {
    return this.Range != "";
  }
  public get HasReqs() {
    return this._reqs.length > 0;
  }
  public get ReqArray() {
    return this.KeywordParsedArray(this._reqs, "**Requirements:** ");
  }
  public get HasSpecial() {
    return this._special.length > 0;
  }
  public get SpecialArray() {
    return this.KeywordParsedArray(this._special, "**Special:** ");
  }
  public get HasTarget() {
    return this._target.length > 0;
  }
  public get TargetArray() {
    return this.KeywordParsedArray(this._target, "**Target:** ");
  }
  public get HasTrigger() {
    return this._trigger.length > 0;
  }
  public get TriggerArray() {
    return this.KeywordParsedArray(this._trigger, "**Trigger:** ");
  }

  public get SpeedHeader() {
    if (this.Speed.includes("Weapon"))
      return "Weapon Speed" + this.Speed.substring(6);
    if (this.Speed.length == 1) return "Speed " + this.Speed;
    else return this._speed;
  }
  public get RangeHeader() {
    if (this.Range.includes("Weapon")) return "Weapon Range";
    else if (this.Range.length == 1) return "Range " + this._range;
    else return this._range;
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
