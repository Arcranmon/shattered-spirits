<template>
  <div>
    <h2>Terrain</h2>
    <span v-if="isMobile"
      ><v-select
        v-model="selectedTerrain"
        :items="terrains"
        item-text="Name"
        return-object
        attach
        label="Selected Terrain"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><terrain-card v-if="selectedTerrain != null" :terrain="selectedTerrain" style="width: 40em; margin-left: auto; margin-right: auto;"
    /></span>
    <span v-else>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="terrain in terrains" style="width: 100%;" v-bind:key="terrain.Name">
              <v-btn @click="selectedTerrain = terrain" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="terrain.Icon" /> {{ terrain.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <terrain-card v-if="selectedTerrain != null" :terrain="selectedTerrain" style="width: 40em;" :key="selectedTerrain.Name" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import TerrainCard from '@/components/cards/TerrainCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'terrain',
  components: { TerrainCard },
  data() {
    return {
      selectedTerrain: null,
    }
  },
  computed: {
    terrains: function () {
      return this.$store.getters.getTerrains().sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
