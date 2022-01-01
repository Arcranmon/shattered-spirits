<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Metal Spirits</h3>
    <vue-simple-markdown :source="metalText" />
    <div
      class="metal--box"
      v-for="disc in metalDiscs"
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
import MetalText from "./metal.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    ShowCards,
  },
  data: function () {
    return {
      metalText: MetalText,
    };
  },
  computed: {
    metalDiscs: function () {
      return this.$store.getters.byDisciplineCategory("Metal");
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
