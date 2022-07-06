<template>
  <v-row justify="center">
    <v-col cols="2" class="sidebar">
      <span v-for="(character, index) in characters" :key="index">
        <v-tooltip right>
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              class="button--template"
              @click="
                (selectedCharacter = character),
                  (characterSelected = true),
                  (selectedIndex = index)
              "
              v-bind="attrs"
              v-on="on"
              ><span>{{ character.Name }} <br /> </span
            ></v-btn>
          </template>
        </v-tooltip>
      </span> </v-col
    ><v-col cols="10"> <show-character :character="selectedCharacter" /></v-col>
  </v-row>
</template>

<script>
import Vue from "vue";
import { getModule } from "vuex-module-decorators";
import { CharacterManagementStore } from "@/store";
import { Character } from "@/class";
import ShowCharacter from "@/components/ShowCharacter.vue";

export default Vue.extend({
  name: "character-box",
  components: { ShowCharacter },
  data() {
    return {
      selectedCharacter: new Character(),
      characterSelected: false,
      selectedIndex: Number,
    };
  },
  methods: {
    deleteCharacter() {
      const store = getModule(CharacterManagementStore, this.$store);
      store.DeleteCharacter(this.selectedIndex);
    },
    saveCharacter() {
      const store = getModule(CharacterManagementStore, this.$store);
      store.SaveCharacters();
    },
  },
  computed: {
    characters() {
      const store = getModule(CharacterManagementStore, this.$store);
      store.loadCharacter();
      return store.AllCharacters;
    },
  },
});
</script>

<style scoped lang="scss">
.button--template {
  border: 5px double black;
  border-radius: 10px;
  font-family: $font--fancy;
  font-size: $font-size--m;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  height: 100%;
  width: 100%;
}
.button--topbar {
  width: 25%;
}
.topbar {
  padding: $space--s;
  padding-top: 0;
  padding-bottom: 0;
  display: flex;
  align-items: center;
  height: 3em;
}
.sidebar {
  background: $color--parchment;
  padding: $space--m;
  border-right: 5px double black;
}
</style>
