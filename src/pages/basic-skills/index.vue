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
        <show-cards :inputs="this.$store.getters.getTechniquesFromList(['Skirmish', 'Combination Strike', 'Smash'])" job="Techniques" :collapse="false" />
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
          :collapse="false" />
        <show-cards
          :inputs="[this.$store.getters.getAttack('Unarmed Attack'), $store.getters.getAttack('Grapple')]"
          job="Attacks"
          :collapse="false"
          v-bind:class="use_duo"
          :cols="2"
      /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Action')" />
        <show-cards :inputs="[$store.getters.getManeuver('Hide')]" job="Maneuvers" :collapse="false" v-bind:class="use_single" :cols="1" />
        <show-cards
          :inputs="[this.$store.getters.getManeuver('Fight'), $store.getters.getManeuver('Swift Manifestation'), $store.getters.getManeuver('Shift')]"
          job="Maneuvers"
          :collapse="false"
        /><show-cards
          :inputs="[this.$store.getters.getManeuver('Raise Guard'), $store.getters.getManeuver('Rally'), this.$store.getters.getManeuver('Focus')]"
          job="Maneuvers"
          :collapse="false"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stunt')" />
        <show-cards :inputs="[$store.getters.getManeuver('Disengage')]" job="Maneuvers" :collapse="false" v-bind:class="use_single" :cols="1" />
        <show-cards
          :inputs="[$store.getters.getManeuver('Draw/Stow'), $store.getters.getManeuver('Combo'), $store.getters.getManeuver('Use Environment')]"
          job="Maneuvers"
          :collapse="false"
        />
        <show-cards
          :inputs="[this.$store.getters.getManeuver('Leap'), this.$store.getters.getManeuver('Sprint'), $store.getters.getManeuver('Tumble')]"
          job="Maneuvers"
          :collapse="false"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Reaction')" />
        <show-cards
          :inputs="[this.$store.getters.getManeuver('Flank'), this.$store.getters.getManeuver('Engage'), this.$store.getters.getManeuver('Opportunity Attack')]"
          job="Maneuvers"
          :collapse="false" />
        <show-cards
          :inputs="[
            $store.getters.getManeuver('Active Defense'),
            $store.getters.getManeuver('Dodge'),
            this.$store.getters.getManeuver('Spiritual Interdiction'),
          ]"
          job="Maneuvers"
          :collapse="false" /><show-cards
          :inputs="[$store.getters.getManeuver('Spirit Summon')]"
          job="Maneuvers"
          :collapse="false"
          v-bind:class="use_single"
          :cols="1"
      /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Gambit')" /><show-cards
          :inputs="[$store.getters.getManeuver('Aim'), $store.getters.getManeuver('Basic Feint'), $store.getters.getManeuver('Basic Flourish')]"
          job="Maneuvers"
          :collapse="false"
        /><show-cards
          :inputs="[$store.getters.getManeuver('Basic Sunder'), $store.getters.getManeuver('Critical Hit'), $store.getters.getManeuver('Mark')]"
          job="Maneuvers"
          :collapse="false"
          :cols="3"
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
