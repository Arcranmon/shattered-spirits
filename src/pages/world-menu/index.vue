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
            v-for="(tab, index) in tabs"
            :key="index"
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
      <v-col>
        <h2>{{ prettyTab($route.params.tab) }}</h2>
        <div>
          <display-tooltip-text :string="text[tabs.indexOf($route.params.tab)]" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import CustomButton from '@/components/Button.vue'
import WorldText from '@/database/text_files/world_of_deskar.txt'
import Greenvale from '@/database/text_files/greenvale.txt'
import Civilization from '@/database/text_files/civilization.txt'
import Spirits from '@/database/text_files/spirits.txt'
import Threats from '@/database/text_files/threats.txt'
import Spiritcraft from '@/database/text_files/spiritcraft.txt'
import Seasons from '@/database/text_files/seasons.txt'
export default Vue.extend({
  name: 'world-menu',
  components: {
    CustomButton,
  },
  data() {
    return {
      selectedTab: 'the-world-in-brief',
      tabs: ['the-world-in-brief', 'civilization-now', 'spirits', 'spiritcraft', 'dangers-of-the-shattered-world', 'the-seasons', 'the-greenvale'],
      text: [WorldText, Civilization, Spirits, Spiritcraft, Threats, Seasons, Greenvale],
      count: 0,
    }
  },
  methods: {
    prettyTab(tab) {
      var newTab = tab.replaceAll('-', ' ')
      newTab = newTab
        .split(' ')
        .map((word) => (word != 'and' && word != 'of' && word != 'the' ? word.charAt(0).toUpperCase() + word.slice(1) : word))
        .join(' ')
      return newTab.charAt(0).toUpperCase() + newTab.slice(1)
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
