<template>
  <div inline>
    <div
      class="weapon ability--head"
      style="width: 100%">
      <img
        :src="weapon.Icon"
        style="height: 1.5em; padding-right: 0.25em; margin-bottom: -0.25em" />
      <display-tooltip-text :string="weapon.Header" />
    </div>
    <div style="margin-top: 0.5em">
      <span
        v-for="(keyword, index) in weapon.Keywords"
        :key="index"
        class="keyword--box"
        style="margin-left: 0.5em">
        <b>
          <display-tooltip-text
            :string="keyword.replace('/', '_/_')"
            :decorate="false" />
        </b>
      </span>
    </div>
    <div class="card--content">
      <span style="font-style: italic">{{ weapon.Desc }}</span>
      <br />
      <display-tooltip-text :string="weapon.Statistics" />
      <br />
      <display-tooltip-text :string="weapon.HandsHeader" />
      <div
        class="card--format"
        v-if="weapon.HasReqs">
        <display-tooltip-text :string="weapon.ReqsHeader" />
      </div>
      <div
        class="card--format"
        v-if="weapon.HasSpecial">
        <display-tooltip-text :string="weapon.SpecialHeader" />
      </div>
      <div
        v-for="(ability, index) in weapon.Abilities"
        :key="index"
        class="ability-box"
        style="padding-bottom: 0.25em; padding-left: 3em">
        <ability-widget :ability="ability" />
      </div>
      <div
        v-if="weapon.HasChart || weapon.HasTable"
        class="ability-box">
        <chart-table
          v-if="weapon.Chart"
          :chart="weapon.Chart" />
        <basic-table
          v-if="weapon.HasTable"
          :chart="weapon.Table" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { weapon, Weapon } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'weapon-widget',
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
.ability--head {
  border-top-left-radius: 1em;
  padding-left: 0.5em;
  font-size: 1.05em;
  font-weight: bold;
  align-items: center;
}
.Weapon {
  background-color: #685e5e;
}
</style>
