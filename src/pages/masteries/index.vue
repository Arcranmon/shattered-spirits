<template>
  <div>
    <h2>Masteries</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header>Filters </v-expansion-panel-header>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedMastery"
        :items="masteries"
        item-text="Name"
        return-object
        attach
        label="Selected Mastery"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><mastery-card v-if="selectedMastery != null" :mastery="selectedMastery"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;"> </v-row>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="mastery in masteries" style="width: 100%;" v-bind:key="mastery.Name">
              <v-btn @click="selectedMastery = mastery" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="mastery.Icon" />{{ mastery.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <discipline-card v-if="selectedMastery != null" :discipline="selectedMastery" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import { Mastery } from '@/class'
import DisciplineCard from '@/components/cards/DisciplineCard'

export default Vue.extend({
  name: 'masteries',
  components: { DisciplineCard },
  data() {
    return { selectedMastery: null }
  },
  computed: {
    masteries: function () {
      return this.$store.getters.getMasteries()
    },
    icon() {
      if (this.hasAllTypes) return 'mdi-close-box'
      if (this.hasSomeType) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
