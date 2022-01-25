import { store } from "@/store";
import { Technique } from "@/class";
import { Stance } from "@/class";

class Discipline {
  private _name: string;
  private _flavor: string;
  private _background: string;
  private _stances: Array<Stance>;
  private _techniques: Array<Technique>;

  public constructor() {
    this._background = "white";
    this._name = "";
    this._flavor = "";
    this._stances = [];
    this._techniques = [];
  }

  public get Background() {
    return this._background;
  }
  public get Flavor() {
    return this._flavor;
  }
  public get Name() {
    return this._name;
  }
  public get Techniques() {
    return this._techniques;
  }
  public get Stances() {
    return this._stances;
  }

  public static Deserialize(discData: IDisciplineData): Discipline {
    const t = new Discipline();
    t.setDisciplineData(discData);
    return t;
  }

  public setDisciplineData(data: IDisciplineData): void {
    this._background = data.background || "white";
    this._name = data.name || "";
    this._flavor = data.flavor || "";
    this._stances = [];
    this._techniques = [];
    if ("techniques" in data) {
      this._techniques = data.techniques.map((x) =>
        Technique.Deserialize(<ITechData>x)
      );
    }
    if ("stances" in data) {
      this._stances = data.stances.map((x) =>
        Stance.Deserialize(<IStanceData>x)
      );
    }
  }
}
export default Discipline;
