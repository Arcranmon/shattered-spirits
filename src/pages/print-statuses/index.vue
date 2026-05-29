<template>
  <div class="print-page">
    <v-row>
      <v-col
        v-for="ability in $store.getters.getStatusesFromList(statuses)"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Combatant } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
export default Vue.extend({
  name: 'print-statuses',
  components: {
    BaseWidget,
  },
  data() {
    return {
      statuses: ['Fatigue', 'Fatigue', 'Fatigue', 'Fatigue', 'Fatigue', 'Fatigue'],
    }
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
})
</script>

<style scoped lang="scss">
.print-page {
  font-size: 8pt;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 4em;
  padding-bottom: 4em;
}
.ability-box {
  page-break-inside: avoid;
}
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
