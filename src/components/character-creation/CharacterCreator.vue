<template>
  <v-container fluid>
    <v-stepper v-model="step" alt-labels>
      <v-stepper-header class="builder--header">
        <v-stepper-step editable step="1">
          <center>Choose Spirit Type!</center>
        </v-stepper-step>
        <v-stepper-step editable step="2">
          <center>Choose Armor!</center>
        </v-stepper-step>
        <v-stepper-step editable step="3">
          <center>Choose Weapons!</center>
        </v-stepper-step>
        <v-stepper-step editable step="4">
          <center>Choose Disciplines!</center>
        </v-stepper-step>
        <v-stepper-step editable step="5">
          <center>Choose Unarmed Weapons!</center>
        </v-stepper-step>
        <v-stepper-step editable step="6">
          <center>Choose Names!</center>
        </v-stepper-step>
        <v-stepper-step editable step="7">
          <center>Preview!</center>
        </v-stepper-step>
      </v-stepper-header>
      <v-stepper-items class="builder--body">
        <v-stepper-content step="1"><spirit-selection :character="character" @chose-spirit="step++" /> </v-stepper-content>
        <v-stepper-content step="2"><armor-selection :character="character" @chose-armor="step++" /> </v-stepper-content>
        <v-stepper-content step="3"><weapon-selection :character="character" @chose-weapon="step++" /> </v-stepper-content>
        <v-stepper-content step="4">"Placeholder" </v-stepper-content>
        <v-stepper-content step="5"><unarmed-selection :character="character" @chose-weapon="step++" /> </v-stepper-content>
        <v-stepper-content step="6"><name-selection :character="character" @chose-names="step++" /></v-stepper-content
        ><v-stepper-content step="7">
          <v-btn color="success" large tile @click="saveCharacter()" :disabled="!character.Complete">
            <span v-if="!character.Complete">You must finish making your character!</span>
            <span v-else>SAVE {{ character.Name }} AND {{ character.SpiritName }}</span></v-btn
          >
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import ArmorSelection from '@/components/character-creation/ArmorSelection.vue'
import SpiritSelection from '@/components/character-creation/SpiritSelection.vue'
import WeaponSelection from '@/components/character-creation/WeaponSelection.vue'
import UnarmedSelection from '@/components/character-creation/UnarmedSelection.vue'
import NameSelection from '@/components/character-creation/NameSelection.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
export default Vue.extend({
  name: 'character-creator',
  components: {
    ArmorSelection,
    NameSelection,
    ShowCards,
    SpiritSelection,
    UnarmedSelection,
    WeaponSelection,
  },
  data: () => ({
    step: 1,
    character: {},
  }),
  created() {
    this.character = new Character()
  },
  methods: {
    updateCharacter(variable) {
      this.character = variable
    },
    saveCharacter() {
      const store = getModule(CharacterManagementStore, this.$store)
      store.AddCharacter(this.character)
      this.$router.push('character-manager')
    },
  },
})
</script>

<style scoped lang="scss">
.builder--header {
  background: $color--parchment;
}
.builder--body {
  background: $color--off-white;
}
</style>
