<template>
  <div>
    <h2>Armors</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header>Filters</v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;">
              <v-col cols="12"
                ><v-select
                  v-model="selectedArmors"
                  :items="armorCategories"
                  attach
                  label="Armor Categories"
                  multiple
                  filled
                  outlined
                ></v-select> </v-col></v-row
          ></v-expansion-panel-content>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedArmor"
        :items="armors"
        item-text="Name"
        return-object
        attach
        label="Selected Armor"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><armor-card v-if="selectedArmor != null" :armor="selectedArmor" style="margin-left: 2em; margin-right: 2em;"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;">
        <v-col cols="6"><v-select v-model="selectedArmors" :items="armorCategories" attach label="Armor Categories" multiple filled outlined></v-select> </v-col
      ></v-row>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="armor in armors" style="width: 100%;" v-bind:key="armor.Name">
              <v-btn @click="selectArmor(armor)" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="armor.Icon" />{{ armor.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <armor-card v-if="selectedArmor != null" :armor="selectedArmor" style="width: 40em;" :key="selectedArmor.Name" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
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
  methods: {
    selectArmor(armor) {
      this.selectedArmor = armor
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
