<template>
  <div class="affliction--wrapper" inline>
    <div class="affliction--color-header">
      <div class="affliction--header">
        <h3 style="display: inline; font-style: normal;">{{ affliction.Name }}</h3>
      </div>
      <div class="affliction--keywords">
        <span v-if="(affliction.Desc.length > 0)" style="font-style: italic;">{{ affliction.Desc }}<br /></span>
      </div>
    </div>
    <div class="affliction--content">
      <display-tooltip-text :string="affliction.EffectHeader" />
      <div class="affliction--format" v-if="affliction.HasSpecial">
        <display-tooltip-text :string="affliction.SpecialHeader" />
      </div>
      <div class="affliction--format" v-if="affliction.HasReacts">
        <display-tooltip-text :string="affliction.ReactsHeader" />
      </div>
      <div class="affliction--format" v-if="affliction.HasRemove">
        <display-tooltip-text :string="affliction.RemoveHeader" />
      </div>
      <div class="affliction--format" v-if="affliction.HasPurge">
        <display-tooltip-text :string="affliction.PurgeHeader" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Affliction } from '@/class'

export default Vue.extend({
  name: 'affliction-card',
  props: {
    affliction: {
      type: Affliction,
      required: true,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isTooltip: function () {
      if (this.tooltip) return 'affliction--wrapper-tooltip'
      else return 'affliction--wrapper'
    },
  },
  components: {},
})
</script>

<style scoped lang="scss">
.affliction--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
  padding-top: $space--xs;
}
.affliction--wrapper-tooltip {
  font-family: $font--standard;
  height: 100%;
}
.affliction--color-header {
  border-bottom: 5px double black;
}
.affliction--header {
  text-align: center;
  color: black;
}
.affliction--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  padding-bottom: $space--xs;
}
.affliction--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
  padding-bottom: 0;
}
.affliction--reaction-content {
  font-size: $font-size--s;
  color: black;
  padding-left: $space--xs;
  padding-right: $space--xs;
}
.affliction--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
