<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Water Spirits</h3>
    <vue-simple-markdown :source="waterText" />
    <div
      class="water--box"
      v-for="disc in waterDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <div class="page--title">{{ disc.Name }}</div>
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
import WaterText from "./water.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "water",
  components: {
    ShowCards,
  },
  data: function () {
    return {
      waterText: WaterText,
    };
  },
  computed: {
    waterDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Water");
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
