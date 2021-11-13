import Vue from "vue";
import Router from "vue-router";

import MainMenu from "@/pages/main_menu/index.vue";
import SpiritMenu from "@/pages/spirit_menu/index.vue";
import Earth from "@/pages/earth/index.vue";
import BasicTechniques from "@/pages/basic_techs/index.vue";

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
      path: "/earth",
      component: Earth,
      name: "earth",
      meta: {
        title: "Earth",
      },
    },
  ],
});

export default r;
