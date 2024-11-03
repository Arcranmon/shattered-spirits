<template>
  <div>
    <div class="chart--wrapper" inline>
      <v-row no-gutters class="chart--row">
        <v-col class="chart--head" cols="1"><b>Roll</b></v-col
        ><v-col class="chart--head chart--head-right" cols="11"><b>Effect</b></v-col>
      </v-row>
      <div v-for="(item, index) in chart" :key="index">
        <v-row align="stretch" no-gutters class="chart--row" :class="{ OddRow: index % 2 == 1 }">
          <v-col class="chart--cols justify-center align-center" cols="1">{{ getIndex(item, index) }} </v-col>
          <v-col class="chart--cols chart--cols-right" cols="11"><display-tooltip-text :string="getItem(item)" /> </v-col>
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
  methods: {
    getIndex(item, index) {
      if (typeof item === 'string') return index + 1
      return item[0]
    },
    getItem(item) {
      if (typeof item === 'string') return item
      return item[1]
    },
  },
})
</script>

<style scoped lang="scss">
.OddRow {
  filter: brightness(90%);
}
</style>
