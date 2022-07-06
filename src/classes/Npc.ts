import { store } from "@/store";
import Armor from "./Armor";

class Npc {
  private ap_: number;
  private armor_: Armor;
  private desc_: string;
  private name_: string;
  private npc_type_: string;
  private optional_stances_: Array<string>;
  private optional_techniques_: Array<string>;
  private role_: string;
  private size_: string;
  private spirit_type_: string;
  private stances_: Array<string>;
  private styles_: Array<string>;
  private techniques_: Array<string>;
  private weapons_: Array<string>;

  // ==========================================================
  // GETTERS
  // ==========================================================
  public get Ap() {
    return this.ap_;
  }
  public get Armor() {
    return this.armor_;
  }
  public get Desc() {
    return this.desc_;
  }
  public get Name() {
    return this.name_;
  }
  public get NpcType() {
    return this.npc_type_;
  }
  public get OptionalStances() {
    return this.optional_stances_;
  }
  public get OptionalTechniques() {
    return this.optional_techniques_;
  }
  public get Role() {
    return this.role_;
  }
  public get SpiritType() {
    return this.spirit_type_;
  }
  public get Stances() {
    return this.stances_;
  }
  public get Styles() {
    return this.styles_;
  }
  public get Techniques() {
    return this.techniques_;
  }
  public get Weapons() {
    return this.weapons_;
  }

  // ==========================================================
  // FORMATTED GETTERS
  // ==========================================================
  public get ApText() {
    return "**AP:** " + this.ap_;
  }
  public get SizeText() {
    return "**Size:** " + this.size_;
  }

  // ==========================================================
  // SERIALIZATION
  // ==========================================================
  public static Deserialize(discData: INpcData): Npc {
    const t = new Npc();
    t.setNpcData(discData);
    return t;
  }

  public setNpcData(data: INpcData): void {
    this.armor_ = store.getters.getArmor(data.armor);
    this.ap_ = data.ap || 0;
    this.desc_ = data.desc || "";
    this.name_ = data.name || "";
    this.npc_type_ = data.npc_type || "";
    this.optional_stances_ = data.optional_stances || [];
    this.optional_techniques_ = data.optional_techniques || [];
    this.role_ = data.role || "";
    this.size_ = data.size || "";
    this.spirit_type_ = data.spirit_type || "";
    this.stances_ = data.stances || [];
    this.styles_ = data.styles || [];
    this.techniques_ = data.techniques || [];
    this.weapons_ = data.weapons || [];
  }
}
export default Npc;
