<template>
  <div style="padding: 1em;">
    <h1>Earth Spirits</h1>
    <span v-html="earthText" />
    <div
      class="earth--box"
      v-for="disc in earthDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">
        <b>{{ disc.Role }}</b>
      </div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards :inputs="disc.Stances" job="Stances" color_category="Earth" />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Earth"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import EarthText from "@/database/text_files/spirit_descriptions/earth.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    ShowCards,
  },
  computed: {
    earthDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Earth");
    },
    earthText: function () {
      return this.$marked.parse(EarthText);
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
