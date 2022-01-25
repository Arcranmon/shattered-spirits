<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Wind Spirits</h3>
    <vue-simple-markdown :source="windText" />
    <div
      class="wind--box"
      v-for="disc in windDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <div class="page--title">{{ disc.Name }}</div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards :inputs="disc.Stances" job="Stances" color_category="Wind" />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Wind"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import WindText from "./wind.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "wind",
  components: {
    ShowCards,
  },
  data: function () {
    return {
      windText: WindText,
    };
  },
  computed: {
    windDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Wind");
    },
  },
});
</script>

<style scoped lang="scss">
.wind--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
