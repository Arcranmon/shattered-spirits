<template>
  <div style="padding: 1em;">
    <div class="page--title">Combat Rules</div>
    <vue-simple-markdown :source="combatText" />
    <div class="page--title">Statuses</div>
    <vue-simple-markdown :source="statusText" /><br />
    <div v-for="status in statuses">
      <vue-simple-markdown
        :source="'**' + status.keyword + '**: ' + status.effect"
      />
    </div>
    <div class="page--title">Conditions</div>
    <vue-simple-markdown :source="conditionText" /><br />
    <div v-for="condition in conditions">
      <vue-simple-markdown
        :source="'**' + condition.keyword + '**: ' + condition.effect"
      />
    </div>
    <div class="page--title">Elemental Conditions</div>
    <div v-for="condition in elementalConditions">
      <vue-simple-markdown
        :source="'**' + condition.keyword + '**: ' + condition.effect"
      />
    </div>
    <div class="page--title">Terrain</div>
    <div v-for="terrain in terrains">
      <vue-simple-markdown
        :source="'**' + terrain.keyword + '**: ' + terrain.effect"
      />
    </div>
    <div class="page--title">Obstacles</div>
    <div v-for="obstacle in obstacles">
      <vue-simple-markdown
        :source="'**' + obstacle.keyword + '**: ' + obstacle.effect"
      />
    </div>
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
  margin-bottom: 0;
}
.markdown-body::before {
  content: none;
}
.markdown-body::after {
  content: none;
}
</style>
