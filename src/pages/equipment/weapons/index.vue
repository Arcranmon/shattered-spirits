<template>
  <div>
    <h2>Weapons and Shields</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px">
        <v-expansion-panel style="background-color: inherit">
          <v-expansion-panel-header>Filters</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row align="center" style="margin-left: 0.5em">
              <v-col cols="12"
                ><v-select v-model="selectedWeapons" :items="weaponCategories" attach label="Weapon Categories" multiple filled outlined
                  ><template v-slot:prepend-item>
                    <v-list-item ripple @mousedown.prevent @click="weaponCategoryToggle"
                      ><v-list-item-action>
                        <v-icon :color="selectedWeapons.length > 0 ? 'indigo darken-4' : ''">
                          {{ icon }}
                        </v-icon>
                      </v-list-item-action>
                      <v-list-item-content>
                        <v-list-item-title> Select All </v-list-item-title>
                      </v-list-item-content>
                    </v-list-item>
                    <v-divider class="mt-2"></v-divider> </template
                  ><template v-slot:selection="{ item, index }">
                    <span v-if="index === 0">{{ item }} </span>&nbsp;
                    <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedWeapons.length - 1 }} others) </span>
                  </template></v-select
                > </v-col
              ><v-col cols="12"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
              ><v-col cols="12"><v-select v-model="selectedType" :items="weaponTypes" attach label="Weapon Type" filled outlined></v-select></v-col></v-row
          ></v-expansion-panel-content>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedWeapon"
        :items="weapons"
        item-text="Name"
        return-object
        attach
        label="Selected Weapon"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em"
      ></v-select>
      <div><attack-card v-if="selectedWeapon != null" :attack="selectedWeapon" style="margin-left: 2em; margin-right: 2em" /></div
    ></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em">
        <v-col cols="2"
          ><v-select v-model="selectedWeapons" :items="weaponCategories" attach label="Weapon Categories" multiple filled outlined
            ><template v-slot:prepend-item>
              <v-list-item ripple @mousedown.prevent @click="weaponCategoryToggle"
                ><v-list-item-action>
                  <v-icon :color="selectedWeapons.length > 0 ? 'indigo darken-4' : ''">
                    {{ icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title> Select All </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider> </template
            ><template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item }} </span>&nbsp;
              <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedWeapons.length - 1 }} others) </span>
            </template></v-select
          > </v-col
        ><v-col cols="2"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
        ><v-col cols="2"><v-select v-model="selectedType" :items="weaponTypes" attach label="Weapon Type" filled outlined></v-select></v-col
      ></v-row>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="weapon in weapons" style="width: 100%" v-bind:key="weapon.Name">
              <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="weapon.Icon" />{{ weapon.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <attack-card v-if="selectedWeapon != null" :attack="selectedWeapon" style="width: 40em" :key="selectedWeapon.Name" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import { Weapon } from '@/class'
import AttackCard from '@/components/cards/AttackCard'

export default Vue.extend({
  name: 'weapon',
  components: { AttackCard },
  data() {
    return {
      weaponCategories: ['Blade', 'Pole', 'Axe', 'Blunt', 'Throwing', 'Bow', 'Sling', 'Shield', 'Improvised'],
      selectedWeapons: ['Blade', 'Pole', 'Axe', 'Blunt', 'Throwing', 'Bow', 'Sling', 'Shield', 'Improvised'],
      weaponSpeeds: ['Any', 1, 2, 3, 4, 5, 6, 7, 8],
      selectedSpeed: 'Any',
      weaponTypes: ['Any', 'Light', 'Versatile', 'Heavy'],
      selectedType: 'Any',
      selectedWeapon: null,
    }
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getFilteredWeapons(this.selectedWeapons, this.selectedSpeed, this.selectedType)
    },
    hasAllWeapons() {
      return this.selectedWeapons.length === this.weaponCategories.length
    },
    hasSomeWeapons() {
      return this.selectedWeapons.length > 0 && !this.weaponCategories
    },
    icon() {
      if (this.hasAllWeapons) return 'mdi-close-box'
      if (this.hasSomeWeapons) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {
    weaponCategoryToggle() {
      this.$nextTick(() => {
        if (this.hasAllWeapons) {
          this.selectedWeapons = []
        } else {
          this.selectedWeapons = this.weaponCategories.slice()
        }
      })
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
