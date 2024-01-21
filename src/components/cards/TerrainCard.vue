<template>
  <div class="card--wrapper" inline>
    <div class="card--color-header">
      <div class="card--underline-top card--header">
        <h3 style="display: inline; font-style: normal;">{{ terrain.Name }}</h3>
        <div>
          <b><display-tooltip-text :string="terrain.TerrainDetails" :decorate="false" /></b>
        </div>
        <div class="card--keywords">
          <b
            ><span v-for="(keyword, index) in terrain.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div class="card--format">
        <display-tooltip-text :string="terrain.EffectHeader" />
      </div>
      <div class="card--format" v-if="terrain.HasSpecial">
        <display-tooltip-text :string="terrain.SpecialHeader" />
      </div>
      <div class="card--format" v-if="terrain.HasNegate">
        <display-tooltip-text :string="terrain.NegateHeader" />
      </div>
      <div class="card--format" v-if="terrain.HasDestroy">
        <display-tooltip-text :string="terrain.DestroyHeader" />
      </div>
      <div class="card--format" v-if="terrain.HasInteractions">
        <display-tooltip-text :string="terrain.InteractionsHeader" />
      </div>
    </div>
    <div class="desc--box" v-if="(terrain.Desc.length > 0)" style="font-style: italic;">{{ terrain.Desc }}<br /></div>
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
