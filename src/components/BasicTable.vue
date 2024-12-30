<template>
  <div>
    <div class="chart--wrapper" inline>
      <v-row no-gutters class="chart--row">
        <v-col class="chart--head" cols="2"><b>Roll</b></v-col
        ><v-col class="chart--head chart--head-right" cols="4"><b>Effect</b></v-col>
      </v-row>
      <div v-for="(item, index) in chart" :key="index">
        <v-row align="stretch" no-gutters class="chart--row" :class="{ OddRow: index % 2 == 1 }">
          <v-col class="chart--cols justify-center align-center" v-bind:class="useClass(getItem(item))" cols="2">{{ getIndex(item, index) }} </v-col>
          <v-col class="chart--cols chart--cols-right" cols="4" v-bind:class="useClass(getItem(item))"><display-tooltip-text :string="getItem(item)" /> </v-col>
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
    useClass(item) {
      if (item == 'Miss' || item == 'Hit' || item == 'Graze' || item == 'Crit') return item
      return ''
    },
  },
})
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
.OddRow {
  filter: brightness(85%);
}
</style>
