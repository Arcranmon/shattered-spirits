<template>
  <div style="padding: 1em;">
    <div
      class="earth--box"
      v-for="disc in earthDiscs"
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
  name: "earth",
  components: {
    ShowCards,
  },
  computed: {
    earthDiscs: function () {
      return this.$store.getters.byDisciplineCategory("Earth");
    },
  },
});
</script>

<style scoped lang="scss">
.earth--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
