<template>
  <v-expansion-panels>
    <v-expansion-panel-header>{{ job }}</v-expansion-panel-header>
    <v-expansion-panel-content
      >Blahblahblah
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center"
            v-for="n in inputs"
            v-bind:key="n.Name"
            :lg="colWidth"
          >
            <div class="card--box" v-if="job == 'Stance'">
              <stance-card :stance="n" :category="color_category" />
            </div>
            <div class="card--box" v-if="job == 'Tech'">
              <tech-card :tech="n" :category="color_category" />
            </div>
            <div class="card--box" v-if="job == 'Weapon'">
              <weapon-card :weapon="n" />
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-expansion-panel-content>
  </v-expansion-panels>
</template>

<script>
import Vue from "vue";
import StanceCard from "./StanceCard.vue";
import TechCard from "./TechCard.vue";
import WeaponCard from "./WeaponCard.vue";

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
      required: false,
    },
  },
  components: {
    TechCard,
    StanceCard,
    WeaponCard,
  },
  computed: {
    colWidth: function () {
      return Math.max(12 / this.inputs.length, 4);
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
