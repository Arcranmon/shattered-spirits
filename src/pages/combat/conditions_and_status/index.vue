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
    <br />
    <div v-html="elementalConditionText" />
    <div v-for="condition in elementalConditions">
      <span
        v-html="$marked('**' + condition.keyword + '**: ' + condition.effect)"
      />
    </div>
    <br />
    <div v-html="mentalConditionText" />
    <div v-for="condition in mentalConditions">
      <span
        v-html="$marked('**' + condition.keyword + '**: ' + condition.effect)"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import StatusText from "@/database/text_files/combat_rules/statuses.txt";
import ConditionText from "@/database/text_files/combat_rules/conditions.txt";
import ElementalConditionText from "@/database/text_files/combat_rules/elemental_conditions.txt";
import MentalConditionText from "@/database/text_files/combat_rules/mental_conditions.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: {},
  computed: {
    statuses: function () {
      return this.$store.getters.getStatuses();
    },
    statusText: function () {
      return this.$marked.parse(StatusText);
    },
    conditions: function () {
      return this.$store.getters.getConditions();
    },
    conditionText: function () {
      return this.$marked.parse(ConditionText);
    },
    elementalConditions: function () {
      return this.$store.getters.getElementalConditions();
    },
    elementalConditionText: function () {
      return this.$marked.parse(ElementalConditionText);
    },
    mentalConditions: function () {
      return this.$store.getters.getMentalConditions();
    },
    mentalConditionText: function () {
      return this.$marked.parse(MentalConditionText);
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
