<template
  ><span>
    <div class="button-seperator">
      <v-btn
        color="success"
        large
        tile
        @click="$emit('chose-stances')"
        :disabled="!character.HasAllStancesStyles"
      >
        <span v-if="!character.HasAllStancesStyles"
          >CHOOSE YOUR STANCES AND STYLES</span
        >
        <span v-else>ACCEPT STANCES AND STYLES</span>
      </v-btn>
    </div>
    You may select up to an additional {{ character.StancesRemaining }} stances!
    <div :v-if="!character.HasSpirit">
      Character must have a spirit selected to choose stances!
    </div>
    <div class="stance--box">
      <show-cards
        :inputs="charStances"
        job="Stances"
        :collapse="true"
        display_text="Selected Stances"
        standalone_or_contained="Standalone"
        :selectButton="true"
        :color_category="character.SpiritType"
        @chose="removeStance"
      />
    </div>
    <v-row
      ><v-col cols="3">
        <v-autocomplete
          label="Choose a Stance!"
          :items="stances"
          :item-text="(item) => item.Name + ' (' + item.Discipline + ')'"
          hide-details
          v-model="stance"
          outlined
          return-object
          @change="$emit('chose', stance)" /></v-col
      ><v-col cols="9">
        <v-btn
          color="success"
          class="button-seperator"
          large
          tile
          @click="addStance(stance)"
          :disabled="
            stance.Name == '' ||
            !character.StancesRemaining ||
            character.Stances.includes(stance.Name)
          "
        >
          <span v-if="stance.Name == ''">Select a stance on the left!</span>
          <span v-else>ADD {{ stance.Name }}</span>
        </v-btn>
        <div>
          <stance-card
            :stance="stance"
            v-if="(stance.Name !='' )"
            :category="character.SpiritType"
          /></div></v-col
    ></v-row>
    You may select up to an additional {{ character.StylesRemaining }} styles!
    <div class="stance--box">
      <show-cards
        :inputs="charStyles"
        job="Stances"
        :collapse="true"
        display_text="Selected Styles"
        standalone_or_contained="Standalone"
        :selectButton="true"
        @chose="removeStance"
      />
    </div>
    <v-row
      ><v-col cols="3">
        <v-autocomplete
          label="Choose a Style!"
          :items="styles"
          :item-text="(item) => item.Name + ' (' + item.Discipline + ')'"
          hide-details
          v-model="style"
          outlined
          return-object
          @change="$emit('chose', style)" /></v-col
      ><v-col cols="9">
        <v-btn
          color="success"
          class="button-seperator"
          large
          tile
          @click="addStyle(style)"
          :disabled="
            style.Name == '' ||
            !character.StylesRemaining ||
            character.Styles.includes(style.Name)
          "
        >
          <span v-if="style.Name == ''">Select a style on the left!</span>
          <span v-else>ADD {{ style.Name }}</span>
        </v-btn>
        <div>
          <stance-card
            :stance="style"
            v-if="(style.Name !='')"
          /></div></v-col></v-row
  ></span>
</template>
<script>
import Vue from "vue";

import { store } from "@/store";
import { Character, Stance } from "@/class";
import variables from "@/styles/variables.scss";
import ShowCards from "@/components/cards/ShowCards.vue";
import StanceCard from "@/components/cards/StanceCard.vue";
export default Vue.extend({
  name: "stance-selection",
  components: { StanceCard, ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      variables,
      stance: new Stance(),
      style: new Stance(),
    };
  },
  computed: {
    spiritDisciplines: function () {
      return this.$store.getters.getDisciplinesByCategory(
        this.character.SpiritType
      );
    },
    stances: function () {
      var stances = [];
      for (var disc of this.spiritDisciplines) {
        stances = stances.concat(
          this.$store.getters.getStancesFromList(disc.Stances)
        );
      }
      return stances;
    },
    styles: function () {
      return this.$store.getters.getAllStyles();
    },
    charStances: function () {
      return this.$store.getters.getStancesFromList(this.character.Stances);
    },
    charStyles: function () {
      return this.$store.getters.getStancesFromList(this.character.Styles);
    },
    spirit: function () {
      return this.character.SpiritType;
    },
  },
  methods: {
    addStance: function (variable) {
      this.character.AddStance(variable);
    },
    addStyle: function (variable) {
      this.character.AddStyle(variable);
    },
    removeStance(variable) {
      this.character.RemoveStance(variable.card, variable.index);
    },
    removeStyle(variable) {
      this.character.RemoveStyle(variable.card, variable.index);
    },
  },
  watch: {
    spirit: function (v) {
      this.stance = new Stance();
    },
  },
});
</script>

<style scoped lang="scss">
.button-seperator {
  margin-bottom: 1em;
}
.stance--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
