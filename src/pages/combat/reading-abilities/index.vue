<template>
  <div style="padding: 1em">
    <display-tooltip-text :string="readingDisciplines" />
    <div v-bind:class="skillBox">
      <stance-card :stance="$store.getters.getStance('Example Stance')" />
    </div>
    <br />
    <display-tooltip-text :string="readingStances" />
    <br />
    <div v-bind:class="skillBox">
      <tech-card :tech="$store.getters.getTechnique('Example Technique')" />
    </div>
    <br />
    <display-tooltip-text :string="readingTechniques" />
    <div v-bind:class="skillBox">
      <chart-table :chart="$store.getters.getTechnique('Example Technique').Chart" style="font-size: smaller" />
    </div>
    <br />
    <display-tooltip-text :string="readingAttackProfiles" />
    <div v-bind:class="skillBox">
      <maneuver-card :maneuver="$store.getters.getManeuver('Example Maneuver')" style="font-size: smaller" />
    </div>
    <br />
    <display-tooltip-text :string="readingManeuvers" />
  </div>
</template>

<script>
import Vue from 'vue'
import ReadingAttackProfiles from '@/database/text_files/combat_rules/reading_attack_profiles.txt'
import ReadingDisciplines from '@/database/text_files/combat_rules/reading_disciplines.txt'
import ReadingManeuvers from '@/database/text_files/combat_rules/reading_maneuvers.txt'
import ReadingStances from '@/database/text_files/combat_rules/reading_stances.txt'
import ReadingTechniques from '@/database/text_files/combat_rules/reading_techniques.txt'
import ChartTable from '@/components/ChartTable.vue'
import ManeuverCard from '@/components/cards/ManeuverCard.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
import TechCard from '@/components/cards/TechCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  components: { ChartTable, ManeuverCard, StanceCard, TechCard },
  computed: {
    conditionText: function () {
      return ConditionText
    },
    readingAttackProfiles: function () {
      return ReadingAttackProfiles
    },
    readingDisciplines: function () {
      return ReadingDisciplines
    },
    readingManeuvers: function () {
      return ReadingManeuvers
    },
    readingReactions: function () {
      return ReadingReactions
    },
    readingStances: function () {
      return ReadingStances
    },
    readingTechniques: function () {
      return ReadingTechniques
    },
    disc: function () {
      return this.$store.getters.getDiscipline('Example Discipline')
    },
    skillBox: function () {
      if (this.isMobile) return 'skill--box-mobile'
      return 'skill--box'
    },
  },
})
</script>

<style scoped lang="scss">
.skill--box {
  margin: auto;
  align-self: center;
  width: 40%;
}
.skill--box-mobile {
  margin: auto;
  align-self: center;
}
</style>
