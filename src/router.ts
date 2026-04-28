import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const r = new Router({
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },

  routes: [
    {
      path: '/',
      component: require('@/pages/main-menu/index.vue').default,
      name: 'main-menu',
      meta: {
        title: 'Shattered Spirits',
      },
    },
    { path: '/world', redirect: '/world/the-world-in-brief' },
    {
      path: '/world/:tab',
      component: require('@/pages/world-menu/index.vue').default,
      name: 'world',
      meta: {
        title: 'World',
      },
    },
    { path: '/rules', redirect: '/rules/playing-the-game' },
    {
      path: '/rules/:tab',
      component: require('@/pages/rules-menu/index.vue').default,
      name: 'rules',
      meta: {
        title: 'Rules',
      },
    },
    { path: '/character-options', redirect: '/character-options/basic-skills' },
    {
      path: '/character-options/:tab',
      component: require('@/pages/character-options/index.vue').default,
      name: 'character-options',
      meta: {
        title: 'Character Options',
      },
    },
    {
      path: '/character-creator',
      component: require('@/pages/character-creator/index.vue').default,
      name: 'character-creator',
      meta: {
        title: 'Character Creator',
      },
    },
    {
      path: '/npcs',
      component: require('@/pages/npcs/index.vue').default,
      name: 'npcs',
      meta: {
        title: 'NPCs',
      },
    },
    {
      path: '/character-manager',
      component: require('@/pages/character-manager/index.vue').default,
      name: 'character-manager',
      meta: {
        title: 'Character Manager',
      },
    },
    {
      path: '/npc-manager',
      component: require('@/pages/npc-manager/index.vue').default,
      name: 'npc-manager',
      meta: {
        title: 'NPC Manager',
      },
    },
    {
      path: '/print',
      component: require('@/pages/print/index.vue').default,
      name: 'print',
      meta: {
        title: 'Print',
        hideHeader: true,
        props: true,
      },
    },
  ],
})

export default r
