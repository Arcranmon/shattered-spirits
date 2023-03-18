<template
  ><div>
    <h2>Techniques</h2>
    <show-cards :inputs="basics" job="Techniques" :collapse="false" />
    <h2>Maneuvers</h2>
    <show-cards
      :inputs="[
        $store.getters.getManeuver('Quicken'),
        $store.getters.getManeuver('Strengthen'),
        $store.getters.getManeuver('Basic Feint'),
        $store.getters.getManeuver('Leap'),
        $store.getters.getManeuver('Retrieve'),
        $store.getters.getManeuver('Tumble'),
        $store.getters.getManeuver('Use Environment'),
        $store.getters.getManeuver('Recovery'),
        $store.getters.getManeuver('Reorient'),
        $store.getters.getManeuver('Armored Shell'),
        $store.getters.getManeuver('Shield Block'),
        $store.getters.getManeuver('Deflect'),
        $store.getters.getManeuver('Dodge'),
        $store.getters.getManeuver('Opportunity Attack'),
        $store.getters.getManeuver('Basic Counter'),
      ]"
      job="Maneuvers"
      :collapse="false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-techniques',
  components: {
    ShowCards,
  },
  computed: {
    basics: function () {
      return this.$store.getters.getTechniquesFromList(['Unarmed Strike', 'Armed Strike', 'Run', 'Prepare'])
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
