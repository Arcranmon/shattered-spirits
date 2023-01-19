<template
  ><span>
    <h3>Choosing Your Weapons</h3>
    <display-tooltip-text :string="creationText" />
    <br />
    <br />
    <v-layout justify-center
      ><div class="button-seperator">
        <v-btn color="success" large tile @click="$emit('chose-weapon')" :disabled="!character.HasAllWeapons">
          <span v-if="!character.HasAllWeapons">CHOOSE YOUR WEAPONS</span>
          <span v-else>ACCEPT WEAPONS</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select an additional ' + character.WeaponWeightRemaining + ' Encumbrance of weaponry!'" /><br />
      <display-tooltip-text string="Click a weapon on the right to select it, or a selected weapon to unequip it." /><br /><br />
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
          <span v-for="weapon_class in weapon_classes" :key="weapon_class">
            <show-cards
              :inputs="$store.getters.getWeaponsByCategory(weapon_class)"
              job="Weapons"
              :cols="2"
              :card_color="weapon_class"
              :header_color="weapon_class"
              :display_text="weapon_class"
              :summary_text="weapon_summaries[weapon_class]"
              :character_creation="true"
              standalone_or_contained="Standalone"
              :selectButton="true"
              @chose="addWeapon" /></span></v-col></v-row></v-container
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
      weapon_classes: ['Blade', 'Lance', 'Blunt', 'Projectile', 'Throwing', 'Shield'],
      weapon_summaries: {
        Blade: 'Weapons such as swords that focus on a balanced approach to combat.',
        Lance: 'Weapons such as spears that focus on attacking at range and consistent damage.',
        Blunt: 'Weapons such as axes and hammers that focus on high damage and destruction.',
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
      return this.$store.getters.getWeaponsFromList(this.character.Weapons)
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
      this.character.RemoveWeapon(variable.card)
    },
  },
})
</script>

<style scoped lang="scss">
.button-seperator {
  margin-bottom: 1em;
}
.weapon--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
