<template
  ><span>
    <display-tooltip-text :string="creationText" />
    <br />
    <br />
    <v-layout justify-center
      ><div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-discipline')" :disabled="!character.HasAllWeapons">
          <span v-if="!character.HasAllDisciplines">CHOOSE YOUR DISCIPLINES</span>
          <span v-else>ACCEPT DISCIPLINES</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select an additional ' + character.HasAllDisciplines[0] + ' Tiers of Disciplines!'" /><br />
      <display-tooltip-text v-if="!character.HasAllDisciplines[1]" :string="'You are missing a Tier 2 Spirit Discipline!'" /><br />
      <display-tooltip-text v-if="!character.HasAllDisciplines[2]" :string="'You are missing a Tier 2 Martial Discipline!'" /><br />
      <display-tooltip-text string="Click a Discipline on the right to select it, or a selected Discipline to remove it." /><br /><br />
    </div>
    <v-switch label="Show All Disciplines" v-model="use_recommended"></v-switch>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Disciplines</h4>
          <v-row v-for="(discipline, count) in character.Disciplines" :key="renderTime" no-gutters>
            <v-col md="0" sm="8"> {{ discipline }} x{{ count }}</v-col
            ><v-col> <v-btn inline x-small @click="removeDiscipline(discipline), $emit('changed')" color="red">-</v-btn> </v-col></v-row
          ></v-col
        >
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <div style="margin-top: 1em;" class="centered-buttons">
            <v-select
              v-model="discipline"
              :items="recommendedDisciplines"
              label="Disciplines"
              filled
              outlined
              item-text="Name"
              return-object
              style="margin-left: 0.5em; margin-right: 0.5em;"
            ></v-select
            ><discipline-card v-if="discipline.Name != ''" :discipline="discipline" :add_button="true" @chose="addDiscipline" /></div></v-col></v-row
    ></v-container>
  </span>
</template>

<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character, Discipline } from '@/class'
import DisciplineCard from '@/components/cards/DisciplineCard.vue'
import DisciplineSelectionText from '@/database/text_files/character_creation/choosing_your_disciplines.txt'
export default Vue.extend({
  name: 'discipline-selection',
  components: { DisciplineCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      discipline: new Discipline(),
      renderTime: 0,
      use_recommended: true,
    }
  },
  computed: {
    creationText: function () {
      return DisciplineSelectionText
    },
    recommendedDisciplines() {
      return this.$store.getters.getCharCreationDisciplines(this.character.RecommendedDisciplines)
    },
  },
  methods: {
    addDiscipline: function (variable) {
      this.character.AddDiscipline(variable.discipline)
      this.renderTime += 1
    },
    removeDiscipline(variable) {
      this.character.RemoveDiscipline(variable)
    },
  },
})
</script>

<style scoped lang="scss">
.button-separator {
  margin-bottom: 1em;
}
.weapon--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
.centered-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: auto;
}
</style>
