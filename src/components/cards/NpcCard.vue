<template>
  <div
    class="npc--box"
    style="background-color: DarkGray">
    <h3>
      <center>{{ npc.Name }}</center>
    </h3>
    <div class="npc--header">
      <div v-if="npc.Desc.length > 0">
        <i>{{ npc.Desc }}</i>
        <br />
        <b>{{ npc.NpcType }} {{ npc.Role }} {{ npc.Category }}</b>
      </div>
    </div>
    <div class="npc--content">
      <v-row no-gutters>
        <v-col cols="6">
          <display-tooltip-text :string="npc.SizeText + '&nbsp;'" />
          <display-tooltip-text :string="npc.StunText + '&nbsp;'" />
          <display-tooltip-text :string="npc.StaminaText + '&nbsp;'" />
          <display-tooltip-text :string="npc.BlockText + '&nbsp;'" />
        </v-col>
      </v-row>
      <v-row no-gutters> </v-row>
      <br />
    </div>
    <v-card>
      <v-tabs
        dark
        v-model="tab"
        class="character-tabs"
        background-color="#b69e75"
        color="black"
        centered>
        <v-tab>
          <h3>Abilities</h3>
        </v-tab>
        <v-tab>
          <h3>Stances</h3>
        </v-tab>
      </v-tabs>
      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-tabs
            v-model="abilitiesTab"
            color="black"
            light
            centered>
            <v-tab>
              <h5>Passives</h5>
            </v-tab>
            <v-tab>
              <h5>Maneuvers</h5>
            </v-tab>
            <v-tab>
              <h5>Attacks</h5>
            </v-tab>
            <v-tab>
              <h5>Gambits</h5>
            </v-tab>
            <v-tab>
              <h5>Reactions</h5>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="abilitiesTab">
            <v-tab-item class="character-tab-content">
              <ability-tab
                abilityType="Passive"
                :character="npc" />
            </v-tab-item>
            <v-tab-item class="character-tab-content">
              <ability-tab
                abilityType="Maneuver"
                :character="npc" />
            </v-tab-item>
            <v-tab-item class="character-tab-content">
              <ability-tab
                abilityType="Attack"
                :character="npc" />
            </v-tab-item>
            <v-tab-item class="character-tab-content">
              <ability-tab
                abilityType="Gambit"
                :character="npc" />
            </v-tab-item>
            <v-tab-item class="character-tab-content">
              <ability-tab
                abilityType="Reaction"
                :character="npc" />
            </v-tab-item>
          </v-tabs-items>
        </v-tab-item>
        <v-tab-item class="character-tab-content">
          <show-cards
            :inputs="npc.Stances"
            :collapse="false"
            :cols="1" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import BaseWidget from '@/components/BaseWidget.vue'
import AbilityTab from '@/components/AbilityTab.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'npc-card',
  components: {
    ShowCards: () => import('@/components/cards/ShowCards.vue'),
    BaseWidget,
    AbilityTab,
  },
  data() {
    return { tab: null, abilitiesTab: 0 }
  },
  props: {
    npc: {
      type: Npc,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.npc--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
  width: 100%;
  overflow: hidden;
}
.npc--header {
  text-align: center;
  font-size: $font-size--m;
  font-family: $font--standard;
  color: black;
  padding-bottom: $space--xs;
}
.npc--content {
  font-size: $font-size--m;
  color: black;
  padding: $space--xs;
  font-family: $font--standard !important;
}
.character-tabs {
  font-family: $font--fancy;
  border-radius: 0px;
}
.character-tab-content {
  background-color: $color--grey-light !important;
  padding: 1em;
}
</style>
