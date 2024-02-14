<template>
  <div class="card--wrapper" inline>
    <div class="card--color-header">
      <img class="image--header-left" :src="status.Icon" />
      <img class="image--header-right" :src="status.Icon" />
      <div class="card--underline-top card--header">
        <h3 style="display: inline; font-style: normal;">{{ status.Name }}</h3>
        <div class="card--keywords">
          <b>{{ status.Type }}</b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <display-tooltip-text :string="status.EffectHeader" />
      <div class="card--format" v-if="status.HasSpecial">
        <display-tooltip-text :string="status.SpecialHeader" />
      </div>
      <div class="card--format" v-if="status.HasNegate">
        <display-tooltip-text :string="status.NegateHeader" />
      </div>
      <div class="card--format" v-if="status.HasReacts">
        <display-tooltip-text :string="status.ReactsHeader" />
      </div>
      <div class="card--format" v-if="status.HasRemove">
        <display-tooltip-text :string="status.RemoveHeader" />
      </div>
      <div class="card--format" v-if="status.HasRecovery">
        <display-tooltip-text :string="status.RecoveryHeader" />
      </div>
    </div>
    <div class="desc--box" v-if="(status.Desc.length > 0)" style="font-style: italic;">{{ status.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Status } from '@/class'

export default Vue.extend({
  name: 'status-card',
  props: {
    status: {
      type: Status,
      required: true,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isTooltip: function () {
      if (this.tooltip) return 'card--wrapper-tooltip'
      else return 'card--wrapper'
    },
  },
  components: {},
})
</script>

<style scoped lang="scss">
.a {
}
</style>
