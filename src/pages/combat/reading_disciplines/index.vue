<template>
  <div style="padding: 1em;">
    <div v-html="readingDisciplines" />
    <div class="skill--box">
      <show-cards
        :inputs="disc.Stances"
        job="Stances"
        color_category="Skill"
        display_text="Styles"
        :collapse="false"
      />
    </div>
    <div v-html="readingStancesStyles" />
    <div class="skill--box">
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Skill"
        :collapse="false"
      />
    </div>
    <div v-html="readingTechniques" />
  </div>
</template>

<script>
import Vue from "vue";
import ReadingDisciplines from "@/database/text_files/combat_rules/reading_disciplines.txt";
import ReadingStancesStyles from "@/database/text_files/combat_rules/reading_stances_styles.txt";
import ReadingTechniques from "@/database/text_files/combat_rules/reading_techniques.txt";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: { ShowCards },
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
      return this.$store.getters.getTemplateDiscipline()[0];
    },
  },
});
</script>

<style scoped lang="scss">
.skill--box {
  margin: auto;
  width: 40%;
  align-self: center;
}
</style>
