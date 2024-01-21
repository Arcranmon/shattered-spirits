<template>
  <div v-bind:class="useFormatting" inline>
    <div v-bind:class="armor.Category">
      <div v-if="format" class="card--header card--underline-top">
        <h4 style="display: inline; font-style: normal;">{{ armor.Name }}</h4>
        <b>
          <div v-if="format" class="card--keywords">{{ armor.Category }}</div></b
        >
      </div>
    </div>
    <div v-bind:class="useContent">
      <display-tooltip-text :string="armor.ArmorHeader" /><br />
      <display-tooltip-text :string="armor.WeightHeader" /><br />
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
      if (this.format) return 'card--wrapper'
    },
    useContent: function () {
      if (this.format) return 'card--content'
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
