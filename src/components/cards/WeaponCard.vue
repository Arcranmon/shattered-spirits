<template>
  <div class="weapon--wrapper" inline>
    <div v-bind:class="weapon.Category">
      <div class="weapon--header">
        <h3 style="display: inline; font-style: normal;">{{ weapon.Name }}</h3>
      </div>
      <div class="weapon--keywords">
        <span v-if="(weapon.Desc.length > 0)">{{ weapon.Desc }}<br /></span>
        <b
          >{{ weapon.SpeedHeader }}{{ weapon.DamageTypeHeader }}<span v-if="weapon.HasDurability">{{ weapon.DurabilityHeader }}</span
          >{{ weapon.HardnessHeader }}<display-tooltip-text :string="weapon.RangeHeader" :decorate="false" /><span>&nbsp;</span>
          <display-tooltip-text :string="weapon.HandsPhrase" :decorate="false" /> {{ weapon.CategoryHeader }}{{ weapon.EncumbranceHeader }}
          <br />
          <display-tooltip-text :string="weapon.KeywordsHeader" :decorate="false"
        /></b>
      </div>
    </div>
    <div class="weapon--content">
      <display-tooltip-text v-if="weapon.HasSpecial" :string="weapon.SpecialHeader" />
      <div style="height: 0.5em;" />
      <chart-table :chart="weapon.Chart" />
    </div>
    <div class="weapon--content">
      <div class="expand--collapse-box-outlined" v-if="weapon.HasReaction">
        <v-expansion-panels class="condensed" flat tile :mandatory="this.character_creation ? true : false">
          <v-expansion-panel style="background-color: inherit;"
            ><v-expansion-panel-header class="expand--header-reaction">Reaction</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-reaction"
              ><display-tooltip-text string="While wielding this Weapon (and it is undamaged), gain the following Reaction:" />
              <div><maneuver-card :maneuver="$store.getters.getManeuver(weapon.Reaction)" /></div
            ></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Weapon } from '@/class'
import ChartTable from '@/components/ChartTable.vue'
import ManeuverCard from './ManeuverCard.vue'

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
  components: { ChartTable, ManeuverCard },
})
</script>

<style scoped lang="scss">
.weapon--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
}
.weapon--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
}
.weapon--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  border-bottom: 5px black solid;
  padding-bottom: $space--xs;
}
.weapon--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
.weapon--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
