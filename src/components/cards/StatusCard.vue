<template>
  <div class="status--wrapper" inline>
    <div class="status--color-header">
      <div class="status--header">
        <h3 style="display: inline; font-style: normal;">{{ status.Name }}</h3>
      </div>
      <div class="status--keywords">
        <b>{{ status.Type }}</b>
        <div v-if="(status.Desc.length > 0)" style="font-style: italic;">{{ status.Desc }}</div>
      </div>
    </div>
    <div class="status--content">
      <display-tooltip-text :string="status.EffectHeader" />
      <div class="status--format" v-if="status.HasSpecial">
        <display-tooltip-text :string="status.SpecialHeader" />
      </div>
      <div class="status--format" v-if="status.HasNegate">
        <display-tooltip-text :string="status.NegateHeader" />
      </div>
      <div class="status--format" v-if="status.HasReacts">
        <display-tooltip-text :string="status.ReactsHeader" />
      </div>
      <div class="status--format" v-if="status.HasRemove">
        <display-tooltip-text :string="status.RemoveHeader" />
      </div>
      <div class="status--format" v-if="status.HasRecovery">
        <display-tooltip-text :string="status.RecoveryHeader" />
      </div>
    </div>
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
      if (this.tooltip) return 'status--wrapper-tooltip'
      else return 'status--wrapper'
    },
  },
  components: {},
})
</script>

<style scoped lang="scss">
.status--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
  padding-top: $space--xs;
}
.status--wrapper-tooltip {
  font-family: $font--standard;
  height: 100%;
}
.status--color-header {
  border-bottom: 5px double black;
}
.status--header {
  text-align: center;
  color: black;
}
.status--keywords {
  text-align: center;
  font-size: $font-size--m;
  color: black;
  padding-bottom: $space--xs;
}
.status--content {
  font-size: $font-size--m;
  color: black;
  padding: $space--xs;
  padding-bottom: 0;
}
.status--reaction-content {
  font-size: $font-size--m;
  color: black;
  padding-left: $space--xs;
  padding-right: $space--xs;
}
.status--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
