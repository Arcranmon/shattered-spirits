<template>
  <div style="padding: 1em;">
    <div v-html="readingDisciplines" />
    <div class="skill--box">
      <stance-card :stance="$store.getters.getStance(disc.Stances[0])" />
    </div>
    <br />
    <div v-html="readingStancesStyles" />
    <div class="skill--box">
      <tech-card :tech="$store.getters.getTechnique(disc.Techniques[0])" />
    </div>
    <br />
    <div v-html="readingTechniques" />
  </div>
</template>

<script>
import Vue from "vue";
import ReadingDisciplines from "@/database/text_files/combat_rules/reading_disciplines.txt";
import ReadingStancesStyles from "@/database/text_files/combat_rules/reading_stances_styles.txt";
import ReadingTechniques from "@/database/text_files/combat_rules/reading_techniques.txt";
import TechCard from "@/components/cards/TechCard.vue";
import StanceCard from "@/components/cards/StanceCard.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: { TechCard, StanceCard },
  computed: {
    conditionText: function () {
      return this.$marked.parse(ConditionText);
    },
    readingDisciplines: function () {
      return this.$marked.parse(ReadingDisciplines);
    },
    readingStancesStyles: function () {
      return this.$marked.parse(ReadingStancesStyles);
    },
    readingTechniques: function () {
      return this.$marked.parse(ReadingTechniques);
    },
    disc: function () {
      return this.$store.getters.getDiscipline("Example Discipline");
    },
  },
});
</script>

<style scoped lang="scss">
.skill--box {
  margin: auto;
  align-self: center;
  width: 40%;
}
</style>
