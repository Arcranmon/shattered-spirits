<template>
  <span>
    <div class="button-separator">
      <display-tooltip-text :string="creationText" />
      <br />
      <br />
      <v-layout justify-center>
        <v-btn
          large
          tile
          color="success"
          @click="$emit('chose-spirit')"
          :disabled="!character.HasSpirit">
          <span v-if="!character.HasSpirit">CHOOSE A SPIRIT TYPE</span>
          <span v-else>CHOOSE {{ character.Element }}</span>
        </v-btn>
      </v-layout>
    </div>
    <div>
      <v-row>
        <v-col
          cols="3"
          class="element-box">
          <v-btn
            class="earth-button"
            large
            tile
            :disabled="character.Element == 'Earth'"
            @click="setSpirit('Earth')">
            <img
              class="image--icon-size image--left"
              :src="earthSymbol" />EARTH SPIRIT<img
              class="image--icon-size image--right"
              :src="earthSymbol" />
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="element-box">
          <v-btn
            class="flame-button"
            large
            tile
            :disabled="character.Element == 'Flame'"
            @click="setSpirit('Flame')">
            <img
              class="image--icon-size image--left"
              :src="flameSymbol" />FLAME SPIRIT<img
              class="image--icon-size image--right"
              :src="flameSymbol" />
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="element-box">
          <v-btn
            class="water-button"
            large
            tile
            :disabled="character.Element == 'Water'"
            @click="setSpirit('Water')">
            <img
              class="image--icon-size image--left"
              :src="waterSymbol" />WATER SPIRIT<img
              class="image--icon-size image--right"
              :src="waterSymbol" />
          </v-btn>
        </v-col>
        <v-col
          cols="3"
          class="element-box">
          <v-btn
            class="wind-button"
            large
            tile
            :disabled="character.Element == 'Wind'"
            @click="setSpirit('Wind')">
            <img
              class="image--icon-size image--left"
              :src="windSymbol" />WIND SPIRIT<img
              class="image--icon-size image--right"
              :src="windSymbol" />
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character } from '@/class'
import SpiritSelectionText from '@/database/text_files/character_creation/choosing_your_spirit.txt'
export default Vue.extend({
  name: 'spirit-selection',
  components: {},
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {}
  },
  methods: {
    setSpirit(variable) {
      this.character.Element = variable
      this.character.ClearSpiritInfo()
    },
  },
  computed: {
    creationText: function () {
      return SpiritSelectionText
    },
    earthSymbol: function () {
      return require('@/assets/disciplines/Earth.svg')
    },
    flameSymbol: function () {
      return require('@/assets/disciplines/Blaze.svg')
    },
    waterSymbol: function () {
      return require('@/assets/disciplines/Tide.svg')
    },
    windSymbol: function () {
      return require('@/assets/disciplines/Gale.svg')
    },
  },
})
</script>

<style scoped lang="scss">
.character-creation {
  font-size: smaller;
}
.button-separator {
  margin-bottom: 1em;
}
.element-box {
  text-align: center;
}
.earth-button {
  background-color: #e0c068 !important;
}
.flame-button {
  background-color: $color--flame !important;
}
.water-button {
  background-color: $color--water !important;
}
.wind-button {
  background-color: $color--wind !important;
}
</style>
