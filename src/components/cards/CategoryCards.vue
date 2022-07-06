<template>
  <div style="padding: 1em;">
    <h1 v-if="title != ''">{{ title }}</h1>
    <span v-html="parsedText" />
    <div v-for="disc in disciplines">
      <discipline-card :discipline="disc" :category="category" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/cards/ShowCards.vue";
import DisciplineCard from "@/components/cards/DisciplineCard";
import { store } from "@/store";
export default Vue.extend({
  name: "category-cards",
  props: {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: "",
    },
  },
  components: {
    ShowCards,
    DisciplineCard,
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getDisciplinesByCategory(this.category);
    },
    parsedText: function () {
      return this.$marked.parse(this.text);
    },
  },
});
</script>
