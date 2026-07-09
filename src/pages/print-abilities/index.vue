<template>
  <div class="print-page">
    <v-row>
      <v-col
        v-for="ability in abilities"
        cols="3"
        class="bordered do-not-split">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          :showDesc="false"
          class="card-shape" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Combatant } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
export default Vue.extend({
  name: 'print-abilities',
  components: {
    BaseWidget,
  },
  computed: {
    abilities: function () {
      var abilityList = this.$store.getters.getFromEverythingFromList(['Wet', 'Blazing', 'Prone', 'Prone', 'Push', 'Push', 'Pull', 'Pull'])
      if (abilityList.length == 1) return Array(8).fill(abilityList[0])
      return abilityList
    },
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
  font-size: 7.5pt;
  padding-left: 2em;
  padding-right: 2em;
  padding-top: 4em;
  padding-bottom: 4em;
}
.bordered {
  border: $border--black-thin;
  padding: 0.5em;
}
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
@media print {
  .do-not-split {
    display: block !important;
    break-inside: avoid !important;
  }
  .card-shape {
    width: 2.5in !important;
    height: 3.5in !important;
  }
}
</style>
