<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top colored-header">
      <div class="card--header">
        <img class="image--header-left" :src="equipment.Icon" />
        <img class="image--header-right" :src="equipment.Icon" />
        <h4 style="display: inline; font-style: normal">{{ equipment.Name }}</h4>
        <div class="card--keywords">
          <b
            ><div>{{ equipment.Category }}</div>
            <span v-for="(keyword, index) in equipment.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false"
            /></span>
          </b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div class="chart--wrapper" inline>
        <v-row no-gutters class="chart--row"
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Hands_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Load_" :decorate="false" /></b
          ></v-col>
        </v-row>
        <v-row align="stretch" no-gutters class="chart--row">
          <v-col class="chart--cols justify-center align-center" cols="2">{{ equipment.Hands }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ equipment.Load }}</v-col>
        </v-row>
      </div>
      <div v-if="equipment.HasTraits"><display-tooltip-text :string="equipment.TraitsHeader" /></div>
      <div v-if="equipment.HasEffect"><display-tooltip-text :string="equipment.EffectHeader" /></div>
      <div v-if="equipment.HasSpecial"><display-tooltip-text :string="equipment.SpecialHeader" /></div>
      <ability-widget v-for="(ability, index) in equipment.Abilities" :ability="ability" :useDivider="true" />
      <div v-if="equipment.HasChart" class="ability-box">
        <chart-table :chart="equipment.Chart" />
      </div>
    </div>
    <div class="desc--box" v-if="equipment.Desc.length > 0" style="font-style: italic">{{ equipment.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Equipment } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import ChartTable from '@/components/ChartTable.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'Equipment-card',
  components: { AbilityWidget, ChartTable },
  props: {
    equipment: {
      type: Equipment,
      required: true,
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
})
</script>

<style scoped lang="scss">
.colored-header {
  background-color: #a776a0;
}
</style>
