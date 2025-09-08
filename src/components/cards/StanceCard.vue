<template>
  <div class="card--wrapper" inline>
    <div class="stance--color-header" v-bind:class="category">
      <div class="card--underline-top card--header">
        <h4 style="display: inline; font-style: normal">{{ stance.Name }}</h4>
      </div>
    </div>
    <div class="card--content">
      <div class="chart--wrapper" inline>
        <v-row align="stretch" no-gutters class="chart--row"
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Movement_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Stun Clear_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Grit_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Focus_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Reflex_" :decorate="false" /></b
          ></v-col>
        </v-row>
        <v-row align="stretch" no-gutters class="chart--row">
          <v-col class="chart--cols justify-center align-center" cols="2">{{ stance.Movement }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ stance.Stun }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ stance.Grit }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ stance.Focus }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ stance.Reflex }}</v-col>
        </v-row>
      </div>
      <display-tooltip-text :string="stance.PhaseHeader(0)" /><br />
      <display-tooltip-text :string="stance.PhaseHeader(1)" /><br />
      <display-tooltip-text :string="stance.PhaseHeader(2)" /><br />
      <display-tooltip-text :string="stance.PhaseHeader(3)" /><br />
      <div v-if="stance.HasTraits">
        <display-tooltip-text :string="stance.TraitsHeader" />
      </div>
      <div v-if="stance.HasEffects">
        <display-tooltip-text v-for="effect in stance.Effects" :string="effect" />
      </div>
      <div v-if="stance.HasSpecial">
        <display-tooltip-text :string="stance.SpecialHeader" />
      </div>
      <ability-widget v-for="(ability, index) in stance.Abilities" :ability="ability" :use-divider="true" />
    </div>
    <div class="desc--box" v-if="stance.Desc.length > 0" style="font-style: italic">{{ stance.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import AbilityWidget from '@/components/AbilityWidget.vue'
import ChartTable from '@/components/ChartTable.vue'
import { Stance } from '@/class'

export default Vue.extend({
  name: 'stance-card',
  props: {
    stance: {
      type: Stance,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: '#ece6dc',
    },
    on_sheet: {
      type: Boolean,
      required: false,
      default: false,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { AbilityWidget, ChartTable },
})
</script>

<style scoped lang="scss">
.stance--color-header {
  background-color: thistle;
}
</style>
