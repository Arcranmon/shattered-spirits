<template>
  <category-cards category="Stratagem" title="Stratagem Skills" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "stratagem-skills",
  components: {
    CategoryCards,
  },
});
</script>
