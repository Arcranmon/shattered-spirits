<template>
  <div class="card--wrapper" inline>
    <div class="stance--color-header" v-bind:class="category">
      <div class="card--underline-top card--header">
        <h4 style="display: inline; font-style: normal;">{{ stance.Name }}</h4>
        <div>
          <b><display-tooltip-text :string="stance.ClassHeader" :decorate="false" /></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <display-tooltip-text :string="stance.RespiteHeader" /><br />
      <display-tooltip-text :string="stance.StaminaHeader" />
      <div v-if="stance.HasTraits">
        <display-tooltip-text :string="stance.TraitsHeader" />
      </div>
      <div v-if="stance.HasEffect">
        <display-tooltip-text :string="stance.EffectHeader" />
      </div>
      <div v-if="stance.HasSpecial">
        <display-tooltip-text :string="stance.SpecialHeader" />
      </div>
    </div>
    <div class="desc--box" v-if="(stance.Desc.length > 0)" style="font-style: italic;">{{ stance.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import ChartTable from '@/components/ChartTable.vue'
import ManeuverCard from './ManeuverCard.vue'
import { Stance } from '@/class'

export default Vue.extend({
  name: 'stance-card',
  props: {
    stance: {
      type: Stance,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: '#ece6dc',
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
  components: { ChartTable, ManeuverCard },
})
</script>

<style scoped lang="scss">
.stance--color-header {
  background-color: thistle;
}
</style>
