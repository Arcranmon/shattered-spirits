<template>
  <div style="padding: 1em;">
    <div class="armor--box" style="background-color: DarkGray;">
      <h2>No Armor</h2>
      <display-tooltip-text class="page--description" :string="noArmorText" />
      <show-cards :inputs="no" job="Armor" :collapse="false" />
    </div>
    <div class="armor--box" style="background-color: DarkGray;">
      <h2>Light Armor</h2>
      <display-tooltip-text class="page--description" :string="lightArmorText" />
      <show-cards :inputs="light" job="Armor" :collapse="false" />
    </div>
    <div class="armor--box" style="background-color: DarkGray;">
      <h2>Heavy Armor</h2>
      <display-tooltip-text class="page--description" :string="heavyArmorText" />
      <show-cards :inputs="heavy" job="Armor" :collapse="false" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import NoArmorText from '@/database/text_files/armor/no_armor.txt'
import LightArmorText from '@/database/text_files/armor/light_armor.txt'
import HeavyArmorText from '@/database/text_files/armor/heavy_armor.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'weapons',
  components: {
    ShowCards,
  },
  computed: {
    no: function () {
      return this.$store.getters.getArmorByCategory('No Armor')
    },
    noArmorText: function () {
      return NoArmorText
    },
    light: function () {
      return this.$store.getters.getArmorByCategory('Light Armor')
    },
    lightArmorText: function () {
      return LightArmorText
    },
    heavy: function () {
      return this.$store.getters.getArmorByCategory('Heavy Armor')
    },
    heavyArmorText: function () {
      return HeavyArmorText
    },
  },
})
</script>

<style scoped lang="scss">
.armor--box {
  border: $border--black-standard;
  margin-top: -2px;
}
</style>
