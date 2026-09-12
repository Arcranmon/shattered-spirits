<template>
  <div class="print-page">
    <div class="stances stance-grid">
      <div>
        <stance-widget
          :stance="stance"
          :character="character"
          :useDivider="true"
          :showChart="true"
          class="stance-card"
          v-for="stance in character.Stances.slice(0, halfStance)"
          :key="stance.Name" />
      </div>
      <div>
        <stance-widget
          :stance="stance"
          :character="character"
          :useDivider="true"
          :showChart="true"
          class="stance-card"
          v-for="stance in character.Stances.slice(halfStance)"
          :key="stance.Name" />
      </div>
    </div>

    <div class="main-abilities">
      <show-ability-table
        title="Skill"
        :abilities="this.character.FilteredAbilities('All', 'Skill', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Travel"
        :abilities="this.character.FilteredAbilities('All', 'Travel', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Camp"
        :abilities="this.character.FilteredAbilities('All', 'Camp', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Downtime"
        :abilities="this.character.FilteredAbilities('All', 'Downtime', 'All')"
        style="page-break-inside: avoid" />
      <v-row style="page-break-after: always" />
      <show-ability-table
        title="Passive"
        :abilities="this.character.FilteredAbilities('Passive', 'All', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Maneuver"
        :abilities="this.character.FilteredAbilities('Maneuver', 'All', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Attack"
        :abilities="this.character.FilteredAbilities('Attack', 'All', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Gambit"
        :abilities="this.character.FilteredAbilities('Gambit', 'All', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Reaction"
        :abilities="this.character.FilteredAbilities('Reaction', 'All', 'All')"
        style="page-break-inside: avoid" />
      <v-row style="page-break-after: always" />
    </div>
    <v-row
      no-gutters
      class="printing-margins"
      style="width: 10in">
      <v-col
        v-for="ability in character.FilteredAbilities('All', 'All', 'All')"
        style="outline: 1px solid black"
        cols="3"
        class="do-not-split card-shape">
        <printable-base-widget
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
import StanceWidget from '@/components/StanceWidget.vue'
import ShowAbilityTable from './ShowAbilityTable.vue'
export default Vue.extend({
  name: 'print',
  components: {
    BaseWidget,
    ShowAbilityTable,
    StanceWidget,
    PrintableBaseWidget,
  },
  props: {
    character: {
      type: Combatant,
      required: true,
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  computed: {
    travelAbilities: function () {
      return this.character.FilteredAbilities('All', 'Travel', 'All')
    },
    campAbilities: function () {
      return this.character.FilteredAbilities('All', 'Camp', 'All')
    },
    skillTalents: function () {
      return this.character.FilteredAbilities('Talent', 'Skill', 'All')
    },
    skillBoons: function () {
      return this.character.FilteredAbilities('Boon', 'Skill', 'All')
    },
    skillPowers: function () {
      return this.character.FilteredAbilities('Power', 'Skill', 'All')
    },
    travelTalents: function () {
      return this.character.FilteredAbilities('Talent', 'Travel', 'All')
    },
    travelBoons: function () {
      return this.character.FilteredAbilities('Boon', 'Travel', 'All')
    },
    travelPowers: function () {
      return this.character.FilteredAbilities('Power', 'Travel', 'All')
    },
    campTalents: function () {
      return this.character.FilteredAbilities('Talent', 'Camp', 'All')
    },
    campPowers: function () {
      return this.character.FilteredAbilities('Power', 'Camp', 'All')
    },
    downtimePowers: function () {
      return this.character.FilteredAbilities('Power', 'Downtime', 'All')
    },
    halfStance: function () {
      return Math.ceil(this.character.Stances.length / 2)
    },
  },
})
</script>

<style scoped lang="scss">
.ability-box {
  page-break-inside: avoid;
}
.centered-text {
  display: flex;
  justify-content: center;
  align-items: center;
}
.bordered {
  border: $border--black-thin;
}
.stance-grid {
  grid-template-columns: 1fr 1fr;
  display: grid;
}
@media print {
  .stance-card {
    margin: 0em !important;
    padding: 0em !important;
    border: $border--black-standard;
    width: 4.25in !important;
  }
  .main-abilities {
    size: portrait;
    margin: 0.25;
  }
  .stances {
    size: landscape;
    margin: 0.25;
  }
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
