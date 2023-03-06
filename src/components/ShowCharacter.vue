<template>
  <div style="padding: 15px; margin: 1em;">
    <div v-if="character.Name != ''" class="character-cell">
      <h2>{{ character.Name }} and {{ character.SpiritName }} the {{ character.SpiritType }} Spirit</h2>
      <v-row style="margin: 1em;">
        <v-col cols="6">
          <v-row no-gutters>
            <v-col cols="3"><b>Endurance:</b></v-col>
            <v-col cols="2">{{ character.CurrentEndurance }} / {{ character.EquippedArmor.Endurance }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.CurrentEndurance += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.CurrentEndurance -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="3"><b>Health:</b></v-col>
            <v-col cols="2"> {{ character.CurrentHealth }} / {{ character.Health }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.CurrentHealth += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.CurrentHealth -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="3"><b>Grit:</b></v-col
            ><v-col cols="2"> {{ character.Grit }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.Grit += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.Grit -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="3"><b>Focus:</b></v-col
            ><v-col cols="2"> {{ character.Focus }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.Focus += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.Focus -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="3"><b>Momentum:</b></v-col
            ><v-col cols="2"> {{ character.Momentum }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.Momentum += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.Momentum -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="3"><b>Reflex:</b></v-col
            ><v-col cols="2"> {{ character.reflex }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.reflex += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.reflex -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row justify="center">
            <v-btn @click="character.ApplyRefresh(), $emit('changed')" class="grey lighten-4 mx-2">Apply Refresh</v-btn>
            <v-btn @click="character.ResetDefault(), $emit('changed')" class="grey lighten-4 mx-2">Set Default</v-btn></v-row
          ></v-col
        ><v-col cols="6"><armor-card :armor="character.EquippedArmor" :on_sheet="true" /> </v-col
        ><v-col v-if="character.AnyStanceUnequipped" cols="12" style="text-align: center;">Click a Stance or Style below to enter it!</v-col
        ><v-col cols="6"> <stance-card :stance="character.CurrentSpiritStance" :on_sheet="true" /></v-col
        ><v-col cols="6"> <stance-card :stance="character.CurrentMartialStance" :on_sheet="true" /></v-col
        ><v-col cols="12">
          <show-cards job="Weapons" :inputs="$store.getters.getWeaponsFromList(character.Weapons)" standalone_or_contained="Standalone" :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Weapons"
            display_text="Unarmed Weapons"
            :inputs="$store.getters.getWeaponsFromList(character.UnarmedWeapons)"
            standalone_or_contained="Standalone"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards job="Techniques" display_text="Basic Techniques" :inputs="basics" standalone_or_contained="Standalone" :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Techniques"
            display_text="Skill Techniques"
            :inputs="$store.getters.getTechniquesFromList(character.SkillTechniques)"
            standalone_or_contained="Standalone"
            :on_sheet="true"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Techniques"
            display_text="Spirit Techniques"
            :inputs="$store.getters.getTechniquesFromList(character.SpiritTechniques)"
            standalone_or_contained="Standalone"
            :on_sheet="true"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Spirit Stances"
            :inputs="$store.getters.getStancesFromList(character.SpiritStances)"
            standalone_or_contained="Standalone"
            :selectButton="true"
            :on_sheet="true"
            @chose="changeSpiritStance"
            :cols="2" /></v-col
        ><v-col cols="12">
          <show-cards
            job="Stances"
            display_text="Martial Stances"
            :inputs="$store.getters.getStancesFromList(character.MartialStances)"
            standalone_or_contained="Standalone"
            :selectButton="true"
            :on_sheet="true"
            @chose="changeMartialStance"
            :cols="2"
          /> </v-col
        ><v-col cols="12">
          <show-cards
            job="Maneuvers"
            display_text="Maneuvers"
            :inputs="$store.getters.getManeuversFromList(character.Maneuvers)"
            standalone_or_contained="Standalone"
            :on_sheet="true"
            :cols="2"
          /> </v-col
        ><v-col cols="12">
          <show-cards
            job="Reactions"
            display_text="Reactions"
            :inputs="$store.getters.getManeuversFromList(character.Reactions)"
            standalone_or_contained="Standalone"
            :on_sheet="true"
            :cols="2"
          /> </v-col
      ></v-row>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import ArmorCard from '@/components/cards/ArmorCard.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
export default Vue.extend({
  name: 'display-character',
  components: { ArmorCard, ShowCards, StanceCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  methods: {
    changeSpiritStance: function (variable) {
      this.character.CurrentSpiritStance = variable.card
      this.$emit('changed')
    },
    changeMartialStance: function (variable) {
      this.character.CurrentMartialStance = variable.card
      this.$emit('changed')
    },
  },
  computed: {
    basics: function () {
      var disc = this.$store.getters.getDiscipline('Basic')
      return this.$store.getters.getTechniquesFromList(disc.Techniques)
    },
  },
})
</script>

<style scoped lang="scss">
.character-cell {
  background-color: $color--grey-light;
  outline: $border--black-standard;
  border-radius: 0px;
}
</style>
