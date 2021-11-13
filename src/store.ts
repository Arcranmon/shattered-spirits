import Vue from "vue";
import Vuex from "vuex";
import { DatabaseJsonStore } from "./database/DatabaseJsonStore";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    databaseJson: DatabaseJsonStore,
  },
});

export { store, DatabaseJsonStore };
