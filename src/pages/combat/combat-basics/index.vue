<template>
  <div style="padding: 1em;">
    <h2>Combat Rules</h2>
    <div v-html="combatText" />
  </div>
</template>

<script>
import Vue from "vue";
import CombatText from "@/database/text_files/combat_rules/combat.txt";
import StatusText from "@/database/text_files/combat_rules/status.txt";
import ConditionText from "@/database/text_files/combat_rules/condition.txt";
import ReadingDisciplines from "@/database/text_files/combat_rules/reading_disciplines.txt";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: { ShowCards },
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
    readingDisciplines: function () {
      return this.$marked.parse(ReadingDisciplines);
    },
    disc: function () {
      return this.$store.getters.getTemplateDiscipline()[0];
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
