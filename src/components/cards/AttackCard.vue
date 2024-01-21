<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top Attack">
      <div class="card--header">
        <h4 style="display: inline; font-style: normal;">{{ attack.Name }}</h4>
        <div class="card--keywords">
          <b>
            <div><display-tooltip-text :string="attack.ClassHeader" :decorate="false" /></div>
            <div v-if="attack.HasSpeedOrType"><display-tooltip-text :string="attack.SpeedHeader" :decorate="false" /></div>
            <span v-if="!isWeapon">
              <span v-for="(keyword, index) in attack.Keywords" :key="index" class="keyword--box">
                <display-tooltip-text :string="keyword" :decorate="false" /></span></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div v-if="isWeapon"><display-tooltip-text :string="attack.TraitsHeader" /></div>
      <div v-if="attack.HasMaterial"><display-tooltip-text :string="attack.MaterialHeader" /></div>
      <div v-if="attack.HasReqs"><display-tooltip-text :string="attack.ReqsHeader" /></div>
      <div v-if="attack.HasTarget"><display-tooltip-text :string="attack.TargetHeader" /></div>
      <div v-if="attack.HasCost"><display-tooltip-text :string="attack.CostHeader" /></div>
      <div v-if="attack.HasRange"><display-tooltip-text :string="attack.RangeHeader" /></div>
      <div v-if="attack.HasArea"><display-tooltip-text :string="attack.AreaHeader" /></div>
      <div v-if="attack.HasEffect"><display-tooltip-text :string="attack.EffectHeader" /></div>
      <div v-if="attack.HasSpecial"><display-tooltip-text :string="attack.SpecialHeader" /></div>
      <div v-if="attack.HasBoost"><display-tooltip-text :string="attack.BoostHeader" /></div>
      <div v-if="attack.Chart.HasDamageType"><display-tooltip-text :string="attack.Chart.DetailsHeader" /></div>
      <div v-if="attack.Chart.HasMaterial"><display-tooltip-text :string="attack.Chart.MaterialHeader" /></div>
      <div v-if="attack.Chart.HasOnMiss"><display-tooltip-text :string="attack.Chart.OnMissHeader" /></div>
      <chart-table v-if="attack.HasChart" :chart="attack.Chart" />
      <div v-if="attack.HasChargedEffect"><display-tooltip-text :string="attack.ChargedEffectHeader" /></div>
      <div v-if="attack.HasParry"><display-tooltip-text :string="attack.ParryHeader" /></div>
    </div>
    <div class="desc--box" v-if="(attack.Desc.length > 0)" style="font-style: italic;">{{ attack.Desc }}<br /></div>
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
.Attack {
  background-color: #db5656;
}
</style>
