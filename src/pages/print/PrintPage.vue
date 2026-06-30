<template>
  <div class="print-page">
    <div class="stances">
      <v-row>
        <v-col
          cols="6"
          class="justify-center align-center">
          <stance-widget
            v-for="num in [0, 1, 4]"
            :stance="character.Stances[num]"
            :character="character"
            :useDivider="true"
            :key="character.Stances[num].Name"
            :showChart="true"
            class="stance-card"
        /></v-col>
        <v-col
          cols="6"
          class="justify-center align-center">
          <stance-widget
            v-for="num in [3, 2, 5]"
            :stance="character.Stances[num]"
            :character="character"
            :useDivider="true"
            :key="character.Stances[num].Name"
            :showChart="true"
            class="bordered stance-card"
        /></v-col>
      </v-row>
    </div>

    <div class="main-abilities">
      <show-ability-table
        title="Skill"
        :abilities="this.character.FilteredAbilities('All', 'Skill', 'All')"
        style="page-break-inside: avoid" />
      <show-ability-table
        title="Travel"
        :abilities="this.character.FilteredAbilities('All', 'Travel', 'All')" />
      <show-ability-table
        title="Camp"
        :abilities="this.character.FilteredAbilities('All', 'Camp', 'All')" />
      <show-ability-table
        title="Downtime"
        :abilities="this.character.FilteredAbilities('All', 'Downtime', 'All')" />
      <v-row style="page-break-after: always" />
      <show-ability-table
        title="Passive"
        :abilities="this.character.FilteredAbilities('Passive', 'All', 'All')" />
      <show-ability-table
        title="Maneuver"
        :abilities="this.character.FilteredAbilities('Maneuver', 'All', 'All')" />
      <show-ability-table
        title="Attack"
        :abilities="this.character.FilteredAbilities('Attack', 'All', 'All')" />
      <show-ability-table
        title="Gambit"
        :abilities="this.character.FilteredAbilities('Gambit', 'All', 'All')" />
      <show-ability-table
        title="Reaction"
        :abilities="this.character.FilteredAbilities('Reaction', 'All', 'All')" />
      <v-row style="page-break-after: always" />

      <v-row
        class="ability-box d-block ma-0 pa-0"
        v-if="skillTalents.length > 0">
        <h4>{{ character.Name }} Skill Talents</h4>
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
        <h4>{{ character.Name }} Skill Boons</h4>
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
        <h4>{{ character.Name }} Skill Powers</h4>
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
        <h4>{{ character.Name }} Travel Talents</h4>
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
        <h4>{{ character.Name }} Travel Boons</h4>
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
        <h4>{{ character.Name }} Travel Powers</h4>
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
        <h4>{{ character.Name }} Camp Talents</h4>
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
        <h4>{{ character.Name }} Camp Powers</h4>
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
        <h4>{{ character.Name }} Downtime Powers</h4>
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

      <h4>{{ character.Name }} Passives</h4>

      <div class="centered-text">Passive abilities are always active and are typically relevant only for combat.</div>
      <v-row>
        <v-col
          cols="6"
          v-for="ability in character.FilteredAbilities('Passive', 'All', 'All')"
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

      <h4>{{ character.Name }} Maneuvers</h4>

      <div class="centered-text">
        Maneuvers can be used on a character's turn, usually at a Momentum cost. A given Maneuver may only be used once per Turn unless it is [Repeatable].
      </div>
      <v-row>
        <v-col
          cols="6"
          v-for="ability in character.FilteredAbilities('Maneuver', 'All', 'All')"
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

      <h4>{{ character.Name }} Attacks</h4>
      <span
        >Attacks are the primary way in which characters defeat creatures. Characters may only make a single Attack on their Turn unless their Stance specifies
        otherwise.</span
      >
      <v-row>
        <v-col
          cols="6"
          v-for="ability in character.FilteredAbilities('Attack', 'All', 'All')"
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

      <h4>{{ character.Name }} Gambits</h4>

      <div class="centered-text">Gambits can be applied whenever a character rolls doubles or gets a Crit on an Attack or Defense Roll.</div>
      <v-row>
        <v-col
          cols="6"
          v-for="ability in character.FilteredAbilities('Gambit', 'All', 'All')"
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

      <h4>{{ character.Name }} Reactions</h4>

      <div class="centered-text">Reactions are used when it is not a character's turn, and are commonly used to defend oneself.</div>
      <v-row>
        <v-col
          cols="6"
          v-for="ability in character.FilteredAbilities('Reaction', 'All', 'All')"
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
    <h4>{{ character.Name }} Equipment</h4>
    <div class="centered-text">Various items that you have on hand.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="item in character.UniqueEquipment"
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

    <h4>{{ character.Name }} Arts & Careers</h4>
    <div class="centered-text">The full ability packages granted to you by your arts and careers.</div>
    <v-row>
      <v-col
        cols="6"
        v-for="item in this.$store.getters.getAPsFromList(character.Arts)"
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
  </div>
</template>

<script>
import Vue from 'vue'
import { Combatant } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
import StanceWidget from '@/components/StanceWidget.vue'
import ShowAbilityTable from './ShowAbilityTable.vue'
export default Vue.extend({
  name: 'print',
  components: {
    BaseWidget,
    ShowAbilityTable,
    StanceWidget,
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
}
</style>
