<template>
  <div v-bind:class="useFormatting" inline>
    <div v-bind:class="armor.Category">
      <div v-if="format" class="armor--header">
        <h3 style="display: inline; font-style: normal;">{{ armor.Name }}</h3>
      </div>
      <b>
        <div v-if="format" class="armor--keywords">
          {{ armor.Category }}{{ armor.DurabilityHeader }}
        </div></b
      >
    </div>
    <div v-bind:class="useContent">
      <div v-html="$marked.parseInline(armor.ArmorText)" />
      <div v-html="$marked.parseInline(armor.EnduranceText)" />
      <div
        v-if="armor.HasSpecial"
        v-html="$marked.parseInline(armor.SpecialHeader)"
      />
      <div class="chart--wrapper" inline>
        <v-row no-gutters class="chart--row">
          <v-col class="chart--head" cols="6"
            ><b>Movement Chart</b></v-col
          ></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="4"><b>Step</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Step
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="4"><b>Reposition</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Reposition
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="4"><b>Shift</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Shift
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="4"><b>Sprint</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Sprint
          }}</v-col></v-row
        ><v-row no-gutters class="chart--row"
          ><v-col class="chart--cols" cols="4"><b>Jump</b></v-col
          ><v-col class="chart--cols chart--cols-right" cols="2">{{
            armor.Jump
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
    format: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    useFormatting: function () {
      if (this.format) return "armor--wrapper";
    },
    useContent: function () {
      if (this.format) return "armor--content";
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
