import Vue from "vue";
import Vuex from "vuex";
import { DatabaseJsonStore } from "./stores/DatabaseJsonStore";
import { CharacterManagementStore } from "./stores/CharacterManagerStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    databaseJson: DatabaseJsonStore,
    characterManager: CharacterManagementStore,
  },
});

export { store, DatabaseJsonStore, CharacterManagementStore };
