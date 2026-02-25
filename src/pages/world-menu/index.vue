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
            v-for="(tab, index) in tabs"
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
      <v-col>
        <h2>{{ selectedTab }}</h2>
        <div v-if="selectedTab == 'Sample Characters'">
          <div v-for="character in characters">
            <img
              class="image--header-left"
              :src="character[1].Icon" />
            <img
              class="image--header-right"
              :src="character[1].Icon" />
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
                  style="background-color: #85704c !important; background-image: none"
                  ><h4>Show Character</h4></v-expansion-panel-header
                >
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
          <display-tooltip-text :string="text[tabs.indexOf(selectedTab)]" />
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
import JohnText from '@/database/text_files/sample_characters/john.txt'
import JohnStats from '@/database/sample_characters/john.json'
import ErikaText from '@/database/text_files/sample_characters/erika.txt'
import ErikaStats from '@/database/sample_characters/erika.json'
import WinonaText from '@/database/text_files/sample_characters/winona.txt'
import WinonaStats from '@/database/sample_characters/winona.json'
import Spirits from '@/database/text_files/spirits.txt'
import Spiritcraft from '@/database/text_files/spiritcraft.txt'
export default Vue.extend({
  name: 'world-menu',
  components: {
    CustomButton,
    ShowCharacter,
  },
  data() {
    return {
      selectedTab: 'The World in Brief',
      tabs: ['The World in Brief', 'Civilization Now', 'Greenvale', 'Sample Characters', 'Spirits', 'Spiritcraft'],
      text: [WorldText, Civilization, Greenvale, '', Spirits, Spiritcraft],
    }
  },
  computed: {
    characters() {
      return [
        [JohnText, Character.Deserialize(JohnStats)],
        [WinonaText, Character.Deserialize(WinonaStats)],
        [ErikaText, Character.Deserialize(ErikaStats)],
      ]
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
