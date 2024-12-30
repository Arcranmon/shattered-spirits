<template>
  <div>
    <h2>Disciplines</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px">
        <v-expansion-panel style="background-color: inherit">
          <v-expansion-panel-header>Filters </v-expansion-panel-header>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedDiscipline"
        :items="disciplines"
        item-text="Name"
        return-object
        attach
        label="Selected discipline"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em"
      ></v-select
      ><discipline-card v-if="selectedDiscipline != null" :discipline="selectedDiscipline"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em">
        <v-col cols="3"
          ><v-select v-model="selectedCategories" :items="disciplineCategories" attach label="Discipline Categories" multiple filled outlined
            ><template v-slot:prepend-item>
              <v-list-item ripple @mousedown.prevent @click="selectedCategories = []">
                <v-list-item-content>
                  <v-list-item-title> Clear Selections </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider> </template
            ><template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item }} </span>&nbsp;
              <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedCategories.length - 1 }} others) </span>
            </template></v-select
          > </v-col
        ><v-col cols="3"
          ><v-select v-model="selectedTypes" :items="selectableTypes" attach label="Discipline Types" multiple filled outlined>
            <template v-slot:prepend-item>
              <v-list-item ripple @mousedown.prevent @click="selectedTypes = []">
                <v-list-item-content>
                  <v-list-item-title> Clear Selections </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider> </template
            ><template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item }} </span>&nbsp;
              <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedTypes.length - 1 }} others) </span>
            </template></v-select
          >
        </v-col></v-row
      >
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
import DisciplineCard from '@/components/cards/DisciplineCard'

export default Vue.extend({
  name: 'discipline',
  components: { DisciplineCard },
  data() {
    return {
      disciplineCategories: ['Flame', 'Earth', 'Metal', 'Water', 'Wind', 'Wood'],
      selectedCategories: [],
      disciplineTypes: {
        Earth: ['Land', 'Mountain'],
        Water: ['Tide', 'Tundra'],
        Flame: ['Blaze', 'Detonation'],
        Wind: ['Gale', 'Storm'],
        Wood: ['Bloom'],
      },
      selectedTypes: [],
      selectedDiscipline: null,
    }
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getDisciplinesFromList(['Way of the Blaze', 'Way of the Tide', 'Way of the Gale', 'Way of the Mountain'])
      // return this.$store.getters.getFilteredSpiritDisciplines(this.selectedCategories, this.selectedTypes, 'Any', 'Any')
    },
    selectableTypes: function () {
      var selectable_types = []
      for (var cat of this.selectedCategories) {
        selectable_types.push(...this.disciplineTypes[cat])
      }
      return selectable_types
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
