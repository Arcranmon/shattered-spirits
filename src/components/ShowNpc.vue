<template>
  <div
    style="margin: 1em"
    class="npc-tab-content npc-wrapper">
    <div style="text-align: center">
      <display-tooltip-text :string="npc.Pattern" />
    </div>
    <v-row style="margin: 1em">
      <v-col :cols="columnNumbers">
        <combat-stats-widget
          :creature="npc"
          @changed="$emit('changed')" />
      </v-col>
      <v-col :cols="columnNumbers">
        <status-widget
          :creature="npc"
          @changed="$emit('changed')" />
      </v-col>
    </v-row>
    <h3 style="text-align: center">Equipment</h3>
    <v-card>
      <v-tabs
        v-model="equipment_tab"
        class="character-tabs"
        background-color="#b69e75"
        color="black"
        centered>
        <v-tab>
          <h3>Weapons</h3>
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="equipment_tab"
        class="character-tab-content">
        <v-tab-item>
          <show-cards
            :inputs="npc.Weapons"
            standalone_or_contained="Standalone"
            :collapse="false"
            :cols="2" />
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import StatusWidget from '@/components/StatusWidget.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import CombatStatsWidget from '@/components/CombatStatsWidget.vue'
import TraitsAndWeaponsWidget from '@/components/TraitsAndWeaponsWidget.vue'
export default Vue.extend({
  name: 'display-npc',
  components: { ShowCards, StatusWidget, TraitsAndWeaponsWidget, CombatStatsWidget },
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
