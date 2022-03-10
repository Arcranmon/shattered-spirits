<template>
  <div style="padding: 1em;">
    <h2>Terrain and Obstacles</h2>
    <div v-html="terrainText" />
    <div v-for="terrain in terrains">
      <display-tooltip-text
        :string="'**' + terrain.keyword + '**: ' + terrain.effect"
      />
    </div>
    <br />
    <div v-html="obstacleText" />
    <div v-for="obstacle in obstacles">
      <span
        v-html="$marked('**' + obstacle.keyword + '**: ' + obstacle.effect)"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ObstacleText from "@/database/text_files/combat_rules/obstacles.txt";
import TerrainText from "@/database/text_files/combat_rules/terrain.txt";
import DisplayTooltipText from "@/components/DisplayTooltipText";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: {},
  computed: {
    obstacleText: function () {
      return this.$marked.parse(ObstacleText);
    },
    terrainText: function () {
      return this.$marked.parse(TerrainText);
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
