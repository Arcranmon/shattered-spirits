<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top Attack">
      <div class="card--header">
        <img v-if="isWeapon" class="image--header-left" :src="attack.Icon" />
        <img v-if="isWeapon" class="image--header-right" :src="attack.Icon" />
        <h4 style="display: inline; font-style: normal">{{ attack.Name }}</h4>
        <div class="card--keywords">
          <b>
            <div><display-tooltip-text :string="attack.ClassHeader" :decorate="false" /></div>
            <div v-if="attack.HasSpeedOrType"><display-tooltip-text :string="attack.SpeedHeader" :decorate="false" /></div>
            <span v-for="(keyword, index) in attack.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div v-if="isWeapon"><display-tooltip-text :string="attack.TraitsHeader" /></div>
      <div v-if="attack.HasReqs"><display-tooltip-text :string="attack.ReqsHeader" /></div>
      <div v-if="attack.HasTarget"><display-tooltip-text :string="attack.TargetHeader" /></div>
      <div v-if="attack.HasMove"><display-tooltip-text :string="attack.MoveHeader" /></div>
      <div v-if="attack.HasCost"><display-tooltip-text :string="attack.CostHeader" /></div>
      <div v-if="attack.HasRange"><display-tooltip-text :string="attack.RangeHeader" /></div>
      <div v-if="attack.HasArea"><display-tooltip-text :string="attack.AreaHeader" /></div>
      <div v-if="attack.HasEffect"><display-tooltip-text :string="attack.EffectHeader" /></div>
      <div v-if="attack.HasSpecial"><display-tooltip-text :string="attack.SpecialHeader" /></div>
      <div v-if="attack.HasBoost"><display-tooltip-text :string="attack.BoostHeader" /></div>
      <div v-if="attack.HasParry"><display-tooltip-text :string="attack.ParryHeader" /></div>
      <div v-if="attack.Chart.HasOnMiss"><display-tooltip-text :string="attack.Chart.OnMissHeader" /></div>
      <chart-table v-if="attack.HasChart" :chart="attack.Chart" />
      <div v-if="attack.HasChargedEffect">
        <display-tooltip-text :string="attack.ChargedEffectHeader" />
        <div style="margin-left: 1em">
          <display-tooltip-text :string="attack.ChargedEffectSetUp" />
        </div>
        <div style="margin-left: 1em">
          <display-tooltip-text :string="attack.ChargedEffectResolution" />
        </div>
      </div>
    </div>
    <div class="desc--box" v-if="attack.Desc.length > 0" style="font-style: italic">{{ attack.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Attack, Weapon } from '@/class'
import BasicTable from '@/components/BasicTable.vue'
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
  components: { BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.Attack {
  background-color: rgb(226, 119, 43);
}
.Weapon {
  background-color: #685e5e;
}
</style>
