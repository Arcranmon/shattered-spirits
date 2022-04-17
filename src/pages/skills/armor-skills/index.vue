<template>
  <div style="padding: 1em;">
    <h1>Armor Skills</h1>
    <div
      class="skill--box"
      v-for="disc in skills"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">
        <b>{{ disc.Role }}</b>
      </div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards
        :inputs="disc.Stances"
        job="Stances"
        color_category="Skill"
        display_text="Styles"
      />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Skill"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "armor-skills",
  components: {
    ShowCards,
  },
  data: function () {
    return {};
  },
  computed: {
    skills: function () {
      return this.$store.getters.getArmorSkills();
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
