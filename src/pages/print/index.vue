<template>
  <div class="print-page">
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.Stances">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box"
      /></v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Skills</h4>
    <div class="centered-text">
      Skills represent a character's talents and describe what they are capable of, as well as determining additional die in skill challenges.
    </div>
    <v-row>
      <v-col
        v-for="ability in $route.params.character.FilteredAbilities('Skill', 'All', 'All')"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Powers</h4>

    <div class="centered-text">
      Powers are narrative abilities that characters can use to influence the result of narrative rolls or otherwise automatically accomplish tasks.
    </div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Power', 'All', 'All')">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Passives</h4>

    <div class="centered-text">Passive abilities are always applied to a character at no cost and are typically relevant only for combat.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Passive', 'All', 'All')">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Manuevers</h4>

    <div class="centered-text">
      Manuevers can be used on a character's turn, usually at a Momentum cost. A given Manuever may only be used once per Turn unless it is [Repeatable].
    </div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Maneuver', 'All', 'All')">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Attacks</h4>
    <span
      >Attacks are the primary way in which characters defeat creatures. Characters may only make a single Attack on their Turn unless their Stance specifies
      otherwise.</span
    >
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Attack', 'All', 'All')">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Gambits</h4>

    <div class="centered-text">Gambits can be applied whenever a character rolls doubles or gets a Crit on an Attack or Defense Roll.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Gambit', 'All', 'All')">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Reactions</h4>

    <div class="centered-text">Reactions are used when it is not a character's turn, and are commonly used to defend oneself.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Reaction', 'All', 'All')">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Combatant } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
export default Vue.extend({
  name: 'print',
  components: {
    BaseWidget,
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
