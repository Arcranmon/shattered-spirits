<template
  ><span>
    <display-tooltip-text :string="creationText" />
    <br />
    <div class="button-seperator">
      <v-layout justify-center>
        <v-btn color="success" large tile @click="$emit('chose-stances')" :disabled="!character.HasAllStancesStyles">
          <span v-if="!character.HasAllStancesStyles">CHOOSE YOUR STANCES AND STYLES</span>
          <span v-else>ACCEPT STANCES AND STYLES</span>
        </v-btn></v-layout
      >
    </div>
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select up to an additional ' + character.StancesRemaining + ' Stances!'" />
      <div :v-if="!character.HasSpirit">
        <display-tooltip-text string="Character must have a spirit selected to choose stances!" />
      </div>
    </div>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Stances</h4>
          <show-cards
            :inputs="charStances"
            job="Stances"
            :collapse="false"
            :cols="1"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="removeStance"
        /></v-col>
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <span v-for="discipline in spiritDisciplines" :key="discipline.name">
            <show-cards
              :inputs="$store.getters.getStancesFromList(discipline.Stances)"
              job="Stances"
              :cols="2"
              :card_color="character.SpiritType"
              :header_color="discipline.Name"
              :display_text="discipline.Name"
              :summary_text="discipline.Summary"
              standalone_or_contained="Standalone"
              :character_creation="true"
              :selectButton="true"
              @chose="addStance" /></span
        ></v-col> </v-row
    ></v-container>
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select up to an additional ' + character.StylesRemaining + ' Styles!'" />
    </div>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Styles</h4>
          <show-cards
            :inputs="charStyles"
            job="Stances"
            :collapse="false"
            :cols="1"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="removeStyle"
        /></v-col>
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <span v-for="discipline in skillDisciplines" :key="discipline.name">
            <show-cards
              :inputs="$store.getters.getStancesFromList(discipline.Stances)"
              job="Stances"
              :cols="2"
              :header_color="discipline.Name"
              :display_text="discipline.Name"
              standalone_or_contained="Standalone"
              :character_creation="true"
              :summary_text="discipline.Summary"
              :selectButton="true"
              @chose="addStyle" /></span
        ></v-col> </v-row></v-container
  ></span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character, Stance } from '@/class'
import ShowCards from '@/components/cards/ShowCards.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
import StanceSelectionText from '@/database/text_files/character_creation/choosing_your_styles_stances.txt'
export default Vue.extend({
  name: 'stance-selection',
  components: { StanceCard, ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      stance: new Stance(),
      style: new Stance(),
    }
  },
  computed: {
    spiritDisciplines: function () {
      return this.$store.getters.getDisciplinesByCategory(this.character.SpiritType)
    },
    skillDisciplines: function () {
      return [...this.$store.getters.getDisciplinesByCategory('Weapon'), ...this.$store.getters.getDisciplinesByCategory('Armor')]
    },
    styles: function () {
      return this.$store.getters.getAllStyles()
    },
    charStances: function () {
      return this.$store.getters.getStancesFromList(this.character.StancesCreation)
    },
    charStyles: function () {
      return this.$store.getters.getStancesFromList(this.character.StylesCreation)
    },
    spirit: function () {
      return this.character.SpiritType
    },
    creationText: function () {
      return StanceSelectionText
    },
  },
  methods: {
    addStance: function (variable) {
      this.character.AddStance(variable.card)
    },
    addStyle: function (variable) {
      this.character.AddStyle(variable.card)
    },
    removeStance(variable) {
      this.character.RemoveStance(variable.card)
    },
    removeStyle(variable) {
      this.character.RemoveStyle(variable.card)
    },
  },
  watch: {
    spirit: function (v) {
      this.stance = new Stance()
    },
  },
})
</script>

<style scoped lang="scss">
.button-seperator {
  margin-bottom: 1em;
}
.character-creation {
  font-size: smaller;
}
.stance--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
