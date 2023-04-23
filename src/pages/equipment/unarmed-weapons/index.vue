<template>
  <div>
    <h2>Unarmed Weapons</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header>Filters</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row align="center" style="margin-left: 0.5em;">
              <v-col cols="12"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
              ><v-col cols="12"
                ><v-select v-model="selectedKeyword" :items="weaponKeywords" attach label="Weapon Keywords" filled outlined></v-select></v-col></v-row
          ></v-expansion-panel-content>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedWeapon"
        :items="weapons"
        item-text="Name"
        return-object
        attach
        label="Selected Unarmed Weapon"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><weapon-card v-if="selectedWeapon != null" :weapon="selectedWeapon" style="width: 40em; margin-left: auto; margin-right: auto;"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em;">
        <v-col cols="2"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
        ><v-col cols="2"><v-select v-model="selectedKeyword" :items="weaponKeywords" attach label="Weapon Keywords" filled outlined></v-select></v-col
      ></v-row>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="weapon in weapons" style="width: 100%;" v-bind:key="weapon.Name">
              <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="weapon.Icon" />{{ weapon.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <weapon-card v-if="selectedWeapon != null" :weapon="selectedWeapon" style="width: 40em;" :key="selectedWeapon.Name" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import { Weapon } from '@/class'
import WeaponCard from '@/components/cards/WeaponCard'

export default Vue.extend({
  name: 'unarmed-weapons',
  components: { WeaponCard },
  data() {
    return {
      selectedWeapons: ['Unarmed'],
      weaponSpeeds: ['Any', 1, 2, 3, 4, 5, 6],
      selectedSpeed: 'Any',
      weaponKeywords: ['Any', 'Light', 'Versatile', 'Heavy', 'Colossal', 'Pierce'],
      selectedKeyword: 'Any',
      selectedWeapon: null,
    }
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getFilteredWeapons(this.selectedWeapons, this.selectedSpeed, this.selectedKeyword)
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
