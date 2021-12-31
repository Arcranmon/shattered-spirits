import Vue from "vue";
import Router from "vue-router";

import MainMenu from "@/pages/main-menu/index.vue";
import SpiritMenu from "@/pages/spirit-menu/index.vue";
import EquipmentMenu from "@/pages/equipment-menu/index.vue";
import Earth from "@/pages/earth/index.vue";
import Flame from "@/pages/flame/index.vue";
import Metal from "@/pages/metal/index.vue";
import Water from "@/pages/water/index.vue";
import Wind from "@/pages/wind/index.vue";
import Wood from "@/pages/wood/index.vue";
import Weapons from "@/pages/weapons/index.vue";
import BasicTechniques from "@/pages/basic-techs/index.vue";
import Rules from "@/pages/rules/index.vue";
import Skills from "@/pages/skills/index.vue";

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
      path: "/basics",
      component: BasicTechniques,
      name: "basic-techniques",
      meta: {
        title: "Basic Techniques",
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
      path: "/rules",
      component: Rules,
      name: "rules",
      meta: {
        title: "Rules",
      },
    },
    {
      path: "/skills",
      component: Skills,
      name: "skills",
      meta: {
        title: "Skills",
      },
    },
  ],
});

export default r;
