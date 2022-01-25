<template>
  <div style="padding: 1em;">
    <h3 class="page--header">Wood Spirits</h3>
    <vue-simple-markdown :source="woodText" />
    <div
      class="wood--box"
      v-for="disc in woodDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <div class="page--title">{{ disc.Name }}</div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <show-cards :inputs="disc.Stances" job="Stances" color_category="Wood" />
      <show-cards
        :inputs="disc.Techniques"
        job="Techniques"
        color_category="Wood"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import WoodText from "./wood.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "wood",
  components: {
    ShowCards,
  },
  data: function () {
    return {
      woodText: WoodText,
    };
  },
  computed: {
    woodDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Wood");
    },
  },
});
</script>

<style scoped lang="scss">
.wood--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
