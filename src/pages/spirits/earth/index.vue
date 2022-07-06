<template>
  <category-cards category="Earth" :text="earthText" title="Earth Spirits" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import EarthText from "@/database/text_files/spirit_descriptions/earth.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    CategoryCards,
  },
  computed: {
    earthText: function () {
      return this.$marked.parse(EarthText);
    },
  },
});
</script>
