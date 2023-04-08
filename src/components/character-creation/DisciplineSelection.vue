<template
  ><span>
    <display-tooltip-text :string="creationText" />
    <br />
    <br />
    <v-layout justify-center
      ><div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-discipline')" :disabled="!character.HasAllDisciplines[3]">
          <span v-if="!character.HasAllDisciplines[3]">CHOOSE YOUR DISCIPLINES</span>
          <span v-else>ACCEPT DISCIPLINES</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select an additional ' + character.HasAllDisciplines[0] + ' Tiers of Disciplines!'" /><br />
      <display-tooltip-text v-if="!character.HasAllDisciplines[1]" :string="'You are missing a Tier 2 Spirit Discipline!'" /><br />
      <display-tooltip-text v-if="!character.HasAllDisciplines[2]" :string="'You are missing a Tier 2 Martial Discipline!'" /><br />
      <display-tooltip-text string="Click a Discipline on the right to select it, or a selected Discipline to remove it." /><br />
      <display-tooltip-text
        string="By default, only Disciplines you have the appropriate gear for are shown; flip the toggle below to instead display all."
      /><br />
    </div>
    <v-layout justify-center> <v-switch label="Show All Disciplines" v-model="show_all"></v-switch></v-layout>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Disciplines</h4>
          <v-row v-for="disc in characterDisciplines" :key="disc.name" no-gutters>
            <v-col md="0" sm="8"> {{ disc.name }} <span v-for="n in disc.tier" :key="n">I</span></v-col
            ><v-col> <v-btn inline x-small @click="removeDiscipline(disc.name), $emit('changed')" color="red">-</v-btn> </v-col></v-row
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
              ><template v-slot:item="{ item }"> <img class="image--icon-size" :src="item.Icon" />{{ item.Name }} </template></v-select
            ><discipline-card
              v-if="discipline.Name != ''"
              :discipline="discipline"
              :add_button="true"
              :tiers="disciplineTier"
              @chose="addDiscipline"
            /></div></v-col></v-row
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
      show_all: false,
    }
  },
  computed: {
    creationText: function () {
      return DisciplineSelectionText
    },
    disciplineTier: function () {
      if (this.discipline.Name == '') return 0
      var idx = this.character.Disciplines.findIndex((x) => x.name == this.discipline.Name)
      if (idx > -1) return this.character.Disciplines[idx].tier
      return 0
    },
    characterDisciplines: function () {
      this.renderTime
      return Array.from(this.character.Disciplines)
    },
    recommendedDisciplines() {
      if (this.show_all) return this.$store.getters.getDisciplines()
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
