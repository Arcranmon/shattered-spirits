<template
  ><span>
    <div class="button-separator">
      <display-tooltip-text :string="creationText" />
      <br />
      <br />
      NOTE: At the moment, only Earth Spirits are available!
      <v-layout justify-center
        ><v-btn color="success" large tile @click="$emit('chose-spirit')" :disabled="!character.HasSpirit">
          <span v-if="!character.HasSpirit">CHOOSE A SPIRIT TYPE</span>
          <span v-else>CHOOSE {{ character.SpiritType }}</span>
        </v-btn></v-layout
      >
    </div>
    <div>
      <v-row
        ><v-col cols="12" class="element-box">
          <v-btn class="earth-button" large tile :disabled="(character.SpiritType == 'Earth')" @click="setSpirit('Earth')"
            ><img class="image--icon-size" :src="earthSymbol" />EARTH SPIRIT<img class="image--icon-size" :src="earthSymbol"
          /></v-btn> </v-col
        ><!-- <v-col cols="2" class="element-box">
          <v-btn
            :color="variables.flame"
            large
            tile
            :disabled="(character.SpiritType == 'Flame')"
            @click="setSpirit('Flame')"
            >Flame</v-btn
          > </v-col
        ><v-col cols="2" class="element-box">
          <v-btn
            :color="variables.metal"
            large
            tile
            :disabled="(character.SpiritType == 'Metal')"
            @click="setSpirit('Metal')"
            >METAL</v-btn
          > </v-col
        ><v-col cols="2" class="element-box">
          <v-btn
            :color="variables.water"
            large
            tile
            :disabled="(character.SpiritType == 'Water')"
            @click="setSpirit('Water')"
            >WATER</v-btn
          > </v-col
        ><v-col cols="2" class="element-box">
          <v-btn
            :color="variables.wind"
            large
            tile
            :disabled="(character.SpiritType == 'Wind')"
            @click="setSpirit('Wind')"
            >WIND</v-btn
          > </v-col
        ><v-col cols="2" class="element-box">
          <v-btn
            :color="variables.wood"
            large
            tile
            :disabled="(character.SpiritType == 'Wood')"
            @click="setSpirit('Wood')"
            >WOOD</v-btn
          ></v-col
        >--></v-row
      >
    </div></span
  >
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
      this.character.SpiritType = variable
      //this.character.ClearSpiritInfo()
    },
  },
  computed: {
    creationText: function () {
      return SpiritSelectionText
    },
    earthSymbol: function () {
      return require('@/assets/Land.svg')
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
  font-family: $font--standard;
}
</style>
