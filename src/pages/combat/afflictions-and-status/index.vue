<template>
  <div>
    <h2>Afflictions and Status</h2>
    <span v-if="isMobile">
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;">
        <v-col cols="12"
          ><v-select v-model="selectedStatuses" :items="statusCategories" attach label="Status Categories" multiple filled outlined></v-select> </v-col></v-row
      ><br /><v-select
        v-model="selectedStatus"
        :items="statuses"
        item-text="Name"
        return-object
        attach
        label="Selected Status"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><status-card v-if="selectedStatus != null" :status="selectedStatus" style="width: 40em; margin-left: auto; margin-right: auto;"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;">
        <v-col cols="6"
          ><v-select v-model="selectedStatuses" :items="statusCategories" attach label="Status Categories" multiple filled outlined></v-select> </v-col
      ></v-row>
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="status in statuses" style="width: 100%;" v-bind:key="status">
              <v-btn @click="selectedStatus = status" class="button--style" depressed tile block>
                {{ status.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <status-card v-if="selectedStatus != null" :status="selectedStatus" style="width: 40em;" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import StatusCard from '@/components/cards/StatusCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'afflictions-and-status',
  components: { StatusCard },
  data() {
    return {
      statusCategories: ['Status Effect', 'Affliction', 'Elemental Affliction', 'Mental Affliction', 'Instant Effect'],
      selectedStatuses: ['Status Effect', 'Affliction', 'Elemental Affliction', 'Mental Affliction', 'Instant Effect'],
      selectedStatus: null,
    }
  },
  computed: {
    statuses: function () {
      return this.$store.getters.getFilteredStatuses(this.selectedStatuses).sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
