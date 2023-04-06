<template
  ><span>
    <h3>Choosing Your Unarmed Weapons</h3>
    <display-tooltip-text :string="creationText" />
    <v-layout justify-center>
      <div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-weapon')" :disabled="!character.HasAllUnarmed">
          <span v-if="!character.HasAllUnarmed">CHOOSE YOUR UNARMED WEAPONS</span>
          <span v-else>ACCEPT UNARMED WEAPONS</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select an additional ' + character.MartialForms + ' Unarmed Weapons!'" /><br />
      <display-tooltip-text string="Click a selected weapon to unequip it." />
    </div>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Weapons</h4>
          <show-cards
            :inputs="charWeapons"
            job="Weapons"
            :collapse="false"
            :cols="1"
            standalone_or_contained="Standalone"
            :character_creation="true"
            :selectButton="true"
            @chose="removeWeapon"
        /></v-col>
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <show-cards
            :inputs="weapons"
            job="Weapons"
            :cols="2"
            header_color="Unarmed"
            display_text="Unarmed"
            summary_text="Skilled unarmed strikes that allow making a large number of attacks, as well as inflicting a great deal of status conditions."
            :character_creation="true"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="addWeapon" /></v-col></v-row></v-container
  ></span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character, Weapon } from '@/class'
import WeaponCard from '@/components/cards/WeaponCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import UnarmedSelectionText from '@/database/text_files/character_creation/choosing_your_unarmed_weapons.txt'

export default Vue.extend({
  name: 'weapon-selection',
  components: { WeaponCard, ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      weapon: new Weapon(),
      removeHand: false,
      removeSlam: false,
    }
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getWeaponsByCategory('Unarmed')
    },
    charWeapons() {
      return this.$store.getters.getWeaponsFromList(this.character.UnarmedWeaponsCreation)
    },
    creationText: function () {
      return UnarmedSelectionText
    },
  },
  methods: {
    addWeapon: function (variable) {
      this.character.AddUnarmedWeapon(variable.card)
    },
    removeWeapon(variable) {
      this.character.RemoveUnarmedWeapon(variable.card)
    },
  },
})
</script>

<style scoped lang="scss">
.button-separator {
  margin-bottom: 1em;
}
.weapon--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
