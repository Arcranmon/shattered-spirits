<template
  ><div class="background">
    <h2>Basic Techniques</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Technique')" />
    <show-cards :inputs="this.$store.getters.getTechniquesFromList(['Unarmed Strike', 'Armed Strike', 'Run'])" job="Techniques" :collapse="false" />
    <show-cards class="centered-single" :inputs="this.$store.getters.getTechniquesFromList(['Prepare'])" job="Techniques" :collapse="false" :cols="1" />
    <h2>Basic Stratagems</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stratagem')" />
    <show-cards
      class="centered-duo"
      :inputs="[$store.getters.getManeuver('Quicken'), $store.getters.getManeuver('Strengthen')]"
      job="Maneuvers"
      :collapse="false"
      :cols="2"
    />
    <h2>Basic Stunts</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stunt')" />
    <show-cards
      :inputs="[$store.getters.getManeuver('Aid'), $store.getters.getManeuver('Leap'), $store.getters.getManeuver('Retrieve')]"
      job="Maneuvers"
      :collapse="false"
    /><show-cards
      class="centered-duo"
      :inputs="[$store.getters.getManeuver('Tumble'), this.$store.getters.getManeuver('Use Environment')]"
      job="Maneuvers"
      :collapse="false"
      :cols="2"
    />
    <h2>Basic Resists</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Resist')" />
    <show-cards
      :inputs="[$store.getters.getManeuver('Armored Shell'), $store.getters.getManeuver('Basic Counter'), $store.getters.getManeuver('Deflect')]"
      job="Maneuvers"
      :collapse="false"
    /><show-cards
      class="centered-duo"
      :inputs="[$store.getters.getManeuver('Dodge'), this.$store.getters.getManeuver('Shield Block')]"
      job="Maneuvers"
      :collapse="false"
      :cols="2"
    />
    <h2>Basic Reactions</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Reaction')" />
    <show-cards
      :inputs="[$store.getters.getManeuver('Guidance'), $store.getters.getManeuver('Recover'), $store.getters.getManeuver('Reorient')]"
      job="Maneuvers"
      :collapse="false"
    />
    <v-row>
      <v-col :cols="6">
        <h2>Basic Gambits</h2>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Gambit')" /><show-cards
          :inputs="[$store.getters.getManeuver('Basic Feint')]"
          job="Maneuvers"
          :collapse="false"
          :cols="1"
          class="gambit-flourish"
      /></v-col>
      <v-col :cols="6">
        <h2>Basic Flourishes</h2>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Flourish')" /><show-cards
          :inputs="[$store.getters.getManeuver('Basic Flourish')]"
          job="Maneuvers"
          :collapse="false"
          :cols="1"
          class="gambit-flourish"
      /></v-col>
    </v-row>
    <h2>Basic Punishes</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Punish')" /><show-cards
      :inputs="[$store.getters.getManeuver('Create Opening'), $store.getters.getManeuver('Engage'), $store.getters.getManeuver('Opportunity Attack')]"
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
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.centered-single {
  justify-content: center;
  margin: auto;
  width: 33.33%;
}
.centered-duo {
  justify-content: center;
  margin: auto;
  width: 66.66%;
}
.gambit-flourish {
  justify-content: center;
  margin: auto;
  width: 66.66%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
