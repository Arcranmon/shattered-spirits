<template>
  <div class="background">
    <h2>Basic Skills</h2>
    <div style="text-align: center; width: 100%">
      <p>The below tabs contain all the Techniques, Attacks, Actions, Stunts, Reactions, and Gambits that all characters have access to by default.</p>
      <br />
    </div>
    <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered
      ><v-tab> <h4>Techniques</h4> </v-tab><v-tab> <h4>Stances</h4> </v-tab><v-tab> <h4>Actions</h4> </v-tab><v-tab> <h4>Attacks</h4> </v-tab
      ><v-tab> <h4>Stunts</h4> </v-tab><v-tab> <h4>Reactions</h4> </v-tab
      ><v-tab>
        <h4>Gambits</h4>
      </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="character-tab-content">
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Technique')" /><show-cards
          :inputs="this.$store.getters.getTechniquesFromList(['Shift', 'Rally', 'Improvise'])"
          job="Techniques"
          :collapse="false"
        />
        <show-cards :inputs="this.$store.getters.getTechniquesFromList(['Skirmish', 'Combination Strike', 'Smash'])" job="Techniques" :collapse="false" />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stance')" /><show-cards
          :inputs="this.$store.getters.getStancesFromList(['Balanced Stance', 'Summoner\'s Stance'])"
          job="Stances"
          :collapse="false"
          v-bind:class="use_duo"
          :cols="2"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Action')" /><show-cards
          :inputs="[this.$store.getters.getManeuver('Prepare'), this.$store.getters.getManeuver('Fight'), this.$store.getters.getManeuver('Raise Guard')]"
          job="Maneuvers"
          :collapse="false"
        />
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Action')" /><show-cards
          :inputs="[this.$store.getters.getManeuver('Sprint'), this.$store.getters.getManeuver('Rebalance'), this.$store.getters.getManeuver('Spirit Summon')]"
          job="Maneuvers"
          :collapse="false"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Attack')" />
        <show-cards
          :inputs="[this.$store.getters.getAttack('Brawl'), $store.getters.getAttack('Weapon Attack')]"
          job="Attacks"
          :collapse="false"
          v-bind:class="use_duo"
          :cols="2"
      /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stunt')" />
        <show-cards
          :inputs="[$store.getters.getManeuver('Draw/Stow'), $store.getters.getManeuver('Retreat'), $store.getters.getManeuver('Leap')]"
          job="Maneuvers"
          :collapse="false"
        />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Reaction')" />
        <show-cards
          :inputs="[this.$store.getters.getManeuver('Opportunity Attack'), $store.getters.getManeuver('Defend'), $store.getters.getManeuver('Dodge')]"
          job="Maneuvers"
          :collapse="false"
        />
        <show-cards :inputs="[$store.getters.getManeuver('Partnership')]" job="Maneuvers" :collapse="false" v-bind:class="use_single" :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Gambit')" /><show-cards
          :inputs="[$store.getters.getManeuver('Lethal Strike'), $store.getters.getManeuver('Gather Momentum')]"
          job="Maneuvers"
          :collapse="false"
          :cols="2"
          v-bind:class="use_duo" /></v-tab-item
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
    return { tab: 0 }
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
    use_trio() {
      if (this.isMobile) {
        return ''
      }
      return ''
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
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
