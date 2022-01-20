<template>
  <div style="padding: 1em;">
    <div class="page--title">Combat Rules</div>
    <vue-simple-markdown :source="combatText" />
    <div class="page--title">Status</div>
    <vue-simple-markdown :source="statusText" /><br />
    <span v-for="status in statusEffects"
      ><b>{{ status.keyword }}:</b> {{ status.effect }}<br
    /></span>
    <div class="page--title">Conditions</div>
    <vue-simple-markdown :source="conditionText" /><br />
    <span v-for="condition in conditionEffects"
      ><b>{{ condition.keyword }}:</b> {{ condition.effect }}<br
    /></span>
    <div class="page--title">Elemental Conditions</div>
    <div class="page--title">Terrain</div>
    <div class="page--title">Obstacles</div>
  </div>
</template>

<script>
import Vue from "vue";
import CombatText from "./combat.txt";
import StatusText from "./status.txt";
import ConditionText from "./condition.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "rules",
  components: {},
  data: function () {
    return {
      combatText: CombatText,
      statusText: StatusText,
      conditionText: ConditionText,
    };
  },
  computed: {
    statusEffects: function () {
      return this.$store.getters.getStatuses();
    },
    conditionEffects: function () {
      return this.$store.getters.getConditions();
    },
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
