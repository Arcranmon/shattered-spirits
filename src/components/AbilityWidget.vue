<template>
  <div v-bind:class="useDivider ? 'ability-box' : ''" style="padding-bottom: 0.25em">
    <div v-if="cardStyle" v-bind:class="ability.Type" class="card--format">
      <div class="card--underline-top">
        <img class="image--header-left" :src="ability.Icon" />
        <img class="image--header-right" :src="ability.Icon" />
        <div class="card--header">
          <h4>{{ ability.Name }}</h4>
          <div class="card--keywords">
            <b>
              <display-tooltip-text :string="ability.Class + ' ' + ability.Type" :decorate="false" /><br />
              <span v-for="(keyword, index) in ability.Keywords" :key="index" class="keyword--box">
                <display-tooltip-text :string="keyword" :decorate="false" /></span
            ></b>
          </div>
        </div>
      </div>
    </div>
    <div v-if="!cardStyle">
      <span v-bind:class="ability.Type" class="ability--head" style="width: 100%">
        <img :src="ability.Icon" style="height: 1.5em; padding-right: 0.25em; margin-bottom: -0.25em" />
        <display-tooltip-text :string="ability.Header" />
      </span>
      <span v-for="(keyword, index) in ability.Keywords" :key="index" class="keyword--box" style="margin-left: 0.5em"
        ><b> <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></b>
      </span>
      <i><display-tooltip-text v-if="ability.Origin && showFrom" :string="'**From:** _' + ability.Origin.Name + '_'" style="padding-left: 2em" /></i>
    </div>
    <div style="padding-left: 1em">
      <div class="card--format" v-if="ability.HasCost">
        <display-tooltip-text :string="ability.CostHeader" />
      </div>
      <div class="card--format" v-if="ability.HasReqs">
        <display-tooltip-text :string="ability.ReqsHeader" />
      </div>
      <div class="card--format" v-if="ability.HasArea"><display-tooltip-text :string="ability.AreaHeader" /></div>
      <div class="card--format" v-if="ability.HasRange">
        <display-tooltip-text :string="ability.RangeHeader" />
      </div>
      <div class="card--format" v-if="ability.HasTrigger">
        <display-tooltip-text :string="ability.TriggerHeader" />
      </div>
      <div class="card--format" v-if="ability.HasEffect">
        <display-tooltip-text :string="ability.EffectHeader" />
      </div>
      <div class="card--format" v-if="ability.HasDefend">
        <display-tooltip-text :string="ability.DefendHeader" />
      </div>
      <div class="card--format" v-if="ability.HasSpecial">
        <display-tooltip-text :string="ability.SpecialHeader" />
      </div>
      <div class="card--format" v-if="ability.HasBoosts">
        <display-tooltip-text :string="ability.BoostsHeader" />
      </div>
      <div class="card--format" v-if="ability.HasGambit">
        <display-tooltip-text :string="ability.GambitHeader" />
      </div>
      <div class="card--format" v-if="ability.HasTable">
        <basic-table :chart="ability.Table" />
      </div>
    </div>
    <div class="expand--collapse-box-outlined" v-if="ability.HasChart">
      <v-expansion-panels class="condensed" flat tile>
        <v-expansion-panel style="background-color: inherit"
          ><v-expansion-panel-header class="expand--header-chart">Chart</v-expansion-panel-header>
          <v-expansion-panel-content class="expand--body-chart"><chart-table :chart="ability.Chart" /></v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from './ChartTable.vue'
import { Ability } from '@/class'
import { store } from '@/store'

export default Vue.extend({
  name: 'ability-widget',
  props: {
    ability: {
      type: Ability,
      required: true,
    },
    useDivider: {
      type: Boolean,
      default: false,
    },
    cardStyle: {
      type: Boolean,
      default: false,
    },
    showFrom: {
      type: Boolean,
      default: true,
    },
  },
  components: { BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.ability--head {
  border-top-left-radius: 1em;
  padding: 0.25em;
  padding-left: 0.5em;
  font-size: 1.05em;
  font-weight: bold;
  align-items: center;
}
.Maneuver {
  background-color: #7ac3ff;
}
.Reaction {
  background-color: #bbcc6f;
}
.Gambit {
  background-color: #a776a0;
}
.Attack {
  background-color: rgb(230, 95, 95);
}
</style>
