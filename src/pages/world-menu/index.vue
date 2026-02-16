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
        <display-tooltip-text :string="text[tabs.indexOf(selectedTab)]" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'
import WorldText from '@/database/text_files/world_of_deskar.txt'
import Greenvale from '@/database/text_files/greenvale.txt'
import Civilization from '@/database/text_files/civilization.txt'
import SampleCharacters from '@/database/text_files/sample_characters.txt'
import Spirits from '@/database/text_files/spirits.txt'
import Spiritcraft from '@/database/text_files/spiritcraft.txt'
export default Vue.extend({
  name: 'world-menu',
  components: {
    CustomButton,
  },
  data() {
    return {
      selectedTab: 'The World in Brief',
      tabs: ['The World in Brief', 'Civilization Now', 'Greenvale', 'Sample Characters', 'Spirits', 'Spiritcraft'],
      text: [WorldText, Civilization, Greenvale, SampleCharacters, Spirits, Spiritcraft],
    }
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
