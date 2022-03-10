<template>
  <div class="armor--wrapper" inline>
    <div v-bind:class="armor.Category">
      <div class="armor--header">
        <h3 style="display: inline; font-style: normal;">{{ armor.Name }}</h3>
      </div>
      <b>
        <div class="armor--keywords">
          {{ armor.Category }}{{ armor.DurabilityHeader }}
        </div></b
      >
    </div>
    <div class="armor--content">
      <div v-html="$marked.parseInline(armor.ArmorText)" />
      <div v-html="$marked.parseInline(armor.EnduranceText)" />
      <display-tooltip-text v-if="armor.HasSpecial" :string="armor.Special" />
      <div class="chart--wrapper" inline>
        <v-row no-gutters class="chart--row">
          <v-col class="chart--head" cols="4"
            ><b>Movement Chart</b></v-col
          ></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="2"><b>Step</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Step
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="2"><b>Reposition</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Reposition
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="2"><b>Shift</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Shift
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="2"><b>Dash</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Dash
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="2"><b>Sprint</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Sprint
          }}</v-col></v-row
        >
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Armor } from "@/class";
import DisplayTooltipText from "@/components/DisplayTooltipText";

export default Vue.extend({
  name: "armor-card",
  props: {
    armor: {
      type: Armor,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
.armor--wrapper {
  font-family: $font--standard;
  background-color: $color--parchment;
  border: $border--black-standard;
  height: 100%;
}
.armor--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
}
.armor--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  border-bottom: 5px black solid;
  padding-bottom: $space--xs;
}
.armor--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
.armor--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
