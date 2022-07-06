<template>
  <category-cards category="Armor" title="Armor Skills" />
</template>

<script>
import Vue from "vue";
import CategoryCards from "@/components/cards/CategoryCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "armor-skills",
  components: {
    CategoryCards,
  },
});
</script>
