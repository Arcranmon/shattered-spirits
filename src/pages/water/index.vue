<template>
  <div style="padding: 1em;">
    <h1>Water Spirits</h1>
    <span v-html="waterText" />
    <div
      class="water--box"
      v-for="disc in waterDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards :inputs="disc.Stances" job="Stances" color_category="Water" />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Water"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import WaterText from "@/database/text_files/spirit_descriptions/water.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "water",
  components: {
    ShowCards,
  },
  computed: {
    waterDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Water");
    },
    waterText: function () {
      return this.$marked.parse(WaterText);
    },
  },
});
</script>

<style scoped lang="scss">
.water--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
