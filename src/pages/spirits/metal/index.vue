<template>
  <category-cards category="Metal" :text="metalText" title="Metal Spirits" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import MetalText from "@/database/text_files/spirit_descriptions/metal.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    CategoryCards,
  },
  computed: {
    metalText: function () {
      return this.$marked.parse(MetalText);
    },
  },
});
</script>
