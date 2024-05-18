<template>
  <div>
    <h2>Spirit Disciplines</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px">
        <v-expansion-panel style="background-color: inherit">
          <v-expansion-panel-header>Filters </v-expansion-panel-header>
          <v-expansion-panel-content
            ><v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em" dense>
              <v-col cols="12"
                ><v-select
                  v-model="selectedCategories"
                  :items="disciplineCategories"
                  attach
                  label="Discipline Categories"
                  multiple
                  filled
                  outlined
                ></v-select> </v-col
              ><v-col cols="12"
                ><v-select v-model="selectedTypes" :items="disciplineTypes.slice()" attach label="Discipline Types" multiple filled outlined>
                  <template v-slot:prepend-item>
                    <v-list-item ripple @mousedown.prevent @click="toggle"
                      ><v-list-item-action>
                        <v-icon :color="selectedTypes.length > 0 ? 'indigo darken-4' : ''">
                          {{ icon }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Select All </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider> </template
                  ><template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{ item }} </span>&nbsp;
                    <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedTypes.length - 1 }} others) </span>
                  </template></v-select
                > </v-col
              ><v-col cols="12"><v-select v-model="primaryRole" :items="disciplineRoles" attach label="Primary Role" filled outlined></v-select> </v-col
              ><v-col cols="12"
                ><v-select v-model="secondaryRole" :items="disciplineRoles" attach label="Secondary Role" filled outlined></v-select> </v-col></v-row
          ></v-expansion-panel-content>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedDiscipline"
        :items="disciplines"
        item-text="Name"
        return-object
        attach
        label="Selected Discipline"
        filled
        outlined
        style="margin-left: 1em; margin-right: 1em"
      ></v-select
      ><discipline-card v-if="selectedDiscipline != null" :discipline="selectedDiscipline" :key="selectedDiscipline.Name"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em">
        <v-col cols="3"
          ><v-select
            v-model="selectedCategories"
            :items="disciplineCategories"
            attach
            label="Discipline Categories"
            multiple
            filled
            outlined
          ></v-select> </v-col
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
                  <v-list-item-title> Select All </v-list-item-title>
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
            ><div v-for="discipline in disciplines" style="width: 100%" v-bind:key="discipline.Name">
              <v-btn @click="selectedDiscipline = discipline" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="discipline.Icon" />{{ discipline.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <discipline-card v-if="selectedDiscipline != null" :discipline="selectedDiscipline" :key="selectedDiscipline.Name" /></v-col> </v-row
    ></span>
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
      disciplineCategories: ['Earth', 'Flame', 'Water', 'Wind'],
      selectedCategories: ['Earth', 'Flame', 'Water', 'Wind'],
      disciplineTypes: ['Land', 'Mountain', 'Grounding', 'Mountainheart', 'Tremorsight', 'Tide', 'Tundra', 'Blaze', 'Detonation', 'Gale', 'Storm'],
      selectedTypes: ['Land', 'Mountain', 'Tide', 'Tundra', 'Blaze', 'Detonation', 'Gale', 'Storm'],
      disciplineRoles: ['Any', 'Artillery', 'Controller', 'Courier', 'Defender', 'Shaper', 'Striker', 'Supporter', 'Survivor'],
      primaryRole: 'Any',
      secondaryRole: 'Any',
      selectedDiscipline: null,
    }
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getFilteredMajorDisciplines(this.selectedCategories, this.selectedTypes, this.primaryRole, this.secondaryRole)
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
        if (this.hasAllTypes) {
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
.a {
}
</style>
