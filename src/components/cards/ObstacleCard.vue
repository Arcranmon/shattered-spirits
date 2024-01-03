<template>
  <div class="card--wrapper" inline>
    <div class="card--color-header">
      <div class="card--underline-top card--header">
        <h3 style="display: inline; font-style: normal;">{{ obstacle.Name }}</h3>
        <div class="card--keywords">
          <span>
            <b>{{ obstacle.SizeHeader }}, {{ obstacle.HeightHeader }}, {{ obstacle.HardnessHeader }}<br /></b>
          </span>
          <b
            ><span v-for="(keyword, index) in obstacle.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div class="tech--format" v-if="obstacle.HasTraits">
        <display-tooltip-text :string="obstacle.TraitsHeader" />
      </div>
      <div class="tech--format" v-if="obstacle.HasSpecial">
        <display-tooltip-text :string="obstacle.SpecialHeader" />
      </div>
      <div class="tech--format" v-if="obstacle.HasInteract">
        <display-tooltip-text :string="obstacle.InteractHeader" />
      </div>
      <div class="tech--format" v-if="obstacle.HasForcedMovement">
        <display-tooltip-text :string="obstacle.ForcedMovementHeader" />
      </div>
      <div class="tech--format" v-if="obstacle.HasDestroy">
        <display-tooltip-text :string="obstacle.DestroyHeader" />
      </div>
      <div class="tech--format" v-if="obstacle.HasDamageType">
        <display-tooltip-text :string="obstacle.DamageType" />
      </div>
      <div class="expand--collapse-box-outlined" v-if="(obstacle.HasChart)">
        <v-expansion-panels class="condensed" flat tile>
          <v-expansion-panel style="background-color: inherit;"
            ><v-expansion-panel-header class="expand--header-chart">Attack Profile</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-chart"><chart-table :chart="obstacle.Chart" /></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <div class="desc--box" v-if="(obstacle.Desc.length > 0)" style="font-style: italic;">{{ obstacle.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import ChartTable from '@/components/ChartTable.vue'
import { Obstacle } from '@/class'

export default Vue.extend({
  name: 'obstacle-card',
  props: {
    obstacle: {
      type: Obstacle,
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
  components: { ChartTable },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
