import Vue from "vue";
import Router from "vue-router";

import MainMenu from "@/pages/main-menu/index.vue";

import CombatMenu from "@/pages/combat/combat-menu/index.vue";
import CombatBasics from "@/pages/combat/combat-basics/index.vue";
import ConditionsAndStatus from "@/pages/combat/conditions_and_status/index.vue";
import ReadingDisciplines from "@/pages/combat/reading_disciplines/index.vue";
import TerrainAndObstacles from "@/pages/combat/terrain_and_obstacles/index.vue";

import CharacterCreation from "@/pages/character-creation/index.vue";
import CharacterCreator from "@/pages/character-creator/index.vue";

import SpiritMenu from "@/pages/spirits/spirit-menu/index.vue";
import Earth from "@/pages/spirits/earth/index.vue";
import Flame from "@/pages/spirits/flame/index.vue";
import Metal from "@/pages/spirits/metal/index.vue";
import Water from "@/pages/spirits/water/index.vue";
import Wind from "@/pages/spirits/wind/index.vue";
import Wood from "@/pages/spirits/wood/index.vue";

import EquipmentMenu from "@/pages/equipment/equipment-menu/index.vue";
import Armor from "@/pages/equipment/armor/index.vue";
import Weapons from "@/pages/equipment/weapons/index.vue";
import Disciplines from "@/pages/disciplines/index.vue";

import SkillsMenu from "@/pages/skills/skills-menu/index.vue";
import BasicSkills from "@/pages/skills/basic-skills/index.vue";
import ArmorSkills from "@/pages/skills/armor-skills/index.vue";
import MartialSkills from "@/pages/skills/martial-skills/index.vue";
import StratagemSkills from "@/pages/skills/stratagem-skills/index.vue";
import WeaponSkills from "@/pages/skills/weapon-skills/index.vue";

import Npcs from "@/pages/npcs/index.vue";

import Characters from "@/pages/character-manager/index.vue";

import World from "@/pages/world/index.vue";

Vue.use(Router);

const r = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  },
  routes: [
    {
      path: "/",
      component: MainMenu,
      name: "main-menu",
      meta: {
        title: "Shattered Spirits",
      },
    },
    {
      path: "/character-creation",
      component: CharacterCreation,
      name: "character-creation",
      meta: {
        title: "Character Creation",
      },
    },
    {
      path: "/character-creator",
      component: CharacterCreator,
      name: "character-creator",
      meta: {
        title: "Character Creator",
      },
    },
    {
      path: "/spirits",
      component: SpiritMenu,
      name: "spirit-menu",
      meta: {
        title: "Spirits",
      },
    },
    {
      path: "/equipment",
      component: EquipmentMenu,
      name: "equipment-menu",
      meta: {
        title: "Equipment",
      },
    },
    {
      path: "/armor",
      component: Armor,
      name: "armor",
      meta: {
        title: "Armor",
      },
    },
    {
      path: "/weapons",
      component: Weapons,
      name: "weapons",
      meta: {
        title: "Weapons",
      },
    },
    {
      path: "/earth",
      component: Earth,
      name: "earth",
      meta: {
        title: "Earth",
      },
    },
    {
      path: "/flame",
      component: Flame,
      name: "flame",
      meta: {
        title: "Flame",
      },
    },
    {
      path: "/metal",
      component: Metal,
      name: "metal",
      meta: {
        title: "Metal",
      },
    },
    {
      path: "/water",
      component: Water,
      name: "water",
      meta: {
        title: "Water",
      },
    },
    {
      path: "/wind",
      component: Wind,
      name: "wind",
      meta: {
        title: "Wind",
      },
    },
    {
      path: "/wood",
      component: Wood,
      name: "wood",
      meta: {
        title: "Wood",
      },
    },
    {
      path: "/combat",
      component: CombatMenu,
      name: "combat",
      meta: {
        title: "Combat",
      },
    },
    {
      path: "/combat-basics",
      component: CombatBasics,
      name: "combat-basics",
      meta: {
        title: "Combat Basics",
      },
    },
    {
      path: "/conditions-and-status",
      component: ConditionsAndStatus,
      name: "conditions-and-status",
      meta: {
        title: "Conditions and Status",
      },
    },
    {
      path: "/reading-disciplines",
      component: ReadingDisciplines,
      name: "reading-disciplines",
      meta: {
        title: "Reading Disciplines",
      },
    },
    {
      path: "/terrain-and-obstacles",
      component: TerrainAndObstacles,
      name: "terrain-and-obstacles",
      meta: {
        title: "Terrain and Obstacles",
      },
    },
    {
      path: "/skills",
      component: SkillsMenu,
      name: "skills",
      meta: {
        title: "Skills",
      },
    },
    {
      path: "/basic-skills",
      component: BasicSkills,
      name: "basic-skills",
      meta: {
        title: "Basic Skills",
      },
    },
    {
      path: "/armor-skills",
      component: ArmorSkills,
      name: "armor-skills",
      meta: {
        title: "Armor Skills",
      },
    },
    {
      path: "/martial-skills",
      component: MartialSkills,
      name: "martial-skills",
      meta: {
        title: "Martial Skills",
      },
    },
    {
      path: "/stratagem-skills",
      component: StratagemSkills,
      name: "stratagem-skills",
      meta: {
        title: "Stratagem Skills",
      },
    },
    {
      path: "/weapon-skills",
      component: WeaponSkills,
      name: "weapon-skills",
      meta: {
        title: "Weapon Skills",
      },
    },
    {
      path: "/world",
      component: World,
      name: "world",
      meta: {
        title: "The World",
      },
    },
    {
      path: "/npcs",
      component: Npcs,
      name: "npcs",
      meta: {
        title: "NPCs",
      },
    },
    {
      path: "/characters",
      component: Characters,
      name: "characters",
      meta: {
        title: "Characters",
      },
    },
    {
      path: "/disciplines",
      component: Disciplines,
      name: "disciplines",
      meta: {
        title: "Disciplines",
      },
    },
  ],
});

export default r;
