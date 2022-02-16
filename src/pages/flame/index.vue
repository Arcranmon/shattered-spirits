<template>
  <div style="padding: 1em;">
    <h1>Flame Spirits</h1>
    <span v-html="flameText" />
    <div
      class="fire--box"
      v-for="disc in flameDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards :inputs="disc.Stances" job="Stances" color_category="Flame" />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Flame"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import FlameText from "@/database/text_files/spirit_descriptions/flame.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "flame",
  components: {
    ShowCards,
  },
  computed: {
    flameDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Flame");
    },
    flameText: function () {
      return this.$marked.parse(FlameText);
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
