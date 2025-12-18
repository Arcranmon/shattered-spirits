<template>
  <div>
    <v-row class="page" style="margin-top: 1em">
      <v-col cols="auto" class="sidebar" style="height: 100vh">
        <v-btn-toggle borderless overflow-auto>
          <div v-for="(tab, index) in tabs" style="width: 100%">
            <v-btn @click="selectedIndex = index" class="button--style" depressed tile block>
              {{ tab }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col>
        <h2>{{ tabs[selectedIndex] }}</h2>
        <display-tooltip-text v-if="selectedIndex < 4" :string="text[selectedIndex]" />
        <div v-if="tabs[selectedIndex] == 'Afflictions and Status'">
          <v-select v-model="selectedStatuses" :items="statusCategories" attach label="Status Categories" multiple filled outlined></v-select>
          <show-cards :inputs="statuses" :collapse="false" />
        </div>
        <show-cards v-if="tabs[selectedIndex] == 'Terrain'" :inputs="terrains" :collapse="false" />
        <div v-if="tabs[selectedIndex] == 'Glossary'">
          <div v-for="key of glossaryItems.keys()">
            <h3>{{ key }}</h3>
            <div v-for="item of glossaryItems.get(key)" style="padding-bottom: 1em">
              <display-tooltip-text :string="'**' + item.name + ':** ' + item.effect" />
            </div>
          </div></div
      ></v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'
import NarrativeText from '@/database/text_files/narrative.txt'
import TravelText from '@/database/text_files/travel.txt'
import EquipmentText from '@/database/text_files/equipment.txt'
import GameModes from '@/database/text_files/game_modes.txt'
import CombatText from '@/database/text_files/combat_rules/combat.txt'
import ShowCards from '@/components/cards/ShowCards.vue'
import StatusCard from '@/components/cards/StatusCard.vue'

export default Vue.extend({
  name: 'rules-menu',
  components: {
    CustomButton,
    StatusCard,
    ShowCards,
  },

  data() {
    return {
      selectedIndex: 0,
      tabs: ['Playing the Game', 'Narrative', 'Travel', 'Equipment', 'Combat', 'Afflictions and Status', 'Terrain', 'Glossary'],
      text: [GameModes, NarrativeText, TravelText, EquipmentText, CombatText],
      statusCategories: ['Status Effect', 'Affliction', 'Elemental Affliction', 'Mental Affliction', 'Instant Effect'],
      selectedStatuses: ['Status Effect', 'Affliction', 'Elemental Affliction', 'Mental Affliction', 'Instant Effect'],
      selectedStatus: null,
      selectedTerrain: null,
    }
  },
  computed: {
    statuses: function () {
      return this.$store.getters.getFilteredStatuses(this.selectedStatuses).sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
    terrains: function () {
      return this.$store.getters.getTerrains().sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
    glossaryItems() {
      var glossary = this.$store.getters.getGlossary()
      glossary.sort((a, b) => a.name.localeCompare(b.name))
      var organizedGlossary = new Map()
      for (var item of glossary) {
        if (item.hasOwnProperty('effect')) {
          if (!organizedGlossary.has(item.name[0])) {
            organizedGlossary.set(item.name[0], [])
          }
          organizedGlossary.get(item.name[0]).push(item)
        }
      }
      return organizedGlossary
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
