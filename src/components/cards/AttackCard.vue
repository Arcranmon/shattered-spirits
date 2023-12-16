<template>
  <div class="attack--wrapper" inline>
    <div v-bind:class="attack.Category">
      <div class="attack--header">
        <h4 style="display: inline; font-style: normal;">{{ attack.Name }}</h4>
      </div>
      <div class="attack--keywords">
        <i
          ><span v-if="(attack.Desc.length > 0)">{{ attack.Desc }}<br /></span
        ></i>
        <b>
          <div v-if="!isWeapon"><display-tooltip-text :string="attack.Class" :decorate="false" /></div>
          <div v-if="attack.HasSpeed">{{ attack.SpeedHeader }}<display-tooltip-text :string="attack.TypeHeader" :decorate="false" /></div>
          <span></span>
          <display-tooltip-text v-if="!isWeapon && attack.HasKeywords" :string="attack.KeywordsHeader" :decorate="false"
        /></b>
      </div>
    </div>
    <div class="attack--content">
      <div v-if="isWeapon"><display-tooltip-text :string="attack.TraitsHeader" /></div>
      <div v-if="attack.HasMaterial"><display-tooltip-text :string="attack.MaterialHeader" /></div>
      <div v-if="attack.HasReqs"><display-tooltip-text :string="attack.ReqsHeader" /></div>
      <div v-if="attack.HasCost"><display-tooltip-text :string="attack.CostHeader" /></div>
      <div v-if="attack.HasRange"><display-tooltip-text :string="attack.RangeHeader" /></div>
      <div v-if="attack.HasArea"><display-tooltip-text :string="attack.AreaHeader" /></div>
      <div v-if="attack.HasEffect"><display-tooltip-text :string="attack.EffectHeader" /></div>
      <div v-if="attack.HasSpecial"><display-tooltip-text :string="attack.SpecialHeader" /></div>
      <div v-if="attack.HasBoost"><display-tooltip-text :string="attack.BoostHeader" /></div>
      <div v-if="attack.Chart.HasDamageType"><display-tooltip-text :string="attack.Chart.DetailsHeader" /></div>
      <chart-table v-if="attack.HasChart" :chart="attack.Chart" />
      <div v-if="attack.HasChargedEffect"><display-tooltip-text :string="attack.ChargedEffectHeader" /></div>
      <div v-if="attack.HasParry"><display-tooltip-text :string="attack.ParryHeader" /></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Attack, Weapon } from '@/class'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'attack-card',
  props: {
    attack: {
      type: Attack,
      required: true,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    isWeapon: function () {
      return this.attack.hasOwnProperty('parry_')
    },
  },
  components: { ChartTable },
})
</script>

<style scoped lang="scss">
.attack--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
}
.attack--header {
  text-align: center;
  color: black;
}
.attack--keywords {
  text-align: center;
  font-size: $font-size--m;
  color: black;
  border-bottom: 5px black solid;
  padding-bottom: $space--xs;
}
.attack--content {
  font-size: $font-size--m;
  color: black;
  padding: $space--xs;
}
.attack--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
.Attack {
  background-color: #db5656;
}
</style>
