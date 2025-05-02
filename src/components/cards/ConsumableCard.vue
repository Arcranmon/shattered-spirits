<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top colored-header">
      <div class="card--header">
        <img class="image--header-left" :src="consumable.Icon" />
        <img class="image--header-right" :src="consumable.Icon" />
        <h4 style="display: inline; font-style: normal">{{ consumable.Name }}</h4>
        <div class="card--keywords">
          <b
            ><div>{{ consumable.Category }}</div>
            <span v-for="(keyword, index) in consumable.Keywords" :key="index" class="keyword--box">
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
          <v-col class="chart--cols justify-center align-center" cols="2">{{ consumable.Hands }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ consumable.Load }}</v-col>
        </v-row>
      </div>
      <div v-if="consumable.HasTraits"><display-tooltip-text :string="consumable.TraitsHeader" /></div>
      <div v-if="consumable.HasSpecial"><display-tooltip-text :string="consumable.SpecialHeader" /></div>
      <ability-widget v-for="(ability, index) in consumable.Abilities" :ability="ability" :useDivider="true" />
      <div v-if="consumable.HasChart" class="ability-box">
        <chart-table :chart="consumable.Chart" />
      </div>
    </div>
    <div class="desc--box" v-if="consumable.Desc.length > 0" style="font-style: italic">{{ consumable.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Consumable } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import ChartTable from '@/components/ChartTable.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'Consumable-card',
  components: { AbilityWidget, ChartTable },
  props: {
    consumable: {
      type: Consumable,
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
