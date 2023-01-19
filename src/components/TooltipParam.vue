<template>
  <span
    ><span v-if="this.$store.getters.existsInAnyGlossary(input)"
      ><v-tooltip bottom nudge-top="8"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)" /></template
        ><span>{{ this.$store.getters.getGlossaryItem(input).replace(/_/g, '') }}</span></v-tooltip
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
    ><span v-else-if="this.$store.getters.isEnhancement(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <enhancement-card :enhancement="this.$store.getters.getEnhancement(input)" :format_text="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isStance(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <stance-card :stance="this.$store.getters.getStance(input)" :format_text="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isTechnique(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <tech-card :tech="this.$store.getters.getTechnique(input)" :format_text="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isReaction(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <reaction-card :reaction="this.$store.getters.getReaction(input)" :format_text="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isArmor(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <armor-card :armor="this.$store.getters.getArmor(input)" :format_text="true" /></v-tooltip></span
    ><span v-else-if="this.$store.getters.isWeapon(input)" attach
      ><v-tooltip bottom nudge-top="8" content-class="object"
        ><template v-slot:activator="{ on, attrs }">
          <span style="white-space: pre-wrap;" v-bind:class="{ dotted: decorate }" v-bind="attrs" v-on="on" v-html="$marked.parseInline(input)"
        /></template>
        <weapon-card :weapon="this.$store.getters.getArmor(input)" :format_text="true" /></v-tooltip></span
    ><span style="white-space: pre-wrap;" v-else v-html="$marked.parseInline(input)"
  /></span>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import AfflictionCard from './cards/AfflictionCard.vue'
import ArmorCard from './cards/ArmorCard.vue'
import EnhancementCard from './cards/EnhancementCard.vue'
import ObstacleCard from './cards/ObstacleCard.vue'
import ReactionCard from './cards/ReactionCard.vue'
import StanceCard from './cards/StanceCard.vue'
import StatusCard from './cards/StatusCard.vue'
import TechCard from './cards/TechCard.vue'
import TerrainCard from './cards/TerrainCard.vue'
import WeaponCard from './cards/WeaponCard.vue'
export default Vue.extend({
  name: 'tooltip',
  components: { AfflictionCard, ArmorCard, EnhancementCard, ObstacleCard, ReactionCard, StanceCard, StatusCard, TechCard, TerrainCard, WeaponCard },
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
