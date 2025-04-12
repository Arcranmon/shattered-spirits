<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top weapon">
      <div class="card--header">
        <img v-if="isWeapon" class="image--header-left" :src="weapon.Icon" />
        <img v-if="isWeapon" class="image--header-right" :src="weapon.Icon" />
        <h4 style="display: inline; font-style: normal">{{ weapon.Name }}</h4>
        <div class="card--keywords">
          <b>
            <div><display-tooltip-text :string="weapon.ClassHeader" :decorate="false" /></div>
            <div v-if="weapon.HasSpeedOrTier"><display-tooltip-text :string="weapon.SpeedHeader" :decorate="false" /></div>
            <span v-for="(keyword, index) in weapon.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div class="chart--wrapper" inline>
        <v-row no-gutters class="chart--row"
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Hands_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Load_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Durability_" :decorate="false" /></b></v-col
          ><v-col class="chart--head" cols="2"
            ><b><display-tooltip-text string="_Wear_" :decorate="false" /></b
          ></v-col>
        </v-row>
        <v-row align="stretch" no-gutters class="chart--row">
          <v-col class="chart--cols justify-center align-center" cols="2"><display-tooltip-text :string="weapon.HandString" /></v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ weapon.Load }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ weapon.Durability }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ weapon.Wear }}</v-col>
        </v-row>
      </div>
      <div class="card--format" v-if="weapon.HasReqs">
        <display-tooltip-text :string="weapon.ReqsHeader" />
      </div>
      <div><display-tooltip-text :string="weapon.SpecialHeader" /></div>
      <div v-for="(ability, index) in weapon.Abilities" :key="index" class="ability-box" style="padding-bottom: 0.25em">
        <ability-widget :ability="ability" />
      </div>
      <div v-if="weapon.HasChart || weapon.HasTable" class="ability-box">
        <chart-table v-if="weapon.Chart" :chart="weapon.Chart" />
        <basic-table v-if="weapon.HasTable" :chart="weapon.Table" />
      </div>
    </div>
    <div class="desc--box" v-if="weapon.Desc.length > 0" style="font-style: italic">{{ weapon.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { weapon, Weapon } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'weapon-card',
  props: {
    weapon: {
      type: Weapon,
      required: true,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
  computed: {
    isWeapon: function () {
      return this.weapon.hasOwnProperty('load_')
    },
  },
  components: { AbilityWidget, BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.weapon {
  background-color: rgb(226, 119, 43);
}
.Weapon {
  background-color: #685e5e;
}
</style>
