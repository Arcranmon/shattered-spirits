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
    {
      path: '/world-menu',
      component: require('@/pages/world-menu/index.vue').default,
      name: 'world-menu',
      meta: {
        title: 'World',
      },
    },
    {
      path: '/rules-menu',
      component: require('@/pages/rules-menu/index.vue').default,
      name: 'rules-menu',
      meta: {
        title: 'Rules',
      },
    },
    {
      path: '/character-options',
      component: require('@/pages/character-options/index.vue').default,
      name: 'character-options',
      meta: {
        title: 'Character Options',
      },
    },
    {
      path: '/character-creation',
      component: require('@/pages/character-creation/index.vue').default,
      name: 'character-creation',
      meta: {
        title: 'Character Creation',
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
      path: '/combat-primer',
      component: require('@/pages/combat/combat-primer/index.vue').default,
      name: 'combat-primer',
      meta: {
        title: 'Combat Primer',
      },
    },
    {
      path: '/reading-abilities',
      component: require('@/pages/combat/reading-abilities/index.vue').default,
      name: 'reading-abilities',
      meta: {
        title: 'Reading Abilities',
      },
    },
    {
      path: '/features',
      component: require('@/pages/combat/features/index.vue').default,
      name: 'features',
      meta: {
        title: 'Features',
      },
    },
    {
      path: '/martial-disciplines',
      component: require('@/pages/martial-disciplines/index.vue').default,
      name: 'martial-disciplines',
      meta: {
        title: 'Martial Disciplines',
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
      path: '/narrative',
      component: require('@/pages/narrative/index.vue').default,
      name: 'narrative',
      meta: {
        title: 'Narrative',
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
  ],
})

export default r
