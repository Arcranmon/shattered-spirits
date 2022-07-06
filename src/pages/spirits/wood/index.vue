<template>
  <category-cards category="Wood" :text="woodText" title="Wood Spirits" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import WoodText from "@/database/text_files/spirit_descriptions/wood.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "wood",
  components: {
    CategoryCards,
  },
  computed: {
    woodText: function () {
      return this.$marked.parse(WoodText);
    },
  },
});
</script>
