<template
  ><span>
    <div class="character-creation">
      <h3>Choosing Your Weapons</h3>
      <span v-html="creationText" />
    </div>
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
    You may select an additional {{ character.HandsRemaining }} hands of weaponry!<br /><br />Click a selected weapon to unequip it.
    <div class="weapon--box">
      <show-cards
        :inputs="charWeapons"
        job="Weapons"
        :collapse="true"
        display_text="Selected Weapons"
        standalone_or_contained="Standalone"
        :selectButton="true"
        @chose="removeWeapon"
      />
    </div>
    <v-container class="fill-height" fluid>
      <v-row
        ><v-col cols="3">
          <v-autocomplete
            label="Choose a Weapon!"
            :items="weapons"
            :item-text="(item) => item.Name + ' (' + item.Category + ')'"
            hide-details
            v-model="weapon"
            outlined
            return-object
            @change="$emit('chose', weapon)"
          >
          </v-autocomplete></v-col
        ><v-col cols="9">
          <v-layout justify-center>
            <v-btn
              color="success"
              class="button-seperator"
              large
              tile
              @click="addWeapon(weapon)"
              :disabled="character.HasAllWeapons || weapon.Name == '' || !character.CanAddWeapon(weapon)"
            >
              <span v-if="weapon.Name == ''">Select a weapon on the left!</span>
              <span v-else>ADD {{ weapon.Name }}</span>
            </v-btn></v-layout
          >
          <div>
            <weapon-card :weapon="weapon" v-if="(weapon.Name !='' )" /></div></v-col></v-row></v-container
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
      return this.$marked.parse(WeaponSelectionText)
    },
  },
  methods: {
    addWeapon: function (variable) {
      this.character.AddWeapon(variable)
    },
    removeWeapon(variable) {
      this.character.RemoveWeapon(variable.card, variable.index)
    },
  },
})
</script>

<style scoped lang="scss">
.button-seperator {
  margin-bottom: 1em;
}
.character-creation {
  font-size: smaller;
}
.weapon--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
