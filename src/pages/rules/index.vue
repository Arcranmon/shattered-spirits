<template>
  <div style="padding: 1em;">
    <div class="page--title">Combat Rules</div>
    <vue-simple-markdown :source="combatText" />
  </div>
</template>

<script>
import Vue from "vue";
import CombatText from "./combat.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "rules",
  components: {},
  data: function () {
    return {
      combatText: CombatText,
    };
  },
});
</script>

<style lang="scss">
.markdown-body {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: pre-wrap !important;
  line-height: 1.25 !important;
  margin-bottom: 0;
}
.markdown-body::before {
  content: none;
}
.markdown-body::after {
  content: none;
}
</style>
