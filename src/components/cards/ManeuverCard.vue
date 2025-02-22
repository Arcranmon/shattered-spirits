<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header" v-bind:class="maneuver.Type.replace(' ', '_')">
        <h4 style="display: inline">{{ maneuver.Name }}</h4>
        <br />
        <div class="card--keywords" v-bind:class="useTextFormatting">
          <div>
            <b><display-tooltip-text class="card--type" :string="maneuver.TypeHeader" :decorate="false" /></b>
          </div>
          <b>
            <span v-for="(keyword, index) in maneuver.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content" v-bind:class="useTextFormatting">
      <div class="card--format" v-if="maneuver.HasAp">
        <display-tooltip-text :string="maneuver.ApHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasReqs">
        <display-tooltip-text :string="maneuver.ReqsHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasWeapon">
        <display-tooltip-text :string="maneuver.WeaponHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasArea"><display-tooltip-text :string="maneuver.AreaHeader" /></div>
      <div class="card--format" v-if="maneuver.HasRange">
        <display-tooltip-text :string="maneuver.RangeHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasTrigger">
        <display-tooltip-text :string="maneuver.TriggerHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasTarget">
        <display-tooltip-text :string="maneuver.TargetHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasCost">
        <display-tooltip-text :string="maneuver.CostHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasMove">
        <display-tooltip-text :string="maneuver.MoveHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasEffect">
        <display-tooltip-text :string="maneuver.EffectHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasSpecial">
        <display-tooltip-text :string="maneuver.SpecialHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasBoost">
        <display-tooltip-text :string="maneuver.BoostHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasManifest">
        <display-tooltip-text :string="maneuver.ManifestHeader" />
      </div>
      <div class="card--format" v-if="maneuver.HasDefend">
        <display-tooltip-text :string="maneuver.Defend.DefendText" />
      </div>
      <div class="card--format" v-if="maneuver.HasTable">
        <basic-table :chart="maneuver.Table" />
      </div>
    </div>
    <div class="desc--box" v-if="maneuver.Desc.length > 0" style="font-style: italic">{{ maneuver.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Maneuver } from '@/class'
import { store } from '@/store'
import BasicTable from '@/components/BasicTable.vue'
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
      if (this.format_text) return 'card--text-format'
    },
  },
  components: { BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
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
</style>
