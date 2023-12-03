<template>
  <div class="page">
    <v-row class="background--color" style="margin-top: 1em;">
      <v-col cols="2" class="sidebar">
        <div v-for="npc in npcs" :key="npc.Name">
          <v-btn class="button--style" @click="selectedNpc = npc" depressed tile block
            ><span>{{ npc.Name }}</span></v-btn
          >
        </div>
      </v-col>
      <v-col cols="10"> <npc-card v-if="selectedNpc != null" :npc="selectedNpc" :key="selectedNpc.Name" /></v-col
    ></v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import NpcCard from '@/components/cards/NpcCard.vue'

import { store } from '@/store'
export default Vue.extend({
  name: 'npcs',
  components: { NpcCard },
  data() {
    return {
      selectedNpc: null,
    }
  },
  computed: {
    npcs: function () {
      return this.$store.getters.getNpcs()
    },
  },
})
</script>

<style scoped lang="scss">
.button--template {
  border: 5px double black;
  border-radius: 10px;
  font-family: $font--fancy;
  font-size: $font-size--m;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  height: 100%;
  width: 100%;
}
.button--topbar {
  width: 33%;
}
.button--spacing {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
