<template>
  <div>
    <h3 style="text-align: center">Abilities</h3>
    <v-card>
      <v-tabs v-model="ability_tab" background-color="#b69e75" color="black" centered>
        <v-tab v-if="techniques"><h3>Techniques</h3></v-tab><v-tab v-if="actions.length > 0"><h3>Actions</h3></v-tab>
        <v-tab v-if="attacks.length > 0"><h3>Attacks</h3></v-tab><v-tab v-if="stunts.length > 0"><h3>Stunts</h3></v-tab
        ><v-tab v-if="reactions.length > 0"><h3>Reactions</h3></v-tab><v-tab v-if="gambits.length > 0"><h3>Gambits</h3></v-tab>
      </v-tabs>
      <v-tabs-items v-model="ability_tab" class="creature-tab-content">
        <v-tab-item v-if="techniques">
          <show-cards job="Techniques" :inputs="techniques" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" /> </v-tab-item
        ><v-tab-item v-if="actions.length > 0">
          <show-cards job="Maneuvers" :inputs="actions" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" /> </v-tab-item
        ><v-tab-item v-if="attacks.length > 0">
          <show-cards job="Attacks" :inputs="attacks" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" /> </v-tab-item
        ><v-tab-item v-if="stunts.length > 0">
          <show-cards job="Maneuvers" :inputs="stunts" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" /> </v-tab-item
        ><v-tab-item v-if="reactions.length > 0">
          <show-cards job="Maneuvers" :inputs="reactions" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" /> </v-tab-item
        ><v-tab-item v-if="gambits.length > 0">
          <show-cards job="Maneuvers" :inputs="gambits" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" />
        </v-tab-item> </v-tabs-items
    ></v-card>
  </div>
</template>

<script>
import { Action, Attacks, Gambits, Reactions, Stunts, Technique } from '@/class'
import ShowCards from '@/components/cards/ShowCards.vue'
import Vue from 'vue'
export default Vue.extend({
  name: 'abilities-widget',
  components: { ShowCards },
  data() {
    return {
      ability_tab: null,
    }
  },
  props: {
    techniques: { type: Array, required: false },
    actions: { type: Array, required: true },
    attacks: { type: Array, required: true },
    gambits: { type: Array, required: true },
    reactions: { type: Array, required: true },
    stunts: { type: Array, required: true },
  },
  computed: {
    screenSize() {
      if (this.windowWidth <= 760) return 1
      if (this.windowWidth <= 1500) return 2
      return 3
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
