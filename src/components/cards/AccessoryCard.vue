<template>
  <div inline class="card--wrapper">
    <div class="card--underline-top">
      <div class="card--header">
        <h4 style="display: inline; font-style: normal">{{ accessory.Name }}</h4>
        <div class="card--keywords">
          <i
            ><span v-if="accessory.Desc.length > 0">{{ accessory.Desc }}<br /></span
          ></i>
        </div>
      </div>
    </div>
    <div class="card--content">
      <display-tooltip-text :string="accessory.EffectHeader" />
      <display-tooltip-text v-if="accessory.HasSpecial" :string="accessory.SpecialHeader" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Accessory } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'accessory-card',
  props: {
    accessory: {
      type: Accessory,
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
