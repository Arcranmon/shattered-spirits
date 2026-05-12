<template>
  <div>
    <v-select
      v-if="isMobile"
      v-model="selectedTab"
      :items="tabs"
      :item-text="(item) => `${prettyTab(item)}`"
      @change="updateTab(selectedTab)"
      attach
      filled
      outlined
      style="margin: 1em; margin-bottom: -1em">
      <template v-slot:selection="{ item }">
        {{ prettyTab(item) }}
      </template>
      <template v-slot:item="{ item }">
        {{ prettyTab(item) }}
      </template>
    </v-select>
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
            :key="tab"
            style="width: 100%">
            <v-btn
              @click="updateTab(tab)"
              class="button--style"
              depressed
              tile
              block>
              {{ prettyTab(tab) }}
            </v-btn>
          </div>
        </v-btn-toggle>
      </v-col>
      <v-col
        :key="$route.params.tab"
        style="padding-left: 0; padding-bottom: 0">
        <h2>{{ prettyTab($route.params.tab) }}</h2>
        <div
          v-if="$route.params.tab == 'statuses'"
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
          v-if="$route.params.tab == 'conditions-and-wounds'"
          class="character-tab-content">
          <v-select
            v-model="selectedAfflictions"
            :items="afflictionCategories"
            attach
            label="Affliction Categories"
            multiple
            filled
            outlined>
          </v-select>
          <show-cards
            :inputs="afflictions"
            :collapse="false"
            :cols="1" />
        </div>
        <div
          v-if="$route.params.tab == 'terrain'"
          class="character-tab-content">
          <show-cards
            :inputs="terrains"
            :collapse="false"
            :cols="1" />
        </div>

        <div
          v-if="$route.params.tab == 'glossary'"
          style="padding-left: 1em">
          <div
            v-for="key of glossaryItems.keys()"
            :key="key">
            <h3>{{ key }}</h3>
            <div
              v-for="item of glossaryItems.get(key)"
              :key="item"
              style="padding-bottom: 1em">
              <display-tooltip-text :string="'**' + item.name + ':** ' + item.effect" />
            </div>
          </div>
        </div>
        <display-tooltip-text
          v-else
          :string="text[tabs.indexOf($route.params.tab)]"
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
import CharCreationText from '@/database/text_files/character_creation_and_progression.txt'
import ShowCards from '@/components/cards/ShowCards.vue'
import StatusCard from '@/components/cards/StatusCard.vue'
import BasicTable from '@/components/BasicTable.vue'

export default Vue.extend({
  name: 'rules-menu',
  components: {
    CustomButton,
    StatusCard,
    ShowCards,
    BasicTable,
  },

  data() {
    return {
      // Add Towns, Downtime, and Player Roles back eventually
      selectedTab: 'playing-the-game',
      tabs: [
        'playing-the-game',
        'narrative',
        'journey',
        'combat',
        'character-creation-and-progression',
        'equipment',
        'statuses',
        'conditions-and-wounds',
        'terrain',
        'player-roles',
        'glossary',
      ],
      text: [GameModes, NarrativeText, TravelText, CombatText, CharCreationText, EquipmentText, '', '', '', PlayerRolesText, ''],
      statusCategories: ['Minor Status', 'Emotional Status', 'Status', 'Instant Effect'],
      selectedStatuses: ['Minor Status', 'Emotional Status', 'Status', 'Instant Effect'],
      afflictionCategories: ['Condition', 'Greater Condition', 'Minor Wound', 'Moderate Wound', 'Major Wound'],
      selectedAfflictions: ['Condition', 'Minor Wound'],
      selectedStatus: null,
      selectedTerrain: null,
    }
  },
  computed: {
    afflictions: function () {
      return this.$store.getters.getFilteredStatuses(this.selectedAfflictions).sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
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
