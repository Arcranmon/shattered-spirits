<template>
  <div>
    <div class="chart--wrapper" inline>
      <v-row no-gutters class="chart--row">
        <v-col class="chart--head" cols="1"><b>Roll</b></v-col
        ><v-col class="chart--head chart--head-right" cols="11"><b>Effect</b></v-col>
      </v-row>
      <div v-for="(item, index) in chart" :key="index">
        <v-row align="stretch" no-gutters class="chart--row" :class="{ OddRow: index % 2 == 1 }">
          <v-col class="chart--cols justify-center align-center" cols="1">{{ index + 1 }} </v-col>
          <v-col class="chart--cols chart--cols-right" cols="11"><display-tooltip-text :string="item" /> </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'basic-chart',
  props: {
    chart: {
      type: Array,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.OddRow {
  filter: brightness(90%);
}
</style>
