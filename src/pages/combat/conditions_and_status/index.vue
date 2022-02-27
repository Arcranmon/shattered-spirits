<template>
  <div style="padding: 1em;">
    <h2>Conditions and Status</h2>
    <div v-html="statusText" />
    <div v-for="status in statuses">
      <span v-html="$marked('**' + status.keyword + '**: ' + status.effect)" />
    </div>
    <br />
    <div v-html="conditionText" />
    <div v-for="condition in conditions">
      <span
        v-html="$marked('**' + condition.keyword + '**: ' + condition.effect)"
      />
    </div>
    <h2>Elemental Conditions</h2>
    <div v-for="condition in elementalConditions">
      <span
        v-html="$marked('**' + condition.keyword + '**: ' + condition.effect)"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import StatusText from "@/database/text_files/combat_rules/status.txt";
import ConditionText from "@/database/text_files/combat_rules/condition.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: {},
  computed: {
    statuses: function () {
      return this.$store.getters.getStatuses();
    },
    conditions: function () {
      return this.$store.getters.getConditions();
    },
    elementalConditions: function () {
      return this.$store.getters.getElementalConditions();
    },
    conditionText: function () {
      return this.$marked.parse(ConditionText);
    },
    statusText: function () {
      return this.$marked.parse(StatusText);
    },
  },
});
</script>

<style scoped lang="scss">
.skill--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin: auto;
  margin-top: 1em;
  width: 40%;
  align-self: center;
}
</style>
