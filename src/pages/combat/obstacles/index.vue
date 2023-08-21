<template>
  <div>
    <h2>Obstacles</h2>
    <span v-if="isMobile"
      ><v-select
        v-model="selectedObstacle"
        :items="obstacles"
        item-text="Name"
        return-object
        attach
        label="Selected Obstacle"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><obstacle-card v-if="selectedObstacle != null" :obstacle="selectedObstacle" style="width: 40em; margin-left: auto; margin-right: auto;"
    /></span>
    <span v-else>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="obstacle in obstacles" style="width: 100%;" v-bind:key="obstacle.Name">
              <div>
                <v-btn @click="selectedObstacle = obstacle" class="button--style" depressed tile block>
                  {{ obstacle.Name }}
                </v-btn>
              </div>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <obstacle-card v-if="selectedObstacle != null" :obstacle="selectedObstacle" style="width: 40em;" :key="selectedObstacle.Name" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import ObstacleCard from '@/components/cards/ObstacleCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'obstacle',
  components: { ObstacleCard },
  data() {
    return {
      selectedObstacle: null,
    }
  },
  computed: {
    obstacles: function () {
      return this.$store.getters.getObstacles().sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
