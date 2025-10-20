<template>
  <div class="background">
    <h2>Spirit Abilities</h2>
    <p style="text-align: center; width: 100%">
      You can do a great deal to specialize your spirit, from choosing its physical form to deciding what type of magic it is most aligned with. The below tabs
      show the different spirit options available at character creation, as well as an additional tab showing natural weapons such as claws and fangs that
      spirits may choose from.
    </p>
    <br />
    <v-tabs v-model="tab" class="spirit-tabs" background-color="#b69e75" color="black" centered
      ><v-tab> <h4>Earth</h4> </v-tab><v-tab> <h4>Flame</h4> </v-tab><v-tab> <h4>Water</h4> </v-tab><v-tab> <h4>Wind</h4> </v-tab><v-tab> <h4>Wood</h4> </v-tab
      ><v-tab> <h4>Metal</h4> </v-tab><v-tab> <h4>Traits</h4> </v-tab><v-tab> <h4>Natural Weapons</h4> </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="spirit-tab-content">
      <v-tab-item><spirit-ability-options element="Earth" /> </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item> </v-tab-item>
      <v-tab-item></v-tab-item>
      <v-tab-item><spirit-ability-options element="Metal" /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text style="margin: 1em" :string="spiritWeaponText" /><br /><br />

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
          <div><weapon-card v-if="selectedWeapon != null" :weapon="selectedWeapon" style="margin-left: 2em; margin-right: 2em" /></div
        ></span>
        <span v-else>
          <v-row align="center" style="margin-left: 0.5em; margin-top: 1em">
            <v-col cols="2"><v-select v-model="selectedSpeed" :items="weaponSpeeds" attach label="Weapon Speed" filled outlined></v-select></v-col
            ><v-col cols="2"><v-select v-model="selectedType" :items="weaponTypes" attach label="Weapon Type" filled outlined></v-select></v-col
          ></v-row>
          <v-row class="page" style="margin-bottom: 1em">
            <v-col cols="auto" class="sidebar">
              <v-btn-toggle borderless overflow-auto
                ><div v-for="weapon in weapons" style="width: 100%" v-bind:key="weapon.Name">
                  <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
                    <img class="image--icon-size" :src="weapon.Icon" />{{ weapon.Name }}
                  </v-btn>
                </div>
              </v-btn-toggle></v-col
            >
            <v-col> <weapon-card v-if="selectedWeapon != null" :weapon="selectedWeapon" style="width: 40em" :key="selectedWeapon.Name" /></v-col> </v-row></span
      ></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import EarthText from '@/database/text_files/spirit_mechanics/earth.txt'
import WaterText from '@/database/text_files/spirit_mechanics/water.txt'
import WindText from '@/database/text_files/spirit_mechanics/wind.txt'
import FlameText from '@/database/text_files/spirit_mechanics/flame.txt'
import SpiritWeaponText from '@/database/text_files/spirit_mechanics/spirit_weapons.txt'
import CombatTraitText from '@/database/text_files/spirit_mechanics/combat_traits.txt'
import SpiritTypeCard from '@/components/cards/SpiritTypeCard.vue'
import ArmorCard from '@/components/cards/ArmorCard.vue'
import WeaponCard from '@/components/cards/WeaponCard.vue'
import SpiritAbilityOptions from '@/components/SpiritAbilityOptions.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'spirit-abilities',
  data() {
    return {
      tab: 0,
      weaponSpeeds: ['Any', 1, 2, 3, 4],
      selectedSpeed: 'Any',
      weaponTypes: ['Any', 'Light', 'Balanced', 'Heavy'],
      selectedType: 'Any',
      selectedWeapon: null,
    }
  },
  components: { ArmorCard, ShowCards, WeaponCard, SpiritTypeCard, SpiritAbilityOptions },
  computed: {
    earthText() {
      return EarthText
    },
    waterText() {
      return WaterText
    },
    windText() {
      return WindText
    },
    flameText() {
      return FlameText
    },
    spiritWeaponText() {
      return SpiritWeaponText
    },
    combatTraitText() {
      return CombatTraitText
    },
    weapons: function () {
      return this.$store.getters.getFilteredWeapons('Natural', this.selectedSpeed, this.selectedType).sort((a, b) => a.Speed > b.Speed)
    },
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
    },
    use_single() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-single'
    },
    num_cols() {
      if (this.isMobile) {
        return 12
      }
      return 4
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.centered-single {
  justify-content: center;
  margin: auto;
  width: 33.33%;
}
.centered-duo {
  justify-content: center;
  margin: auto;
  width: 66.66%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
.spirit-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.spirit-tab-content {
  background-color: $color--background !important;
}
.spirit-box--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  height: 100%;
  text-align: center;
  color: black;
}
.spirit-box--underline-top {
  border-bottom: 5px solid black;
}
.spirit-box--content {
  color: black;
  padding: $space--xs;
}
.spirit-box--text-format {
  font-size: $font-size--m;
}
.spirit-box--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
