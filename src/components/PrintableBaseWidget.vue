<template>
  <div
    v-if="ability"
    class="card-shape"
    :style="{ 'background-color': getBestColor }">
    <div
      v-if="back"
      class="body back-body">
      <div
        class="back-outline back-body"
        :style="{ 'border-color': getBestColor, color: getBestColor }">
        <inline-svg
          :src="ability.Icon"
          style="height: 1.5in; width: auto" />
      </div>
    </div>
    <div
      v-else
      class="body">
      <div
        class="card-header"
        :style="{ 'outline-color': getBestColor, 'border-color': getBestColor }"
        style="position: relative">
        <h4>{{ ability.Name }}</h4>
        <div style="text-align: center">
          <b>{{ ability.NamelessHeader }}</b>
        </div>
        <div
          v-if="ability.HasOrigin"
          style="font-style: italic; font-size: 5pt; text-align: center; margin-top: -2pt">
          {{ ability.From }} {{ ability.FromPlace }}
        </div>
      </div>
      <div>
        <v-row no-gutters>
          <v-col
            v-if="ability.HasCost"
            class="left-col"
            :style="{ 'border-bottom': ability.Type == 'Attack' || ability.Type == 'Maneuver' ? 'thin solid' : '', 'border-color': getBestColor }"
            :cols="ability.Type == 'Attack' || ability.Type == 'Maneuver' ? 6 : ''"
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
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.Type == 'Attack'"
            :cols="6"
            class="left-col"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center; border-bottom: none"
            ><div class="box-header">Material and Damage</div>
            <display-tooltip-text
              :string="ability.MaterialDamageSummary"
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.IsEquipment"
            :style="{ 'border-bottom': ability.HasKeywords || ability.HasBlock || ability.HasGuard ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center"
            cols="3"
            ><div class="box-header">Size</div>
            <display-tooltip-text
              :string="ability.Size"
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.IsEquipment"
            :style="{ 'border-bottom': ability.HasKeywords || ability.HasBlock || ability.HasGuard ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center; border-left: thin solid"
            cols="3"
            ><div class="box-header">Durability</div>
            {{ ability.Durability }}</v-col
          ><v-col
            v-if="ability.IsEquipment"
            :style="{ 'border-bottom': ability.HasKeywords || ability.HasBlock || ability.HasGuard ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center; border-left: thin solid"
            cols="3"
            ><div class="box-header">Hands</div>
            {{ ability.Hands }}</v-col
          ><v-col
            v-if="ability.IsEquipment"
            :style="{ 'border-bottom': ability.HasKeywords || ability.HasBlock || ability.HasGuard ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center; border-left: thin solid"
            cols="3"
            ><div class="box-header">Rarity</div>
            <display-tooltip-text
              :string="ability.Rarity"
              :decorate="false" /></v-col
          ><v-col
            v-if="ability.HasBlock || ability.HasGuard"
            :style="{ 'border-bottom': ability.HasKeywords ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center"
            cols="6"
            ><div class="box-header">Block</div>
            {{ ability.Block }}</v-col
          ><v-col
            v-if="ability.HasBlock || ability.HasGuard"
            :style="{ 'border-bottom': ability.HasKeywords ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center; border-left: thin solid"
            cols="6"
            ><div class="box-header">Guard</div>
            {{ ability.Guard }}</v-col
          ><v-col
            v-if="ability.ShowClockOrSegment"
            :style="{ 'border-bottom': ability.HasKeywords ? 'thin solid' : '', 'border-color': getBestColor }"
            style="text-align: center"
            cols="6"
            ><div class="box-header">Health Segments</div>

            {{ dashOrNumber(ability.Segments) }}</v-col
          ><v-col
            v-if="ability.ShowClockOrSegment"
            :style="{ 'border-bottom': ability.HasKeywords ? 'thin solid' : '', 'border-color': getBestColor }"
            style="border-left: thin solid; text-align: center"
            cols="6"
            ><div class="box-header">Clock Size</div>
            {{ dashOrNumber(ability.Clock) }}
          </v-col>
          <v-col
            v-if="ability.HasFrequency"
            :cols="6"
            style="text-align: center"
            :style="{ 'border-color': getBestColor }">
            <div class="box-header">Frequency</div>
            <display-tooltip-text :string="ability.Frequency" />
          </v-col>
          <v-col
            v-if="ability.HasSource"
            style="text-align: center"
            :style="{ 'border-color': getBestColor }">
            <div class="box-header">Source</div>
            <display-tooltip-text
              :string="ability.Source"
              :decorate="false" />
          </v-col>
          <v-col
            v-if="ability.HasHardness"
            style="text-align: center"
            :style="{ 'border-color': getBestColor }">
            <div class="box-header">Hardness</div>
            <display-tooltip-text :string="ability.Hardness" />
          </v-col>
          <v-col
            v-if="ability.HasKeywords"
            v-bind:class="ability.Type == 'Attack' || ability.HasFrequency || ability.HasTrigger ? 'right-col' : ''"
            :style="{ 'border-color': getBestColor }"
            style="text-align: center; border-bottom: none">
            <div class="box-header">Keywords</div>
            <display-tooltip-text
              :string="ability.KeywordsList"
              :decorate="false" />
          </v-col>
        </v-row>
      </div>
      <div
        v-if="ability.HasTrigger"
        class="card-cell"
        :style="{ 'border-color': getBestColor }"
        style="text-align: center; border-top: thin solid"
        cols="12">
        <div class="box-header">Trigger</div>
        <display-tooltip-text
          :string="ability.Trigger"
          :decorate="false" />
      </div>
      <div
        v-if="ability.HasPrereqs"
        class="card-cell"
        :style="{ 'border-color': getBestColor }"
        style="text-align: center; border-top: thin solid"
        cols="12">
        <div class="box-header">Prerequisite</div>
        <display-tooltip-text
          :string="ability.Prereqs"
          :decorate="false" />
      </div>
      <div
        v-if="isAbilityPackage && ability.HasDesc"
        class="card-cell"
        style="padding-top: 0.25em"
        :style="{ 'border-color': getBestColor }">
        <display-tooltip-text
          :string="ability.Desc"
          :decorate="false"
          style="font-style: italic" />
      </div>
      <div
        v-if="ability.HasEffect"
        class="card-cell effect"
        :style="{ 'border-top': ability.HasDesc && isAbilityPackage ? 'none' : 'thin solid', 'border-color': getBestColor }">
        <div class="box-header">Effect</div>
        <display-tooltip-text
          :string="ability.Effect"
          :decorate="false" />
      </div>
      <div
        v-if="ability.HasSpecial"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Special</div>
        <display-tooltip-text
          :string="ability.Special"
          :decorate="false" />
      </div>
      <div
        v-if="ability.HasEnter && ability.Collide != ability.Enter"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Enter</div>
        <display-tooltip-text :string="ability.Enter" />
      </div>
      <div
        v-if="ability.HasCollide"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div
          class="box-header"
          v-if="ability.Collide == ability.Enter">
          Collide/Enter
        </div>
        <div
          class="box-header"
          v-else>
          Collide
        </div>
        <display-tooltip-text :string="ability.Collide" />
      </div>
      <div
        v-if="ability.HasEngaged"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Engaged</div>
        <display-tooltip-text :string="ability.Engaged" />
      </div>
      <div
        v-if="ability.HasEor"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">End of Round</div>
        <display-tooltip-text :string="ability.Eor" />
      </div>
      <div
        v-if="ability.HasReacts"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Reacts</div>
        <display-tooltip-text
          :string="ability.ReactsList"
          class="enhancement"
          :decorate="false" />
      </div>
      <div v-if="ability.HasNegate">
        <display-tooltip-text :string="ability.NegateHeader" />
      </div>
      <div
        v-if="ability.HasDestroy"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Destroy</div>
        <display-tooltip-text :string="ability.Destroy" />
      </div>
      <div
        v-if="ability.HasInteractions"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Interactions</div>
        <display-tooltip-text :string="ability.InteractionsList" />
      </div>
      <div
        v-if="isAbilityPackage"
        style="margin-left: 1em; margin-right: 1em; margin-top: 0.5em">
        <show-ability-table
          title="Combat Abilities"
          :abilities="combatAbilities"
          :onCard="true" />
        <show-ability-table
          title="Narrative Abilities"
          :abilities="narrativeAbilities"
          :onCard="true" />
      </div>
      <div
        v-if="ability.HasEnhancements || ability.HasImbues"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div v-if="ability.HasEnhancements">
          <div
            v-for="costEffectPair in ability.EnhancementsByHeader"
            v-bind:key="costEffectPair[0]">
            <div class="box-header">
              <display-tooltip-text
                :string="costEffectPair[0]"
                :decorate="false" />
            </div>
            <display-tooltip-text
              v-for="effect in costEffectPair[1]"
              v-bind:key="effect"
              :string="effect"
              class="enhancement"
              :decorate="false" />
          </div>
        </div>
        <div v-if="ability.HasImbues">
          <div
            v-for="costEffectPair in ability.ImbuesByHeader"
            v-bind:key="costEffectPair[0]">
            <div class="box-header">
              <display-tooltip-text
                :string="costEffectPair[0]"
                :decorate="false" />
            </div>
            <display-tooltip-text
              v-for="effect in costEffectPair[1]"
              v-bind:key="effect"
              :string="effect"
              class="enhancement"
              :decorate="false" />
          </div>
        </div>
      </div>
      <div
        v-if="ability.HasRepeat"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Repeat</div>
        <display-tooltip-text
          :string="ability.Repeat"
          :decorate="false" />
      </div>
      <div
        v-if="ability.HasRecovery"
        class="card-cell"
        :style="{ 'border-color': getBestColor }">
        <div class="box-header">Recovery</div>
        <display-tooltip-text
          :string="ability.Recovery"
          :decorate="false" />
      </div>
      <div
        class="card-cell"
        :style="{ 'border-color': getBestColor }"
        v-if="ability.HasRemove">
        <div class="box-header">Remove</div>
        <display-tooltip-text
          :string="ability.Remove"
          :decorate="false" />
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
import InlineSvg from 'vue-inline-svg'
import { AbilityPackage, Armor, Base, Equipment, Weapon, Stance, Status, Terrain } from '@/class'
import { store } from '@/store'
import AbilityWidget from '@/components/AbilityWidget.vue'
import ShowAbilityTable from '@/pages/print/ShowAbilityTable.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'printable-base-widget',
  props: {
    ability: {
      type: Base,
      required: true,
    },
    back: {
      type: Boolean,
      required: false,
      default: false,
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
        Wound: 'rgb(146, 5, 5)',
        Trait: 'rgb(106, 168, 76)',
        Travel: '#5cff69',
        Weapon: 'rgb(226, 119, 43)',
        Earth: '#e0c068',
        Flame: '#f08030',
        Metal: '#b8b8d0',
        Water: '#6890f0',
        Wind: '#a890f0',
        Wood: '#6a5003',
        Mutable: '#68696a',
        Elementless: '#68696a',
        Arena: '#68696a',
      },
    }
  },
  methods: {
    getFittingText: function (textString) {
      var boxWidth = 115 * 1.8
      var fontSize = Math.min(Math.floor(boxWidth / textString.length), 7)
      return fontSize + 'pt'
    },
    dashOrNumber: function (val) {
      if (val > 0) return val
      return '—'
    },
  },
  computed: {
    isAbilityPackage() {
      return this.ability instanceof AbilityPackage
    },
    combatAbilities() {
      if (this.isAbilityPackage)
        return this.ability.Abilities.filter(
          (x) => x.Type == 'Maneuver' || x.Type == 'Attack' || x.Type == 'Reaction' || x.Type == 'Gambit' || x.Type == 'Passive',
        )
      return []
    },
    narrativeAbilities() {
      if (this.isAbilityPackage)
        return this.ability.Abilities.filter((x) => x.Category == 'Camp' || x.Category == 'Travel' || x.Category == 'Downtime' || x.Category == 'Skill')
      return []
    },
    middleBorder() {
      if (this.ability.HasEnhancements || this.ability.HasImbues || this.ability.HasRemove || this.ability.HasRecovery || this.ability.HasRepeat)
        return 'thin solid'
      return 'none'
    },
    isStance() {
      return this.ability instanceof Stance
    },
    getBestColor: function () {
      var overrideColors = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood', 'Archetype']
      if (!this.ability) {
        return 'black'
      }
      if (this.ability instanceof Terrain) {
        return this.colorMap[this.ability.Element]
      }
      if (overrideColors.includes(this.ability.Category)) {
        return this.colorMap[this.ability.Category]
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
        if (this.ability.Type.includes('Wound') || this.ability.Type.includes('Condition')) return this.colorMap['Wound']
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
  components: { AbilityWidget, BasicTable, ChartTable, ShowAbilityTable, InlineSvg },
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
  font-size: 5pt;
}
.back-outline {
  border: double 8px;
  border-radius: 1em;
  height: 3.2in !important;
  width: 2.2in !important;
}
.card-header {
  border-bottom: medium solid;
}
.left-col {
}
.right-col {
  border-left: thin solid;
  border-bottom: thin solid;
}
.body {
  background-color: white;
  height: 3.4in !important;
  width: 2.4in !important;
  margin: 0.05in;
  border-radius: 1em;
}
.back-body {
  display: flex;
  justify-content: center;
  align-items: center;
}
::v-deep .effect ul {
  padding-left: 1.5em !important;
}
::v-deep .enhancement ul {
  padding-left: 1.5em !important;
  list-style-type: '⇾ ';
}
.table-cell {
  border: $border--black-thin;
  padding: 0em;
  padding-left: 0.5em;
  padding-right: 0.5em;
  text-align: center;
}
.section-header {
  @extend .table-cell;
  font-weight: bold;
  justify-content: center;
  font-size: larger;
  color: white;
  background-color: darkslategray;
  print-color-adjust: exact;
}
.column-header {
  @extend .table-cell;
  font-weight: bold;
  justify-content: center;
  background-color: darkgrey;
  print-color-adjust: exact;
}
.even-table-cell {
  background-color: lightgrey;
  print-color-adjust: exact;
}
.card-cell {
  border-top: thin solid;
  padding-left: 0.5em;
  padding-right: 0.5em;
}
</style>
