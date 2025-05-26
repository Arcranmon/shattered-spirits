<template>
  <div v-bind:class="useDivider ? 'ability-box' : ''" style="padding-bottom: 0.25em">
    <div>
      <span v-bind:class="ability.Type" class="ability--head" style="width: 100%">
        <img :src="ability.Icon" style="height: 1.5em; padding-right: 0.25em; margin-bottom: -0.25em" />
        <display-tooltip-text :string="ability.Header" />
      </span>
      <span v-for="(keyword, index) in ability.Keywords" :key="index" class="keyword--box" style="margin-left: 0.5em"
        ><b> <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></b
      ></span>
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
      <div class="card--format" v-if="ability.HasSpecial">
        <display-tooltip-text :string="ability.SpecialHeader" />
      </div>
      <div class="card--format" v-if="ability.HasBoosts">
        <display-tooltip-text :string="ability.BoostsHeader" />
      </div>
      <div class="card--format" v-if="ability.HasGambit">
        <display-tooltip-text :string="ability.GambitHeader" />
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
.ability--head {
  border-top-left-radius: 1em;
  padding: 0.25em;
  padding-left: 0.5em;
  font-size: 1.05em;
  font-weight: bold;
  align-items: center;
}
.Enhancement {
  background-color: $color--maneuver;
}
.Major {
  background-color: #6a7177 !important;
}
.Action {
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
