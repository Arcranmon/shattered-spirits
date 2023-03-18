<template>
  <div>
    <h2>Armors</h2>
    <v-row align="center" style="margin-left: 0.5em;">
      <v-col cols="2"><v-select v-model="selectedArmors" :items="armorCategories" attach label="Armor Categories" multiple filled outlined></v-select> </v-col
    ></v-row>
    <v-row class="page">
      <v-col cols="auto" class="sidebar">
        <v-btn-toggle borderless overflow-auto
          ><div v-for="armor in armors" style="width: 100%;" v-bind:key="armor.Name">
            <v-btn @click="selectedArmor = armor" class="button--style" depressed tile block>
              <img class="image--size" :src="armor.Icon" />{{ armor.Name }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col> <armor-card v-if="selectedArmor != null" :armor="selectedArmor" style="width: 40em;" /></v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import { Armor } from '@/class'
import ArmorCard from '@/components/cards/ArmorCard'

export default Vue.extend({
  name: 'armor',
  components: { ArmorCard },
  data() {
    return {
      armorCategories: ['Unarmored', 'Light Armor', 'Heavy Armor'],
      selectedArmors: ['Unarmored', 'Light Armor', 'Heavy Armor'],
      selectedArmor: null,
    }
  },
  computed: {
    armors: function () {
      return this.$store.getters.getFilteredArmors(this.selectedArmors)
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
