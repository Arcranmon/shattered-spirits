import { store } from "@/store";

class Chart {
  private roll_: Array<string>;
  private damage_: Array<number>;
  private status_: Array<string>;

  public constructor() {
    this.roll_ = [];
    this.damage_ = [];
    this.status_ = [];
  }

  public Damage(i: number): string {
    if (this.damage_[i] == 0) return "-";
    return this.damage_[i].toString();
  }
  public get Roll() {
    return this.roll_;
  }
  public Status(i: number): string {
    return this.status_[i];
  }

  public get HasDamage() {
    return this.damage_.length > 0;
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(techData: IChartData): Chart {
    const t = new Chart();
    t.setChartData(techData);
    return t;
  }

  public setChartData(data: IChartData): void {
    this.roll_ = data.roll || [];
    this.damage_ = data.damage || [];
    this.status_ = data.status || [];
  }
}
export default Chart;
