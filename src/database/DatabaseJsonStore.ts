import Skills from "@/database/skill_masteries/skills.json";
import BasicSkills from "@/database/skill_masteries/basic_skills.json";

import Earth from "@/database/spirit_masteries/earth.json";
import Flame from "@/database/spirit_masteries/flame.json";
import Metal from "@/database/spirit_masteries/metal.json";
import Water from "@/database/spirit_masteries/water.json";
import Wind from "@/database/spirit_masteries/wind.json";
import Wood from "@/database/spirit_masteries/wood.json";

import Items from "@/database/items/weapons.json";

import Glossary from "@/database/glossary/glossary.json";
import Statuses from "@/database/glossary/statuses.json";
import Conditions from "@/database/glossary/conditions.json";
import Keywords from "@/database/glossary/keywords.json";
import Terrains from "@/database/glossary/terrain.json";
import Resources from "@/database/glossary/resources.json";

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

  get getBasicSkills(): any {
    return () => {
      return BasicSkills.map((x) => Technique.Deserialize(<ITechData>x));
    };
  }

  get getSpiritMasteryByType(): any {
    return (type: string) => {
      if (type == "Earth")
        return Earth.map((x) => Discipline.Deserialize(<IDisciplineData>x));
      if (type == "Flame")
        return Flame.map((x) => Discipline.Deserialize(<IDisciplineData>x));
      if (type == "Metal")
        return Metal.map((x) => Discipline.Deserialize(<IDisciplineData>x));
      if (type == "Water")
        return Water.map((x) => Discipline.Deserialize(<IDisciplineData>x));
      if (type == "Wind")
        return Wind.map((x) => Discipline.Deserialize(<IDisciplineData>x));
      if (type == "Wood")
        return Wood.map((x) => Discipline.Deserialize(<IDisciplineData>x));
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
        this.hasTerrain(inword) ||
        this.hasResource(inword)
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

  get hasResource(): any {
    return (inword: string) => {
      return Resources.some((x) => x.keyword === inword);
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
      if (this.hasResource(inword)) return this.getResource(inword);
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

  get getResources(): any {
    return () => {
      return Resources;
    };
  }

  get getResource(): any {
    return (inword: string) => {
      return Resources.find((x) => x.keyword.trim() === inword.trim()).effect;
    };
  }
}
