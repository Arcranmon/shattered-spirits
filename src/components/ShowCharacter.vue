<template>
  <div style="margin: 1em" class="background--color character-wrapper">
    <v-tabs v-model="character_or_spirit_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
      <v-tab
        ><h3>{{ character.Name }}</h3></v-tab
      ><v-tab
        ><h3>{{ character.Spirit.Name }}</h3></v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="character_or_spirit_tab" class="character-tab-content"
      ><v-tab-item>
        <div v-if="character.Name != ''">
          <v-row style="margin: 1em">
            <v-col :cols="columnNumbers"> <combat-stats-widget :creature="character" @changed="$emit('changed')" /></v-col
            ><v-col :cols="columnNumbers"><status-widget :creature="character" @changed="$emit('changed')" /></v-col>
            <v-col :cols="12">
              <v-row no-gutters align="center" justify="center">
                <h4>Helpful Keywords</h4>
              </v-row>
              <v-row no-gutters align="center" justify="center">
                <display-tooltip-text :string="'_Major Source_, _Minor Source_, _' + character.Element + '_'" />
              </v-row>
            </v-col>
            <v-col :cols="12" style="margin-bottom: 1em">
              <h3 style="text-align: center">Stances</h3>
              <v-row
                ><v-col :cols="columnNumbers"> <stance-card :stance="character.CurrentSpiritStance" :on_sheet="true" style="width: 90%; margin: auto" /></v-col
                ><v-col :cols="columnNumbers">
                  <stance-card :stance="character.CurrentMartialStance" :on_sheet="true" style="width: 90%; margin: auto" /></v-col></v-row></v-col
          ></v-row>
          <h3 style="text-align: center">Equipment</h3>
          <v-card>
            <v-tabs v-model="equipment_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
              <v-tab>
                <h3>Weapons</h3>
              </v-tab>
              <v-tab>
                <h3>Armor</h3>
              </v-tab>
              <v-tab>
                <h3>Accessories</h3>
              </v-tab>
              <v-tab>
                <h3>Consumables</h3>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="equipment_tab" class="character-tab-content">
              <v-tab-item>
                <show-cards
                  job="Attacks"
                  :inputs="$store.getters.getWeaponsFromList(character.Weapons)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                />
              </v-tab-item>
              <v-tab-item>
                <show-cards job="Armor" :inputs="[character.EquippedArmor]" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" />
              </v-tab-item>
              <v-tab-item><display-tooltip-text class="description-text" string="Not applicable yet!" /></v-tab-item>
              <v-tab-item><display-tooltip-text class="description-text" string="Not applicable yet!" /></v-tab-item>
              <v-tab-item style="margin: 1em"
                ><div v-for="disc in character.Disciplines" :key="disc.name">{{ disc.name }} <span v-for="n in disc.tier" :key="n">I</span></div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          <abilities-widget
            :techniques="character.Techniques"
            :actions="character.ManeuversOfType('Action')"
            :minor_attacks="character.MinorAttacks"
            :major_attacks="character.MajorAttacks"
            :gambits="character.ManeuversOfType('Gambit')"
            :stunts="character.ManeuversOfType('Stunt')"
            :reactions="character.ManeuversOfType('Reaction')"
          /></div></v-tab-item
      ><v-tab-item>
        <v-row style="margin: 1em">
          <v-col :cols="columnNumbers"><combat-stats-widget :creature="character.Spirit" @changed="$emit('changed')" /> </v-col
          ><v-col :cols="columnNumbers"> <status-widget :creature="character.Spirit" @changed="$emit('changed')" /></v-col
        ></v-row>
        <traits-and-weapons-widget :creature="character.Spirit" />
        <abilities-widget
          :techniques="character.SpiritTechniques"
          :actions="character.SpiritManeuversOfType('Action')"
          :minor_attacks="character.SpiritMinorAttacks"
          :major_attacks="character.SpiritMajorAttacks"
          :gambits="character.SpiritManeuversOfType('Gambit')"
          :stunts="character.SpiritManeuversOfType('Stunt')"
          :reactions="character.SpiritManeuversOfType('Reaction')" /></v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import StanceCard from '@/components/cards/StanceCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import AbilitiesWidget from '@/components/AbilitiesWidget.vue'
import StatusWidget from '@/components/StatusWidget.vue'
import CombatStatsWidget from '@/components/CombatStatsWidget.vue'
import TraitsAndWeaponsWidget from '@/components/TraitsAndWeaponsWidget.vue'
export default Vue.extend({
  name: 'display-character',
  components: { ShowCards, StanceCard, AbilitiesWidget, StatusWidget, TraitsAndWeaponsWidget, CombatStatsWidget },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data() {
    return {
      equipment_tab: null,
      character_or_spirit_tab: null,
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    changeSpiritStance: function (variable) {
      this.character.CurrentSpiritStance = variable.card
      this.$emit('changed')
    },
    changeMartialStance: function (variable) {
      this.character.CurrentMartialStance = variable.card
      this.$emit('changed')
    },
  },
  computed: {
    screenSize() {
      if (this.windowWidth <= 760) return 1
      if (this.windowWidth <= 1500) return 2
      return 3
    },
    columnNumbers() {
      if (this.isMobile) return 12
      return 6
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.character-wrapper {
  font-family: $font--standard;
  border: 5px double black;
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
