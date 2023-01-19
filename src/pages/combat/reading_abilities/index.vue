<template>
  <div style="padding: 1em;">
    <display-tooltip-text :string="readingDisciplines" />
    <div class="skill--box">
      <stance-card :stance="$store.getters.getStance(disc.Stances[0])" />
    </div>
    <br />
    <display-tooltip-text :string="readingStancesStyles" />
    <div class="skill--box">
      <tech-card :tech="$store.getters.getTechnique(disc.Techniques[0])" />
    </div>
    <br />
    <display-tooltip-text :string="readingTechniques" />
    <div class="skill--box">
      <chart-table :chart="$store.getters.getTechnique(disc.Techniques[0]).Chart" />
    </div>
    <br />
    <display-tooltip-text :string="readingAttackProfiles" />
    <div class="skill--box">
      <reaction-card :reaction="$store.getters.getReaction('Sample Reaction')" />
    </div>
    <br />
    <display-tooltip-text :string="readingReactions" />
    <div class="skill--box">
      <enhancement-card :enhancement="$store.getters.getEnhancement('Sample Enhancement')" />
    </div>
    <br />
    <display-tooltip-text :string="readingEnhancements" />
  </div>
</template>

<script>
import Vue from 'vue'
import ReadingAttackProfiles from '@/database/text_files/combat_rules/reading_attack_profiles.txt'
import ReadingDisciplines from '@/database/text_files/combat_rules/reading_disciplines.txt'
import ReadingEnhancements from '@/database/text_files/combat_rules/reading_enhancements.txt'
import ReadingReactions from '@/database/text_files/combat_rules/reading_reactions.txt'
import ReadingStancesStyles from '@/database/text_files/combat_rules/reading_stances_styles.txt'
import ReadingTechniques from '@/database/text_files/combat_rules/reading_techniques.txt'
import ChartTable from '@/components/ChartTable.vue'
import EnhancementCard from '@/components/cards/EnhancementCard.vue'
import ReactionCard from '@/components/cards/ReactionCard.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
import TechCard from '@/components/cards/TechCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  components: { ChartTable, EnhancementCard, ReactionCard, StanceCard, TechCard },
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
    readingEnhancements: function () {
      return ReadingEnhancements
    },
    readingReactions: function () {
      return ReadingReactions
    },
    readingStancesStyles: function () {
      return ReadingStancesStyles
    },
    readingTechniques: function () {
      return ReadingTechniques
    },
    disc: function () {
      return this.$store.getters.getDiscipline('Example Discipline')
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
</style>
