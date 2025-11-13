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
      path: '/equipment',
      component: require('@/pages/equipment/equipment-menu/index.vue').default,
      name: 'equipment-menu',
      meta: {
        title: 'Equipment',
      },
    },
    {
      path: '/armor',
      component: require('@/pages/equipment/armor/index.vue').default,
      name: 'armor',
      meta: {
        title: 'Armor',
      },
    },
    {
      path: '/glossary',
      component: require('@/pages/glossary/index.vue').default,
      name: 'glossary',
      meta: {
        title: 'Glossary',
      },
    },
    {
      path: '/weapons',
      component: require('@/pages/equipment/weapons/index.vue').default,
      name: 'weapons',
      meta: {
        title: 'Weapons',
      },
    },
    {
      path: '/Consumables',
      component: require('@/pages/equipment/consumables/index.vue').default,
      name: 'Consumables',
      meta: {
        title: 'Consumables',
      },
    },
    {
      path: '/combat-rules',
      component: require('@/pages/combat/combat-rules/index.vue').default,
      name: 'combat-rules',
      meta: {
        title: 'Combat',
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
      path: '/afflictions-and-status',
      component: require('@/pages/combat/afflictions-and-status/index.vue').default,
      name: 'afflictions-and-status',
      meta: {
        title: 'Afflictions and Status',
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
      path: '/terrain',
      component: require('@/pages/combat/terrain/index.vue').default,
      name: 'terrain',
      meta: {
        title: 'Terrain',
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
      path: '/spirit-arts',
      component: require('@/pages/spirit-arts/index.vue').default,
      name: 'spirit-arts',
      meta: {
        title: 'Spirit Arts',
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
      path: '/spirit-abilities',
      component: require('@/pages/spirit-abilities/index.vue').default,
      name: 'spirit-abilities',
      meta: {
        title: 'Spirit Abilities',
      },
    },
    {
      path: '/basic-stances',
      component: require('@/pages/basic-stances/index.vue').default,
      name: 'basic-stances',
      meta: {
        title: 'Basic Stances',
      },
    },
    {
      path: '/basic-skills',
      component: require('@/pages/basic-skills/index.vue').default,
      name: 'basic-skills',
      meta: {
        title: 'Basic Skills',
      },
    },
    {
      path: '/talents',
      component: require('@/pages/talents/index.vue').default,
      name: 'talents',
      meta: {
        title: 'Talents',
      },
    },
    {
      path: '/archetypes',
      component: require('@/pages/archetypes/index.vue').default,
      name: 'archetypes',
      meta: {
        title: 'Archetypes',
      },
    },
    {
      path: '/world',
      component: require('@/pages/world/index.vue').default,
      name: 'world',
      meta: {
        title: 'The World',
      },
    },
    {
      path: '/civilization',
      component: require('@/pages/civilization/index.vue').default,
      name: 'civilization',
      meta: {
        title: 'Civilization in the Shattered World',
      },
    },
    {
      path: '/sample-characters',
      component: require('@/pages/sample-characters/index.vue').default,
      name: 'Sample Characters',
      meta: {
        title: 'Sample Characters',
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
