<template>
  <div class="print-page">
    <v-row
      class="printing-margins"
      style="width: 10in; margin: 0.5in">
      <v-col
        v-for="ability in abilities"
        cols="3"
        class="bordered do-not-split card-shape">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          :showDesc="false" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Combatant } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
import PrintableBaseWidget from '@/components/PrintableBaseWidget.vue'
export default Vue.extend({
  name: 'print-abilities',
  components: {
    BaseWidget,
    PrintableBaseWidget,
  },
  computed: {
    abilities: function () {
      var abilityList = this.$store.getters.getFromEverythingFromList([
        'Veiled ',
        'Veiled ',
        'Concentrating',
        'Concentrating',
        'Concentrating ',
        'Concentrating ',
        'Concentrating',
        'Concentrating',
      ])
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
  background-color: white;
  align-content: center;
  margin: auto;
}
.printing-margins {
}
.bordered {
  border: $border--black-thin;
  padding: 0em;
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
    max-width: 2.5in !important;
    height: 3.5in !important;
    max-height: 3.5in !important;
  }
}
</style>
