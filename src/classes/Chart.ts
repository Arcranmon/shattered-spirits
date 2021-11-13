import { store } from "@/store";

class Chart {
  private _hit: Array<string>;
  private _damage: Array<number>;
  private _status: Array<string>;

  public constructor() {
    this._hit = [];
    this._damage = [];
    this._status = [];
  }

  public Damage(i: number): string {
    if (this._damage[i] == 0) return "-";
    return this._damage[i].toString();
  }
  public get Hit() {
    return this._hit;
  }
  public Status(i: number): string {
    if (this._status[i] == "") return "-";
    return this._status[i];
  }

  public get HasDamage() {
    return this._damage.length > 0;
  }

  public static Deserialize(techData: IChartData): Chart {
    const t = new Chart();
    t.setChartData(techData);
    return t;
  }

  public setChartData(data: IChartData): void {
    this._hit = data.hit || [];
    this._damage = data.damage || [];
    this._status = data.status || [];
  }
}
export default Chart;
