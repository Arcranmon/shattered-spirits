<template>
  <div style="margin: 1em" class="npc-tab-content npc-wrapper">
    <v-row style="margin: 1em">
      <v-col :cols="columnNumbers"><combat-stats-widget :creature="npc" @changed="$emit('changed')" /> </v-col
      ><v-col :cols="columnNumbers"> <status-widget :creature="npc" @changed="$emit('changed')" /></v-col
    ></v-row>
    <traits-and-weapons-widget :creature="npc" />
    <abilities-widget
      :techniques="npc.Techniques"
      :actions="npc.Actions"
      :minor_attacks="npc.MinorAttacks"
      :major_attacks="npc.MajorAttacks"
      :gambits="npc.Gambits"
      :stunts="npc.Stunts"
      :reactions="npc.Reactions"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import AbilitiesWidget from '@/components/AbilitiesWidget.vue'
import StatusWidget from '@/components/StatusWidget.vue'
import CombatStatsWidget from '@/components/CombatStatsWidget.vue'
import TraitsAndWeaponsWidget from '@/components/TraitsAndWeaponsWidget.vue'
export default Vue.extend({
  name: 'display-npc',
  components: { AbilitiesWidget, StatusWidget, TraitsAndWeaponsWidget, CombatStatsWidget },
  props: {
    npc: {
      type: Npc,
      required: true,
    },
  },
  data() {
    return {
      ability_tab: null,
      equipment_tab: null,
      spirit_trait_tab: null,
      spirit_ability_tab: null,
      npc_or_spirit_tab: null,
      maneuver_tab: null,
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    changeSpiritStance: function (variable) {
      this.npc.CurrentSpiritStance = variable.card
      this.$emit('changed')
    },
    changeMartialStance: function (variable) {
      this.npc.CurrentMartialStance = variable.card
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
.npc-wrapper {
  font-family: $font--standard;
  border: 5px double black;
}
.npc-tabs {
  font-family: $font--fancy;
  border-radius: 0px;
}
.npc-tab-content {
  background-color: $color--grey-light !important;
  padding: 1em;
}
</style>
