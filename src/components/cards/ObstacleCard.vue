<template>
  <div class="obstacle--wrapper" inline>
    <div class="obstacle--color-header">
      <div class="obstacle--header">
        <h3 style="display: inline; font-style: normal;">{{ obstacle.Name }}</h3>
      </div>
      <div class="obstacle--keywords">
        <span v-if="(obstacle.Desc.length > 0)" style="font-style: italic;">{{ obstacle.Desc }}<br /></span>
        <span style="font-style: bold;">
          <b>{{ obstacle.SizeHeader }}, {{ obstacle.HeightHeader }}, {{ obstacle.HardnessHeader }}<br /></b>
        </span>
        <b><display-tooltip-text v-if="obstacle.HasKeywords" :string="obstacle.KeywordsHeader" :decorate="false" /></b>
      </div>
    </div>
    <div class="obstacle--content">
      <div class="tech--format" v-if="obstacle.HasResistances">
        <display-tooltip-text :string="obstacle.ResistancesHeader" />
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
      if (this.tooltip) return 'obstacle--wrapper-tooltip'
      else return 'obstacle--wrapper'
    },
  },
  components: { ChartTable },
})
</script>

<style scoped lang="scss">
.obstacle--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
  padding-top: $space--xs;
}
.obstacle--wrapper-tooltip {
  font-family: $font--standard;
  height: 100%;
}
.obstacle--color-header {
  border-bottom: 5px double black;
}
.obstacle--header {
  text-align: center;
  color: black;
}
.obstacle--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  padding-bottom: $space--xs;
}
.obstacle--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
  padding-bottom: 0;
}
.obstacle--reaction-content {
  font-size: $font-size--s;
  color: black;
  padding-left: $space--xs;
  padding-right: $space--xs;
}
.obstacle--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
