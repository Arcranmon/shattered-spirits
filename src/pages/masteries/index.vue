<template>
  <div>
    <h2>Masteries</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px">
        <v-expansion-panel style="background-color: inherit">
          <v-expansion-panel-header>Filters </v-expansion-panel-header>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedMastery"
        :items="masteries"
        item-text="Name"
        return-object
        attach
        label="Selected mastery"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em"
      ></v-select
      ><discipline-card v-if="selectedMastery != null" :discipline="selectedMastery"
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
            ><div v-for="mastery in masteries" style="width: 100%" v-bind:key="mastery.Name">
              <v-btn @click="selectedMastery = mastery" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="mastery.Icon" />{{ mastery.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <discipline-card v-if="selectedMastery != null" :discipline="selectedMastery" :key="selectedMastery.Name" /></v-col> </v-row
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
  name: 'minor-discipline',
  components: { DisciplineCard },
  data() {
    return {
      disciplineCategories: ['General', 'Martial', 'Flame', 'Earth', 'Water', 'Wind'],
      selectedCategories: [],
      disciplineTypes: {
        Earth: ['Land', 'Mountain'],
        Water: ['Tide', 'Tundra'],
        Flame: ['Blaze', 'Detonation'],
        Wind: ['Gale', 'Storm'],
        Martial: ['Unarmed', 'Pole'],
        General: ['Artillery', 'Controller', 'Courier', 'Striker', 'Supporter', 'Survivor', 'Defender'],
      },
      selectedTypes: [],
      selectedMastery: null,
    }
  },
  computed: {
    masteries: function () {
      return this.$store.getters.getFilteredMasteries(this.selectedCategories, this.selectedTypes, 'Any', 'Any')
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
