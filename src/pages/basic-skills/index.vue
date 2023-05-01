<template
  ><div class="background">
    <h2>Basic Techniques</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Technique')" />
    <show-cards :inputs="this.$store.getters.getTechniquesFromList(['Swift Strike', 'Basic Strike', 'Strong Strike'])" job="Techniques" :collapse="false" />
    <show-cards
      v-bind:class="use_duo"
      :inputs="this.$store.getters.getTechniquesFromList(['Combo Strike', 'Rushing Strike'])"
      job="Techniques"
      :collapse="false"
      :cols="2"
    />
    <h2>Basic Attacks</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Attack')" />
    <show-cards
      :inputs="[$store.getters.getAttack('Weapon Attack'), this.$store.getters.getAttack('Quickened Attack'), this.$store.getters.getAttack('Punch')]"
      job="Attacks"
      :collapse="false"
    />
    <show-cards
      :inputs="[$store.getters.getAttack('Grapple'), this.$store.getters.getAttack('Slam')]"
      job="Attacks"
      :collapse="false"
      :cols="2"
      v-bind:class="use_duo"
    />
    <h2>Basic Stunts</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stunt')" />
    <show-cards
      :inputs="[$store.getters.getManeuver('Leap'), $store.getters.getManeuver('Draw/Stow'), $store.getters.getManeuver('Tumble')]"
      job="Maneuvers"
      :collapse="false"
    />
    <show-cards
      :inputs="[this.$store.getters.getManeuver('Improvised Combo'), $store.getters.getManeuver('Disengage'), $store.getters.getManeuver('Use Environment')]"
      job="Maneuvers"
      :collapse="false"
      :cols="3"
    />
    <h2>Basic Actions</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Action')" />
    <show-cards
      :inputs="[$store.getters.getManeuver('Recover'), $store.getters.getManeuver('Reorient'), this.$store.getters.getManeuver('Skirmish')]"
      job="Maneuvers"
      :collapse="false"
    /><show-cards :inputs="[this.$store.getters.getManeuver('Prepare')]" job="Maneuvers" :collapse="false" :cols="1" v-bind:class="use_single" />
    <h2>Basic Reactions</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Reaction')" />
    ><show-cards
      :inputs="[$store.getters.getManeuver('Create Opening'), $store.getters.getManeuver('Engage'), $store.getters.getManeuver('Opportunity Attack')]"
      job="Maneuvers"
      :collapse="false"
    /><show-cards :inputs="[$store.getters.getManeuver('Active Defense')]" job="Maneuvers" :collapse="false" v-bind:class="use_single" :cols="1" />
    <h2>Basic Gambits</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Gambit')" /><show-cards
      :inputs="[$store.getters.getManeuver('Basic Feint'), $store.getters.getManeuver('Basic Flourish'), $store.getters.getManeuver('Basic Sunder')]"
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
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
    },
    use_single() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-single'
    },
    num_cols() {
      if (this.isMobile) {
        return 12
      }
      return 6
    },
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
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
</style>
