<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Earth Spirits</h3>
    <vue-simple-markdown :source="earthText" />
    <div
      class="earth--box"
      v-for="disc in earthDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <div class="page--title">{{ disc.Name }}</div>
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
import EarthText from "./earth.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    ShowCards,
  },
  data: function () {
    return {
      earthText: EarthText,
    };
  },
  computed: {
    earthDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Earth");
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
