<template>
  <div class="background">
    <h2>Basic Skills</h2>
    <v-tabs v-model="tab" class="character-tabs" dark color="black" centered
      ><v-tab> <h4>Abilities</h4> </v-tab><v-tab> <h4>Arts</h4> </v-tab><v-tab> <h4>Stances</h4> </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="character-tab-content">
      <v-tab-item
        ><v-row
          ><v-col cols="4" v-for="ability in basic_abilities"
            ><ability-widget :ability="ability" from="" :cardStyle="true" :key="ability.Name" class="ability-box" /></v-col></v-row
      ></v-tab-item>
      <v-tab-item>
        <show-cards :inputs="this.$store.getters.getArtsFromList(['Martial Arts'])" :collapse="false" :cols="2" />
      </v-tab-item>
      <v-tab-item><show-cards :inputs="[this.$store.getters.getStance('Spiritbound Stance')]" :collapse="false" :cols="2" /></v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import AbilityWidget from '@/components/AbilityWidget.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-techniques',
  data() {
    return { tab: 0, abilityTab: 0 }
  },
  components: {
    ShowCards,
    AbilityWidget,
  },
  computed: {
    maneuvers() {
      var abilities = this.$store.getters.getBasicAbilities()
      abilities = abilities.filter((a) => a.Type == 'Maneuver')
      abilities.sort((a, b) => {
        return a.Name.localeCompare(b.Name)
      })
      return abilities
    },
    gambits() {
      var abilities = this.$store.getters.getBasicAbilities()
      abilities = abilities.filter((a) => a.Type == 'Gambit')
      abilities.sort((a, b) => {
        return a.Name.localeCompare(b.Name)
      })
      return abilities
    },
    reactions() {
      var abilities = this.$store.getters.getBasicAbilities()
      abilities = abilities.filter((a) => a.Type == 'Reaction')
      abilities.sort((a, b) => {
        return a.Name.localeCompare(b.Name)
      })
      return abilities
    },
    basic_abilities() {
      var arr = [
        { code: 'Maneuver', value: 0 },
        { code: 'Reaction', value: 0 },
        { code: 'Gambit', value: 0 },
      ]
      var order = ['Maneuver', 'Reaction', 'Gambit']
      var abilities = this.$store.getters.getBasicAbilities()
      abilities.sort((a, b) => {
        if (a.Type == b.Type) return a.Name.localeCompare(b.Name)
        return order.indexOf(a.Type) - order.indexOf(b.Type)
      })
      return abilities
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
  margin: 1em;
  padding: 1em;
  background-color: $color--background !important;
}
.ability-box {
  margin-top: 0 !important;
  padding-top: 0 !important;
  margin: 0.5em;
  border: $border--black-standard;
  background-color: $color--grey-light !important;
  height: 100%;
}
</style>
