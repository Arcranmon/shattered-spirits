<template>
  <div
    class="card-shape"
    :style="{ 'background-color': getBestColor }">
    <div class="body">
      <div
        class="card-header"
        :style="{ 'border-color': getBestColor }"
        style="position: relative">
        <div
          v-if="ability.HasOrigin"
          style="position: absolute; bottom: 0; left: 5px; font-style: italic; font-size: 5pt">
          {{ ability.From }} {{ ability.FromPlace }}
        </div>
        <h4>{{ ability.Name }}</h4>
        <div style="text-align: center">
          <b>{{ ability.NamelessHeader }}</b>
        </div>
      </div>
      <div style="padding-bottom: 2px">
        <v-row no-gutters>
          <v-col
            v-if="ability.HasCost"
            class="left-col"
            :cols="6"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center"
            ><div class="box-header">Cost</div>
            <display-tooltip-text
              :string="ability.Cost"
              :style="{ 'font-size': getFittingText(ability.Cost) }"
              :decorate="false"
          /></v-col>
          <v-col
            v-if="ability.Type == 'Attack' || ability.Type == 'Maneuver'"
            :cols="6"
            class="right-col"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center"
            ><div class="box-header">Range and Target</div>
            <display-tooltip-text
              id="rangeTargetSummary"
              :string="ability.RangeTargetSummary"
              :style="{ 'font-size': getFittingText(ability.RangeTargetSummary) }"
              :decorate="false"
          /></v-col>
          <v-col
            v-if="ability.HasKeywords"
            v-bind:class="ability.Type == 'Attack' ? 'left-col' : ''"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center; border-bottom: medium solid"
            ><div class="box-header">Keywords</div>
            <display-tooltip-text
              :string="ability.KeywordsList"
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.Type == 'Attack'"
            :cols="6"
            class="right-col"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center"
            ><div class="box-header">Material and Damage</div>
            <display-tooltip-text
              :string="ability.MaterialDamageSummary"
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.HasTrigger"
            class="right-col"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center"
            cols="12"
            ><div class="box-header">Trigger</div>
            <display-tooltip-text
              :string="ability.Trigger"
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.HasMissile"
            class="right-col"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center"
            cols="12"
            ><div class="box-header">Missile</div>
            <display-tooltip-text
              :string="ability.Missile"
              :decorate="false"
          /></v-col>
        </v-row>
      </div>
      <div style="padding-left: 1em; padding-right: 1em">
        <div v-if="isAbilityPackage">
          <display-tooltip-text
            :string="ability.Desc"
            :decorate="false" />
        </div>
        <div v-if="ability.HasPrereqs">
          <display-tooltip-text
            :string="ability.PrereqsHeader"
            :decorate="false" />
        </div>
        <div v-if="ability.HasFrequency">
          <display-tooltip-text :string="ability.FrequencyHeader" />
        </div>
        <div v-if="ability.ShouldDisplayMaterialDamageHeader">
          <display-tooltip-text :string="ability.MaterialDamageTypeHeader" />
        </div>
        <div v-if="ability.HasSource">
          <display-tooltip-text :string="ability.SourceHeader" />
        </div>
        <div v-if="ability.HasHardness">
          <display-tooltip-text :string="ability.HardnessHeader" />
        </div>
        <div v-if="ability.HasEffect">
          <display-tooltip-text
            :string="ability.Effect"
            :decorate="false" />
        </div>
        <div v-if="ability.HasSpecial">
          <display-tooltip-text
            :string="ability.Special"
            :decorate="false" />
        </div>
        <div v-if="ability.HasEnter">
          <display-tooltip-text :string="ability.EnterHeader" />
        </div>
        <div v-if="ability.HasCollide">
          <display-tooltip-text :string="ability.CollideHeader" />
        </div>
        <div v-if="ability.HasEngaged">
          <display-tooltip-text :string="ability.EngagedHeader" />
        </div>
        <div v-if="ability.HasRepeat">
          <display-tooltip-text :string="ability.RepeatHeader" />
        </div>
        <div v-if="ability.HasEor">
          <display-tooltip-text :string="ability.EorHeader" />
        </div>
        <div v-if="ability.HasNegate">
          <display-tooltip-text :string="ability.NegateHeader" />
        </div>
        <div v-if="ability.HasReacts">
          <display-tooltip-text :string="ability.ReactsHeader" />
        </div>
        <div v-if="ability.HasRemove">
          <display-tooltip-text :string="ability.RemoveHeader" />
        </div>
        <div v-if="ability.HasRecovery">
          <display-tooltip-text :string="ability.RecoveryHeader" />
        </div>
        <div v-if="ability.HasNegate">
          <display-tooltip-text :string="ability.NegateHeader" />
        </div>
        <div v-if="ability.HasDestroy">
          <display-tooltip-text :string="ability.DestroyHeader" />
        </div>
        <div v-if="ability.HasInteractions">
          <display-tooltip-text :string="ability.InteractionsHeader" />
        </div>
      </div>
      <div
        v-if="ability.HasEnhancements || ability.HasImbues"
        style="border-top: medium solid; padding-left: 1em; padding-right: 1em"
        :style="{ 'border-color': getBestColor }">
        <div v-if="ability.HasEnhancements">
          <display-tooltip-text
            :string="ability.EnhancementsHeader"
            class="enhancement"
            :decorate="false" />
        </div>
        <div v-if="ability.HasImbues">
          <display-tooltip-text
            :string="ability.ImbuesHeader"
            class="enhancement"
            :decorate="false" />
        </div>
      </div>
      <div
        style="margin-left: 1em; margin-right: 1em; margin-top: 0.5em"
        v-if="ability.HasChart">
        <chart-table
          :chart="ability.Chart"
          style="font-size: smaller" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { AbilityPackage, Armor, Base, Equipment, Weapon, Stance, Status, Terrain } from '@/class'
import { store } from '@/store'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'printable-base-widget',
  props: {
    ability: {
      type: Base,
      required: true,
    },
    format_text: {
      type: Boolean,
      default: false,
    },
    standalone: {
      type: Boolean,
      default: false,
    },
    showDesc: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      colorMap: {
        Archetype: 'rgb(106, 168, 76)',
        Armor: '#81674c',
        Attack: 'rgb(230, 95, 95)',
        Camp: '#d2d50e',
        Career: 'rgb(106, 168, 76)',
        Crafting: '#407647',
        Downtime: '#0ebed5',
        Equipment: '#a776a0',
        Gambit: '#a776a0',
        Maneuver: '#7ac3ff',
        Passive: '#68696a',
        Reaction: '#bbcc6f',
        Skill: '#d99a07',
        Status: 'rgb(90, 90, 143)',
        Trait: 'rgb(106, 168, 76)',
        Travel: '#5cff69',
        Weapon: 'rgb(226, 119, 43)',
        Earth: '#e0c068',
        Flame: '#f08030',
        Metal: '#b8b8d0',
        Water: '#6890f0',
        Wind: '#a890f0',
        Wood: '#6a5003',
      },
    }
  },
  methods: {
    getFittingText: function (textString) {
      var boxWidth = 115 * 1.8
      var fontSize = Math.min(Math.floor(boxWidth / textString.length), 7)
      return fontSize + 'pt'
    },
  },
  computed: {
    useTextFormatting: function () {
      if (this.format_text) return 'card--text-format'
    },
    isAbilityPackage() {
      return this.ability instanceof AbilityPackage
    },
    isStance() {
      return this.ability instanceof Stance
    },
    getBestColor: function () {
      var overrideColors = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood', 'Archetype']
      if (overrideColors.includes(this.ability.Category)) {
        return this.colorMap[this.ability.Category]
      }
      if (this.ability instanceof Terrain) {
        return this.colorMap[this.ability.ColorHeader]
      }
      if (this.ability instanceof Weapon) {
        return this.colorMap['Weapon']
      }
      if (this.ability instanceof Armor) {
        return this.colorMap['Armor']
      }
      if (this.ability instanceof Equipment) {
        return this.colorMap['Equipment']
      }
      if (this.ability instanceof Stance) {
        return this.colorMap['Stance']
      }
      if (this.ability instanceof Status) {
        return this.colorMap['Status']
      }
      if (
        this.ability.Category == 'Crafting' ||
        this.ability.Category == 'Camp' ||
        this.ability.Category == 'Travel' ||
        this.ability.Category == 'Skill' ||
        this.ability.Category == 'Downtime'
      )
        return this.colorMap[this.ability.Category]
      return this.colorMap[this.ability.Type]
    },
  },
  components: { AbilityWidget, BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.card-shape {
  width: 2.5in !important;
  max-width: 2.5in !important;
  height: 3.5in !important;
  max-height: 3.5in !important;
  overflow: hidden; /* This stops margins from collapsing */
  font-size: 7pt;
}
.box-header {
  text-align: center;
  font-size: smaller;
}
.card-header {
  border-bottom: thick solid;
}
.left-col {
  border-bottom: medium solid;
  border-right: medium solid;
}
.right-col {
  border-bottom: medium solid;
}
.body {
  background-color: white;
  height: 3.4in !important;
  width: 2.4in !important;
  margin: 0.05in;
  border-radius: 1em;
}
::v-deep .enhancement ul {
  padding-left: 1.5em !important;
  list-style-type: '⇾ ';
}
</style>
