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
            <div v-if="attack.HasSpeedOrTier"><display-tooltip-text :string="attack.SpeedHeader" :decorate="false" /></div>
            <span v-for="(keyword, index) in attack.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content" v-bind:class="useTextFormatting">
      <div><display-tooltip-text :string="attack.TraitsHeader" /></div>
      <div class="card--format" v-if="attack.HasReqs">
        <display-tooltip-text :string="attack.ReqsHeader" />
      </div>
      <div v-for="(ability, index) in attack.Abilities" :key="index" class="ability-box" style="padding-bottom: 0.25em">
        <display-tooltip-text :string="ability.Header" style="font-style: italic; font-load: bold" /><span
          v-for="(keyword, index) in ability.Keywords"
          :key="index"
          class="keyword--box"
          style="margin-left: 0.5em"
          ><b> <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></b
        ></span>
        <div style="padding-left: 1em">
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
      <div v-if="attack.HasChart || attack.HasTable" class="ability-box">
        <chart-table v-if="attack.Chart" :chart="attack.Chart" />
        <basic-table v-if="attack.HasTable" :chart="attack.Table" />
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
  name: 'weapon-card',
  props: {
    attack: {
      type: Weapon,
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
      return this.attack.hasOwnProperty('load_')
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
