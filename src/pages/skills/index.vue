<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Skills</h3>
    <div
      class="skill--box"
      v-for="disc in skills"
      :style="{ 'background-color': disc.Background }"
    >
      <div class="page--title">{{ disc.Name }}</div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <div class="page--sub-title">Stances</div>
      <show-cards
        :inputs="disc.Stances"
        job="Stance"
        :color_category="disc.Category"
      />
      <div class="page--sub-title">Techniques</div>
      <show-cards
        :inputs="disc.Techniques"
        job="Tech"
        :color_category="disc.Category"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "skill",
  components: {
    ShowCards,
  },
  data: function () {
    return {};
  },
  computed: {
    skills: function () {
      return this.$store.getters.byDisciplineCategory("Skill");
    },
  },
});
</script>

<style scoped lang="scss">
.skill--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
