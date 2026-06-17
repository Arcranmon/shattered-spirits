<template>
  <v-container v-if="abilities.length > 0">
    <v-row>
      <v-col
        cols="12"
        class="section-header"
        >{{ displayTitle }}
      </v-col>
    </v-row>
    <v-row>
      <v-col class="column-header"> Name </v-col>
      <v-col class="column-header"> Category </v-col>
      <v-col
        class="column-header"
        v-if="isNarrative">
        Frequency
      </v-col>
      <v-col
        class="column-header"
        :cols="1"
        v-if="!isNarrative">
        Momentum
      </v-col>
      <v-col
        class="column-header"
        :cols="1"
        v-if="!isNarrative">
        Essence
      </v-col>
      <v-col
        class="column-header"
        :cols="1"
        v-if="!isNarrative">
        Speed
      </v-col>
      <v-col
        class="column-header"
        :cols="1"
        v-if="!isNarrative">
        Posture
      </v-col>
      <v-col
        class="column-header"
        :cols="1"
        v-if="!isNarrative">
        Range
      </v-col>
      <v-col
        class="column-header"
        :cols="3">
        Keywords
      </v-col>
      <v-col
        class="column-header"
        :cols="1 / 8">
        From
      </v-col>
    </v-row>
    <v-row
      align="stretch"
      v-for="(ability, index) in sortedAbilities"
      v-bind:key="ability.Name"
      style="page-break-inside: avoid"
      v-bind:class="index % 2 == 1 ? 'even-table-cell' : ''">
      <v-col class="table-cell d-flex justify-center align-center">
        {{ ability.Name }}
      </v-col>
      <v-col class="table-cell d-flex justify-center align-center">
        {{ typeOrCategory(ability) }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        v-if="isNarrative">
        {{ ability.Frequency.replaceAll('_', '') }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="1"
        v-if="!isNarrative">
        {{ ability.MomentumCost }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="1"
        v-if="!isNarrative">
        {{ ability.EssenceCost }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="1"
        v-if="!isNarrative">
        {{ ability.SpeedCost }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="1"
        v-if="!isNarrative">
        {{ ability.PostureCost }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="1"
        v-if="!isNarrative">
        {{ ability.RangeSummary }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="3">
        {{ ability.KeywordsList }}
      </v-col>
      <v-col
        class="table-cell d-flex justify-center align-center"
        :cols="1 / 8">
        {{ ability.From }}
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from 'vue'
import { Ability } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'show-ability-table',
  props: {
    title: {
      type: String,
      required: true,
    },
    abilities: {
      required: true,
    },
  },
  computed: {
    isNarrative() {
      return this.title.includes('Skill') || this.title.includes('Travel') || this.title.includes('Downtime') || this.title.includes('Camp')
    },
    displayTitle() {
      if (this.isNarrative) return this.title + ' Abilities'
      return this.title + 's'
    },
    sortedAbilities() {
      function costSort(a, b) {
        const highestValue = 'None'
        if (a === highestValue && b === highestValue) return 0
        if (a === highestValue) return -1
        if (b === highestValue) return 1
        return a.localeCompare(b)
      }
      return this.abilities.sort(function (a, b) {
        return a.Category.localeCompare(b.Category) || a.Type.localeCompare(b.Type) || costSort(a.Cost, b.Cost) || a.Name.localeCompare(b.Name)
      })
    },
  },
  methods: {
    typeOrCategory(ability) {
      if (this.isNarrative) return ability.Type
      return ability.Category
    },
  },
})
</script>

<style scoped lang="scss">
.table-cell {
  border: $border--black-thin;
  padding: 0em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  text-align: center;
}
.section-header {
  @extend .table-cell;
  font-weight: bold;
  justify-content: center;
  font-size: larger;
  color: white;
  background-color: darkslategray;
  print-color-adjust: exact;
}
.column-header {
  @extend .table-cell;
  font-weight: bold;
  justify-content: center;
  background-color: darkgrey;
  print-color-adjust: exact;
}
.even-table-cell {
  background-color: lightgrey;
  print-color-adjust: exact;
}
</style>
