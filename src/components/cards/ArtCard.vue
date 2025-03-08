<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header header">
        <h4 style="display: inline">{{ art.Name }}</h4>
        <br />
        <span>
          <b><display-tooltip-text :string="art.Category" /> Art</b><br />
        </span>
        <div class="card--keywords" v-bind:class="useTextFormatting">
          <b>
            <span v-for="(keyword, index) in art.Keywords" :key="index" class="keyword--box"> <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content" v-bind:class="useTextFormatting">
      <div v-for="(ability, index) in art.Abilities" :key="index" v-bind:class="index != 0 ? 'ability-box' : ''" style="padding-bottom: 0.25em">
        <display-tooltip-text :string="ability.Header" style="font-style: italic; font-load: bold" />
        <div style="padding-left: 1em">
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
          <div class="card--format" v-if="ability.HasTarget">
            <display-tooltip-text :string="ability.TargetHeader" />
          </div>
          <div class="card--format" v-if="ability.HasCost">
            <display-tooltip-text :string="ability.CostHeader" />
          </div>
          <div class="card--format" v-if="ability.HasEffect">
            <display-tooltip-text :string="ability.EffectHeader" />
          </div>
          <div class="card--format" v-if="ability.HasSpecial">
            <display-tooltip-text :string="ability.SpecialHeader" />
          </div>
          <div class="card--format" v-if="ability.HasBoost">
            <display-tooltip-text :string="ability.BoostHeader" />
          </div>
        </div>
      </div>
      <div v-if="art.HasChart || art.HasTable" class="ability-box">
        <chart-table v-if="art.HasChart" :chart="art.Chart" />
        <basic-table v-if="art.HasTable" :chart="art.Table" />
      </div>
    </div>
    <div class="desc--box" v-if="art.Desc.length > 0" style="font-style: italic">{{ art.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Art } from '@/class'
import { store } from '@/store'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'art-card',
  props: {
    art: {
      type: Art,
      required: true,
    },
    format_text: {
      type: Boolean,
      default: false,
    },
    standalone: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    useTextFormatting: function () {
      if (this.format_text) return 'card--text-format'
    },
  },
  components: { BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.header {
  background-color: #7ac3ff;
}
</style>
