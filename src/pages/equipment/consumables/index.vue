<template>
  <div>
    <h2>Consumables</h2>
    <span v-if="isMobile">
      <v-select
        v-model="selectedConsumable"
        :items="consumables"
        item-text="Name"
        return-object
        attach
        label="Selected Consumable"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em"
      ></v-select
      ><Consumable-card v-if="selectedConsumable != null" :consumable="selectedConsumable" style="width: 40em; margin-left: auto; margin-right: auto"
    /></span>
    <span v-else>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="consumable in consumables" style="width: 100%" v-bind:key="consumable.Name">
              <v-btn @click="selectConsumable(consumable)" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="consumable.Icon" />{{ consumable.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col>
          <consumable-card v-if="selectedConsumable != null" :consumable="selectedConsumable" style="width: 40em" :key="selectedConsumable.Name"
        /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import ConsumableCard from '@/components/cards/ConsumableCard'

export default Vue.extend({
  name: 'consumables',
  components: { ConsumableCard },
  data() {
    return {
      selectedConsumable: null,
    }
  },
  computed: {
    consumables: function () {
      return this.$store.getters.getConsumables()
    },
  },
  methods: {
    selectConsumable(consumable) {
      this.selectedConsumable = consumable
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
