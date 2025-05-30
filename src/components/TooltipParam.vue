<template>
  <span
    ><span v-if="this.partitioned"
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)" /></template
        ><display-tooltip-text string="Use the first value in _Phase_ 1, the second in _Phase_ 2, and so on." :level="level + 1" /></v-menu></span
    ><span v-else-if="this.$store.getters.existsInAnyGlossary(input)"
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)" /></template
        ><display-tooltip-text :string="this.$store.getters.getGlossaryItem(input)" :level="level + 1" /></v-menu></span
    ><span v-else-if="this.$store.getters.isFeature(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <feature-card :feature="this.$store.getters.getFeature(input)" :tooltip="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isTerrain(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <terrain-card :terrain="this.$store.getters.getTerrain(input)" :tooltip="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isStatus(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <status-card :status="this.$store.getters.getStatus(input)" /></v-menu></span
    ><span v-else-if="this.$store.getters.isManeuver(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <maneuver-card :maneuver="this.$store.getters.getManeuver(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isStance(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <stance-card :stance="this.$store.getters.getStance(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isTechnique(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <tech-card :tech="this.$store.getters.getTechnique(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isArmor(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <armor-card :armor="this.$store.getters.getArmor(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isWeapon(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <weapon-card :weapon="this.$store.getters.getWeapon(input)" :format_text="true" /></v-menu></span
    ><span v-else-if="this.$store.getters.isArt(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <art-card :art="this.$store.getters.getArt(input)" /></v-menu></span
    ><span v-else-if="this.$store.getters.isTalent(input)" attach
      ><v-menu :close-on-content-click="false" bottom nudge-bottom="20" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <talent-card :talent="this.$store.getters.getTalent(input)" style="border: 0.5em double black" /></v-menu></span
    ><span style="white-space: pre-wrap" v-else v-html="$marked.parseInline(input)"
  /></span>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import ArmorCard from './cards/ArmorCard.vue'
import ArtCard from './cards/ArtCard.vue'
import ManeuverCard from './cards/ManeuverCard.vue'
import FeatureCard from './cards/FeatureCard.vue'
import StanceCard from './cards/StanceCard.vue'
import StatusCard from './cards/StatusCard.vue'
import TechCard from './cards/TechCard.vue'
import TalentCard from './cards/TalentCard.vue'
import TerrainCard from './cards/TerrainCard.vue'
import WeaponCard from './cards/WeaponCard.vue'
export default Vue.extend({
  name: 'tooltip',
  components: { ArmorCard, ArtCard, ManeuverCard, FeatureCard, StanceCard, StatusCard, TalentCard, TechCard, TerrainCard, WeaponCard },
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
  font-size: $font-size--m;
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
