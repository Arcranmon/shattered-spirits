<template>
  <div class="terrain--wrapper" inline>
    <div class="terrain--color-header">
      <div class="terrain--header">
        <h3 style="display: inline; font-style: normal;">{{ terrain.Name }}</h3>
      </div>
      <div class="terrain--keywords">
        <span v-if="(terrain.Desc.length > 0)" style="font-style: italic;">{{ terrain.Desc }}<br /></span>
        <b><display-tooltip-text v-if="terrain.HasKeywords" :string="terrain.KeywordsHeader" :decorate="false" /></b>
      </div>
    </div>
    <div class="terrain--content">
      <display-tooltip-text :string="terrain.EffectHeader" />
      <div class="tech--format" v-if="terrain.HasNegate">
        <display-tooltip-text :string="terrain.NegateHeader" />
      </div>
      <div class="tech--format" v-if="terrain.HasOverrides">
        <display-tooltip-text :string="terrain.OverridesHeader" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Terrain } from '@/class'

export default Vue.extend({
  name: 'terrain-card',
  props: {
    terrain: {
      type: Terrain,
      required: true,
    },
    tooltip: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    isTooltip: function () {
      if (this.tooltip) return 'terrain--wrapper-tooltip'
      else return 'terrain--wrapper'
    },
  },
  components: {},
})
</script>

<style scoped lang="scss">
.terrain--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
  padding-top: $space--xs;
}
.terrain--color-header {
  border-bottom: 5px double black;
}
.terrain--header {
  text-align: center;
  color: black;
}
.terrain--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  padding-bottom: $space--xs;
}
.terrain--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
  padding-bottom: 0;
}
.terrain--reaction-content {
  font-size: $font-size--s;
  color: black;
  padding-left: $space--xs;
  padding-right: $space--xs;
}
.terrain--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
