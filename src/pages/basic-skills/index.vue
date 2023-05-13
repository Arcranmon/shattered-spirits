<template
  ><div class="background">
    <h2>Basic Skills</h2>
    <div style="text-align: center; width: 100%;">
      <p>The below tabs contain all the Techniques, Attacks, Actions, Stunts, Reactions, and Gambits that all characters have access to by default.</p>
      <br />
    </div>
    <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered
      ><v-tab> <h4>Techniques</h4> </v-tab><v-tab> <h4>Attacks</h4> </v-tab><v-tab> <h4>Actions</h4> </v-tab><v-tab> <h4>Stunts</h4> </v-tab
      ><v-tab> <h4>Reactions</h4> </v-tab
      ><v-tab>
        <h4>Gambits</h4>
      </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="character-tab-content">
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Technique')" />
        <show-cards :inputs="this.$store.getters.getTechniquesFromList(['Swift Strike', 'Basic Strike', 'Strong Strike'])" job="Techniques" :collapse="false" />
        <show-cards
          v-bind:class="use_duo"
          :inputs="this.$store.getters.getTechniquesFromList(['Combo Strike', 'Rushing Strike'])"
          job="Techniques"
          :collapse="false"
          :cols="2"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Attack')" />
        <show-cards
          :inputs="[
            $store.getters.getAttack('Weapon Attack'),
            this.$store.getters.getAttack('Charged Attack'),
            this.$store.getters.getAttack('Quickened Attack'),
          ]"
          job="Attacks"
          :collapse="false"
        />
        <show-cards
          :inputs="[this.$store.getters.getAttack('Punch'), $store.getters.getAttack('Grapple'), this.$store.getters.getAttack('Slam')]"
          job="Attacks"
          :collapse="false"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Action')" />
        <show-cards
          :inputs="[$store.getters.getManeuver('Reorient'), this.$store.getters.getManeuver('Skirmish'), $store.getters.getManeuver('Recover')]"
          job="Maneuvers"
          :collapse="false"
        /><show-cards
          :inputs="[this.$store.getters.getManeuver('Prepare'), this.$store.getters.getManeuver('Raise Guard')]"
          job="Maneuvers"
          :collapse="false"
          :cols="2"
          v-bind:class="use_duo"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stunt')" />
        <show-cards
          :inputs="[$store.getters.getManeuver('Disengage'), $store.getters.getManeuver('Draw/Stow'), $store.getters.getManeuver('Improvised Combo')]"
          job="Maneuvers"
          :collapse="false"
        />
        <show-cards
          :inputs="[this.$store.getters.getManeuver('Leap'), $store.getters.getManeuver('Tumble'), $store.getters.getManeuver('Use Environment')]"
          job="Maneuvers"
          :collapse="false"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Reaction')" />
        <show-cards
          :inputs="[$store.getters.getManeuver('Create Opening'), $store.getters.getManeuver('Engage'), $store.getters.getManeuver('Opportunity Attack')]"
          job="Maneuvers"
          :collapse="false"
        /><show-cards
          :inputs="[$store.getters.getManeuver('Active Defense'), $store.getters.getManeuver('Dodge')]"
          job="Maneuvers"
          :collapse="false"
          v-bind:class="use_duo"
          :cols="2"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Gambit')" /><show-cards
          :inputs="[$store.getters.getManeuver('Basic Feint'), $store.getters.getManeuver('Basic Flourish'), $store.getters.getManeuver('Basic Sunder')]"
          job="Maneuvers"
          :collapse="false"
        /> </v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-techniques',
  data() {
    return { tab: null }
  },
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
.character-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.character-tab-content {
  margin-top: 1em;
  background-color: $color--background !important;
}
</style>
