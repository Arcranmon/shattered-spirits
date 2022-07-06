<template>
  <div>
    <span v-if="collapse">
      <v-expansion-panels flat style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header v-bind:class="contained_header"
            ><h3>{{ dropName }}</h3></v-expansion-panel-header
          >
          <v-expansion-panel-content v-bind:class="contained_body">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
                  v-for="(n, index) in inputs"
                  v-bind:key="n.Name"
                  :lg="colWidth"
                  v-bind:class="{ 'card--button': selectButton }"
                  v-on:click="clickMethod(n, index)"
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
            v-for="(n, index) in inputs"
            :key="n.Name"
            v-bind:class="{ 'card--button': selectButton }"
            v-on:click="clickMethod(n, index)"
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
            <div class="card--box" v-if="job == 'Armor'">
              <armor-card :armor="n" :color="color_category" />
            </div>
            <div class="card--box" v-if="job == 'NPC'">
              <npc-card :npc="n" />
            </div>
          </v-col>
        </v-row> </v-container
    ></span>
  </div>
</template>

<script>
import Vue from "vue";
import StanceCard from "./StanceCard.vue";
import TechCard from "./TechCard.vue";
import WeaponCard from "./WeaponCard.vue";
import ArmorCard from "./ArmorCard.vue";
import NpcCard from "./NpcCard.vue";

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
      default: "#ece6dc",
    },
    display_text: {
      type: String,
      required: false,
      default: "None",
    },
    standalone_or_contained: {
      type: String,
      required: false,
      default: "Contained",
    },
    collapse: {
      type: Boolean,
      required: false,
      default: true,
    },
    cols: {
      type: Number,
      required: false,
      default: 3,
    },
    selectButton: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    TechCard,
    ArmorCard,
    StanceCard,
    WeaponCard,
    NpcCard,
  },
  methods: {
    clickMethod(variable, index) {
      this.$emit("chose", { card: variable, index: index });
    },
  },
  computed: {
    colWidth: function () {
      return 12 / this.cols;
    },
    dropName: function () {
      if (this.display_text == "None") return this.job;
      else return this.display_text;
    },
    contained_header: function () {
      if (this.standalone_or_contained == "Contained")
        return "expand--header-contained";
      return "expand--header-standalone";
    },
    contained_body: function () {
      if (this.standalone_or_contained == "Contained")
        return "expand--body-contained";
      return "expand--body-standalone";
    },
  },
});
</script>

<style scoped lang="scss">
.card--box {
  width: 100%;
}
.expand--header-contained {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.expand--header-standalone {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border: $border--black-standard;
}
.expand--body-contained {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
}
.expand--body-standalone {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
  border: $border--black-thin;
  border-top: none;
}
.centered {
  margin: auto;
  align-self: center;
}
.card--button:hover {
  transform: scale(1.01);
  cursor: pointer;
}
</style>