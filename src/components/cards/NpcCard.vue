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
        ><br /><b><display-tooltip-text :string="npc.Class" :decorate="false" /></b>
      </div>
    </div>
    <div class="npc--content">
      <v-row no-gutters>
        <v-col cols="6">
          <div v-html="$marked.parseInline(npc.SizeText)" />
          <div v-html="$marked.parseInline(npc.HealthText)" />
          <div v-html="$marked.parseInline(npc.ArmorText)" />
          <display-tooltip-text :string="'**Special:** ' + npc.SpecialText" />
          <div v-if="npc.Traits.length > 0"><b>Traits:</b></div>
          <div v-for="trait in npc.Traits" :key="trait">
            <display-tooltip-text
              :string="'* **' + trait.replaceAll('_', '') + ':** ' + $store.getters.getTrait(splitTrait(trait))"
              :decorate="false"
            /></div></v-col
      ></v-row>
      <v-row no-gutters></v-row><br />
    </div>
    <v-card>
      <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered>
        <v-tab>
          <h3>Techniques</h3>
        </v-tab>
        <v-tab>
          <h3>Attacks</h3>
        </v-tab>
        <v-tab v-if="npc.HasWeapons">
          <h3>Weapons</h3>
        </v-tab>
        <v-tab>
          <h3>Actions</h3>
        </v-tab>
        <v-tab>
          <h3>Stunts</h3>
        </v-tab>
        <v-tab>
          <h3>Reactions</h3>
        </v-tab>
        <v-tab v-if="npc.HasGambits">
          <h3>Gambits</h3>
        </v-tab></v-tabs
      ><v-tabs-items v-model="tab" class="character-tab-content">
        <v-tab-item> <show-cards :inputs="npc.Techniques" job="Techniques" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="npc.Attacks" job="Attacks" :collapse="false" /></v-tab-item
        ><v-tab-item v-if="npc.HasWeapons"> <show-cards :inputs="npc.Weapons" job="Attacks" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="npc.Actions" job="Maneuvers" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="npc.Stunts" job="Maneuvers" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="npc.Reactions" job="Maneuvers" :collapse="false" /></v-tab-item
        ><v-tab-item v-if="npc.HasGambits"> <show-cards :inputs="npc.Gambits" job="Maneuvers" :collapse="false" /></v-tab-item
      ></v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import MovementCard from '@/components/cards/MovementCard.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'npc-card',
  components: {
    ShowCards: () => import('@/components/cards/ShowCards.vue'),
    MovementCard,
  },
  data() {
    return { tab: null }
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
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.character-tab-content {
  background-color: $color--grey-light !important;
}
</style>
