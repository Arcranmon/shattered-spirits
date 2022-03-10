<template>
  <div style="padding: 1em;">
    <h2>Character Creation</h2>
    <display-tooltip-text :string="choosingYourSpirit" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourEquipment" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourStuff" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourTalents" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourAppearance" />
    <br />
    <br />
    <display-tooltip-text :string="creatingYourBackground" />
    <br />
    <br />
    <display-tooltip-text :string="finalizingYourCharacter" />
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
import DisplayTooltipText from "@/components/DisplayTooltipText";

import { store } from "@/store";
export default Vue.extend({
  name: "character-creation",
  components: {},
  computed: {
    choosingYourSpirit() {
      return ChoosingYourSpirit;
    },
    choosingYourEquipment() {
      return ChoosingYourEquipment;
    },
    choosingYourStuff() {
      return ChoosingYourStuff;
    },
    choosingYourTalents() {
      return ChoosingYourTalents;
    },
    choosingYourAppearance() {
      return ChoosingYourAppearance;
    },
    creatingYourBackground() {
      return CreatingYourBackground;
    },
    finalizingYourCharacter() {
      return FinalizingYourCharacter;
    },
  },
});
</script>

<style scoped lang="scss">
a {
}
</style>
