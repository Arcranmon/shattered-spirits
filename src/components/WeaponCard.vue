<template>
  <div class="weapon--wrapper" inline>
    <div v-bind:class="weapon.Category">
      <div class="weapon--header">
        <h3 style="display: inline; font-style: normal;">{{ weapon.Name }}</h3>
      </div>
      <b
        ><div class="weapon--keywords">
          {{ weapon.SpeedHeader }}{{ weapon.DurabilityHeader
          }}<tooltipped-text
            :input="[weapon.RangeHeader]"
            :commas="false"
            :splitForKeyword="true"
          />
          {{ weapon.HandsPhrase }}{{ weapon.CategoryHeader
          }}<tooltipped-text
            :input="weapon.Keywords"
            :commas="true"
            :itallic="false"
            :splitForKeyword="true"
          /></div
      ></b>
    </div>
    <div class="weapon--content">
      <tooltipped-text
        v-if="weapon.HasSpecial"
        :input="weapon.SpecialArray"
        :itallic="true"
      />
      <div style="height: 0.5em;" />
      <chart-table :chart="weapon.Chart" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Weapon } from "@/class";
import ChartTable from "./ChartTable.vue";
import TooltippedText from "./TooltipTextFromArray.vue";

export default Vue.extend({
  name: "weapon-card",
  props: {
    weapon: {
      type: Weapon,
      required: true,
    },
  },
  components: { ChartTable, TooltippedText },
});
</script>

<style scoped lang="scss">
.weapon--wrapper {
  font-family: $font--standard;
  background-color: $color--parchment;
  border: $border--black-standard;
  height: 100%;
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
