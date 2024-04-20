<template>
  <div>
    <h2>Accessories</h2>
    <span v-if="isMobile">
      <v-select
        v-model="selectedAccessory"
        :items="accessories"
        item-text="Name"
        return-object
        attach
        label="Selected Accessory"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em"
      ></v-select
      ><accessory-card v-if="selectedAccessory != null" :accessory="selectedAccessory" style="width: 40em; margin-left: auto; margin-right: auto"
    /></span>
    <span v-else>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="accessory in accessories" style="width: 100%" v-bind:key="accessory.Name">
              <v-btn @click="selectAccessory(accessory)" class="button--style" depressed tile block>
                {{ accessory.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col>
          <accessory-card v-if="selectedAccessory != null" :accessory="selectedAccessory" style="width: 40em" :key="selectedAccessory.Name"
        /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import AccessoryCard from '@/components/cards/AccessoryCard'

export default Vue.extend({
  name: 'accessories',
  components: { AccessoryCard },
  data() {
    return {
      selectedAccessory: null,
    }
  },
  computed: {
    accessories: function () {
      return this.$store.getters.getAccessories()
    },
  },
  methods: {
    selectAccessory(accessory) {
      this.selectedAccessory = accessory
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
