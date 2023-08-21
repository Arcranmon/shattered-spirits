<template>
  <div>
    <h2>Gears</h2>
    <span v-if="isMobile">
      <v-select
        v-model="selectedGear"
        :items="gears"
        item-text="Name"
        return-object
        attach
        label="Selected Gear"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><gear-card v-if="selectedGear != null" :gear="selectedGear" style="width: 40em; margin-left: auto; margin-right: auto;"
    /></span>
    <span v-else>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="gear in gears" style="width: 100%;" v-bind:key="gear.Name">
              <v-btn @click="selectGear(gear)" class="button--style" depressed tile block>
                {{ gear.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <gear-card v-if="selectedGear != null" :gear="selectedGear" style="width: 40em;" :key="selectedGear.Name" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import GearCard from '@/components/cards/GearCard'

export default Vue.extend({
  name: 'gear',
  components: { GearCard },
  data() {
    return {
      selectedGear: null,
    }
  },
  computed: {
    gears: function () {
      return this.$store.getters.getGears()
    },
  },
  methods: {
    selectGear(gear) {
      this.selectedGear = gear
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
