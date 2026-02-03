<template>
  <div class="npc--box" style="background-color: DarkGray">
    <h3>
      <center>{{ npc.Name }}</center>
    </h3>
    <div class="npc--header">
      <div v-if="npc.Desc.length > 0">
        <i>{{ npc.Desc }}</i
        ><br /><b>{{ npc.SpiritType }} {{ npc.NpcType }}</b
        ><br /><b>{{ npc.Role }}</b
        ><br /><b><display-tooltip-text :string="npc.category" :decorate="false" /></b>
      </div>
    </div>
    <div class="npc--content">
      <v-row no-gutters>
        <v-col cols="6">
          <div v-html="$marked.parseInline(npc.SizeText)" />
          <div v-html="$marked.parseInline(npc.StaminaText)" />
          <display-tooltip-text :string="npc.BlockText" />
          <div>
            <display-tooltip-text :string="npc.MomentumGainText" />
          </div>
          <div v-if="npc.Traits.length > 0"><b>Traits:</b></div>
          <div v-for="trait in npc.Traits" :key="trait">
            <display-tooltip-text :string="'* **' + trait.replaceAll('_', '') + '**'" :decorate="false" /></div
        ></v-col>
        <v-col cols="6"> <base-widget :ability="npc.Armor" /></v-col
      ></v-row>
      <v-row no-gutters></v-row><br />
    </div>
    <v-card>
      <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered>
        <v-tab>
          <h3>Arts</h3>
        </v-tab>
        <v-tab v-if="npc.HasWeapons">
          <h3>Weapons</h3>
        </v-tab></v-tabs
      ><v-tabs-items v-model="tab" class="character-tab-content">
        <v-tab-item>
          <v-tabs v-model="abilitiesTab" color="black" light centered style="border-radius: 10px"
            ><v-tab><h5>Maneuvers</h5></v-tab><v-tab><h5>Attacks</h5></v-tab><v-tab><h5>Gambits</h5></v-tab><v-tab><h5>Reactions</h5></v-tab></v-tabs
          ><v-tabs-items v-model="abilitiesTab" class="character-tab-content"
            ><v-tab-item><ability-tab abilityType="Maneuver" :character="npc" /></v-tab-item
            ><v-tab-item><ability-tab abilityType="Attack" :character="npc" /></v-tab-item
            ><v-tab-item><ability-tab abilityType="Gambit" :character="npc" /></v-tab-item
            ><v-tab-item><ability-tab abilityType="Reaction" :character="npc" /></v-tab-item></v-tabs-items></v-tab-item
        ><v-tab-item v-if="npc.HasWeapons"> <show-cards :inputs="npc.Weapons" job="Attacks" :collapse="false" :cols="2" /></v-tab-item
      ></v-tabs-items>
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
  methods: {
    splitTrait(trait) {
      if (trait.includes('_')) return trait.split('_')[1]
      return trait
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
