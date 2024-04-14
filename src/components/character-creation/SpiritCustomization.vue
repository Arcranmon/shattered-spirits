<template
  ><span
    ><div v-if="character.HasSpirit" :key="character.Element">
      <div class="button-separator">
        <display-tooltip-text :string="customizationText" />
        <br />
        <br />
        <v-layout justify-center
          ><v-btn large tile color="success" @click="$emit('customized')" :disabled="!character.Spirit.HasFormAndWeapons">
            <span v-if="!character.HasSpirit">CUSTOMIZE YOUR SPIRIT</span>
            <span v-else>ACCEPT CUSTOMIZATION</span>
          </v-btn></v-layout
        >
      </div>
      <div class="centered--formatted">
        <div v-if="!character.Spirit.HasForm"><display-tooltip-text string="You are missing your spirit's Form!" /></div>
        <div v-if="!character.Spirit.HasWeapons"><display-tooltip-text string="You are missing your spirit's Weapons!" /></div>
      </div>
      <div>
        <v-row style="margin-top: 1em;">
          <v-col :cols="num_cols" v-for="form in get_forms" :key="form"
            ><div>
              <v-layout justify-center style="margin-bottom: 1em;"
                ><v-btn large tile color="success" @click="setForm(form)" :disabled="character.Spirit.HasForm && character.Spirit.Form.Name == form">
                  <span>CHOOSE {{ form }}</span>
                </v-btn></v-layout
              >
              <spirit-form-card :form="$store.getters.getSpiritForm(form)" header_color="Earth" /></div></v-col
        ></v-row>
        <v-row v-if="character.Spirit.HasForm" style="margin-top: 2em; margin-bottom: 2em;">
          <v-col cols="auto" class="sidebar--enclosed">
            <v-btn-toggle borderless overflow-auto
              ><div v-for="weapon in weapons" style="width: 100%;" v-bind:key="weapon.Name">
                <v-btn @click="selectedWeapon = weapon" class="button--style" depressed tile block>
                  <img class="image--icon-size" :src="weapon.Icon" />{{ weapon.Name }}
                </v-btn>
              </div>
            </v-btn-toggle></v-col
          >
          <v-col>
            <v-row>
              <v-layout style="margin-left: 1em; margin-right: 1em; width: 100%;" justify-center>
                <display-tooltip-text :string="character.Spirit.PrettyWeaponOptions" class="page--description" /> </v-layout
            ></v-row>
            <v-row>
              <v-layout style="margin-top: 1em; width: 100%;" justify-center>
                <display-tooltip-text string="You have selected the below weapons (click to remove):" />
              </v-layout>
            </v-row>
            <v-row style="margin-top: 1em; margin-bottom: 1em;">
              <v-layout style="margin-top: 1em; width: 100%;" justify-center>
                <div v-for="(weapon, index) in character.Spirit.Weapons" :key="weapon" class="selected--item">
                  <v-btn @click="character.Spirit.RemoveWeapon(index)" class="button--style" depressed tile block> {{ weapon }} </v-btn>
                </div>
              </v-layout> </v-row
            ><v-row style="margin-left: 1em; margin-right: 1em; margin-bottom: 1em; width: 100%;" justify="center"
              ><v-btn
                large
                tile
                color="success"
                @click="addWeapon(selectedWeapon)"
                :disabled="selectedWeapon == null || !character.Spirit.CanAddWeapon(selectedWeapon)"
              >
                <span v-if="selectedWeapon == null">CHOOSE A WEAPON</span>
                <span v-else-if="!character.Spirit.CanAddWeapon(selectedWeapon)">CANNOT ADD {{ selectedWeapon.Type }} WEAPON</span>
                <span v-else>CHOOSE {{ selectedWeapon.Name }}</span>
              </v-btn></v-row
            >
            <v-row style="margin-left: 1em; margin-right: 1em; margin-bottom: 1em; width: 100%;" justify="center">
              <attack-card v-if="selectedWeapon != null" :attack="selectedWeapon" style="width: 50%;" :key="selectedWeapon.Name" /></v-row
          ></v-col>
        </v-row>
      </div>
    </div>
    <div v-else>
      <div class="button-separator">
        <display-tooltip-text :string="customizationText" />
        <br />
        <br />
      </div>
      <display-tooltip-text string="You have not selected a spirit element yet; select one to continue!" /></div
  ></span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character } from '@/class'
import CustomizationText from '@/database/text_files/character_creation/customizing_your_spirit.txt'
import SpiritFormCard from '@/components/cards/SpiritFormCard.vue'
import AttackCard from '@/components/cards/AttackCard.vue'
export default Vue.extend({
  name: 'spirit-customization',
  components: { AttackCard, SpiritFormCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data() {
    return {
      selectedWeapon: null,
    }
  },
  methods: {
    addWeapon: function (variable) {
      this.character.Spirit.AddWeapon(variable.Name)
    },
    setForm(variable) {
      this.character.Spirit.Form = this.$store.getters.getSpiritForm(variable)
    },
  },
  computed: {
    customizationText: function () {
      return CustomizationText
    },
    num_cols: function () {
      if (this.isMobile) return 12
      return 4
    },
    get_forms: function () {
      var forms = [
        'Swift ' + this.character.Element + ' Spirit',
        'Balanced ' + this.character.Element + ' Spirit',
        'Heavy ' + this.character.Element + ' Spirit',
      ]
      return forms
    },
    weapons: function () {
      return this.$store.getters.getFilteredWeapons('Natural', 'Any', 'Any').sort((a, b) => a.Speed > b.Speed)
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
