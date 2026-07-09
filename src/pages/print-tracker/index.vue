<template>
  <div
    class="print-page tracker"
    style="font: Antic">
    <!--- Character side of sheet --->
    <!--- Tokens --->
    <div
      style="top: -0.5in; left: 0.25in"
      class="token-wrapper">
      <div class="token-circle">
        <img
          :src="require('@/assets/Momentum.svg')"
          style="height: 5em; margin-top: 3em" />
      </div>
      <div class="token-text"><b>Momentum</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite, gain 2 Guard per Momentum lost.
      </div>
    </div>
    <div
      style="top: -0.5in; left: 2in"
      class="token-wrapper">
      <div class="token-circle">
        <img
          :src="require('@/assets/Defend.svg')"
          style="height: 5em; margin-top: 3em" />
      </div>
      <div class="token-text"><b>Posture</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite, gain 2 Guard per Posture lost.
      </div>
    </div>
    <div
      style="top: -0.5in; left: 3.75in"
      class="token-wrapper">
      <div class="token-circle">
        <img
          :src="require('@/assets/Move.svg')"
          style="height: 5em; margin-top: 3em" />
      </div>
      <div class="token-text"><b>Speed</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite.
      </div>
    </div>

    <!--- Trackers --->
    <div
      style="top: 1.5in; left: 2in"
      class="token-wrapper">
      <div class="token-text">
        <h2>{{ $route.params.character.Name }}</h2>
      </div>
    </div>
    <div
      style="left: 1.65in"
      class="tracker-space">
      <v-row>
        <v-col :cols="6">
          <b>Max Guard</b><br />
          {{ $route.params.character.MaxGuard }}
        </v-col>
        <v-col :cols="6">
          <b>Max Stamina</b><br />
          {{ $route.params.character.MaxStamina }}
        </v-col>
      </v-row>
    </div>

    <!--- Character Table --->
    <div
      style="left: 0.75in; top: 5.3in"
      class="stat-table">
      <v-row
        align="stretch"
        no-gutters
        class="chart--row">
        <v-col
          class="chart--head"
          :cols="6">
          <b>
            <display-tooltip-text
              string="_Resistances_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="6">
          <b>
            <display-tooltip-text
              string="_Weaknesses_"
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
          :cols="6">
          {{ $route.params.character.WeaknessesString }}
        </v-col>
        <v-col
          class="chart--cols justify-center align-center"
          :cols="6">
          {{ $route.params.character.ResistancesString }}</v-col
        >
      </v-row>
      <v-row
        align="stretch"
        no-gutters
        class="chart--row">
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Size_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Speed_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Block_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Grit_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Focus_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
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
          :cols="2"
          >{{ $route.params.character.Size }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Speed - $route.params.character.CurrentStance.Speed }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Block - $route.params.character.CurrentStance.Block }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Grit - $route.params.character.CurrentStance.Grit }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Focus - $route.params.character.CurrentStance.Focus }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Reflex - $route.params.character.CurrentStance.Reflex }}</v-col
        >
      </v-row>
      <v-row
        class="stance-card-slot"
        align="stretch"
        no-gutters
        style="text-align: center">
        <h4>Current Stance</h4>
      </v-row>
    </div>

    <!--- Spirit side of sheet --->
    <!--- Tokens --->
    <div
      style="top: -0.5in; right: 3.75in"
      class="token-wrapper">
      <div class="token-circle">
        <img
          :src="require('@/assets/Momentum.svg')"
          style="height: 5em; margin-top: 3em" />
      </div>
      <div class="token-text"><b>Momentum</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite, gain 2 Guard per Momentum lost.
      </div>
    </div>
    <div
      style="top: -0.5in; right: 2in"
      class="token-wrapper">
      <div class="token-circle">
        <img
          :src="require('@/assets/Defend.svg')"
          style="height: 5em; margin-top: 3em" />
      </div>
      <div class="token-text"><b>Posture</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite, gain 2 Guard per Posture lost.
      </div>
    </div>
    <div
      style="top: -0.5in; right: 0.25in"
      class="token-wrapper">
      <div class="token-circle">
        <img
          :src="require('@/assets/Move.svg')"
          style="height: 5em; margin-top: 3em" />
      </div>
      <div class="token-text"><b>Speed</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite.
      </div>
    </div>

    <!--- Trackers --->
    <div
      style="top: 1.5in; right: 2in"
      class="token-wrapper">
      <div class="token-text">
        <h2>{{ $route.params.character.Spirit.Name }}</h2>
      </div>
    </div>
    <div
      style="right: 1.65in"
      class="tracker-space">
      <v-row>
        <v-col :cols="6">
          <b>Max Guard</b><br />
          {{ $route.params.character.Spirit.MaxGuard }}
        </v-col>
        <v-col :cols="6">
          <b>Max Stamina</b><br />
          {{ $route.params.character.Spirit.MaxStamina }}
        </v-col>
      </v-row>
    </div>

    <!--- Spirit Table --->
    <div
      style="right: 0.75in; top: 4.9in"
      class="stat-table">
      <v-row
        align="stretch"
        no-gutters
        class="chart--row">
        <v-col
          class="chart--head"
          :cols="6">
          <b>
            <display-tooltip-text
              string="_Phase_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="6">
          <b>
            <display-tooltip-text
              string="_Manifest_"
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
          :cols="6"
          >{{ $route.params.character.Spirit.Phase }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="6"
          >{{ $route.params.character.Spirit.ManifestHeader }}</v-col
        >
      </v-row>
      <v-row
        align="stretch"
        no-gutters
        class="chart--row">
        <v-col
          class="chart--head"
          :cols="6">
          <b>
            <display-tooltip-text
              string="_Resistances_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="6">
          <b>
            <display-tooltip-text
              string="_Weaknesses_"
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
          :cols="6">
          {{ $route.params.character.Spirit.WeaknessesString }}
        </v-col>
        <v-col
          class="chart--cols justify-center align-center"
          :cols="6">
          {{ $route.params.character.Spirit.ResistancesString }}</v-col
        >
      </v-row>
      <v-row
        align="stretch"
        no-gutters
        class="chart--row">
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Size_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Speed_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Block_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Grit_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
          <b>
            <display-tooltip-text
              string="_Focus_"
              :decorate="false" />
          </b>
        </v-col>
        <v-col
          class="chart--head"
          :cols="2">
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
          :cols="2"
          >{{ $route.params.character.Spirit.Size }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Spirit.Speed }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Spirit.Block }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Spirit.Grit }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Spirit.Focus }}</v-col
        >
        <v-col
          class="chart--cols justify-center align-center"
          :cols="2"
          >{{ $route.params.character.Spirit.Reflex }}</v-col
        >
      </v-row>
      <v-row
        class="stance-card-slot"
        align="stretch"
        no-gutters
        style="text-align: center">
        <h4>Current Stance</h4>
      </v-row>
    </div>

    <!--- Stance Card --->

    <!--- Essence --->
    <div
      style="top: 1.45in; right: 4.7in"
      class="token-wrapper">
      <div
        class="token-circle token-text"
        style="display: flex; align-items: center; flex-direction: column">
        <div><b>Essence</b></div>
        <br />
        <div
          class="token-text"
          style="font-style: italic">
          Not lost at Respite and shared between spirit and character.
        </div>
      </div>
    </div>

    <div class="status-box"><span style="width: 0.7in">Statuses & Notes</span></div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'print',
  components: {},
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
  methods: {
    finishRow(start, rowIndex) {
      var finishRow = []
      for (var i = start; i < (rowIndex + 1) * 9 - 1; i++) finishRow.push(i)
      return finishRow
    },
    statTable(maxValue) {
      var table = []
      var row = []

      console.log(maxValue)
      for (var i = 0; i <= maxValue; i++) {
        row.push(i)
        if (row.length == 9) {
          table.push(row)
          row = []
        }
      }
      table.push(row)
      return table
    },
  },
  computed: {
    charGuardTable() {
      return this.statTable(this.$route.params.character.MaxGuard)
    },
    charStaminaTable() {
      return this.statTable(this.$route.params.character.MaxStamina)
    },
    spiritGuardTable() {
      return this.statTable(this.$route.params.character.Spirit.MaxGuard)
    },
    spiritStaminaTable() {
      return this.statTable(this.$route.params.character.Spirit.MaxStamina)
    },
  },
})
</script>

<style scoped lang="scss">
.token-wrapper {
  width: 1.6in;
  position: absolute;
}
.grid-cell {
  align-content: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
}
.tracker-space {
  width: 2.25in;
  height: 0.875in;
  top: 2.1in;
  justify-content: center;
  text-align: center;
  align-items: center;
  display: flex;
  font-size: 14px;
  border: $border--black-thin;
  position: absolute;
  border-radius: 1em;
}
.stat-table {
  width: 4.25in;
  height: 2in;
  font-size: 12px;
  position: absolute;
  text-align: center;
}
.stance-card-slot {
  width: 4.25in;
  height: 3in;
  justify-content: center;
  border: $border--black-thin;
}
.status-box {
  width: 10in;
  height: 1.7in;
  font-size: 14px;
  font-style: italic;
  border: 2px dashed black;
  position: absolute;
  border-radius: 2em;
  top: 3.1in;
  right: 0.5in;
  justify-content: center;
  display: flex;
  text-align: center;
  align-items: center;
}
.token-text {
  text-align: center;
  font-size: 10px;
}
.token-circle {
  display: flex;
  width: 1.6in;
  height: 1.6in;
  border-radius: 50%;
  justify-content: center;
  align-items: center;
  border: $border--black-thin;
}
.container > br {
  width: 100%;
  content: '';
}
.border-col {
  border: $border--black-thin;
  border-right: none;
}
.border-col-row-end {
  border: $border--black-thin;
}
.border-col-no-top {
  border: $border--black-thin;
  border-top: none;
  border-right: none;
}
.border-col-row-end-no-top {
  border: $border--black-thin;
  border-top: none;
}
</style>
