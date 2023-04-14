<template>
  <div class="npc--box" style="background-color: DarkGray;">
    <h3>
      <center>{{ npc.Name }}</center>
    </h3>
    <div class="npc--header">
      <div v-if="(npc.Desc.length > 0)">
        <i>{{ npc.Desc }}</i
        ><br /><b>{{ npc.SpiritType }} {{ npc.NpcType }}</b
        ><br /><b>{{ npc.Role }}</b
        ><br /><b><display-tooltip-text :string="npc.Class" :decorate="false" /></b>
      </div>
    </div>
    <div class="npc--content">
      <v-row no-gutters>
        <v-col cols="6">
          <div v-html="$marked.parseInline(npc.ApText)" />
          <div v-html="$marked.parseInline(npc.SizeText)" />
          <div v-html="$marked.parseInline(npc.EnduranceText)" />
          <div v-if="npc.Traits.length > 0"><b>Traits:</b></div>
          <span v-for="trait in npc.Traits" :key="trait">
            <display-tooltip-text :string="'* **' + trait + ':** ' + $store.getters.getTrait(trait)" /></span></v-col
        ><v-col cols="6"> <armor-card :armor="npc.Armor" :on_sheet="true" /></v-col></v-row
      ><br />
    </div>
    <v-card>
      <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered>
        <v-tab>
          <h3>Stances</h3>
        </v-tab>
        <v-tab>
          <h3>Weapons</h3>
        </v-tab>
        <v-tab>
          <h3>Techniques</h3>
        </v-tab>
        <v-tab>
          <h3>Maneuvers</h3>
        </v-tab> </v-tabs
      ><v-tabs-items v-model="tab" class="character-tab-content">
        <v-tab-item
          ><h2 v-if="spirit_stances.length > 0">Spirit Stances</h2>
          <show-cards job="Stances" :inputs="spirit_stances" standalone_or_contained="Standalone" :on_sheet="true" :collapse="false" v-bind:cols="3" />
          <h2 v-if="martial_stances.length > 0">Martial Stances</h2>
          <show-cards
            job="Stances"
            :inputs="martial_stances"
            standalone_or_contained="Standalone"
            :on_sheet="true"
            :collapse="false"
            v-bind:cols="3" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="weapons" job="Weapons" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="techniques" job="Techniques" :collapse="false" /></v-tab-item
        ><v-tab-item>
          <v-card>
            <v-tabs v-model="maneuver_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
              <v-tab> <h4>Stratagems</h4> </v-tab><v-tab> <h4>Stunts</h4> </v-tab><v-tab> <h4>Resists</h4> </v-tab><v-tab> <h4>Reactions</h4> </v-tab
              ><v-tab> <h4>Gambits</h4> </v-tab><v-tab> <h4>Flourishes</h4> </v-tab
              ><v-tab>
                <h4>Punishes</h4>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="maneuver_tab" class="character-tab-content">
              <v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Stratagem')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                />
              </v-tab-item>
              <v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Stunt')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                />
              </v-tab-item>
              <v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Resist')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Reaction')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                />
              </v-tab-item>
              <v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Gambit')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Flourish')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  display_text="Maneuvers"
                  :inputs="npc.ManeuversOfType('Punish')"
                  standalone_or_contained="Standalone"
                  :on_sheet="true"
                  :collapse="false"
                /> </v-tab-item></v-tabs-items
          ></v-card> </v-tab-item
      ></v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import ArmorCard from '@/components/cards/ArmorCard.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'npc-card',
  components: {
    ShowCards: () => import('@/components/cards/ShowCards.vue'),
    ArmorCard,
  },
  data() {
    return { tab: null, maneuver_tab: null }
  },
  props: {
    npc: {
      type: Npc,
      required: true,
    },
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getWeaponsFromList(this.npc.Weapons)
    },
    reactions: function () {
      return this.$store.getters.getManeuversFromList(this.npc.Reactions)
    },
    spirit_stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.SpiritStances)
    },
    martial_stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.MartialStances)
    },
    techniques: function () {
      return this.$store.getters.getTechniquesFromList(this.npc.Techniques)
    },
    optional_stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.OptionalStances)
    },
    optional_techniques: function () {
      return this.$store.getters.getTechniquesFromList(this.npc.OptionalTechniques)
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
  font-size: $font-size--s;
  font-family: $font--standard;
  color: black;
  padding-bottom: $space--xs;
}
.npc--content {
  font-size: $font-size--s;
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
