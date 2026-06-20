<template>
  <div
    inline
    class="main-layout">
    <div class="header-sidebar">
      <div style="text-align: center">
        <b>
          <h2 style="font-size: 15px">{{ stance.Name }}</h2>
          {{ getPhase }}
          <br />
          {{ stance.Category }}
        </b>
      </div>
      <img
        :src="stance.Icon"
        style="opacity: 0.7" />
      <div class="character-name">{{ character.Name }}</div>
    </div>
    <div>
      <div class="top-row-layout">
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Speed_"
              :decorate="false" />
          </b>
        </div>
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Block_"
              :decorate="false" />
          </b>
        </div>
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Grit_"
              :decorate="false" />
          </b>
        </div>
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Focus_"
              :decorate="false" />
          </b>
        </div>
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Reflex_"
              :decorate="false" />
          </b>
        </div>
      </div>
      <div class="top-row-layout">
        <div class="chart--cols justify-center align-center">+{{ stance.Speed }}</div>
        <div class="chart--cols justify-center align-center">+{{ stance.Block }}</div>
        <div class="chart--cols justify-center align-center">+{{ stance.Grit }}</div>
        <div class="chart--cols justify-center align-center">+{{ stance.Focus }}</div>
        <div class="chart--cols justify-center align-center">+{{ stance.Reflex }}</div>
      </div>
      <br />
      <div class="bottom-row-layout">
        <div
          class="chart--head justify-center align-center"
          :cols="4">
          <b>
            <display-tooltip-text
              string="Momentum"
              :decorate="false" />
          </b>
        </div>
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Posture_"
              :decorate="false" />
          </b>
        </div>
        <div class="chart--head justify-center align-center">
          <b>
            <display-tooltip-text
              string="_Essence_"
              :decorate="false" />
          </b>
        </div>
      </div>
      <div class="bottom-row-layout">
        <div class="chart--cols justify-center align-center">{{ getMomentum }}</div>
        <div class="chart--cols justify-center align-center">{{ stance.Posture }}</div>
        <div class="chart--cols justify-center align-center">0</div>
      </div>
      <br />
      <div style="padding-left: 1em">
        <div v-if="stance.HasEffect">
          <display-tooltip-text :string="stance.EffectHeader" />
        </div>
        <div
          class="stance-box"
          style="padding-bottom: 0.25em">
          <base-widget
            v-for="ability in stance.Abilities"
            :ability="ability"
            :key="ability.Name" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Stance, Combatant, Spirit } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'

export default Vue.extend({
  name: 'stance-widget',
  props: {
    stance: {
      type: Stance,
      required: true,
    },
    character: {
      type: Combatant,
      required: false,
      default: 0,
    },
  },
  computed: {
    getPhase: function () {
      if (this.character.Phase > 0 && this.stance.Phase != 'N/A') {
        if (this.stance.Phase == 'Spirit+1') return 'Phase ' + String(Number(this.character.Phase) + 1)
        if (this.stance.Phase == 'Spirit') return 'Phase ' + this.creaturePhase
        if (this.stance.Phase == 'Spirit-1') return 'Phase ' + String(Number(this.character.Phase) - 1)
      }
      if (this.stance.Phase == 'N/A') return 'Phaseless'
      return 'Phase ' + this.stance.Phase
    },
    getMomentum: function () {
      if (this.character.Phase > 0 && this.stance.Momentum != 'N/A') {
        return this.stance.Momentum.replaceAll('_', '').split('/')[this.character.Phase - 1]
      }
      return this.stance.Momentum
    },
    stanceString: function () {
      if (this.character instanceof Spirit) return 'Spirit Stance'
      return 'Stance'
    },
  },
  components: { BaseWidget },
})
</script>

<style scoped lang="scss">
.main-layout {
  display: grid;
  grid-template-columns: 1fr 5fr;
}
.top-row-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
  font-size: 12px;
}
.bottom-row-layout {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  font-size: 12px;
}
.header-sidebar {
  position: relative;
  background-color: thistle;
  border-right: 1px solid black;
  font-size: 12px;
  min-height: 1.75in;
}
.character-name {
  text-align: center;
  font-size: 12px;
  font-style: italic;
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translate(-50%, 0);
}
</style>
