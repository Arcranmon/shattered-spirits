<template
  ><span>
    <div class="button-seperator">
      <div>
        <h3>Choosing Your Armor</h3>
        <display-tooltip-text :string="creationText" />
      </div>
      <br />
      <v-layout justify-center>
        <v-btn color="success" large tile @click="$emit('chose-armor')" :disabled="!character.HasEquippedArmor">
          <span v-if="!character.HasEquippedArmor">CHOOSE YOUR ARMOR</span>
          <span v-else>CHOOSE {{ character.EquippedArmor.Name }}</span>
        </v-btn></v-layout
      >
    </div>
    <display-tooltip-text string="Click an armor to select it!" />
    <div>
      <show-cards :inputs="armors" job="Armor" :selectButton="true" @chose="setArmor" :collapse="false" :character_creation="true" /></div
  ></span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character } from '@/class'
import ShowCards from '@/components/cards/ShowCards.vue'
import ArmorSelectionText from '@/database/text_files/character_creation/choosing_your_armor.txt'
export default Vue.extend({
  name: 'armor-selection',
  components: { ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  computed: {
    armors: function () {
      return this.$store.getters.getPlayerArmors()
    },
    creationText: function () {
      return ArmorSelectionText
    },
  },
  methods: {
    setArmor(variable) {
      this.character.EquippedArmor = variable.card
    },
  },
})
</script>

<style scoped lang="scss"></style>
