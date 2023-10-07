<template>
  <span
    ><span v-if="this.partitioned"
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)" /></template
        ><display-tooltip-text
          string="When reading this effect, add the first value on a _Miss_, the second a _Graze_, the third on a _Hit_ and the final on a _Crit_."
          :level="level + 1" /></v-menu></span
    ><span v-else-if="this.$store.getters.existsInAnyGlossary(input)"
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)" /></template
        ><display-tooltip-text :string="this.$store.getters.getGlossaryItem(input)" :level="level + 1" /></v-menu></span
    ><span v-else-if="this.$store.getters.isObstacle(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <obstacle-card :obstacle="this.$store.getters.getObstacle(input)" :tooltip="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isTerrain(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <terrain-card :terrain="this.$store.getters.getTerrain(input)" :tooltip="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isStatus(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <status-card :status="this.$store.getters.getStatus(input)" /></v-menu></span
    ><span v-else-if="this.$store.getters.isManeuver(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <maneuver-card :maneuver="this.$store.getters.getManeuver(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isStance(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <stance-card :stance="this.$store.getters.getStance(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isTechnique(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <tech-card :tech="this.$store.getters.getTechnique(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isArmor(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <armor-card :armor="this.$store.getters.getArmor(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isAttack(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <attack-card :attack="this.$store.getters.getAttack(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isWeapon(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <attack-card :atack="this.$store.getters.getWeapon(input)" :format_text="true" /></v-menu></span
    ><span style="white-space: pre-wrap;" v-else v-html="$marked.parseInline(input)"
  /></span>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import ArmorCard from './cards/ArmorCard.vue'
import ManeuverCard from './cards/ManeuverCard.vue'
import ObstacleCard from './cards/ObstacleCard.vue'
import StanceCard from './cards/StanceCard.vue'
import StatusCard from './cards/StatusCard.vue'
import TechCard from './cards/TechCard.vue'
import TerrainCard from './cards/TerrainCard.vue'
import AttackCard from './cards/AttackCard.vue'
export default Vue.extend({
  name: 'tooltip',
  components: { ArmorCard, ManeuverCard, ObstacleCard, StanceCard, StatusCard, TechCard, TerrainCard, AttackCard },
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
    level: {
      type: Number,
      required: false,
      default: 0,
    },
    partitioned: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<style scoped lang="scss">
.v-menu__content {
  color: black;
  font-family: $font--standard;
  font-size: $font-size--s;
  background-color: $color--off-white;
  border: $border--black-standard;
  max-width: 40%;
  padding: 0.1em;
}
.object {
  padding: 0px;
  border: none;
  width: 40%;
  font-size: $font-size--m;
}
.v-tooltip__content.menuable__content__active {
  opacity: 1 !important;
}
</style>
