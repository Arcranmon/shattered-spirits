<template>
  <category-cards category="Water" :text="waterText" title="Water Spirits" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import WaterText from "@/database/text_files/spirit_descriptions/water.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "water",
  components: {
    CategoryCards,
  },
  computed: {
    waterText: function () {
      return this.$marked.parse(WaterText);
    },
  },
});
</script>
