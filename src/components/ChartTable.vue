<template>
  <div class="chart--wrapper" inline>
    <v-row no-gutters class="chart--row">
      <v-col class="chart--head" cols="2"><b>Hit</b></v-col>
      <v-col
        class="chart--head chart--head-right"
        v-if="(chart.HasDamage)"
        cols="2"
        ><b>Damage</b></v-col
      ><v-col class="chart--head chart--head-right" cols="6"
        ><b>Status</b></v-col
      >
    </v-row>
    <div v-for="(item, index) in chart.Hit">
      <v-row align="stretch" no-gutters class="chart--row">
        <v-col
          class="chart--cols justify-center align-center"
          v-bind:class="item"
          cols="2"
          >{{ index + 2 }}
        </v-col>
        <v-col
          class="chart--cols chart--cols-right"
          v-if="(chart.HasDamage)"
          cols="2"
          >{{ chart.Damage(index) }}
        </v-col>
        <v-col class="chart--cols chart--cols-right" cols="6"
          ><tooltipped-text :input="chart.Status(index)" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Chart } from "@/class";
import TooltippedText from "./TooltipTextFromArray.vue";

export default Vue.extend({
  name: "chart-table",
  props: {
    chart: {
      type: Chart,
      required: true,
    },
  },
  components: { TooltippedText },
});
</script>

<style scoped lang="scss">
.chart--format {
}
.Miss {
  background-color: $color--chart-miss;
}
.Graze {
  background-color: $color--chart-graze;
}
.Hit {
  background-color: $color--chart-hit;
}
.Crit {
  background-color: $color--chart-crit;
}
</style>
