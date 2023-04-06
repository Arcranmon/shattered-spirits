<template
  ><span>
    <h3>Choosing Your Weapons</h3>
    <display-tooltip-text :string="creationText" />
    <br />
    <br />
    <v-layout justify-center
      ><div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-weapon')" :disabled="!character.HasAllWeapons">
          <span v-if="!character.HasAllWeapons">CHOOSE YOUR WEAPONS</span>
          <span v-else>ACCEPT WEAPONS</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select an additional ' + character.WeaponWeightRemaining + ' Weight of weaponry!'" /><br />
      <display-tooltip-text string="Click a weapon on the right to select it." /><br /><br />
    </div>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Weapons</h4>
          <v-row v-for="(count, weapon) in charWeapons" :key="weapon" no-gutters>
            <v-col md="0" sm="8"> {{ weapon }} x{{ count }}</v-col
            ><v-col> <v-btn inline x-small @click="removeWeapon(weapon), $emit('changed')" color="red">-</v-btn> </v-col></v-row
          ></v-col
        >
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <div style="margin-top: 1em;" class="centered-buttons">
            <span v-for="weapon_class in weapon_classes">
              <v-btn tile v-bind:class="weapon_class" :disabled="(weapon_category == weapon_class)" @click="weapon_category = weapon_class">{{
                weapon_class
              }}</v-btn></span
            >
          </div>
          <show-cards
            :inputs="$store.getters.getWeaponsByCategory(weapon_category)"
            job="Weapons"
            :cols="2"
            :character_creation="true"
            :collapse="false"
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
import WeaponSelectionText from '@/database/text_files/character_creation/choosing_your_weapons.txt'
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
      weapon_category: '',
      weapon_classes: ['Bladed', 'Pole', 'Hafted', 'Projectile', 'Throwing', 'Shield'],
      weapon_summaries: {
        Bladed: 'Weapons such as swords that focus on a balanced approach to combat.',
        Pole: 'Weapons such as spears that focus on attacking at range and consistent damage.',
        Hafted: 'Weapons such as axes and hammers that focus on high damage and destruction.',
        Projectile: 'Weapons such as bows that emphasize extreme range in exchange for melee capability.',
        Throwing: 'Weapons such as darts that emphasize moderate range and extreme speed.',
        Shield: 'A piece of armor wielded as a weapon, providing superior defense.',
      },
    }
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getWeaponsForCharCreation()
    },
    charWeapons() {
      var char_weapons = this.$store.getters.getWeaponsFromList(this.character.Weapons)
      var counts = {}
      for (const weapon of char_weapons) {
        counts[weapon.Name] = counts[weapon.Name] ? counts[weapon.Name] + 1 : 1
        if (weapon.Keywords.includes('Small')) counts[weapon.Name] = counts[weapon.Name] + 1
      }
      return counts
    },
    creationText: function () {
      return WeaponSelectionText
    },
  },
  methods: {
    addWeapon: function (variable) {
      this.character.AddWeapon(variable.card)
    },
    removeWeapon(variable) {
      this.character.RemoveWeapon(variable)
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
.centered-buttons {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  margin: auto;
}
</style>
