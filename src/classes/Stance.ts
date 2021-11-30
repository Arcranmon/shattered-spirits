import { store } from "@/store";

class Stance {
  private _accumulate: string;
  private _desc: string;
  private _effect: string;
  private _refresh: string;
  private _name: string;
  private _special: string;

  public constructor() {
    this._accumulate = "";
    this._desc = "";
    this._effect = "";
    this._refresh = "";
    this._name = "";
    this._special = "";
  }

  public get Desc() {
    return this._desc;
  }
  public get Name() {
    return this._name;
  }

  // ==========================================================
  // UTILITY
  // ==========================================================
  public get HasAccumulate() {
    return this._accumulate.length > 0;
  }
  public get AccumulateArray() {
    return this.KeywordParsedArray(this._accumulate, "**Accumulate:** ");
  }
  public get HasEffect() {
    return this._effect.length > 0;
  }
  public get EffectArray() {
    return this.KeywordParsedArray(this._effect, "**Effect:** ");
  }
  public get HasRefresh() {
    return this._refresh.length > 0;
  }
  public get RefreshArray() {
    return this.KeywordParsedArray(this._refresh, "**Refresh:** ");
  }
  public get HasSpecial() {
    return this._special.length > 0;
  }
  public get SpecialArray() {
    return this.KeywordParsedArray(this._special, "**Special:** ");
  }

  // In the database, all keywords in effect text and the like should be underlined, giving us an easy character to search for.
  public KeywordParsedArray(input: string, header: string) {
    return (header + input).split("_");
  }

  public static Deserialize(stanceData: IStanceData): Stance {
    const t = new Stance();
    t.setStanceData(stanceData);
    return t;
  }

  public setStanceData(data: IStanceData): void {
    this._accumulate = data.accumulate || "";
    this._desc = data.desc || "";
    this._effect = data.effect || "";
    this._refresh = data.refresh || "";
    this._name = data.name || "";
    this._special = data.special || "";
  }
}
export default Stance;
