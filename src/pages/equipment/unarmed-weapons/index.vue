<template>
  <div>
    <h2>Weapons and Shields</h2>
    <v-row align="center" style="margin-left: 0.5em;">
      <v-col cols="2"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
      ><v-col cols="2"><v-select v-model="selectedKeyword" :items="weaponKeywords" attach label="Weapon Keywords" filled outlined></v-select></v-col
    ></v-row>
    <v-row class="page">
      <v-col cols="auto" class="sidebar">
        <v-btn-toggle borderless overflow-auto
          ><div v-for="weapon in weapons" style="width: 100%;" v-bind:key="weapon.Name">
            <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
              <img class="image--size" :src="weapon.Icon" />{{ weapon.Name }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col> <weapon-card v-if="selectedWeapon != null" :weapon="selectedWeapon" style="width: 40em;" /></v-col>
    </v-row>
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
.page {
  margin: 0px;
}
.sidebar {
  background: $color--light-parchment;
  padding: 0px;
  border-top: 0.5em double black;
  border-right: 0.5em double black;
  border-bottom: 0.5em double black;
  align-content: center;
  justify-content: center;
  height: 70vh;
  overflow-y: auto;
}
.v-btn-toggle {
  flex-direction: column;
}
.v-btn {
  white-space: normal;
  flex: auto;
  align-content: center;
  justify-content: left;
}
.button--style {
  background: $color--light-parchment !important;
  word-wrap: break-word;
}
.image--size {
  height: 2em;
}
</style>
