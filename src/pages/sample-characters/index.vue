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
      <template v-slot:selection="{ item }"> {{ prettyTab(item) }} </template>
      <template v-slot:item="{ item }">
        {{ prettyTab(item) }}
      </template>
    </v-select>
    <v-row
      class="background"
      style="margin-top: 1em"
      align="stretch">
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
              block
              stacked>
              <img
                :src="require('@/assets/disciplines/' + iconName(tab) + '.svg')"
                style="height: 2em" />{{ prettyTab(tab) }}
            </v-btn>
          </div>
        </v-btn-toggle>
      </v-col>
      <v-col
        :key="$route.params.tab"
        style="padding-left: 0; padding-bottom: 0; margin-bottom: 0; height: 100%"
        class="background">
        <div
          v-if="$route.params.tab == 'blaine'"
          style="margin-left: 1em; margin-right: 1em">
          <display-tooltip-text :string="characters[0][0]" />
          <show-character :character="characters[0][1]" />
        </div>
        <div
          v-if="$route.params.tab == 'erika'"
          style="margin-left: 1em; margin-right: 1em">
          <display-tooltip-text :string="characters[1][0]" />
          <show-character :character="characters[1][1]" />
        </div>
        <div
          v-if="$route.params.tab == 'john'"
          style="margin-left: 1em; margin-right: 1em">
          <display-tooltip-text :string="characters[2][0]" />
          <show-character :character="characters[2][1]" />
        </div>
        <div
          v-if="$route.params.tab == 'margaret'"
          style="margin-left: 1em; margin-right: 1em">
          <display-tooltip-text :string="characters[3][0]" />
          <show-character :character="characters[3][1]" />
        </div>
        <div
          v-if="$route.params.tab == 'marlon'"
          style="margin-left: 1em; margin-right: 1em">
          <display-tooltip-text :string="characters[4][0]" />
          <show-character :character="characters[4][1]" />
        </div>
        <div
          v-if="$route.params.tab == 'winona'"
          style="margin-left: 1em; margin-right: 1em">
          <display-tooltip-text :string="characters[5][0]" />
          <show-character :character="characters[5][1]" />
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

export default Vue.extend({
  name: 'sample-characters',
  components: { CustomButton, ShowCharacter },
  data() {
    return {
      selectedTab: 'basic-skills',
      tabs: ['blaine', 'erika', 'john', 'margaret', 'marlon', 'winona'],
      characters: [
        [BlaineText, Character.Deserialize(BlaineStats)],
        [ErikaText, Character.Deserialize(ErikaStats)],
        [JohnText, Character.Deserialize(JohnStats)],
        [MargaretText, Character.Deserialize(MargaretStats)],
        [MarlonText, Character.Deserialize(MarlonStats)],
        [WinonaText, Character.Deserialize(WinonaStats)],
      ],
      abilityTab: 0,
      character: new Character(),
    }
  },
  methods: {
    iconName: function (tab) {
      var map = { blaine: 'Flame', erika: 'Wood', john: 'Metal', margaret: 'Earth', marlon: 'Water', winona: 'Wind' }
      return map[tab]
    },
  },
  computed: {
    columns: function () {
      if (this.isMobile) return 1
      return 2
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
.character-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.select-bar {
  background: #85704c !important;
  padding-left: 0em;
  margin-left: 0em;
}
.ability-box {
  margin-top: 0 !important;
  padding-top: 0 !important;
  margin: 0.5em;
  margin-bottom: 0em;
  border: $border--black-standard;
  background-color: $color--grey-light !important;
  height: 100%;
}
.character-tab-content {
  background-color: $color--grey-light !important;
  padding: 1em;
  border-bottom: $border--black-standard;
  border-left: $border--black-standard;
}
</style>
