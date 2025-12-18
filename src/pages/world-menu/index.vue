<template>
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
      <display-tooltip-text :string="text[selectedIndex]"
    /></v-col>
  </v-row>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'
import WorldText from '@/database/text_files/world_of_deskar.txt'
import Greenvale from '@/database/text_files/greenvale.txt'
import Civilization from '@/database/text_files/civilization.txt'
import SampleCharacters from '@/database/text_files/sample_characters.txt'
export default Vue.extend({
  name: 'world-menu',
  components: {
    CustomButton,
  },
  data() {
    return {
      selectedIndex: 0,
      tabs: ['The World in Brief', 'Civilization Now', 'Greenvale', 'Sample Characters'],
      text: [WorldText, Civilization, Greenvale, SampleCharacters],
    }
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
