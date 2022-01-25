<template>
  <div>
    <div class="page--title">{{ basics.Name }}</div>
    <div class="page--description">{{ basics.Flavor }}</div>
    <show-cards :inputs="basics" job="Techniques" :collapse="false" />
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
      return this.$store.getters.getBasicSkills();
    },
  },
});
</script>
