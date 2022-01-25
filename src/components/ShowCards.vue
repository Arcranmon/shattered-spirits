<template>
  <span>
    <span v-if="collapse">
      <v-expansion-panels flat style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header class="page--sub-title expand--header">{{
            dropName
          }}</v-expansion-panel-header>
          <v-expansion-panel-content class="expand--body">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
                  v-for="n in inputs"
                  v-bind:key="n.Name"
                  :lg="colWidth"
                >
                  <div class="card--box" v-if="job == 'Stances'">
                    <stance-card :stance="n" :category="color_category" />
                  </div>
                  <div class="card--box" v-if="job == 'Techniques'">
                    <tech-card :tech="n" :category="color_category" />
                  </div>
                  <div class="card--box" v-if="job == 'Weapons'">
                    <weapon-card :weapon="n" />
                  </div>
                </v-col>
              </v-row> </v-container
          ></v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </span>
    <span v-else>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center"
            v-for="n in inputs"
            v-bind:key="n.Name"
            :lg="colWidth"
          >
            <div class="card--box" v-if="job == 'Stances'">
              <stance-card :stance="n" :category="color_category" />
            </div>
            <div class="card--box" v-if="job == 'Techniques'">
              <tech-card :tech="n" :category="color_category" />
            </div>
            <div class="card--box" v-if="job == 'Weapons'">
              <weapon-card :weapon="n" :color="color_category" />
            </div>
          </v-col>
        </v-row> </v-container
    ></span>
  </span>
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
    display_text: {
      type: String,
      required: false,
      default: "None",
    },
    collapse: {
      type: Boolean,
      required: false,
      default: true,
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
    dropName: function () {
      if (this.display_text == "None") return this.job;
      else return this.display_text;
    },
  },
});
</script>

<style scoped lang="scss">
.card--box {
  width: 100%;
}
.expand--header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.expand--body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
}
</style>
