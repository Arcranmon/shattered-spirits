<template>
  <div class="tech--wrapper" inline>
    <div class="tech--color-header" v-bind:class="category">
      <div class="tech--header">
        <h3 style="display: inline; font-style: normal;">{{ tech.Name }}</h3>
      </div>
      <div class="tech--keywords" v-bind:class="tech.Type">
        <span v-if="(tech.Desc.length > 0)">{{ tech.Desc }}<br /></span>
        <span v-if="(tech.Attack)" style="font-style: bold;"> </span>
        <span style="font-style: bold;">
          <b
            >{{ tech.SpeedHeader
            }}<span v-if="tech.HasRange">, {{ tech.RangeHeader }}</span
            ><span v-if="tech.HasArea">, {{ tech.Area }}</span>
            <span v-if="tech.AP != 4">, {{ tech.AP }} AP </span></b
          ><br />
        </span>
        <b
          ><display-tooltip-text
            v-if="tech.HasKeywords"
            :string="tech.KeywordsHeader"
            :decorate="false"
        /></b>
      </div>
    </div>
    <div class="tech--content">
      <div v-if="tech.HasCost">
        <display-tooltip-text class="tech--format" :string="tech.CostHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasReqs">
        <display-tooltip-text :string="tech.ReqsHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasTrigger">
        <display-tooltip-text :string="tech.TriggerHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasTarget">
        <display-tooltip-text :string="tech.TargetHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasMove">
        <display-tooltip-text :string="tech.MoveHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasEffect">
        <display-tooltip-text :string="tech.EffectHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasSpecial">
        <display-tooltip-text :string="tech.SpecialHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasImbue">
        <display-tooltip-text :string="tech.ImbueHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasBoost">
        <display-tooltip-text :string="tech.BoostHeader" />
      </div>
      <div style="height: 0.5em;" />
      <span v-if="(tech.HasChart)"><chart-table :chart="tech.Chart" /> </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Technique } from "@/class";
import { store } from "@/store";
import ChartTable from "./ChartTable.vue";
import Tooltip from "./TooltipParam.vue";
import DisplayTooltipText from "@/components/DisplayTooltipText";

export default Vue.extend({
  name: "technique-card",
  props: {
    tech: {
      type: Technique,
      required: true,
    },
    category: {
      type: String,
      required: false,
    },
  },
  components: { ChartTable, Tooltip },
});
</script>

<style scoped lang="scss">
.tech--wrapper {
  font-family: $font--standard;
  background-color: $color--parchment;
  border-top-left-radius: 3em;
  border-top-right-radius: 3em;
  border: $border--black-standard;
  height: 100%;
}
.tech--color-header {
  border-top-left-radius: 2.9em;
  border-top-right-radius: 2.9em;
}
.tech--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
}
.tech--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  padding-bottom: $space--xs;
}
.tech--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
.tech--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
.Strike {
  border-bottom: 5px solid $color--strike;
}
.Maneuver {
  border-bottom: 5px solid $color--maneuver;
}
.Move {
  border-bottom: 5px solid $color--move;
}
.Defensive {
  border-bottom: 5px solid $color--defensive;
}
.Support {
  border-bottom: 5px solid $color--support;
}
</style>
