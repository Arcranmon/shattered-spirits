<template
  ><span>
    <display-tooltip-text :string="creationText" />
    <br />
    <br />
    <v-layout justify-center
      ><div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-discipline')" :disabled="!character.HasDisciplines">
          <span v-if="!character.HasDisciplines">CHOOSE YOUR DISCIPLINES</span>
          <span v-else>ACCEPT DISCIPLINES</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <div v-if="!character.HasSpiritDisciplines"><display-tooltip-text :string="'You are missing a Spirit Discipline!'" /></div>
      <div v-if="!character.HasStyleDisciplines"><display-tooltip-text :string="'You are missing a Style Discipline!'" /></div>
    </div>
    <v-row>
      <v-layout style="margin-top: 2em; width: 100%;" justify-center>
        <display-tooltip-text string="You have selected the below starting Disciplines (click to remove):" />
      </v-layout>
    </v-row>
    <v-row style="margin-top: 1em; margin-bottom: 1em;">
      <v-layout style="margin-top: 1em; width: 100%;" justify-center>
        <div v-for="disc in character.Disciplines" :key="disc.Name" class="selected--item">
          <v-btn @click="removeDiscipline(disc.name)" class="button--style" depressed tile block> {{ disc.name }} II </v-btn>
        </div>
      </v-layout>
    </v-row>
    <v-stepper alt-labels class="no-transition">
      <v-stepper-header class="builder--header">
        <v-stepper-step editable step="1">
          <center>Spirit Discipline</center>
        </v-stepper-step>
        <v-stepper-step editable step="2">
          <center>Style Discipline</center>
        </v-stepper-step></v-stepper-header
      >
      <v-stepper-items class="builder--body">
        <v-stepper-content step="1"
          ><div>
            <v-row> </v-row>
            <v-row v-if="character.Spirit.HasSubtype">
              <v-col cols="auto" class="sidebar--enclosed" style="margin-top: 2em; margin-bottom: 2em;">
                <v-btn-toggle borderless overflow-auto
                  ><div v-for="discipline in spirit_disciplines" style="width: 100%;" v-bind:key="discipline.Name">
                    <v-btn @click="spiritDiscipline = discipline" class="button--style" depressed tile block>
                      <img class="image--icon-size" :src="discipline.Icon" />{{ discipline.Name }}
                    </v-btn>
                  </div>
                </v-btn-toggle></v-col
              >
              <v-col>
                <v-layout style="margin-top: 1em; width: 100%;" justify-center
                  ><v-btn
                    large
                    tile
                    color="success"
                    @click="addDiscipline(spiritDiscipline)"
                    :disabled="spiritDiscipline == null || !character.CanAddDiscipline(spiritDiscipline)"
                  >
                    <span v-if="spiritDiscipline == null">CHOOSE A SPIRIT DISCIPLINE</span>
                    <span v-else-if="!character.CanAddDiscipline(spiritDiscipline)">CANNOT ADD {{ spiritDiscipline.Name }} WEAPON</span>
                    <span v-else>CHOOSE {{ spiritDiscipline.Name }}</span>
                  </v-btn></v-layout
                ><discipline-card v-if="spiritDiscipline != null" :discipline="spiritDiscipline" :key="spiritDiscipline.Name"
              /></v-col> </v-row
            ><v-row v-else>
              <v-col cols="auto"><display-tooltip-text string="To select a Spirit Discipline you must first select your spirit's type and subtype!" /></v-col
            ></v-row></div
        ></v-stepper-content>
        <v-stepper-content step="2">
          <v-row>
            <v-col cols="auto" class="sidebar--enclosed" style="margin-top: 2em; margin-bottom: 2em;">
              <v-btn-toggle borderless overflow-auto
                ><div v-for="discipline in style_disciplines" style="width: 100%;" v-bind:key="discipline.Name">
                  <v-btn @click="styleDiscipline = discipline" class="button--style" depressed tile block>
                    <img class="image--icon-size" :src="discipline.Icon" />{{ discipline.Name }}
                  </v-btn>
                </div>
              </v-btn-toggle></v-col
            >
            <v-col
              ><v-layout style="margin-top: 1em; width: 100%;" justify-center
                ><v-btn
                  large
                  tile
                  color="success"
                  @click="addDiscipline(styleDiscipline)"
                  :disabled="styleDiscipline == null || !character.CanAddDiscipline(styleDiscipline)"
                >
                  <span v-if="styleDiscipline == null">CHOOSE A STYLE DISCIPLINE</span>
                  <span v-else-if="!character.CanAddDiscipline(styleDiscipline)">CANNOT ADD {{ styleDiscipline.Name }} WEAPON</span>
                  <span v-else>CHOOSE {{ styleDiscipline.Name }}</span>
                </v-btn></v-layout
              >
              <discipline-card v-if="styleDiscipline != null" :discipline="styleDiscipline" :key="styleDiscipline.Name"
            /></v-col> </v-row
        ></v-stepper-content>
      </v-stepper-items>
    </v-stepper>
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
      step: 1,
      styleDiscipline: null,
      spiritDiscipline: null,
    }
  },
  computed: {
    spirit_disciplines: function () {
      return this.$store.getters.getFilteredDisciplines([this.character.Element], [this.character.Spirit.Subtype.Name], 'Any', 'Any')
    },
    style_disciplines: function () {
      return this.$store.getters.getFilteredDisciplines(['Martial'], ['Style'], 'Any', 'Any')
    },
    creationText: function () {
      return DisciplineSelectionText
    },
    characterDisciplines: function () {
      this.renderTime
      return Array.from(this.character.Disciplines)
    },
  },
  methods: {
    addDiscipline: function (variable) {
      this.character.AddDiscipline(variable)
      this.character.AddDiscipline(variable)
      this.renderTime += 1
    },
    removeDiscipline: function (variable) {
      this.character.RemoveDiscipline(variable)
      this.character.RemoveDiscipline(variable)
      this.renderTime += 1
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
.builder--header {
  background: $color--parchment;
}
.builder--body {
  background: $color--background;
  height: 100%;
}
.v-stepper__step {
  width: 100%;
  flex-direction: row;
  display: flex !important;
  flex-grow: 1;
}
</style>
