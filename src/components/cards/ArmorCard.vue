<template>
  <div class="card--wrapper" inline>
    <div class="Armor">
      <div class="card--header card--underline-top">
        <h4 style="display: inline; font-style: normal;">{{ armor.Name }}</h4>
        <b>
          <div class="card--keywords">{{ armor.Category }}</div></b
        >
      </div>
    </div>
    <div class="card--content">
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
})
</script>

<style scoped lang="scss">
.a {
}
</style>
