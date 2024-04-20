import Vue from 'vue'
import Vuex from 'vuex'
import { DatabaseJsonStore } from './stores/DatabaseJsonStore'
import { CharacterManagementStore } from './stores/CharacterManagerStore'
import { NpcManagementStore } from './stores/NpcManagerStore'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    databaseJson: DatabaseJsonStore,
    characterManager: CharacterManagementStore,
    npcManager: NpcManagementStore,
  },
})

export { store, DatabaseJsonStore, CharacterManagementStore, NpcManagementStore }
