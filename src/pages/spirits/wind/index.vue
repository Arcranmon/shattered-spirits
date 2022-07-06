<template>
  <category-cards category="Wind" :text="windText" title="Wind Spirits" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import WindText from "@/database/text_files/spirit_descriptions/wind.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "wind",
  components: {
    CategoryCards,
  },
  computed: {
    windText: function () {
      return this.$marked.parse(WindText);
    },
  },
});
</script>
