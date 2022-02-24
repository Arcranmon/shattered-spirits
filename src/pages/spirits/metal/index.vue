<template>
  <div style="padding: 1em;">
    <h1>Metal Spirits</h1>
    <span v-html="metalText" />
    <div
      class="metal--box"
      v-for="disc in metalDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">
        <b>{{ disc.Role }}</b>
      </div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards :inputs="disc.Stances" job="Stances" color_category="Metal" />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Metal"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import MetalText from "@/database/text_files/spirit_descriptions/metal.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    ShowCards,
  },
  computed: {
    metalDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Metal");
    },
    metalText: function () {
      return this.$marked.parse(MetalText);
    },
  },
});
</script>

<style scoped lang="scss">
.metal--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
