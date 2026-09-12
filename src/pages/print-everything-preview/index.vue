<template>
  <div class="print-page">
    <div
      style="width: 10in !important"
      v-for="i in totalPages"
      :key="i">
      <v-row
        no-gutters
        class="printing-margins">
        <v-col
          v-for="j in itemsOnPage(i + 1)"
          style="outline: 1px solid black"
          cols="3"
          :key="j"
          class="do-not-split card-shape">
          <printable-base-widget :ability="abilities[i * 8 + j]" />
        </v-col>
      </v-row>
      <!---
      <v-row
        no-gutters
        class="printing-margins">
        <v-col
          v-for="j in itemsOnPage(i + 1)"
          :key="j"
          style="outline: 1px solid black"
          cols="3"
          class="do-not-split card-shape">
          <printable-base-widget
            :ability="abilities[i * 8 + j]"
            :back="true" />
        </v-col>
      </v-row>
      --->
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { AbilityPackage } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
import PrintableBaseWidget from '@/components/PrintableBaseWidget.vue'
export default Vue.extend({
  name: 'print-abilities',
  components: {
    BaseWidget,
    PrintableBaseWidget,
  },
  methods: {
    itemsOnPage: function (i) {
      if (i * 8 > this.abilities.length) return Math.max(0, (this.abilities.length % 8) - 1)
      return 8
    },
  },
  computed: {
    abilities: function () {
      var abilityList = this.$store.getters.getAbilities()
      abilityList = abilityList.concat(this.$store.getters.getAPs())
      abilityList = abilityList.concat(this.$store.getters.getWeapons())
      abilityList = abilityList.concat(this.$store.getters.getArmors())
      abilityList = abilityList.concat(this.$store.getters.getEquipments())
      abilityList = abilityList.concat(this.$store.getters.getTerrains())
      abilityList = abilityList.concat(this.$store.getters.getStatuses())
      abilityList = abilityList.concat(this.$store.getters.getTraits())

      for (var ability of abilityList) {
        if (ability instanceof AbilityPackage) {
          for (var subability of ability.Abilities) {
            subability.Origin = ability
          }
          abilityList = abilityList.concat(ability.Abilities)
        }
      }
      abilityList = abilityList.filter((item) => item != null)
      return abilityList.sort((a, b) => a.Name.localeCompare(b.Name))
    },
    totalPages: function () {
      console.log(this.abilities.length)
      return Math.ceil(this.abilities.length / 8)
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
  justify-content: center;
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
  .printing-margins {
    padding-left: 0.5in !important;
    padding-right: 0.5in !important;
    padding-top: 0.75in !important;
    padding-bottom: 0.75in !important;
  }
  .card-shape {
    width: 2.5in !important;
    max-width: 2.5in !important;
    height: 3.5in !important;
    max-height: 3.5in !important;
  }
}
</style>
