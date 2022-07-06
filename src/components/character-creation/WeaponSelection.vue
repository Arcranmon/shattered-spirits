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
        :disabled="!character.HasAllWeapons"
      >
        <span v-if="!character.HasAllWeapons">CHOOSE YOUR WEAPONS</span>
        <span v-else>ACCEPT WEAPONS</span>
      </v-btn>
    </div>
    You may select an additional {{ character.HandsRemaining }} hands of
    weaponry!<br /><br />Click a selected weapon to unequip it.
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
          <v-select
            label="Choose a Weapon!"
            :items="weapons"
            hide-details
            v-model="weapon"
            outlined
            return-object
            @change="$emit('chose', weapon)"
          >
            <template slot="item" slot-scope="{ item }">
              {{ item.Name }} ({{ item.Category }})</template
            >
            <template slot="selection" slot-scope="{ item }">
              {{ item.Name }} ({{ item.Category }})
            </template>
          </v-select></v-col
        ><v-col cols="9">
          <v-btn
            color="success"
            class="button-seperator"
            large
            tile
            @click="addWeapon(weapon)"
            :disabled="
              character.HasAllWeapons ||
              weapon.Name == '' ||
              !character.CanAddWeapon(weapon)
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
      return this.$store.getters.getWeaponsForCharCreation();
    },
    charWeapons() {
      return this.$store.getters.getWeaponsFromList(this.character.Weapons);
    },
  },
  methods: {
    addWeapon: function (variable) {
      this.character.AddWeapon(variable);
    },
    removeWeapon(variable) {
      if (variable.card.Name == "Slam") this.removeSlam = true;
      if (variable.card.Name == "Hand") this.removeHand = true;
      this.character.RemoveWeapon(variable.card, variable.index);
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