<template>
  <div style="padding: 1em;">
    <h1>Wood Spirits</h1>
    <span v-html="woodText" />
    <div
      class="wood--box"
      v-for="disc in woodDiscs"
      :style="{ 'background-color': disc.Background }"
    >
      <h2>{{ disc.Name }}</h2>
      <div class="page--description">
        <b>{{ disc.Role }}</b>
      </div>
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
import WoodText from "@/database/text_files/spirit_descriptions/wood.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "wood",
  components: {
    ShowCards,
  },
  computed: {
    woodDiscs: function () {
      return this.$store.getters.getSpiritMasteryByType("Wood");
    },
    woodText: function () {
      return this.$marked.parse(WoodText);
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
