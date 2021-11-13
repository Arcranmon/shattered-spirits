<template>
  <div class="tech--wrapper" inline>
    <div class="tech--color-header" v-bind:class="category">
      <div class="tech--header">
        <h3 style="display: inline; font-style: normal;">{{ tech.Name }}</h3>
      </div>
      <div class="tech--keywords" v-bind:class="tech.Type">
        <span v-if="(tech.Desc.length > 0)"
          ><i>{{ tech.Desc }}</i
          ><br
        /></span>
        <span v-if="(tech.Attack)" style="font-style: bold;">
          <b>{{ tech.DamageType }} Damage, </b>
        </span>
        <span style="font-style: bold;">
          <b
            >{{ tech.SpeedHeader }},
            <span v-if="tech.HasRange">{{ tech.RangeHeader }}, </span
            ><span v-if="tech.HasArea">{{ tech.Area }}, </span>
            <span v-if="tech.AP != 4">{{ tech.AP }}</span></b
          ><br />
        </span>
        <span v-if="(tech.Keywords.length > 0)" style="font-style: bold;">
          <b>{{ tech.Keywords }}</b
          ><br />
        </span>
      </div>
    </div>
    <div class="tech--content">
      <span v-if="tech.HasReqs"
        ><vue-simple-markdown class="tech--format" :source="tech.ReqText" />
      </span>
      <span v-if="tech.HasTarget"
        ><vue-simple-markdown class="tech--format" :source="tech.TargetText" />
      </span>
      <span
        ><vue-simple-markdown class="tech--format" :source="tech.MoveText"
      /></span>
      <span v-if="tech.HasEffect"
        ><vue-simple-markdown class="tech--format" :source="tech.EffectText" />
      </span>
      <span v-if="tech.HasSpecial"
        ><vue-simple-markdown class="tech--format" :source="tech.SpecialText" />
      </span>
      <div style="height: 0.5em;" />
      <span v-if="(tech.HasChart)"><chart-table :chart="tech.Chart" /> </span>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Technique } from "@/class";
import ChartTable from "./ChartTable.vue";

export default Vue.extend({
  name: "technique-card",
  props: {
    tech: {
      type: Technique,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  components: { ChartTable },
});
</script>
ChartTable

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
