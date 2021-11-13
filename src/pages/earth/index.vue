<template>
  <div>
    <div v-for="disc in earthDiscs">
      <div class="page--title">{{ disc.Name }}</div>
      <div class="page--description">{{ disc.Flavor }}</div>
      <div class="page--sub-title">Stances</div>
      <show-cards
        :inputs="disc.Stances"
        job="Stance"
        :color_category="disc.Category"
      />
      <div class="page--sub-title">Techniques</div>
      <show-cards
        :inputs="disc.Techniques"
        job="Tech"
        :color_category="disc.Category"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "earth",
  components: {
    ShowCards,
  },
  computed: {
    earthDiscs: function () {
      return this.$store.getters.byCategory("Earth");
    },
  },
});
</script>
