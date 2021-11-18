import Skills from "@/database/skills.json";
import Items from "@/database/items.json";
import Glossary from "@/database/glossary.json";
import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { Discipline, Technique, Weapon } from "@/class";

@Module({
  name: "databaseJson",
})
export class DatabaseJsonStore extends VuexModule {
  get byDisciplineCategory(): any {
    return (category: string) => {
      return Skills.filter(
        (x) => x.category.trim() === category.trim()
      ).map((x) => Discipline.Deserialize(<IDisciplineData>x));
    };
  }

  get getWeaponByCategory(): any {
    return (category: string) => {
      return Items.filter(
        (x) => x.category.trim() === category.trim() && x.itemtype == "Weapon"
      ).map((x) => Weapon.Deserialize(<IWeaponData>x));
    };
  }

  get hasGlossaryItem(): any {
    return (inword: string) => {
      return Glossary.some((x) => x.keyword === inword);
    };
  }

  get getGlossaryItem(): any {
    return (inword: string) => {
      return Glossary.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }
}
