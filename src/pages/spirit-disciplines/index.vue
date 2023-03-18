<template>
  <div>
    <h2>Spirit Disciplines</h2>
    <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;">
      <v-col cols="3"
        ><v-select v-model="selectedCategories" :items="disciplineCategories" attach label="Discipline Categories" multiple filled outlined></v-select> </v-col
      ><v-col cols="3"
        ><v-select v-model="selectedTypes" :items="disciplineTypes.slice()" attach label="Discipline Types" multiple filled outlined>
          <template v-slot:prepend-item>
            <v-list-item ripple @mousedown.prevent @click="toggle"
              ><v-list-item-action>
                <v-icon :color="selectedTypes.length > 0 ? 'indigo darken-4' : ''">
                  {{ icon }}
                </v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>
                  Select All
                </v-list-item-title>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mt-2"></v-divider> </template
          ><template v-slot:selection="{ item, index }">
            <span v-if="index === 0">{{ item }} </span>&nbsp;
            <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedTypes.length - 1 }} others) </span>
          </template></v-select
        > </v-col
      ><v-col cols="3"><v-select v-model="primaryRole" :items="disciplineRoles" attach label="Primary Role" filled outlined></v-select> </v-col
      ><v-col cols="3"><v-select v-model="secondaryRole" :items="disciplineRoles" attach label="Secondary Role" filled outlined></v-select> </v-col
    ></v-row>
    <v-row class="page">
      <v-col cols="auto" class="sidebar">
        <v-btn-toggle borderless overflow-auto
          ><div v-for="discipline in disciplines" style="width: 100%;" v-bind:key="discipline">
            <v-btn @click="selectedDiscipline = discipline" class="button--style" depressed tile block>
              <img class="image--size" :src="discipline.Icon" />{{ discipline.Name }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col> <discipline-card v-if="selectedDiscipline != null" :discipline="selectedDiscipline" /></v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import { Discipline } from '@/class'
import DisciplineCard from '@/components/cards/DisciplineCard'

export default Vue.extend({
  name: 'spirit-disciplines',
  components: { DisciplineCard },
  data() {
    return {
      disciplineCategories: ['Earth'],
      selectedCategories: ['Earth'],
      disciplineTypes: ['Land', 'Stone', 'Grounding', 'Stoneheart', 'Tremorsight'],
      selectedTypes: ['Land', 'Stone', 'Grounding', 'Stoneheart', 'Tremorsight'],
      disciplineRoles: ['Any', 'Artillery', 'Controller', 'Courier', 'Defender', 'Shaper', 'Striker', 'Supporter', 'Survivor'],
      primaryRole: 'Any',
      secondaryRole: 'Any',
      selectedDiscipline: null,
    }
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getFilteredDisciplines(this.selectedCategories, this.selectedTypes, this.primaryRole, this.secondaryRole)
    },
    hasAllTypes() {
      return this.selectedTypes.length === this.disciplineTypes.length
    },
    hasSomeType() {
      return this.selectedTypes.length > 0 && !this.disciplineTypes
    },
    icon() {
      if (this.hasAllTypes) return 'mdi-close-box'
      if (this.hasSomeType) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.likesAllFruit) {
          this.selectedTypes = []
        } else {
          this.selectedTypes = this.disciplineTypes.slice()
        }
      })
    },
  },
})
</script>

<style scoped lang="scss">
.page {
  margin: 0px;
}
.sidebar {
  background: $color--light-parchment;
  padding: 0px;
  border-top: 0.5em double black;
  border-right: 0.5em double black;
  border-bottom: 0.5em double black;
  align-content: center;
  justify-content: center;
  height: 70vh;
  overflow-y: auto;
}
.v-btn-toggle {
  flex-direction: column;
}
.v-btn {
  white-space: normal;
  flex: auto;
  align-content: center;
  justify-content: left;
}
.button--style {
  background: $color--light-parchment !important;
  word-wrap: break-word;
}
.image--size {
  height: 2em;
}
</style>
