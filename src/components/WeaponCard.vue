<template>
  <div class="weapon--wrapper" inline>
    <div class="weapon--color-header">
      <div class="weapon--header">
        <h3 style="display: inline; font-style: normal;">{{ weapon.Name }}</h3>
      </div>
      <b
        ><div class="weapon--keywords">
          {{ weapon.DamageType }} Damage, {{ weapon.SpeedHeader
          }}{{ weapon.RangeHeader }}<br />
          {{ weapon.HandsPhrase }}{{ weapon.CategoryHeader
          }}<span v-for="keyword in weapon.Keywords"
            ><vue-simple-markdown class="weapon--format"
              ><tooltip :input="keyword" /><span
                v-if="keyword != weapon.Keywords[weapon.Keywords.length - 1]"
                >,
              </span></vue-simple-markdown
            ></span
          >
        </div></b
      >
    </div>
    <div class="weapon--content">
      <span v-if="weapon.HasSpecial"
        ><vue-simple-markdown
          class="weapon--format"
          :source="weapon.SpecialHeader"
      /></span>
      <div style="height: 0.5em;" />
      <chart-table :chart="weapon.Chart" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Weapon } from "@/class";
import ChartTable from "./ChartTable.vue";
import Tooltip from "./TooltipParam.vue";

export default Vue.extend({
  name: "weapon-card",
  props: {
    weapon: {
      type: Weapon,
      required: true,
    },
  },
  components: { ChartTable, Tooltip },
});
</script>

<style scoped lang="scss">
.weapon--wrapper {
  font-family: $font--standard;
  background-color: $color--parchment;
  border: $border--black-standard;
  height: 100%;
}
.weapon--color-header {
  border-top-left-radius: 2.9em;
  border-top-right-radius: 2.9em;
}
.weapon--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
}
.weapon--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  border-bottom: 5px black solid;
  padding-bottom: $space--xs;
}
.weapon--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
.weapon--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
