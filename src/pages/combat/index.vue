<template>
  <div style="padding: 1em;">
    <h2>Combat Rules</h2>
    <div v-html="combatText" />
    <h2>Statuses</h2>
    <div v-html="statusText" />
    <br />
    <div v-for="status in statuses">
      <span v-html="$marked('**' + status.keyword + '**: ' + status.effect)" />
    </div>
    <h2>Conditions</h2>
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
    <h2>Terrain</h2>
    <div v-for="terrain in terrains">
      <span
        v-html="$marked('**' + terrain.keyword + '**: ' + terrain.effect)"
      />
    </div>
    <h2>Obstacles</h2>
    <div v-for="obstacle in obstacles">
      <span
        v-html="$marked('**' + obstacle.keyword + '**: ' + obstacle.effect)"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import CombatText from "@/database/text_files/combat_rules/combat.txt";
import StatusText from "@/database/text_files/combat_rules/status.txt";
import ConditionText from "@/database/text_files/combat_rules/condition.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "rules",
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
    obstacles: function () {
      return this.$store.getters.getObstacles();
    },
    terrains: function () {
      return this.$store.getters.getTerrains();
    },
    combatText: function () {
      return this.$marked.parse(CombatText);
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
.a {
}
</style>
