<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top Armor">
      <div class="card--header">
        <h4 style="display: inline; font-style: normal">{{ armor.Name }}</h4>
        <div class="card--keywords">
          <b
            ><div>{{ armor.Category }}</div>
            <span v-for="(keyword, index) in armor.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false"
            /></span>
          </b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div v-if="armor.Category != 'Layered Armor'">
        <div class="chart--wrapper" inline>
          <v-row no-gutters class="chart--row">
            <v-col class="chart--head" cols="2"
              ><b><display-tooltip-text string="_Guard_" :decorate="false" /></b></v-col
            ><v-col class="chart--head" cols="2"
              ><b><display-tooltip-text string="_Soak_" :decorate="false" /></b></v-col
            ><v-col class="chart--head" cols="2"
              ><b><display-tooltip-text string="_Load_" :decorate="false" /></b></v-col
            ><v-col class="chart--head" cols="2"
              ><b><display-tooltip-text string="_Durability_" :decorate="false" /></b></v-col
            ><v-col class="chart--head" cols="2"
              ><b><display-tooltip-text string="_Wear_" :decorate="false" /></b
            ></v-col>
          </v-row>
          <v-row align="stretch" no-gutters class="chart--row">
            <v-col class="chart--cols justify-center align-center" cols="2">{{ armor.Guard }}</v-col>
            <v-col class="chart--cols justify-center align-center" cols="2">{{ armor.Soak }}</v-col>
            <v-col class="chart--cols justify-center align-center" cols="2">{{ armor.Load }}</v-col>
            <v-col class="chart--cols justify-center align-center" cols="2">{{ armor.Durability }}</v-col>
            <v-col class="chart--cols justify-center align-center" cols="2">{{ armor.Wear }}</v-col>
          </v-row>
        </div>
      </div>
      <div v-if="armor.HasTraits"><display-tooltip-text :string="armor.TraitsHeader" /></div>
      <div v-if="armor.HasSpecial"><display-tooltip-text :string="armor.SpecialHeader" /></div>
      <ability-widget v-for="(ability, index) in armor.Abilities" :ability="ability" :useDivider="true" />
      <div v-if="armor.HasTable" class="ability-box">
        <basic-table :chart="armor.Table" />
      </div>
      <div class="desc--box" v-if="armor.Desc.length > 0" style="font-style: italic">{{ armor.Desc }}<br /></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Armor } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'

export default Vue.extend({
  name: 'armor-card',
  components: { AbilityWidget, BasicTable },
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
