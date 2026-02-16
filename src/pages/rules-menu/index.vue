<template>
  <div>
    <v-select
      v-if="isMobile"
      v-model="selectedTab"
      :items="tabs"
      attach
      filled
      outlined
      style="margin: 1em; margin-bottom: -1em" />
    <v-row
      class="page"
      style="margin-top: 1em">
      <v-col
        v-if="!isMobile"
        cols="auto"
        class="sidebar"
        style="height: 100vh">
        <v-btn-toggle
          borderless
          overflow-auto>
          <div
            v-for="tab in tabs"
            style="width: 100%">
            <v-btn
              @click="selectedTab = tab"
              class="button--style"
              depressed
              tile
              block>
              {{ tab }}
            </v-btn>
          </div>
        </v-btn-toggle>
      </v-col>
      <v-col
        :key="selectedTab"
        style="padding-left: 0; padding-bottom: 0">
        <h2>{{ selectedTab }}</h2>
        <div
          v-if="selectedTab == 'Afflictions and Status'"
          class="character-tab-content">
          <v-select
            v-model="selectedStatuses"
            :items="statusCategories"
            attach
            label="Status Categories"
            multiple
            filled
            outlined>
          </v-select>
          <show-cards
            :inputs="statuses"
            :collapse="false"
            :cols="1" />
        </div>
        <div
          v-if="selectedTab == 'Terrain'"
          class="character-tab-content">
          <show-cards
            :inputs="terrains"
            :collapse="false"
            :cols="1" />
        </div>

        <div v-if="selectedTab == 'Glossary'">
          <div v-for="key of glossaryItems.keys()">
            <h3>{{ key }}</h3>
            <div
              v-for="item of glossaryItems.get(key)"
              style="padding-bottom: 1em">
              <display-tooltip-text :string="'**' + item.name + ':** ' + item.effect" />
            </div>
          </div>
        </div>
        <display-tooltip-text
          v-else
          :string="text[tabs.indexOf(selectedTab)]"
          style="padding-left: 1em" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'
import NarrativeText from '@/database/text_files/narrative.txt'
import TravelText from '@/database/text_files/travel.txt'
import TownsText from '@/database/text_files/towns.txt'
import EquipmentText from '@/database/text_files/equipment.txt'
import PlayerRolesText from '@/database/text_files/player_roles.txt'
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
      selectedTab: 'Playing the Game',
      tabs: ['Playing the Game', 'Narrative', 'Travel', 'Equipment', 'Towns', 'Combat', 'Afflictions and Status', 'Terrain', 'Player Roles', 'Glossary'],
      text: [GameModes, NarrativeText, TravelText, EquipmentText, TownsText, CombatText, '', '', PlayerRolesText],
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
