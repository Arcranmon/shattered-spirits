<template>
  <div class="tech--wrapper" inline>
    <div class="tech--color-header" v-bind:class="category">
      <div class="tech--header">
        <h3 style="display: inline; font-style: normal;">{{ tech.Name }}</h3>
      </div>
      <div class="tech--keywords" v-bind:class="tech.Type">
        <span v-if="(tech.Desc.length > 0)">{{ tech.Desc }}<br /></span>
        <span v-if="(tech.Attack)" style="font-style: bold;">
          <b>{{ tech.DamageType }} Damage, </b>
        </span>
        <span style="font-style: bold;">
          <b
            >{{ tech.SpeedHeader
            }}<span v-if="tech.HasRange">, {{ tech.RangeHeader }}</span
            ><span v-if="tech.HasArea">, {{ tech.Area }}</span>
            <span v-if="tech.AP != 4">, {{ tech.AP }} AP </span></b
          ><br />
        </span>
        <b
          ><span v-for="keyword in tech.Keywords"
            ><tooltip :input="keyword" /><span
              v-if="keyword != tech.Keywords[tech.Keywords.length - 1]"
              >,
            </span></span
          >
        </b>
      </div>
    </div>
    <div class="tech--content">
      <span v-if="tech.HasCost"
        ><vue-simple-markdown class="tech--format" :source="tech.CostText" />
      </span>
      <span class="tech--format" v-if="tech.HasReqs">
        <span v-for="ele in tech.ReqArray"
          ><tooltip :input="ele" :italic="true" /></span
        ><br
      /></span>
      <span class="tech--format" v-if="tech.HasTrigger">
        <span v-for="ele in tech.TriggerArray"
          ><tooltip :input="ele" :italic="true" /></span
        ><br
      /></span>
      <span class="tech--format" v-if="tech.HasTarget">
        <span v-for="ele in tech.TargetArray"
          ><tooltip :input="ele" :italic="true" /></span
        ><br
      /></span>
      <span v-if="tech.HasMove"
        ><vue-simple-markdown class="tech--format" :source="tech.MoveText"
      /></span>
      <span class="tech--format" v-if="tech.HasEffect">
        <span v-for="ele in tech.EffectArray"
          ><tooltip :input="ele" :italic="true" /></span
        ><br
      /></span>
      <span class="tech--format" v-if="tech.HasSpecial">
        <span v-for="ele in tech.SpecialArray"
          ><tooltip :input="ele" :italic="true" /></span
        ><br
      /></span>
      <span class="tech--format" v-if="tech.HasBoost">
        <span v-for="ele in tech.BoostArray"
          ><tooltip :input="ele" :italic="true" /></span
        ><br
      /></span>
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
  display: inline;
  white-space: normal !important;
  line-height: 1 !important;
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
.Earth {
  background-color: $color--earth;
}
</style>
