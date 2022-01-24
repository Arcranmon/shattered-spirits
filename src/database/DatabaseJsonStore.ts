import Skills from "@/database/skills.json";
import Items from "@/database/items.json";
import Glossary from "@/database/glossary.json";
import Statuses from "@/database/statuses.json";
import Conditions from "@/database/conditions.json";
import Keywords from "@/database/keywords.json";
import Terrains from "@/database/terrain.json";
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

  get getSpiritWeapons(): any {
    return () => {
      return Items.filter((x) => x.itemtype == "Spirit Weapon").map((x) =>
        Weapon.Deserialize(<IWeaponData>x)
      );
    };
  }

  get existsInAnyGlossary(): any {
    return (inword: string) => {
      return (
        this.hasBasicGlossaryItem(inword) ||
        this.hasStatus(inword) ||
        this.hasCondition(inword) ||
        this.hasKeyword(inword) ||
        this.hasTerrain(inword)
      );
    };
  }

  get hasBasicGlossaryItem(): any {
    return (inword: string) => {
      return Glossary.some((x) => x.keyword === inword);
    };
  }

  get hasStatus(): any {
    return (inword: string) => {
      return Statuses.some((x) => x.keyword === inword);
    };
  }

  get hasCondition(): any {
    return (inword: string) => {
      return Conditions.some((x) => x.keyword === inword);
    };
  }

  get hasKeyword(): any {
    return (inword: string) => {
      return Keywords.some((x) => x.keyword === inword);
    };
  }

  get hasTerrain(): any {
    return (inword: string) => {
      return Terrains.some((x) => x.keyword === inword);
    };
  }

  get getGlossaryItem(): any {
    return (inword: string) => {
      if (this.hasBasicGlossaryItem(inword))
        return this.getBasicGlossaryItem(inword);
      if (this.hasStatus(inword)) return this.getStatus(inword);
      if (this.hasCondition(inword)) return this.getCondition(inword);
      if (this.hasKeyword(inword)) return this.getKeyword(inword);
      if (this.hasTerrain(inword)) return this.getTerrain(inword);
    };
  }

  get getBasicGlossary(): any {
    return () => {
      return Glossary;
    };
  }

  get getBasicGlossaryItem(): any {
    return (inword: string) => {
      return Glossary.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }

  get getStatuses(): any {
    return () => {
      return Statuses;
    };
  }

  get getStatus(): any {
    return (inword: string) => {
      return Statuses.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }

  get getConditions(): any {
    return () => {
      return Conditions;
    };
  }

  get getCondition(): any {
    return (inword: string) => {
      return Conditions.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }

  get getKeywords(): any {
    return () => {
      return Keywords;
    };
  }

  get getKeyword(): any {
    return (inword: string) => {
      return Keywords.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }

  get getTerrains(): any {
    return () => {
      return Terrains;
    };
  }

  get getTerrain(): any {
    return (inword: string) => {
      return Terrains.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }
}
