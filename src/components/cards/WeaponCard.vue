<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top Attack">
      <div class="card--header">
        <img v-if="isWeapon" class="image--header-left" :src="attack.Icon" />
        <img v-if="isWeapon" class="image--header-right" :src="attack.Icon" />
        <h4 style="display: inline; font-style: normal">{{ attack.Name }}</h4>
        <div class="card--keywords">
          <b>
            <div><display-tooltip-text :string="attack.ClassHeader" :decorate="false" /></div>
            <div v-if="attack.HasSpeedOrTier"><display-tooltip-text :string="attack.SpeedHeader" :decorate="false" /></div>
            <span v-for="(keyword, index) in attack.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content" v-bind:class="useTextFormatting">
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
          <v-col class="chart--cols justify-center align-center" cols="2">{{ attack.Hands }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ attack.Load }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ attack.Durability }}</v-col>
          <v-col class="chart--cols justify-center align-center" cols="2">{{ attack.Wear }}</v-col>
        </v-row>
      </div>
      <div class="card--format" v-if="attack.HasReqs">
        <display-tooltip-text :string="attack.ReqsHeader" />
      </div>
      <div><display-tooltip-text :string="attack.SpecialHeader" /></div>
      <div v-for="(ability, index) in attack.Abilities" :key="index" class="ability-box" style="padding-bottom: 0.25em">
        <ability-widget :ability="ability" />
      </div>
      <div v-if="attack.HasChart || attack.HasTable" class="ability-box">
        <chart-table v-if="attack.Chart" :chart="attack.Chart" />
        <basic-table v-if="attack.HasTable" :chart="attack.Table" />
      </div>
    </div>
    <div class="desc--box" v-if="attack.Desc.length > 0" style="font-style: italic">{{ attack.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Attack, Weapon } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'weapon-card',
  props: {
    attack: {
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
      return this.attack.hasOwnProperty('load_')
    },
  },
  components: { AbilityWidget, BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.Attack {
  background-color: rgb(226, 119, 43);
}
.Weapon {
  background-color: #685e5e;
}
</style>
