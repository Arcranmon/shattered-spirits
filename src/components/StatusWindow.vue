<template
  ><div>
    <v-dialog v-model="addStatusDialogue" hide-overlay>
      <template v-slot:activator="{}">
        <v-btn @click="addStatusDialogue = true" class="button--template button--topbar">
          <span class="btn-content">Add Status</span>
        </v-btn>
      </template>
      <v-card height="50vh">
        <v-card-title>Add Status (WIP)</v-card-title>
        <v-card-text>
          <v-select
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
          ><v-btn
            @click="$emit('status-selected', selectedStatus.Name), (addStatusDialogue = false)"
            class="button--template button--topbar"
            :disabled="selectedStatus == null"
          >
            <span v-if="selectedStatus != null" class="btn-content">Add {{ selectedStatus.Name }}</span>
            <span v-else class="btn-content">Choose a Status</span>
          </v-btn></v-card-text
        >
      </v-card>
    </v-dialog>
  </div></template
>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'status-window',
  data() {
    return {
      addStatusDialogue: false,
      selectedStatus: null,
    }
  },
  props: {},
  computed: {
    statuses() {
      return this.$store.getters
        .getFilteredStatuses(['Status Effect', 'Affliction', 'Elemental Affliction', 'Mental Affliction'])
        .sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
