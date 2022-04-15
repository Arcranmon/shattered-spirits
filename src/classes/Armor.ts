import { store } from "@/store";

class Armor {
  private _armor: number;
  private _category: string;
  private _durability: number;
  private _endurance: number;
  private _name: string;
  private _reposition: number;
  private _shift: number;
  private _special: string;
  private _sprint: number;
  private _step: number;

  public constructor() {
    this._name = "";
    this._special = "";
  }

  get Armor() {
    return this._armor;
  }
  get ArmorText() {
    return "**Guard:** " + this._armor;
  }
  get Category() {
    return this._category;
  }
  get Durability() {
    return this._durability;
  }
  get DurabilityHeader() {
    if (this._durability != 0) return ", Durability " + this._durability;
  }
  get EnduranceText() {
    return "**Endurance:** " + this._endurance;
  }
  get Name() {
    return this._name;
  }
  get Reposition() {
    return this._reposition;
  }
  get Shift() {
    return this._shift;
  }
  get SpecialArray() {
    return this.KeywordParsedArray(this._special, "**Special:** ");
  }
  get HasSpecial() {
    return this._special != "";
  }
  get Sprint() {
    return this._sprint;
  }
  get Step() {
    return this._step;
  }

  // In the database, all keywords in effect text and the like should be underlined, giving us an easy character to search for.
  public KeywordParsedArray(input: string, header: string) {
    return (header + input).split("_");
  }

  public static Deserialize(armorData: IArmorData): Armor {
    const t = new Armor();
    t.setArmorData(armorData);
    return t;
  }

  public setArmorData(data: IArmorData): void {
    this._armor = data.armor || 0;
    this._category = data.category || "";
    this._durability = data.durability || 0;
    this._endurance = data.endurance || 0;
    this._name = data.name || "";
    this._reposition = data.reposition || 0;
    this._shift = data.shift || 0;
    this._special = data.special || "";
    this._sprint = data.sprint || 0;
    this._step = data.step || 0;
  }
}
export default Armor;
