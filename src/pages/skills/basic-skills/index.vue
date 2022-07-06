<template>
  <show-cards :inputs="basics" job="Techniques" :collapse="false" />
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/cards/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "basic-techniques",
  components: {
    ShowCards,
  },
  computed: {
    basics: function () {
      var disc = this.$store.getters.getDiscipline("Basic");
      return this.$store.getters.getTechniquesFromList(disc.Techniques);
    },
  },
});
</script>
