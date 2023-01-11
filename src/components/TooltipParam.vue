<template>
  <span
    ><span v-if="this.$store.getters.existsInAnyGlossary(input)"
      ><v-tooltip bottom nudge-top="8"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)" /></template
        ><span>{{ this.$store.getters.getGlossaryItem(input) }}</span></v-tooltip
      ></span
    ><span v-else-if="this.$store.getters.isObstacle(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <obstacle-card :obstacle="this.$store.getters.getObstacle(input)" :tooltip="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isTerrain(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <terrain-card :terrain="this.$store.getters.getTerrain(input)" :tooltip="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isAffliction(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <affliction-card :affliction="this.$store.getters.getAffliction(input)" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isStatus(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <status-card :status="this.$store.getters.getStatus(input)" /></v-tooltip></span
    ><span style="white-space: pre-wrap;" v-else v-html="$marked.parseInline(input)"
  /></span>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import ObstacleCard from './cards/ObstacleCard.vue'
import TerrainCard from './cards/TerrainCard.vue'
import AfflictionCard from './cards/AfflictionCard.vue'
import StatusCard from './cards/StatusCard.vue'
export default Vue.extend({
  name: 'tooltip',
  components: { AfflictionCard, ObstacleCard, StatusCard, TerrainCard },
  props: {
    input: {
      type: String,
      required: true,
    },
    decorate: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<style scoped lang="scss">
.v-tooltip__content {
  color: black;
  font-family: $font--standard;
  font-size: $font-size--s;
  background-color: $color--off-white;
  border: $border--black-standard;
  width: 20%;
}
.object {
  padding: 0px;
  border: none;
  width: 25%;
  font-size: $font-size--m;
}
.v-tooltip__content.menuable__content__active {
  opacity: 1 !important;
}
</style>
