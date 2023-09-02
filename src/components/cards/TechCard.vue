<template>
  <div class="tech--wrapper" inline>
    <div v-bind:class="tech.Type">
      <div class="tech--header">
        <img class="image--header-left" :src="tech.Image" />
        <img class="image--header-right" :src="tech.Image" />
        <h4 style="display: inline; font-style: normal;">{{ tech.Name }}</h4>
      </div>
      <div class="tech--keywords" v-bind:class="tech.Type">
        <span v-if="(tech.Desc.length > 0)" style="font-style: italic;">{{ tech.Desc }}<br /></span>
        <span v-if="(tech.Attack)" style="font-style: bold;"> </span>
        <span style="font-style: bold;"> <display-tooltip-text :string="tech.SpeedHeader" /><br /> </span>
        <b><display-tooltip-text v-if="tech.HasKeywords" :string="tech.KeywordsHeader" :decorate="false" /></b>
      </div>
    </div>
    <div class="tech--content">
      <div v-if="tech.HasCost">
        <display-tooltip-text class="tech--format" :string="tech.CostHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasReqs">
        <display-tooltip-text :string="tech.ReqsHeader" />
      </div>
      <div v-if="tech.HasArea"><display-tooltip-text :string="tech.AreaHeader" /></div>
      <div v-if="tech.HasRange">
        <display-tooltip-text :string="tech.RangeHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasWeapon">
        <display-tooltip-text :string="tech.WeaponHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasTrigger">
        <display-tooltip-text :string="tech.TriggerHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasTarget">
        <display-tooltip-text :string="tech.TargetHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasMove">
        <display-tooltip-text :string="tech.MoveHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasEffect">
        <display-tooltip-text :string="tech.EffectHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasSpecial">
        <display-tooltip-text :string="tech.SpecialHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasImbue">
        <display-tooltip-text :string="tech.ImbueHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasBoost">
        <display-tooltip-text :string="tech.BoostHeader" />
      </div>
      <div class="tech--format" v-if="tech.HasLinked">
        <display-tooltip-text :string="tech.LinkedHeader" />
      </div>
      <div class="expand--collapse-box-outlined" v-if="(tech.HasChart)">
        <v-expansion-panels class="condensed" flat tile :mandatory="this.character_creation ? true : false">
          <v-expansion-panel style="background-color: inherit;"
            ><v-expansion-panel-header class="expand--header-chart">Attack Profile</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-chart"
              ><display-tooltip-text v-if="tech.HasDamageType" :string="tech.DamageTypeHeader" /><chart-table :chart="tech.Chart"
            /></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Technique } from '@/class'
import { store } from '@/store'
import ChartTable from '@/components/ChartTable.vue'
import ManeuverCard from './ManeuverCard.vue'

export default Vue.extend({
  name: 'technique-card',
  props: {
    tech: {
      type: Technique,
      required: true,
    },
    category: {
      type: String,
      required: false,
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
  components: { ChartTable, ManeuverCard },
})
</script>

<style scoped lang="scss">
.tech--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--s;
}
.tech--header {
  padding-top: $space--xs;
  text-align: center;
  color: black;
  overflow: hidden;
}
.image--header-left {
  height: 2em;
  float: left;
  padding-left: 0.5em;
}
.image--header-right {
  height: 2em;
  float: right;
  transform: scaleX(-1);
  padding-left: 0.5em;
}
.tech--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  padding-bottom: $space--xs;
  border-bottom: 5px solid black;
}
.tech--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
  padding-bottom: 0;
}
.tech--reaction-content {
  font-size: $font-size--s;
  color: black;
  padding-left: $space--xs;
  padding-right: $space--xs;
}
.tech--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
.Strike {
  background: $color--strike !important;
}
.General {
  background: $color--general;
}
.Move {
  background: $color--move;
}
.Defend {
  background: $color--defend;
}
.Support {
  background: $color--support;
}
</style>
