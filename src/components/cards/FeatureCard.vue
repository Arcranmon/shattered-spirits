<template>
  <div
    class="card--wrapper"
    inline>
    <div v-bind:class="feature.ColorHeader">
      <div class="card--underline-top card--header">
        <img
          class="image--header-left"
          :src="feature.Icon" />
        <img
          class="image--header-right"
          :src="feature.Icon" />
        <h3 style="display: inline; font-style: normal">{{ feature.Name }}</h3>
        <b>
          <div class="card--keywords">
            <div>
              <display-tooltip-text
                :string="feature.ElementHeader"
                :decorate="false" />
            </div>
            <span> {{ feature.DetailsHeader }}<br /> </span>
            <span
              v-for="(keyword, index) in feature.Keywords"
              :key="index"
              class="keyword--box">
              <display-tooltip-text
                :string="keyword"
                :decorate="false" />
            </span>
          </div>
        </b>
      </div>
    </div>
    <div class="card--content">
      <div
        class="tech--format"
        v-if="feature.HasDefenses">
        <display-tooltip-text :string="feature.DefensesHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasResistances">
        <display-tooltip-text :string="feature.ResistancesHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasTraits">
        <display-tooltip-text :string="feature.TraitsHeader" />
      </div>
      <div class="card--format">
        <display-tooltip-text :string="feature.PositionEffectHeader" />
      </div>
      <div class="card--format">
        <display-tooltip-text :string="feature.PathEffectHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasSpecial">
        <display-tooltip-text :string="feature.SpecialHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasInteract">
        <display-tooltip-text :string="feature.InteractHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasForcedMovement">
        <display-tooltip-text :string="feature.ForcedMovementHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasDestroy">
        <display-tooltip-text :string="feature.DestroyHeader" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasDamageType">
        <display-tooltip-text :string="feature.DamageType" />
      </div>
      <div
        class="tech--format"
        v-if="feature.HasCollision">
        <display-tooltip-text :string="feature.CollisionHeader" />
      </div>
      <div
        class="expand--collapse-box-outlined"
        v-if="feature.HasChart">
        <v-expansion-panels
          class="condensed"
          flat
          tile>
          <v-expansion-panel style="background-color: inherit">
            <v-expansion-panel-header class="expand--header-chart">Attack Profile</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-chart">
              <chart-table :chart="feature.Chart" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <div
      class="desc--box"
      v-if="feature.Desc.length > 0"
      style="font-style: italic">
      {{ feature.Desc }}<br />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ChartTable from '@/components/ChartTable.vue'
import { Feature } from '@/class'

export default Vue.extend({
  name: 'feature-card',
  props: {
    feature: {
      type: Feature,
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
