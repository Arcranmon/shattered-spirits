<template>
  <div class="maneuver--wrapper" inline>
    <div class="maneuver--underline-top">
      <div class="maneuver--header" v-bind:class="maneuver.Type.replace(' ', '_')">
        <h4 style="display: inline;">{{ maneuver.Name }}</h4>
        <br />
        <div class="maneuver--keywords" v-bind:class="useTextFormatting">
          <span v-if="(maneuver.Desc.length > 0)" style="font-style: italic;">{{ maneuver.Desc }}<br /></span>
          <b><display-tooltip-text class="maneuver--type" :string="maneuver.Type" :decorate="false" /></b><br />
          <b><display-tooltip-text v-if="maneuver.HasKeywords" :string="maneuver.KeywordsHeader" :decorate="false" /></b>
        </div>
      </div>
    </div>
    <div class="maneuver--content" v-bind:class="useTextFormatting">
      <div class="maneuver--format" v-if="maneuver.HasAp">
        <display-tooltip-text :string="maneuver.ApHeader" />
      </div>
      <div v-if="maneuver.HasReqs">
        <display-tooltip-text class="maneuver--format" :string="maneuver.ReqsHeader" />
      </div>
      <div v-if="maneuver.HasWeapon">
        <display-tooltip-text class="maneuver--format" :string="maneuver.WeaponHeader" />
      </div>
      <div v-if="maneuver.HasRange">
        <display-tooltip-text class="maneuver--format" :string="maneuver.RangeHeader" />
      </div>
      <div v-if="maneuver.HasTrigger">
        <display-tooltip-text class="maneuver--format" :string="maneuver.TriggerHeader" />
      </div>
      <div v-if="maneuver.HasCost">
        <display-tooltip-text class="maneuver--format" :string="maneuver.CostHeader" />
      </div>
      <div class="maneuver--format" v-if="maneuver.HasMove">
        <display-tooltip-text :string="maneuver.MoveHeader" />
      </div>
      <div class="maneuver--format" v-if="maneuver.HasEffect">
        <display-tooltip-text :string="maneuver.EffectHeader" />
      </div>
      <div class="maneuver--format" v-if="maneuver.HasSpecial">
        <display-tooltip-text :string="maneuver.SpecialHeader" />
      </div>
      <div class="maneuver--format" v-if="maneuver.HasBoost">
        <display-tooltip-text :string="maneuver.BoostHeader" />
      </div>
      <span v-if="(maneuver.HasChart)">
        <div style="height: 0.5em;" />
        <chart-table :chart="maneuver.Chart" />
      </span>
      <span class="maneuver--format" v-if="this.standalone && maneuver.HasFrom">
        <display-tooltip-text :string="maneuver.FromHeader" />
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Maneuver } from '@/class'
import { store } from '@/store'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'maneuver-card',
  props: {
    maneuver: {
      type: Maneuver,
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
      if (this.format_text) return 'maneuver--text-format'
    },
  },
  components: { ChartTable },
})
</script>

<style scoped lang="scss">
.maneuver--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
}
.maneuver--type {
  font-family: $font--fancy !important;
}
.maneuver--header {
  padding-top: $space--xs;
  height: 100%;
  text-align: center;
  color: black;
}
.maneuver--underline-top {
  border-bottom: 5px solid black;
}
.maneuver--keywords {
  font-size: $font-size--s;
  text-align: center;
  color: black;
  padding-bottom: $space--xs;
}
.maneuver--content {
  color: black;
  padding: $space--xs;
}
.maneuver--text-format {
  font-size: $font-size--s;
}
.maneuver--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
.Stunt {
  background-color: $color--maneuver;
}
.Action {
  background-color: #7ac3ff;
}
.Reaction {
  background-color: #7574a7;
}
.Gambit {
  background-color: #a776a0;
}
.Minor_Attack {
  background-color: #db5656;
}
.Major_Attack {
  background-color: #db5656;
}
</style>
