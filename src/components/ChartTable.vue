<template>
  <div>
    <div
      class="chart--wrapper"
      inline>
      <v-row
        no-gutters
        class="chart--row">
        <v-col
          class="chart--head"
          cols="2">
          <b>Result</b>
        </v-col>
        <v-col
          class="chart--head"
          v-bind:class="[chart.HasRoll ? 'chart--cols-right' : '']"
          cols="2"
          v-if="chart.HasRoll">
          <b>Roll</b>
        </v-col>
        <v-col
          class="chart--head chart--head-right"
          v-if="chart.HasStun"
          v-bind:cols="stunWidth">
          <b>Stun</b>
        </v-col>
        <v-col
          class="chart--head chart--head-right"
          v-if="chart.HasDamage"
          v-bind:cols="damageWidth">
          <b>Damage</b>
        </v-col>
        <v-col
          class="chart--head chart--head-right"
          v-bind:cols="effectWidth">
          <b>Effect</b>
        </v-col>
        <v-col
          class="chart--head chart--head-right"
          v-if="chart.HasRoll && !chart.IsDefend"
          v-bind:cols="negateWidth">
          <b>Negate</b>
        </v-col>
      </v-row>
      <div
        v-for="(n, index) in 4"
        :key="n">
        <v-row
          align="stretch"
          no-gutters
          class="chart--row">
          <v-col
            class="chart--cols justify-center align-center"
            v-bind:class="getRank(index)"
            cols="2"
            >{{ results[index] }}
          </v-col>
          <v-col
            class="chart--cols justify-center align-center"
            v-if="chart.HasRoll"
            v-bind:class="[chart.HasRoll ? 'chart--cols-right' : '', getRank(index)]"
            cols="2"
            >{{ chart.Roll[index] }}
          </v-col>
          <v-col
            class="chart--cols"
            v-bind:class="[chart.HasRoll ? 'chart--cols-right' : '', getRank(index)]"
            v-if="chart.HasStun"
            v-bind:cols="stunWidth"
            >{{ chart.Stun(index) }}
          </v-col>
          <v-col
            class="chart--cols chart--cols-right"
            v-bind:class="getRank(index)"
            v-if="chart.HasDamage"
            v-bind:cols="damageWidth"
            >{{ chart.Damage(index) }}
          </v-col>
          <v-col
            class="chart--cols chart--cols-right"
            v-bind:class="getRank(index)"
            v-bind:cols="effectWidth">
            <display-tooltip-text :string="chart.Status(index)" />
          </v-col>
          <v-col
            class="chart--cols chart--cols-right"
            v-if="chart.HasRoll && !chart.IsDefend"
            v-bind:class="getRank(index)"
            v-bind:cols="negateWidth"
            >{{ chart.Negate(index) }}
          </v-col>
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
  data() {
    return {
      results: ['Miss', 'Graze', 'Hit', 'Crit'],
    }
  },
  computed: {
    damageWidth() {
      if (this.chart.HasDamage) return 2
      return 0
    },
    stunWidth() {
      if (this.chart.HasStun) return 1
      return 0
    },
    negateWidth() {
      if (this.chart.HasRoll) return 2
      return 0
    },
    effectWidth() {
      return 3 + (1 - this.stunWidth) + (2 - this.damageWidth) + (2 - this.HasRoll)
    },
  },
  methods: {
    getRank(index) {
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
