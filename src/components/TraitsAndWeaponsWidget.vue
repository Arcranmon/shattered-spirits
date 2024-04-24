<template>
  <div>
    <h4>Traits and Weapons</h4>
    <v-card>
      <v-tabs v-model="trait_tab" background-color="#b69e75" color="black" centered>
        <v-tab>
          <h3>Traits</h3>
        </v-tab>
        <v-tab v-if="isNpc">
          <h3>Special</h3>
        </v-tab>
        <v-tab>
          <h3>Weapons</h3>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="trait_tab" class="creature-tab-content">
        <v-tab-item>
          <v-row v-if="isSpirit"><display-tooltip-text v-if="creature.Subtype.HasEffect" :string="creature.Subtype.EffectHeader" /></v-row>
          <v-row v-if="isSpirit"><display-tooltip-text v-if="creature.Subtype.HasManifestEffect" :string="creature.Subtype.ManifestEffectHeader" /></v-row>
          <v-row v-if="isSpirit"><display-tooltip-text v-if="creature.Subtype.HasSummonEffect" :string="creature.Spirit.Subtype.SummonEffectHeader" /></v-row>
          <v-row v-for="trait in creature.Traits" :key="trait">
            <display-tooltip-text :string="'* **' + trait.replaceAll('_', '') + ':** ' + $store.getters.getTrait(splitTrait(trait))" :decorate="false" />
          </v-row> </v-tab-item
        ><v-tab-item v-if="isNpc"
          ><v-row><display-tooltip-text :string="creature.ArmorText" /></v-row><v-row><display-tooltip-text :string="creature.SpecialText" /></v-row
        ></v-tab-item>
        <v-tab-item
          ><show-cards job="Attacks" :inputs="creature.Weapons" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize"
        /></v-tab-item> </v-tabs-items
    ></v-card>
  </div>
</template>

<script>
import { Npc, Spirit, Combatant } from '@/class'
import ShowCards from '@/components/cards/ShowCards.vue'
import Vue from 'vue'
export default Vue.extend({
  name: 'traits-and-weapons-widget',
  components: { ShowCards },
  data() {
    return {
      trait_tab: null,
    }
  },
  props: {
    creature: { type: Combatant, required: true },
  },
  computed: {
    isSpirit() {
      return this.creature instanceof Spirit
    },
    isNpc() {
      return this.creature instanceof Npc
    },
    screenSize() {
      if (this.windowWidth <= 760) return 1
      if (this.windowWidth <= 1500) return 2
      return 3
    },
  },
  methods: {
    splitTrait(trait) {
      if (trait.includes('_')) return trait.split('_')[1]
      return trait
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
