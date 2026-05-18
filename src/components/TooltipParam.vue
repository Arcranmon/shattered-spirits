<template>
  <span>
    <span v-if="this.partitioned">
      <v-menu
        :close-on-content-click="false"
        bottom
        nudge-bottom="20">
        <template v-slot:activator="{ on, attrs }">
          <span
            style="white-space: pre-wrap"
            v-bind:class="{ dotted: decorate }"
            v-bind="attrs"
            v-on="on"
            v-html="$marked.parseInline(input)" />
        </template>
        <display-tooltip-text
          string="Use each value for a _Miss_, _Graze_, _Hit_, and _Crit_ respectively."
          :level="level + 1" />
      </v-menu>
    </span>
    <span
      v-else-if="this.$store.getters.isTerrain(input)"
      attach>
      <v-menu
        :close-on-content-click="false"
        bottom
        nudge-bottom="20"
        content-class="object">
        <template v-slot:activator="{ on, attrs }">
          <span
            style="white-space: pre-wrap"
            v-bind:class="{ dotted: decorate }"
            v-bind="attrs"
            v-on="on"
            v-html="$marked.parseInline(input)" />
        </template>
        <base-widget
          :ability="this.$store.getters.getTerrain(input)"
          :tooltip="true" />
      </v-menu>
    </span>
    <span
      v-else-if="this.$store.getters.isStatus(input)"
      attach>
      <v-menu
        :close-on-content-click="false"
        bottom
        nudge-bottom="20"
        content-class="object">
        <template v-slot:activator="{ on, attrs }">
          <span
            style="white-space: pre-wrap"
            v-bind:class="{ dotted: decorate }"
            v-bind="attrs"
            v-on="on"
            v-html="$marked.parseInline(input)" />
        </template>
        <base-widget :ability="this.$store.getters.getStatus(input)" />
      </v-menu>
    </span>
    <span v-else-if="inputIfExists">
      <v-menu
        :close-on-content-click="false"
        bottom
        nudge-bottom="20">
        <template v-slot:activator="{ on, attrs }">
          <span
            style="white-space: pre-wrap"
            v-bind:class="{ dotted: decorate }"
            v-bind="attrs"
            v-on="on"
            v-html="$marked.parseInline(input)" /> </template
        ><show-appropriate-card :input="inputIfExists" />
      </v-menu>
    </span>
    <span
      style="white-space: pre-wrap"
      v-else
      v-html="$marked.parseInline(input)" />
  </span>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import BaseWidget from './BaseWidget.vue'
import ManeuverCard from './cards/ManeuverCard.vue'
import FeatureCard from './cards/FeatureCard.vue'
import StanceCard from './cards/StanceCard.vue'
import StatusCard from './cards/StatusCard.vue'
import TechCard from './cards/TechCard.vue'
import TerrainCard from './cards/TerrainCard.vue'
import TraitCard from './cards/TraitCard.vue'
import WeaponWidget from './cards/WeaponWidget.vue'
import AbilityWidget from './AbilityWidget.vue'
import ShowAppropriateCard from './ShowAppropriateCard.vue'
export default Vue.extend({
  name: 'tooltip',
  components: {
    ShowAppropriateCard,
    BaseWidget,
    ManeuverCard,
    FeatureCard,
    StanceCard,
    StatusCard,
    TechCard,
    TerrainCard,
    TraitCard,
    WeaponWidget,
    AbilityWidget,
  },
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
  computed: {
    inputIfExists() {
      return this.$store.getters.getFromEverything(this.input)
    },
  },
})
</script>

<style scoped lang="scss">
.object {
  padding: 0px;
  border: none;
  width: 40%;
  font-size: $font-size--m;
  border-top-left-radius: 1em;
}
.v-tooltip__content.menuable__content__active {
  opacity: 1 !important;
}
</style>
