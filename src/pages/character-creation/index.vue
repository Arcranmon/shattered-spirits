<template>
  <div style="padding: 1em;">
    <h2>Character Creation</h2>
    <div v-html="choosingYourSpirit" />
    <br />
    <div v-html="choosingYourEquipment" />
    <br />
    <div v-html="choosingYourStuff" />
    <br />
    <div v-html="choosingYourTalents" />
    <br />
    <div v-html="choosingYourAppearance" />
    <br />
    <div v-html="creatingYourBackground" />
    <br />
    <div v-html="finalizingYourCharacter" />
  </div>
</template>

<script>
import Vue from "vue";
import ChoosingYourSpirit from "@/database/text_files/character_creation/choosing_your_spirit.txt";
import ChoosingYourEquipment from "@/database/text_files/character_creation/choosing_your_equipment.txt";
import ChoosingYourStuff from "@/database/text_files/character_creation/choosing_your_styles_stances_and_techniques.txt";
import ChoosingYourTalents from "@/database/text_files/character_creation/choosing_your_talents.txt";
import ChoosingYourAppearance from "@/database/text_files/character_creation/choosing_your_appearance.txt";
import CreatingYourBackground from "@/database/text_files/character_creation/creating_your_background.txt";
import FinalizingYourCharacter from "@/database/text_files/character_creation/finalizing_your_character.txt";

import { store } from "@/store";
export default Vue.extend({
  name: "character-creation",
  components: {},
  computed: {
    choosingYourSpirit() {
      return this.$marked(ChoosingYourSpirit);
    },
    choosingYourEquipment() {
      return this.$marked(ChoosingYourEquipment);
    },
    choosingYourStuff() {
      return this.$marked(ChoosingYourStuff);
    },
    choosingYourTalents() {
      return this.$marked(ChoosingYourTalents);
    },
    choosingYourAppearance() {
      return this.$marked(ChoosingYourAppearance);
    },
    creatingYourBackground() {
      return this.$marked(CreatingYourBackground);
    },
    finalizingYourCharacter() {
      return this.$marked(FinalizingYourCharacter);
    },
  },
});
</script>

<style scoped lang="scss">
a {
}
</style>
