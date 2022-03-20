<template>
  <div class="chart--wrapper" inline>
    <v-row no-gutters class="chart--row">
      <v-col class="chart--head" cols="2"><b>Roll</b></v-col>
      <v-col
        class="chart--head chart--head-right"
        v-if="(chart.HasDamage)"
        cols="2"
        ><b>Damage</b></v-col
      ><v-col class="chart--head chart--head-right" cols="6"
        ><b>Status</b></v-col
      >
    </v-row>
    <div v-for="(item, index) in chart.Roll">
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
          ><display-tooltip-text :string="chart.Status(index)" />
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Chart } from "@/class";
import DisplayTooltipText from "@/components/DisplayTooltipText";

export default Vue.extend({
  name: "chart-table",
  props: {
    chart: {
      type: Chart,
      required: true,
    },
  },
});
</script>

<style scoped lang="scss">
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
