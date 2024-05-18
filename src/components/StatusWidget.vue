<template>
  <div>
    <v-dialog v-model="addStatusDialogue" hide-overlay>
      <template v-slot:activator="{}">
        <div class="d-flex justify-center align-center">
          <h4>Status Effects</h4>
          <v-btn @click="addStatusDialogue = true" class="button--template" style="margin-left: 2em">
            <span class="btn-content">Add Status</span>
          </v-btn>
        </div>
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
            style="margin-left: 0.5em; margin-right: 0.5em"
          ></v-select
          ><v-btn
            @click="creature.AddStatus(selectedStatus.Name), $emit('changed'), (addStatusDialogue = false)"
            class="button--template button--topbar"
            :disabled="selectedStatus == null"
          >
            <span v-if="selectedStatus != null" class="btn-content">Add {{ selectedStatus.Name }}</span>
            <span v-else class="btn-content">Choose a Status</span>
          </v-btn></v-card-text
        >
      </v-card>
    </v-dialog>
    <div style="max-width: 20em; margin-left: auto; margin-right: auto; margin-top: 1em">
      <v-row no-gutters v-for="status_effect in creature.StatusEffects" :key="status_effect.status">
        <v-col
          ><img style="height: 1em; padding-right: 1em" :src="require('@/assets/statuses/' + status_effect.status + '.svg')" />
          <display-tooltip-text :string="'**_' + status_effect.status + '_:**'" /></v-col
        ><v-col class="d-flex justify-center align-center"
          ><div style="min-width: 1em">
            <span v-if="status_effect.stack < 777">{{ status_effect.stack }}</span>
          </div></v-col
        >
        <v-col class="d-flex justify-left align-left" style="min-width: 6em"
          ><v-btn inline x-small @click="creature.RemoveStatus(status_effect.status), $emit('changed')" color="red">-</v-btn
          ><v-btn v-if="status_effect.stack < 777" inline x-small @click="creature.AddStatus(status_effect.status), $emit('changed')" color="green">+</v-btn>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Combatant } from '@/class'
import Vue from 'vue'
export default Vue.extend({
  name: 'status-widget',
  data() {
    return {
      addStatusDialogue: false,
      selectedStatus: null,
    }
  },
  props: {
    creature: { type: Combatant, required: true },
  },
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
