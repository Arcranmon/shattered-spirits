<template>
  <div>
    <v-select
      v-if="isMobile"
      v-model="selectedTab"
      :items="tabs"
      :item-text="(item) => prettyTab(item)"
      @change="updateTab(selectedTab)"
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
        <div v-if="$route.params.tab == 'sample-characters'">
          <div
            v-for="character in characters"
            :key="character.Name">
            <display-tooltip-text :string="character[0]" />
            <v-expansion-panels
              v-if="!showChart"
              class="condensed"
              flat
              tile
              accordion
              style="width: 100%">
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="expand--header-chart"
                  style="background-color: #85704c !important; background-image: none">
                  <h4>Show Character</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="expand--body-chart"
                  style="margin: 0 !important; padding-bottom: 0 !important">
                  <show-character :character="character[1]" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
        <div v-else>
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
import ShowCharacter from '@/components/ShowCharacter.vue'
import WorldText from '@/database/text_files/world_of_deskar.txt'
import Greenvale from '@/database/text_files/greenvale.txt'
import Civilization from '@/database/text_files/civilization.txt'
import BlaineText from '@/database/text_files/sample_characters/blaine.txt'
import BlaineStats from '@/database/sample_characters/blaine.json'
import JohnText from '@/database/text_files/sample_characters/john.txt'
import JohnStats from '@/database/sample_characters/john.json'
import MargaretText from '@/database/text_files/sample_characters/margaret.txt'
import MargaretStats from '@/database/sample_characters/margaret.json'
import MarlonText from '@/database/text_files/sample_characters/marlon.txt'
import MarlonStats from '@/database/sample_characters/marlon.json'
import ErikaText from '@/database/text_files/sample_characters/erika.txt'
import ErikaStats from '@/database/sample_characters/erika.json'
import WinonaText from '@/database/text_files/sample_characters/winona.txt'
import WinonaStats from '@/database/sample_characters/winona.json'
import Spirits from '@/database/text_files/spirits.txt'
import Threats from '@/database/text_files/threats.txt'
import Spiritcraft from '@/database/text_files/spiritcraft.txt'
import Seasons from '@/database/text_files/seasons.txt'
export default Vue.extend({
  name: 'world-menu',
  components: {
    CustomButton,
    ShowCharacter,
  },
  data() {
    return {
      selectedTab: 'the-world-in-brief',
      tabs: [
        'the-world-in-brief',
        'civilization-now',
        'spirits',
        'spiritcraft',
        'dangers-of-the-shattered-world',
        'the-seasons',
        'the-greenvale',
        'sample-characters',
      ],
      text: [WorldText, Civilization, Spirits, Spiritcraft, Threats, Seasons, Greenvale, ''],
      count: 0,
      characters: [
        [BlaineText, Character.Deserialize(BlaineStats)],
        [ErikaText, Character.Deserialize(ErikaStats)],
        [JohnText, Character.Deserialize(JohnStats)],
        [MargaretText, Character.Deserialize(MargaretStats)],
        [MarlonText, Character.Deserialize(MarlonStats)],
        [WinonaText, Character.Deserialize(WinonaStats)],
      ],
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
