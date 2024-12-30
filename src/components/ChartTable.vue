<template>
  <div>
    <div class="chart--wrapper" inline>
      <v-row no-gutters class="chart--row">
        <v-col class="chart--head" cols="2"><b>Roll</b></v-col>
        <v-col class="chart--head chart--head-right" v-if="chart.HasStun" v-bind:cols="stunWidth"><b>Stun</b></v-col
        ><v-col class="chart--head chart--head-right" v-if="chart.HasDamage" v-bind:cols="damageWidth"><b>Damage</b></v-col
        ><v-col class="chart--head chart--head-right" cols="7"><b>Effect</b></v-col>
      </v-row>
      <div v-for="(item, index) in chart.Roll">
        <v-row align="stretch" no-gutters class="chart--row">
          <v-col class="chart--cols justify-center align-center" v-bind:class="getClass(index)" cols="2">{{ chart.Roll[index] }} </v-col>
          <v-col class="chart--cols chart--cols-right" v-bind:class="getClass(index)" v-if="chart.HasStun" v-bind:cols="stunWidth"
            >{{ chart.Stun(index) }}
          </v-col>
          <v-col class="chart--cols chart--cols-right" v-bind:class="getClass(index)" v-if="chart.HasDamage" v-bind:cols="damageWidth"
            >{{ chart.Damage(index) }}
          </v-col>
          <v-col class="chart--cols chart--cols-right" v-bind:class="getClass(index)" cols="7"><display-tooltip-text :string="chart.Status(index)" /> </v-col>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Chart } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'chart-table',
  props: {
    chart: {
      type: Chart,
      required: true,
    },
  },
  computed: {
    damageWidth() {
      if (this.chart.HasStun && this.chart.HasDamage) return 2
      if (this.chart.HasDamage) return 3
      return 0
    },
    stunWidth() {
      if (this.chart.HasStun && this.chart.HasDamage) return 1
      if (this.chart.HasStun) return 3
      return 0
    },
  },
  methods: {
    getClass(index) {
      if (index == 0) return 'Miss'
      if (index == 1) return 'Graze'
      if (index == 2) return 'Hit'
      if (index == 3) return 'Crit'
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
