<template>
  <div v-bind:class="useDivider ? 'ability-box' : ''" style="padding-bottom: 0.25em">
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
</template>

<script>
import Vue from 'vue'
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
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
