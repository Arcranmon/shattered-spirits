import Templates from "@/database/skill_masteries/templates.json";

import ArmorSkills from "@/database/skill_masteries/armor_skills.json";
import BasicSkills from "@/database/skill_masteries/basic_skills.json";
import MartialSkills from "@/database/skill_masteries/martial_skills.json";
import StratagemSkills from "@/database/skill_masteries/stratagem_skills.json";
import WeaponSkills from "@/database/skill_masteries/weapon_skills.json";

import Earth from "@/database/spirit_masteries/earth.json";
import Flame from "@/database/spirit_masteries/flame.json";
import Metal from "@/database/spirit_masteries/metal.json";
import Water from "@/database/spirit_masteries/water.json";
import Wind from "@/database/spirit_masteries/wind.json";
import Wood from "@/database/spirit_masteries/wood.json";

import Weapons from "@/database/items/weapons.json";
import Armors from "@/database/items/armor.json";

import Glossary from "@/database/glossary/glossary.json";
import Statuses from "@/database/glossary/statuses.json";
import Conditions from "@/database/glossary/conditions.json";
import ElementalConditions from "@/database/glossary/elemental_conditions.json";
import MentalConditions from "@/database/glossary/mental_conditions.json";
import Keywords from "@/database/glossary/keywords.json";
import Obstacles from "@/database/glossary/obstacles.json";
import Terrains from "@/database/glossary/terrain.json";
import Resources from "@/database/glossary/resources.json";

import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import { Discipline, Technique, Armor, Weapon } from "@/class";

@Module({
  name: "databaseJson",
})
export class DatabaseJsonStore extends VuexModule {
  get getWeaponByCategory(): any {
    return (category: string) => {
      return Weapons.filter(
        (x) => x.category.trim() === category.trim() && x.itemtype == "Weapon"
      ).map((x) => Weapon.Deserialize(<IWeaponData>x));
    };
  }

  get getArmorByCategory(): any {
    return (category: string) => {
      return Armors.filter(
        (x) => x.category.trim() === category.trim()
      ).map((x) => Armor.Deserialize(<IArmorData>x));
    };
  }

  get getBasicSkills(): any {
    return () => {
      return BasicSkills.map((x) => Technique.Deserialize(<ITechData>x));
    };
  }

  get getWeaponSkills(): any {
    return () => {
      return WeaponSkills.map((x) =>
        Discipline.Deserialize(<IDisciplineData>x)
      );
    };
  }

  get getArmorSkills(): any {
    return () => {
      return ArmorSkills.map((x) => Discipline.Deserialize(<IDisciplineData>x));
    };
  }

  get getMartialSkills(): any {
    return () => {
      return MartialSkills.map((x) =>
        Discipline.Deserialize(<IDisciplineData>x)
      );
    };
  }

  get getStratagemSkills(): any {
    return () => {
      return StratagemSkills.map((x) =>
        Discipline.Deserialize(<IDisciplineData>x)
      );
    };
  }

  get getTemplateDiscipline(): any {
    return () => {
      return Templates.map((x) => Discipline.Deserialize(<IDisciplineData>x));
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
      return Weapons.filter((x) => x.itemtype == "Spirit Weapon").map((x) =>
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
        this.hasElementalCondition(inword) ||
        this.hasMentalCondition(inword) ||
        this.hasKeyword(inword) ||
        this.hasTerrain(inword) ||
        this.hasObstacle(inword) ||
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

  get hasElementalCondition(): any {
    return (inword: string) => {
      return ElementalConditions.some((x) => x.keyword === inword);
    };
  }

  get hasMentalCondition(): any {
    return (inword: string) => {
      return MentalConditions.some((x) => x.keyword === inword);
    };
  }

  get hasKeyword(): any {
    return (inword: string) => {
      return Keywords.some((x) => x.keyword === inword);
    };
  }

  get hasObstacle(): any {
    return (inword: string) => {
      return Obstacles.some((x) => x.keyword === inword);
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
      if (this.hasElementalCondition(inword))
        return this.getElementalCondition(inword);
      if (this.hasMentalCondition(inword))
        return this.getMentalCondition(inword);
      if (this.hasKeyword(inword)) return this.getKeyword(inword);
      if (this.hasTerrain(inword)) return this.getTerrain(inword);
      if (this.hasObstacle(inword)) return this.getObstacle(inword);
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
      var keyword = Glossary.find((x) => x.keyword.trim() === inword.trim());
      if (keyword.hasOwnProperty("see"))
        return this.getBasicGlossaryItem(keyword.see);
      return keyword.effect;
    };
  }

  get getStatuses(): any {
    return () => {
      return Statuses;
    };
  }

  get getStatus(): any {
    return (inword: string) => {
      var keyword = Statuses.find((x) => x.keyword.trim() === inword.trim());
      if (keyword.hasOwnProperty("see")) return this.getStatus(keyword.see);
      return keyword.effect;
    };
  }

  get getConditions(): any {
    return () => {
      return Conditions;
    };
  }

  get getCondition(): any {
    return (inword: string) => {
      var keyword = Conditions.find((x) => x.keyword.trim() === inword.trim());
      return keyword.effect;
    };
  }

  get getElementalConditions(): any {
    return () => {
      return ElementalConditions;
    };
  }

  get getElementalCondition(): any {
    return (inword: string) => {
      var keyword = ElementalConditions.find(
        (x) => x.keyword.trim() === inword.trim()
      );
      return keyword.effect;
    };
  }

  get getMentalConditions(): any {
    return () => {
      return MentalConditions;
    };
  }

  get getMentalCondition(): any {
    return (inword: string) => {
      var keyword = MentalConditions.find(
        (x) => x.keyword.trim() === inword.trim()
      );
      return keyword.effect;
    };
  }

  get getKeywords(): any {
    return () => {
      return Keywords;
    };
  }

  get getKeyword(): any {
    return (inword: string) => {
      var keyword = Keywords.find((x) => x.keyword.trim() === inword.trim());
      return keyword.effect;
    };
  }

  get getTerrains(): any {
    return () => {
      return Terrains;
    };
  }

  get getTerrain(): any {
    return (inword: string) => {
      var keyword = Terrains.find((x) => x.keyword.trim() === inword.trim());
      return keyword.effect;
    };
  }

  get getObstacles(): any {
    return () => {
      return Obstacles;
    };
  }

  get getObstacle(): any {
    return (inword: string) => {
      var keyword = Obstacles.find((x) => x.keyword.trim() === inword.trim());
      return keyword.effect;
    };
  }

  get getResources(): any {
    return () => {
      return Resources;
    };
  }

  get getResource(): any {
    return (inword: string) => {
      var keyword = Resources.find((x) => x.keyword.trim() === inword.trim());
      return keyword.effect;
    };
  }
}
