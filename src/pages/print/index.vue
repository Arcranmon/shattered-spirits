<template>
  <div class="print-page">
    <!---
    <v-row>
      <v-col cols="6">
        <base-widget
          v-for="num in [0, 1, 2]"
          :ability="$route.params.character.Stances[num]"
          :useDivider="true"
          :key="$route.params.character.Stances[num].Name"
          :showChart="true"
          class="bordered ability-box stance-card"
      /></v-col>
      <v-col cols="6">
        <base-widget
          v-for="num in [3, 4, 5]"
          :ability="$route.params.character.Stances[num]"
          :useDivider="true"
          :key="$route.params.character.Stances[num].Name"
          :showChart="true"
          class="bordered ability-box stance-card"
      /></v-col>
    </v-row>
    <v-row style="page-break-after: always" />
    --->

    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="skillTalents.length > 0">
      <h4>{{ $route.params.character.Name }} Skill Talents</h4>
      <div class="centered-text">
        Skills represent a character's knowledge, capabilities, and other facets of them outside their ability to take part in combat.
      </div>
      <div class="centered-text">
        Talents are passive abilities that describe what a character is capable of. Typically, Talents are used to build your die pool in different Skill
        Challenges.
      </div>
    </v-row>
    <v-row v-if="skillTalents.length > 0">
      <v-col
        v-for="ability in skillTalents"
        :key="ability.Name"
        cols="6"
        class="ability-box">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="skillBoons.length > 0">
      <h4>{{ $route.params.character.Name }} Skill Boons</h4>
      <div class="centered-text">
        Skills represent a character's knowledge, capabilities, and other facets of them outside their ability to take part in combat.
      </div>
      <div class="centered-text">
        Boons represent areas where your character truly excels, and allow you to manipulate how you spend die, typically by spending a &#9634; as something
        else.
      </div>
    </v-row>
    <v-row v-if="skillBoons.length > 0">
      <v-col
        v-for="ability in skillBoons"
        :key="ability.Name"
        cols="6"
        class="ability-box">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="skillPowers.length > 0">
      <h4>{{ $route.params.character.Name }} Skill Powers</h4>
      <div class="centered-text">
        Skills represent a character's knowledge, capabilities, and other facets of them outside their ability to take part in combat.
      </div>
      <div class="centered-text">
        Powers are reliable abilities that your character can use that have a set effect. They always work, but typically have limits on how often they can be
        used.
      </div>
    </v-row>
    <v-row v-if="skillPowers.length > 0">
      <v-col
        v-for="ability in skillPowers"
        :key="ability.Name"
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

    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="travelTalents.length > 0">
      <h4>{{ $route.params.character.Name }} Travel Talents</h4>
      <div class="centered-text">
        Travel abilities are used while taking part of a Journey, and typically make it easier for you to avoid dangers or find greater discoveries while
        traveling.
      </div>
      <div class="centered-text">
        Talents are passive abilities that describe what a character is capable of. Typically, Talents are used to build your die pool in different Skill
        Challenges.
      </div>
    </v-row>
    <v-row v-if="travelTalents.length > 0">
      <v-col
        v-for="ability in travelTalents"
        :key="ability.Name"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="travelBoons.length > 0">
      <h4>{{ $route.params.character.Name }} Travel Boons</h4>
      <div class="centered-text">
        Travel abilities are used while taking part of a Journey, and typically make it easier for you to avoid dangers or find greater discoveries while
        traveling.
      </div>
      <div class="centered-text">
        Boons represent areas where your character truly excels, and allow you to manipulate how you spend die, typically by spending a &#9634; as something
        else.
      </div>
    </v-row>
    <v-row v-if="travelBoons.length > 0">
      <v-col
        v-for="ability in travelBoons"
        :key="ability.Name"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="travelPowers.length > 0">
      <h4>{{ $route.params.character.Name }} Travel Powers</h4>
      <div class="centered-text">
        Travel abilities are used while taking part of a Journey, and typically make it easier for you to avoid dangers or find greater discoveries while
        traveling.
      </div>
      <div class="centered-text">
        Powers are reliable abilities that your character can use that have a set effect. They always work, but typically have limits on how often they can be
        used.
      </div>
    </v-row>
    <v-row v-if="travelPowers.length > 0">
      <v-col
        v-for="ability in travelPowers"
        :key="ability.Name"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      v-if="travelPowers.length > 0 || travelTalents.length > 0 || travelBoons.length > 0"
      style="page-break-after: always" />

    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="campTalents.length > 0">
      <h4>{{ $route.params.character.Name }} Camp Talents</h4>
      <div class="centered-text">
        Camp abilities happen while you break to make camp, and are often specialized Camp Actions you can take to accomplish additional tasks.
      </div>
      <div class="centered-text">
        Talents are passive abilities that describe what a character is capable of. Typically, Talents are used to build your die pool in different Skill
        Challenges.
      </div>
    </v-row>
    <v-row v-if="campTalents.length > 0">
      <v-col
        v-for="ability in campTalents"
        :key="ability.Name"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="campPowers.length > 0">
      <h4>{{ $route.params.character.Name }} Camp Powers</h4>
      <div class="centered-text">
        Camp abilities happen while you break to make camp, and are often specialized Camp Actions you can take to accomplish additional tasks.
      </div>
      <div class="centered-text">
        Powers are reliable abilities that your character can use that have a set effect. They always work, but typically have limits on how often they can be
        used.
      </div>
    </v-row>
    <v-row v-if="campPowers.length > 0">
      <v-col
        v-for="ability in campPowers"
        :key="ability.Name"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      v-if="campPowers.length > 0 || campTalents.length > 0"
      style="page-break-after: always" />

    <v-row
      class="ability-box d-block ma-0 pa-0"
      v-if="downtimePowers.length > 0">
      <h4>{{ $route.params.character.Name }} Downtime Powers</h4>
      <div class="centered-text">
        Downtime abilities happen between journeys, and are often related to forging bonds or creating intricate works of craftsmanship.
      </div>
      <div class="centered-text">
        Powers are reliable abilities that your character can use that have a set effect. They always work, but typically have limits on how often they can be
        used.
      </div></v-row
    >
    <v-row v-if="downtimePowers.length > 0">
      <v-col
        v-for="ability in downtimePowers"
        :key="ability.Name"
        cols="6">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row
      v-if="downtimePowers.length > 0"
      style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Passives</h4>

    <div class="centered-text">Passive abilities are always active and are typically relevant only for combat.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Passive', 'All', 'All')"
        :key="ability.Name">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Maneuvers</h4>

    <div class="centered-text">
      Maneuvers can be used on a character's turn, usually at a Momentum cost. A given Maneuver may only be used once per Turn unless it is [Repeatable].
    </div>
    <v-row>
      <v-col
        cols="6"
        v-for="ability in $route.params.character.FilteredAbilities('Maneuver', 'All', 'All')"
        :key="ability.Name"
        class="ability-box">
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
        v-for="ability in $route.params.character.FilteredAbilities('Attack', 'All', 'All')"
        :key="ability.Name"
        class="ability-box">
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
        v-for="ability in $route.params.character.FilteredAbilities('Gambit', 'All', 'All')"
        :key="ability.Name">
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
        v-for="ability in $route.params.character.FilteredAbilities('Reaction', 'All', 'All')"
        :key="ability.Name">
        <base-widget
          :ability="ability"
          :useDivider="true"
          :key="ability.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>

    <!--
    <v-row style="page-break-after: always" />
    <h4>{{ $route.params.character.Name }} Equipment</h4>
    <div class="centered-text">Various items that you have on hand.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="item in $route.params.character.UniqueEquipment"
        :key="item.Name">
        <base-widget
          :ability="item"
          :useDivider="true"
          :key="item.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />

    <h4>{{ $route.params.character.Name }} Arts & Careers</h4>
    <div class="centered-text">The full ability packages granted to you by your arts and careers.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="item in this.$store.getters.getAPsFromList($route.params.character.Arts)"
        :key="item.Name">
        <base-widget
          :ability="item"
          :useDivider="true"
          :key="item.Name"
          :showChart="true"
          class="ability-box" />
      </v-col>
    </v-row>
    <v-row style="page-break-after: always" />
    --->
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
  computed: {
    skillTalents: function () {
      return this.$route.params.character.FilteredAbilities('Talent', 'Skill', 'All')
    },
    skillBoons: function () {
      return this.$route.params.character.FilteredAbilities('Boon', 'Skill', 'All')
    },
    skillPowers: function () {
      return this.$route.params.character.FilteredAbilities('Power', 'Skill', 'All')
    },
    travelTalents: function () {
      return this.$route.params.character.FilteredAbilities('Talent', 'Travel', 'All')
    },
    travelBoons: function () {
      return this.$route.params.character.FilteredAbilities('Boon', 'Travel', 'All')
    },
    travelPowers: function () {
      return this.$route.params.character.FilteredAbilities('Power', 'Travel', 'All')
    },
    campTalents: function () {
      return this.$route.params.character.FilteredAbilities('Talent', 'Camp', 'All')
    },
    campPowers: function () {
      return this.$route.params.character.FilteredAbilities('Power', 'Camp', 'All')
    },
    downtimePowers: function () {
      return this.$route.params.character.FilteredAbilities('Power', 'Downtime', 'All')
    },
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
  background-color: $color--grey-light;
}
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
  padding: 0.5em;
}
@media print {
  .stance-card {
    width: 4.25in !important;
  }
}
</style>
