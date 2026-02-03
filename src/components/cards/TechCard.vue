<template>
  <div class="card--wrapper">
    <div v-bind:class="tech.Type">
      <div class="card--underline-top card--header">
        <img class="image--header-left" :src="tech.Image" />
        <img class="image--header-right" :src="tech.Image" />
        <h4 style="display: inline; font-style: normal">{{ tech.Name }}</h4>
        <div class="card--keywords" v-bind:class="tech.Type">
          <span v-if="tech.Attack"> </span>
          <div>
            <b><display-tooltip-text :string="tech.categoryHeader" :decorate="false" /></b>
          </div>
          <span> <display-tooltip-text :string="tech.SpeedHeader" /><br /> </span>
          <b
            ><span v-for="(keyword, index) in tech.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div v-if="tech.HasCost">
        <display-tooltip-text class="card--format" :string="tech.CostHeader" />
      </div>
      <div class="card--format" v-if="tech.HasReqs">
        <display-tooltip-text :string="tech.ReqsHeader" />
      </div>
      <div v-if="tech.HasArea"><display-tooltip-text :string="tech.AreaHeader" /></div>
      <div v-if="tech.HasRange">
        <display-tooltip-text :string="tech.RangeHeader" />
      </div>
      <div class="card--format" v-if="tech.HasWeapon">
        <display-tooltip-text :string="tech.WeaponHeader" />
      </div>
      <div class="card--format" v-if="tech.HasTrigger">
        <display-tooltip-text :string="tech.TriggerHeader" />
      </div>
      <div class="card--format" v-if="tech.HasTarget">
        <display-tooltip-text :string="tech.TargetHeader" />
      </div>
      <div class="card--format" v-if="tech.HasMove">
        <display-tooltip-text :string="tech.MoveHeader" />
      </div>
      <div class="card--format" v-if="tech.HasEffect">
        <display-tooltip-text :string="tech.EffectHeader" />
      </div>
      <div class="card--format" v-if="tech.HasSpecial">
        <display-tooltip-text :string="tech.SpecialHeader" />
      </div>
      <div class="card--format" v-if="tech.HasImbue">
        <display-tooltip-text :string="tech.ImbueHeader" />
      </div>
      <div class="card--format" v-if="tech.HasEnhance">
        <display-tooltip-text :string="tech.EnhanceHeader" />
      </div>
      <div class="card--format" v-if="tech.HasLinked">
        <display-tooltip-text :string="tech.LinkedHeader" />
      </div>
      <div class="expand--collapse-box-outlined" v-if="tech.HasChart">
        <v-expansion-panels class="condensed" flat tile :mandatory="this.character_creation ? true : false">
          <v-expansion-panel style="background-color: inherit"
            ><v-expansion-panel-header class="expand--header-chart">Attack Profile</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-chart">
              <div v-if="tech.Chart.HasDamageType"><display-tooltip-text :string="tech.Chart.DetailsHeader" /></div>
              <div v-if="tech.Chart.HasMaterial"><display-tooltip-text :string="tech.Chart.MaterialHeader" /></div>
              <div v-if="tech.Chart.HasOnMiss"><display-tooltip-text :string="tech.Chart.OnMissHeader" /></div>
              <chart-table :chart="tech.Chart"
            /></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
    <div class="desc--box" v-if="tech.Desc.length > 0" style="font-style: italic">{{ tech.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Technique } from '@/class'
import { store } from '@/store'
import ChartTable from '@/components/ChartTable.vue'
import ManeuverCard from './ManeuverCard.vue'

export default Vue.extend({
  name: 'technique-card',
  props: {
    tech: {
      type: Technique,
      required: true,
    },
    category: {
      type: String,
      required: false,
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
.Strike {
  background: $color--strike !important;
}
.General {
  background: $color--general;
}
.Move {
  background: $color--move;
}
.Defend {
  background: $color--defend;
}
.Support {
  background: $color--support;
}
</style>
