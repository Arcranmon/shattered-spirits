<template>
  <category-cards category="Flame" :text="flameText" title="Flame Spirits" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import FlameText from "@/database/text_files/spirit_descriptions/flame.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "flame",
  components: {
    CategoryCards,
  },
  computed: {
    flameText: function () {
      return this.$marked.parse(FlameText);
    },
  },
});
</script>
