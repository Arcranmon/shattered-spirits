<template>
  <v-container fluid>
    <v-row>
      <v-col
        cols="12"
        class="d-flex justify-center"
        v-for="n in inputs"
        :lg="colWidth"
      >
        <div class="card--box" v-if="job == 'Stance'">
          <stance-card :stance="n" :category="color_category" />
        </div>
        <div class="card--box" v-if="job == 'Tech'">
          <tech-card :tech="n" :category="color_category" />
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Vue from "vue";
import TechCard from "./TechCard.vue";
import StanceCard from "./StanceCard.vue";

export default Vue.extend({
  name: "show-cards",
  props: {
    inputs: {
      type: Array,
      required: true,
    },
    job: {
      type: String,
      required: true,
    },
    color_category: {
      type: String,
      required: true,
    },
  },
  components: {
    TechCard,
    StanceCard,
  },
  computed: {
    colWidth: function () {
      return 4;
    },
  },
});
</script>

<style scoped lang="scss">
.card--box {
  width: 100%;
}

.card--button:hover {
  transform: scale(1.01);
  cursor: pointer;
}
</style>
