<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top Armor">
      <div class="card--header">
        <img class="image--header-left" :src="armor.Icon" />
        <img class="image--header-right" :src="armor.Icon" />
        <h4 style="display: inline; font-style: normal">{{ armor.Name }}</h4>
        <div class="card--keywords">
          <b
            ><div>{{ armor.Category }}</div>
            <div v-if="armor.Keywords.length > 0">
              <span v-for="(keyword, index) in armor.Keywords" :key="index" class="keyword--box">
                <display-tooltip-text :string="keyword" :decorate="false"
              /></span>
            </div>
          </b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div class="chart--wrapper" inline>
        <v-row no-gutters class="chart--row">
          <v-col class="chart--head" cols="2" v-if="armor.HasGuard"
            ><b><display-tooltip-text string="_Guard_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2" v-if="armor.HasPadding"
            ><b><display-tooltip-text string="_Padding_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2" v-if="armor.Category != 'Layered Armor'"
            ><b><display-tooltip-text string="_Load_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2" v-if="armor.Category != 'Layered Armor'"
            ><b><display-tooltip-text string="_Notches_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2" v-if="armor.Category != 'Layered Armor'"
            ><b><display-tooltip-text string="_Durability_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2" v-if="armor.HasSlots"
            ><b><display-tooltip-text string="_Slots_" :decorate="false" /></b
          ></v-col>
        </v-row>
        <v-row align="stretch" no-gutters class="chart--row">
          <v-col v-if="armor.HasGuard" class="chart--cols justify-center align-center" cols="2">{{ armor.Guard }}</v-col>
          <v-col v-if="armor.HasPadding" class="chart--cols justify-center align-center" cols="2">{{ armor.Padding }}</v-col>
          <v-col v-if="armor.Category != 'Layered Armor'" class="chart--cols justify-center align-center" cols="2">{{ armor.Load }}</v-col>
          <v-col v-if="armor.Category != 'Layered Armor'" class="chart--cols justify-center align-center" cols="2">{{ armor.Notches }}</v-col>
          <v-col v-if="armor.Category != 'Layered Armor'" class="chart--cols justify-center align-center" cols="2">{{ armor.Durability }}</v-col>
          <v-col v-if="armor.HasSlots" class="chart--cols justify-center align-center" cols="2">{{ armor.ConsumableSlots }}</v-col>
        </v-row>
      </div>
      <div v-if="armor.HasTraits"><display-tooltip-text :string="armor.TraitsHeader" /></div>
      <div v-if="armor.HasSpecial"><display-tooltip-text :string="armor.SpecialHeader" /></div>
      <ability-widget v-for="(ability, index) in armor.Abilities" :ability="ability" :useDivider="true" />
      <div v-if="armor.HasChart" class="ability-box">
        <chart-table :chart="armor.Chart" />
      </div>
      <div class="card--format" v-if="armor.HasTable">
        <basic-table :chart="armor.Table" />
      </div>
    </div>
    <div class="desc--box" v-if="armor.Desc.length > 0" style="font-style: italic">{{ armor.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Armor } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'armor-card',
  components: { AbilityWidget, BasicTable, ChartTable },
  props: {
    armor: {
      type: Armor,
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
.a {
}
</style>
