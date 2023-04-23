<template>
  <div v-bind:class="useFormatting" inline>
    <div v-bind:class="armor.Category">
      <div v-if="format" class="armor--header">
        <h3 style="display: inline; font-style: normal;">{{ armor.Name }}</h3>
      </div>
      <b>
        <div v-if="format" class="armor--keywords">{{ armor.Category }}{{ armor.WeightHeader }}{{ armor.DurabilityHeader }}</div></b
      >
    </div>
    <div v-bind:class="useContent">
      <display-tooltip-text :string="armor.GuardHeader" />
      <display-tooltip-text v-if="armor.HasSpecial" :string="armor.SpecialHeader" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Armor } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'armor-card',
  props: {
    armor: {
      type: Armor,
      required: true,
    },
    format: {
      type: Boolean,
      required: false,
      default: true,
    },
    on_sheet: {
      type: Boolean,
      required: false,
      default: false,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    useFormatting: function () {
      if (this.format) return 'armor--wrapper'
    },
    useContent: function () {
      if (this.format) return 'armor--content'
    },
  },
})
</script>

<style scoped lang="scss">
.armor--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
}
.armor--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
  padding-top: $space--xs;
}
.armor--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  border-bottom: 5px black solid;
  padding-bottom: $space--xs;
}
.armor--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
.armor--format {
  font-family: $font--standard;
  font-size: $font-size--s;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
.armor--format-no-text {
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
