<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header" v-bind:class="type.Name">
        <div>
          <h4 style="display: inline">{{ type.Name }}</h4>
        </div>
      </div>
    </div>
    <div class="card--content">
      <display-tooltip-text :string="type.GrowthHeader" /><br />
      <display-tooltip-text :string="type.SpeedHeader" />
      <div class="chart--wrapper" inline>
        <v-row no-gutters class="chart--row">
          <v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_HP_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Stun_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Movement_" :decorate="false" /></b
          ></v-col>
        </v-row>
        <v-row align="stretch" no-gutters class="chart--row" style="border-top: none">
          <v-col class="chart--cols justify-center align-center" cols="2">{{ type.HP }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2"> {{ type.Defenses.Stun }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ type.Movement }}</v-col>
        </v-row>
        <v-row no-gutters class="chart--row" style="border-top: none">
          <v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Focus_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Grit_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Reflex_" :decorate="false" /></b
          ></v-col>
        </v-row>
        <v-row align="stretch" no-gutters class="chart--row">
          <v-col class="chart--cols justify-center align-center" cols="2">{{ type.Defenses.Focus }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ type.Defenses.Grit }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ type.Defenses.Reflex }}</v-col>
        </v-row>
      </div>
      <display-tooltip-text :string="type.ManifestHeader" /><br />
    </div>
    <div class="desc--box" v-if="type.Desc.length > 0" style="font-style: italic">{{ type.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { SpiritType } from '@/class'
import BasicTable from '@/components/BasicTable.vue'

export default Vue.extend({
  name: 'spirit-type-card',
  props: {
    type: {
      type: SpiritType,
      required: true,
    },
  },
  components: { BasicTable },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
