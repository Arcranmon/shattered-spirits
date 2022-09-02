<template
  ><span>
    <v-snackbar v-model="removeHand">
      You may not remove your Hand Weapon; it's a default weapon that all
      characters get!
    </v-snackbar>
    <v-snackbar v-model="removeSlam">
      You may not remove your Slam Weapon; it's a default weapon that all
      characters get!
    </v-snackbar>
    <div class="button-seperator">
      <v-btn
        color="success"
        large
        tile
        @click="$emit('chose-weapon')"
        :disabled="!character.HasAllUnarmed"
      >
        <span v-if="!character.HasAllUnarmed">CHOOSE YOUR UNARMED WEAPONS</span>
        <span v-else>ACCEPT UNARMED WEAPONS</span>
      </v-btn>
    </div>
    You may select an additional {{ character.Martial }} unarmed weapons!<br /><br />Click
    a selected weapon to unequip it. {{ character.Martial }}
    <div class="weapon--box">
      <show-cards
        :inputs="charWeapons"
        job="Weapons"
        :collapse="true"
        display_text="Selected Unarmed Weapons"
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
          <v-btn
            color="success"
            class="button-seperator"
            large
            tile
            @click="addWeapon(weapon)"
            :disabled="
              character.HasAllUnarmed ||
              weapon.Name == '' ||
              !character.CanAddUnarmedWeapon()
            "
          >
            <span v-if="weapon.Name == ''">Select a weapon on the left!</span>
            <span v-else>ADD {{ weapon.Name }}</span>
          </v-btn>
          <div>
            <weapon-card
              :weapon="weapon"
              v-if="(weapon.Name !='' )"
            /></div></v-col></v-row></v-container
  ></span>
</template>
<script>
import Vue from "vue";

import { store } from "@/store";
import { Character, Weapon } from "@/class";
import variables from "@/styles/variables.scss";
import WeaponCard from "@/components/cards/WeaponCard.vue";
import ShowCards from "@/components/cards/ShowCards.vue";
export default Vue.extend({
  name: "weapon-selection",
  components: { WeaponCard, ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      variables,
      weapon: new Weapon(),
      removeHand: false,
      removeSlam: false,
    };
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getWeaponsByCategory("Unarmed");
    },
    charWeapons() {
      return this.$store.getters.getWeaponsFromList(
        this.character.UnarmedWeapons
      );
    },
  },
  methods: {
    addWeapon: function (variable) {
      this.character.AddUnarmedWeapon(variable);
    },
    removeWeapon(variable) {
      if (variable.card.Name == "Slam") this.removeSlam = true;
      if (variable.card.Name == "Hand") this.removeHand = true;
      this.character.RemoveUnarmedWeapon(variable.card, variable.index);
    },
  },
});
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
