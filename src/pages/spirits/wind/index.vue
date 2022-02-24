<template>
  <div style="padding: 1em;">
    <h1>Wind Spirits</h1>
    <span v-html="windText" />
    <div
      class="wind--box"
      v-for="disc in windDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">
        <b>{{ disc.Role }}</b>
      </div>
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
import WindText from "@/database/text_files/spirit_descriptions/wind.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "wind",
  components: {
    ShowCards,
  },
  computed: {
    windDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Wind");
    },
    windText: function () {
      return this.$marked.parse(WindText);
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
