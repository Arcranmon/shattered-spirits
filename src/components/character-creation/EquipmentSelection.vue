<template>
  <span>
    <display-tooltip-text :string="equipmentText" />
    <br />
    <br />
    <v-layout justify-center
      ><div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-equipment')">
          <span>ACCEPT EQUIPMENT</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <v-row
        ><v-col :cols="4" style="align-items: center; justify-content: center; display: flex"
          ><display-tooltip-text :string="'With your current Load of ' + character.Load + ' your character has the following movement chart:'"
        /></v-col>
        <v-col :cols="8"><movement-card :movement="character.MoveChart" :key="character.MoveChart.Name" /></v-col
      ></v-row>
    </div>
    <div class="keyword--box">
      <v-tabs fixed-tabs v-model="equipmentTab" color="black">
        <v-tab> <h3>Armor</h3></v-tab>
        <v-tab> <h3>Weapons</h3></v-tab>
      </v-tabs>
      <v-tabs-items v-model="equipmentTab">
        <v-tab-item :eager="true" class="builder--body" eager>
          <div class="button-separator">
            <div>
              <h3>Choosing Your Armor</h3>
              <display-tooltip-text :string="armorText" />
            </div>
            <br />
            <v-row style="margin-top: 1em">
              <v-col :cols="4" v-for="armor in armors" :key="armor.Name"
                ><div>
                  <v-layout justify-center style="margin-bottom: 1em"
                    ><v-btn
                      large
                      tile
                      color="success"
                      @click="setArmor(armor)"
                      :disabled="!character.CanAddArmor(armor) || character.EquippedArmor.Name == armor.Name"
                    >
                      <span v-if="character.EquippedArmor.Name == armor.Name">{{ armor.Name }} already equipped!</span>
                      <span v-else-if="!character.CanAddArmor(armor)">Cannot equip {{ armor.Name }}!</span>
                      <span v-else>CHOOSE {{ armor.Name }}</span>
                    </v-btn></v-layout
                  >
                  <armor-card :armor="armor" /></div></v-col
            ></v-row></div
        ></v-tab-item>
        <v-tab-item :eager="true" class="builder--body" eager>
          <div>
            <h3>Choosing Your Weapons</h3>
            <display-tooltip-text :string="weaponText" />
          </div>

          <v-row style="margin-top: 2em; margin-bottom: 2em">
            <v-col cols="auto" class="sidebar--enclosed">
              <v-btn-toggle borderless overflow-auto
                ><div v-for="weapon in weapons" style="width: 100%" v-bind:key="weapon.Name">
                  <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
                    <img class="image--icon-size" :src="weapon.Icon" />{{ weapon.Name }}
                  </v-btn>
                </div>
              </v-btn-toggle></v-col
            >
            <v-col>
              <v-row>
                <v-layout style="margin-top: 1em; width: 100%" justify-center>
                  <display-tooltip-text string="You have selected the below weapons (click to remove):" />
                </v-layout>
              </v-row>
              <v-row style="margin-top: 1em; margin-bottom: 1em">
                <v-layout style="margin-top: 1em; width: 100%" justify-center>
                  <div v-for="(weapon, index) in character.Weapons" :key="weapon" class="selected--item">
                    <v-btn @click="character.RemoveWeapon(index)" class="button--style" depressed tile block> {{ weapon }} </v-btn>
                  </div>
                </v-layout> </v-row
              ><v-row style="margin-left: 1em; margin-right: 1em; margin-bottom: 1em; width: 100%" justify="center"
                ><v-btn
                  large
                  tile
                  color="success"
                  @click="character.AddWeapon(selectedWeapon)"
                  :disabled="selectedWeapon == null || !character.CanAddWeapon(selectedWeapon)"
                >
                  <span v-if="selectedWeapon == null">CHOOSE A WEAPON</span>
                  <span v-else-if="!character.CanAddWeapon(selectedWeapon)">CANNOT ADD {{ selectedWeapon.Name }}</span>
                  <span v-else>CHOOSE {{ selectedWeapon.Name }}</span>
                </v-btn></v-row
              >
              <v-row style="margin-left: 1em; margin-right: 1em; margin-bottom: 1em; width: 100%" justify="center">
                <weapon-card v-if="selectedWeapon != null" :attack="selectedWeapon" style="width: 50%" :key="selectedWeapon.Name" /></v-row
            ></v-col> </v-row
        ></v-tab-item>
      </v-tabs-items></div
  ></span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character, Weapon } from '@/class'
import ArmorCard from '@/components/cards/ArmorCard.vue'
import WeaponCard from '@/components/cards/WeaponCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import ArmorSelectionText from '@/database/text_files/character_creation/choosing_your_armor.txt'
import EquipmentSelectionText from '@/database/text_files/character_creation/choosing_your_equipment.txt'
import WeaponSelectionText from '@/database/text_files/character_creation/choosing_your_weapons.txt'
export default Vue.extend({
  name: 'equipment-selection',
  components: { WeaponCard, ArmorCard, ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      equipmentTab: '1',
      selectedWeapon: null,
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
    armorText: function () {
      return ArmorSelectionText
    },
    equipmentText: function () {
      return EquipmentSelectionText
    },
    weaponText: function () {
      return WeaponSelectionText
    },
    armors: function () {
      return this.$store.getters.getPlayerArmors()
    },
  },
  methods: {
    setArmor(variable) {
      this.character.EquippedArmor = variable
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
.builder--header {
  background: $color--parchment;
}
.builder--body {
  background: $color--background;
  height: 100%;
}
.v-stepper__step {
  width: 100%;
  flex-direction: row;
  display: flex !important;
  flex-grow: 1;
}
</style>
