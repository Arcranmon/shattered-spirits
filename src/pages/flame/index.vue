<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Flame Spirits</h3>
    <vue-simple-markdown :source="flameText" />
    <div
      class="fire--box"
      v-for="disc in flameDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <div class="page--title">{{ disc.Name }}</div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards
        :inputs="disc.Stances"
        job="Stances"
        :color_category="disc.Category"
      />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        :color_category="disc.Category"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import FlameText from "./flame.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "flame",
  components: {
    ShowCards,
  },
  data: function () {
    return {
      flameText: FlameText,
    };
  },
  computed: {
    flameDiscs: function () {
      return this.$store.getters.byDisciplineCategory("Flame");
    },
  },
});
</script>

<style scoped lang="scss">
.fire--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
