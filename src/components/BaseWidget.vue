<template>
  <div inline>
    <div
      class="ability--head"
      v-bind:class="getBestColor"
      style="width: 100%">
      <img
        v-if="ability.HasIcon"
        :src="ability.Icon"
        style="height: 1.5em" />
      <display-tooltip-text :string="ability.Header" />

      <span
        v-if="ability.Origin"
        style="margin-left: auto; order: 2; padding-right: 1em; font-weight: 1">
        <i>
          <display-tooltip-text :string="'From: _' + ability.Origin.Name + '_'" />
        </i>
      </span>
    </div>
    <div
      class="card--keywords"
      style="padding-left: 0.5em; padding-top: 0.5em; font-size: smaller"
      v-if="ability.HasKeywords">
      <b>
        <span
          v-for="(keyword, index) in ability.Keywords"
          :key="index"
          class="keyword--box">
          <display-tooltip-text
            :string="keyword"
            :decorate="false" />
        </span>
      </b>
    </div>
    <div class="card--content card--format">
      <div
        v-if="ability.Desc.length > 0"
        style="font-style: italic">
        {{ ability.Desc }}<br />
      </div>
      <div v-if="ability.HasSummary">
        <display-tooltip-text :string="ability.Summary" />
      </div>
      <div
        v-if="isStance"
        class="chart--wrapper"
        inline>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row">
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Speed_"
                :decorate="false" />
            </b>
          </v-col>
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Movement_"
                :decorate="false" />
            </b>
          </v-col>
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Momentum_"
                :decorate="false" />
            </b>
          </v-col>
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Guard_"
                :decorate="false" />
            </b>
          </v-col>
        </v-row>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row">
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Speed }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Movement }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Momentum }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Guard }}</v-col
          >
        </v-row>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row">
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Block_"
                :decorate="false" />
            </b>
          </v-col>
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Grit_"
                :decorate="false" />
            </b>
          </v-col>
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Focus_"
                :decorate="false" />
            </b>
          </v-col>
          <v-col
            class="chart--head"
            :cols="3">
            <b>
              <display-tooltip-text
                string="_Reflex_"
                :decorate="false" />
            </b>
          </v-col>
        </v-row>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row">
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Block }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Grit }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Focus }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            :cols="3"
            >{{ ability.Reflex }}</v-col
          >
        </v-row>
      </div>
      <div v-if="ability.HasPrereqs">
        <display-tooltip-text :string="ability.PrereqsHeader" />
      </div>
      <div v-if="ability.HasCost">
        <display-tooltip-text :string="ability.CostHeader" />
      </div>
      <div v-if="ability.HasRangeOrTarget">
        <display-tooltip-text :string="ability.RangeOrTargetHeader" />
      </div>
      <div v-if="ability.HasTrigger">
        <display-tooltip-text :string="ability.TriggerHeader" />
      </div>
      <div v-if="ability.HasMissile">
        <display-tooltip-text :string="ability.MissileHeader" />
      </div>
      <div v-if="ability.HasEffect">
        <display-tooltip-text :string="ability.EffectHeader" />
      </div>
      <div v-if="ability.HasSpecial">
        <display-tooltip-text :string="ability.SpecialHeader" />
      </div>
      <div v-if="ability.HasRepeat">
        <display-tooltip-text :string="ability.RepeatHeader" />
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
      <div
        class="card--format"
        v-if="ability.HasNegate">
        <display-tooltip-text :string="ability.NegateHeader" />
      </div>
      <div
        class="card--format"
        v-if="ability.HasDestroy">
        <display-tooltip-text :string="ability.DestroyHeader" />
      </div>
      <div
        class="card--format"
        v-if="ability.HasInteractions">
        <display-tooltip-text :string="ability.InteractionsHeader" />
      </div>
      <div v-if="ability.HasEnhancements">
        <display-tooltip-text :string="ability.EnhancementsHeader" />
      </div>
      <div v-if="ability.HasImbues">
        <display-tooltip-text :string="ability.ImbuesHeader" />
      </div>
      <div
        v-if="isAbilityPackage"
        v-bind:class="useTextFormatting"
        class="ability-box"
        style="padding-bottom: 0.25em; padding-left: 3em">
        <base-widget
          v-for="(ability, index) in ability.Abilities"
          :ability="ability" />
      </div>
      <div
        class="expand--collapse-box-outlined"
        v-if="ability.HasChart">
        <v-expansion-panels
          v-if="!showChart"
          class="condensed"
          flat
          tile
          style="width: 100%">
          <v-expansion-panel style="background-color: inherit">
            <v-expansion-panel-header class="expand--header-chart">Chart</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-chart">
              <chart-table :chart="ability.Chart" />
            </v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
        <chart-table
          v-else
          :chart="ability.Chart" />
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
  name: 'base-widget',
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
    showChart: {
      type: Boolean,
      default: false,
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
        return this.ability.Category
      }
      if (this.ability instanceof Terrain) {
        return this.ability.ColorHeader
      }
      if (this.ability instanceof Weapon) {
        return 'Weapon'
      }
      if (this.ability instanceof Armor) {
        return 'Armor'
      }
      if (this.ability instanceof Equipment) {
        return 'Equipment'
      }
      if (this.ability instanceof Stance) {
        return 'Stance'
      }
      if (this.ability instanceof Status) {
        return 'Status'
      }
      if (this.ability.Type.length > 0) return this.ability.Type
      return this.ability.Category
    },
  },
  components: { AbilityWidget, BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.Archetype {
  background-color: rgb(106, 168, 76);
}
.Trait {
  background-color: rgb(106, 168, 76);
}
.Status {
  background-color: $color--general;
}
.Equipment {
  background-color: #a776a0;
}
.Talent {
  background-color: rgb(106, 168, 76);
}
.Weapon {
  background-color: rgb(226, 119, 43);
}
.Skill {
  background-color: #d99a07;
}
.Power {
  background-color: #d2d50e;
}
.Passive {
  background-color: #68696a;
}
.Maneuver {
  background-color: #7ac3ff;
}
.Reaction {
  background-color: #bbcc6f;
}
.Gambit {
  background-color: #a776a0;
}
.Attack {
  background-color: rgb(230, 95, 95);
}
.Stance {
  background-color: thistle;
}
</style>
