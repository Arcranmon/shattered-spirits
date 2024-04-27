import Vue from 'vue'
import Router from 'vue-router'

import MainMenu from '@/pages/main-menu/index.vue'
import CharacterOptions from '@/pages/character-options/index.vue'

import CombatMenu from '@/pages/combat/combat-menu/index.vue'
import CombatRules from '@/pages/combat/combat-rules/index.vue'
import CombatPrimer from '@/pages/combat/combat-primer/index.vue'
import AfflictionsAndStatus from '@/pages/combat/afflictions-and-status/index.vue'
import EquipmentInCombat from '@/pages/combat/equipment-in-combat/index.vue'
import ReadingAbilities from '@/pages/combat/reading-abilities/index.vue'

import Terrain from '@/pages/combat/terrain/index.vue'
import Obstacles from '@/pages/combat/obstacles/index.vue'

import CharacterCreation from '@/pages/character-creation/index.vue'
import CharacterCreator from '@/pages/character-creator/index.vue'

import StyleDisciplines from '@/pages/style-disciplines/index.vue'
import SpiritDisciplines from '@/pages/spirit-disciplines/index.vue'
import Arts from '@/pages/arts/index.vue'

import EquipmentMenu from '@/pages/equipment/equipment-menu/index.vue'
import Armor from '@/pages/equipment/armor/index.vue'
import Weapons from '@/pages/equipment/weapons/index.vue'
import Accessories from '@/pages/equipment/accessories/index.vue'

import BasicSkills from '@/pages/basic-skills/index.vue'
import SpiritAbilities from '@/pages/spirit-abilities/index.vue'

import Npcs from '@/pages/npcs/index.vue'

import CharacterManager from '@/pages/character-manager/index.vue'
import NpcManager from '@/pages/npc-manager/index.vue'

import World from '@/pages/world/index.vue'

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
      component: MainMenu,
      name: 'main-menu',
      meta: {
        title: 'Shattered Spirits',
      },
    },
    {
      path: '/character-options',
      component: CharacterOptions,
      name: 'character-options',
      meta: {
        title: 'Character Options',
      },
    },
    {
      path: '/character-creation',
      component: CharacterCreation,
      name: 'character-creation',
      meta: {
        title: 'Character Creation',
      },
    },
    {
      path: '/character-creator',
      component: CharacterCreator,
      name: 'character-creator',
      meta: {
        title: 'Character Creator',
      },
    },
    {
      path: '/spirit-disciplines',
      component: SpiritDisciplines,
      name: 'spirit-disciplines',
      meta: {
        title: 'Spirit Disciplines',
      },
    },
    {
      path: '/equipment',
      component: EquipmentMenu,
      name: 'equipment-menu',
      meta: {
        title: 'Equipment',
      },
    },
    {
      path: '/armor',
      component: Armor,
      name: 'armor',
      meta: {
        title: 'Armor',
      },
    },
    {
      path: '/weapons',
      component: Weapons,
      name: 'weapons',
      meta: {
        title: 'Weapons',
      },
    },
    {
      path: '/accessories',
      component: Accessories,
      name: 'accessories',
      meta: {
        title: 'Accessories',
      },
    },
    {
      path: '/combat',
      component: CombatMenu,
      name: 'combat',
      meta: {
        title: 'Combat',
      },
    },
    {
      path: '/combat-rules',
      component: CombatRules,
      name: 'combat-rules',
      meta: {
        title: 'Combat',
      },
    },
    {
      path: '/combat-primer',
      component: CombatPrimer,
      name: 'combat-primer',
      meta: {
        title: 'Combat Primer',
      },
    },
    {
      path: '/afflictions-and-status',
      component: AfflictionsAndStatus,
      name: 'afflictions-and-status',
      meta: {
        title: 'Afflictions and Status',
      },
    },
    {
      path: '/equipment-in-combat',
      component: EquipmentInCombat,
      name: 'equipment-in-combat',
      meta: {
        title: 'Equipment in Combat',
      },
    },
    {
      path: '/reading-abilities',
      component: ReadingAbilities,
      name: 'reading-abilities',
      meta: {
        title: 'Reading Abilities',
      },
    },
    {
      path: '/terrain',
      component: Terrain,
      name: 'terrain',
      meta: {
        title: 'Terrain',
      },
    },
    {
      path: '/obstacles',
      component: Obstacles,
      name: 'obstacles',
      meta: {
        title: 'Obstacles',
      },
    },
    {
      path: '/style-disciplines',
      component: StyleDisciplines,
      name: 'style-disciplines',
      meta: {
        title: 'Style Disciplines',
      },
    },
    {
      path: '/arts',
      component: Arts,
      name: 'arts',
      meta: {
        title: 'Arts',
      },
    },
    {
      path: '/spirit-abilities',
      component: SpiritAbilities,
      name: 'spirit-abilities',
      meta: {
        title: 'Spirit Abilities',
      },
    },
    {
      path: '/basic-skills',
      component: BasicSkills,
      name: 'basic-skills',
      meta: {
        title: 'Basic Skills',
      },
    },
    {
      path: '/world',
      component: World,
      name: 'world',
      meta: {
        title: 'The World',
      },
    },
    {
      path: '/npcs',
      component: Npcs,
      name: 'npcs',
      meta: {
        title: 'NPCs',
      },
    },
    {
      path: '/character-manager',
      component: CharacterManager,
      name: 'character-manager',
      meta: {
        title: 'Character Manager',
      },
    },
    {
      path: '/npc-manager',
      component: NpcManager,
      name: 'npc-manager',
      meta: {
        title: 'NPC Manager',
      },
    },
  ],
})

export default r
