<template>
  <div style="padding: 1em;">
    <h2>Terrain and Obstacles</h2>
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
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: {},
  computed: {
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
