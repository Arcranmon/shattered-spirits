<template>
  <div>
    <div class="page--title">{{ basics.Name }}</div>
    <div class="page--description">{{ basics.Flavor }}</div>
    <show-cards :inputs="basics.Techniques" job="Techniques" />
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "basic-techniques",
  components: {
    ShowCards,
  },
  computed: {
    basics: function () {
      return this.$store.getters.byDisciplineCategory("Basic Techniques")[0];
    },
  },
});
</script>
