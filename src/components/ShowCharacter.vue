<template>
  <div style="padding: 15px; margin: 1em;">
    <div v-if="character.Name != ''" class="character-cell">
      <h2>
        {{ character.Name }} and {{ character.SpiritName }} the
        {{ character.SpiritType }} Spirit
      </h2>
      <v-row style="margin: 1em;">
        <v-col cols="6"
          ><b>Health:</b> {{ character.CurrentHealth }} /
          {{ character.Health }} <br />
          <b>Refresh:</b> {{ character.RefreshText }} </v-col
        ><v-col cols="6"><armor-card :armor="character.EquippedArmor" /></v-col
        ><v-col cols="6">
          <stance-card :stance="character.CurrentStance" /></v-col
        ><v-col cols="6">
          <stance-card :stance="character.CurrentStyle" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Weapons"
            :inputs="$store.getters.getWeaponsFromList(character.Weapons)"
            standalone_or_contained="Standalone"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Techniques"
            display_text="Skill Techniques"
            :inputs="
              $store.getters.getTechniquesFromList(character.SkillTechniques)
            "
            standalone_or_contained="Standalone"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Techniques"
            display_text="Spirit Techniques"
            :inputs="
              $store.getters.getTechniquesFromList(character.SpiritTechniques)
            "
            standalone_or_contained="Standalone"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Stances"
            :inputs="$store.getters.getStancesFromList(character.Stances)"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="changeStance"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Stances"
            display_text="Styles"
            :inputs="$store.getters.getStancesFromList(character.Styles)"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="changeStyle"
            :cols="2"
          /> </v-col
      ></v-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { getModule } from "vuex-module-decorators";
import { Character } from "@/class";
import ArmorCard from "@/components/cards/ArmorCard.vue";
import StanceCard from "@/components/cards/StanceCard.vue";
import ShowCards from "@/components/cards/ShowCards.vue";
import { CharacterManagementStore } from "@/stores/CharacterManagerStore";
export default Vue.extend({
  name: "display-character",
  components: { ArmorCard, ShowCards, StanceCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  methods: {
    saveCharacter: function () {
      const store = getModule(CharacterManagementStore, this.$store);
      store.SaveCharacters();
    },
    changeStance: function (variable) {
      this.character.CurrentStance = variable.card;
      this.saveCharacter();
    },
    changeStyle: function (variable) {
      this.character.CurrentStyle = variable.card;
      this.saveCharacter();
    },
  },
});
</script>

<style scoped lang="scss">
.character-cell {
  background-color: $color--parchment;
  outline: $border--black-standard;
  border-radius: 0px;
}
</style>
