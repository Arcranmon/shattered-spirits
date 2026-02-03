<template>
  <div style="margin: 1em" class="background--color character-wrapper">
    <v-tabs v-model="character_or_spirit_tab" class="character-tabs" dark color="black" centered>
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
            <v-col :cols="columnNumbers">
              <combat-stats-widget :creature="character" @changed="$emit('changed')" /><status-widget
                :creature="character"
                @changed="$emit('changed')" /></v-col
            ><v-col :cols="columnNumbers">
              <h4 style="text-align: center">Stance</h4>
              <div style="width: 50%; display: flex; justify-content: center; align-items: center; margin: auto">
                <v-select
                  v-model="character.CurrentStance"
                  label="Change Stance"
                  item-text="Name"
                  :items="character.Stances"
                  filled
                  @changeSelected="$emit('changed')"
                />
              </div>
              <base-widget :ability="character.CurrentStance" :on_sheet="true" style="margin: auto" :key="character.CurrentStance.Name"
            /></v-col>
          </v-row>
          <h3 style="text-align: center">Abilities and Equipment</h3>
          <v-card>
            <v-tabs v-model="ability_tab" class="character-tabs-nested" dark color="black" centered
              ><v-tab> <h4>Abilities</h4> </v-tab><v-tab> <h4>Arts & Talents</h4> </v-tab><v-tab> <h4>Equipment</h4> </v-tab
              ><v-tab> <h4>Stances</h4> </v-tab></v-tabs
            >
            <v-tabs-items v-model="ability_tab" class="character-tab-content-background">
              <v-tab-item
                ><v-tabs v-model="abilitiesAndEquipmentTab" color="black" light centered
                  ><v-tab><h5>Skills</h5></v-tab><v-tab><h5>Powers</h5></v-tab><v-tab><h5>Passives</h5></v-tab><v-tab> <h5>Maneuvers</h5></v-tab
                  ><v-tab><h5>Attacks</h5></v-tab><v-tab><h5>Gambits</h5></v-tab><v-tab><h5>Reactions</h5></v-tab></v-tabs
                ><v-tabs-items v-model="abilitiesAndEquipmentTab" class="character-tab-content"
                  ><v-tab-item><ability-tab abilityType="Skill" :character="character" /></v-tab-item
                  ><v-tab-item><ability-tab abilityType="Power" :character="character" /></v-tab-item
                  ><v-tab-item><ability-tab abilityType="Passive" :character="character" /></v-tab-item
                  ><v-tab-item><ability-tab abilityType="Maneuver" :character="character" /></v-tab-item
                  ><v-tab-item><ability-tab abilityType="Attack" :character="character" /></v-tab-item
                  ><v-tab-item><ability-tab abilityType="Gambit" :character="character" /></v-tab-item
                  ><v-tab-item><ability-tab abilityType="Reaction" :character="character" /></v-tab-item
                ></v-tabs-items>
              </v-tab-item>
              <v-tab-item>
                <show-cards :inputs="this.$store.getters.getAPsFromList(character.Arts)" :collapse="false" :cols="2" />
              </v-tab-item>
              <v-tab-item
                ><v-tabs v-model="equipment_tab" color="black" light centered>
                  <v-tab><h5>Worn</h5></v-tab><v-tab><h5>Packed</h5></v-tab></v-tabs
                >
                <v-tabs-items v-model="equipment_tab" class="character-tab-content"
                  ><v-tab-item><b>Load:</b> {{ character.Load }}<show-cards :inputs="character.SortedWornEquipment" :collapse="false" :cols="1" /> </v-tab-item
                  ><v-tab-item>
                    <b>Load:</b> {{ character.PackedLoad
                    }}<show-cards :inputs="character.SortedPackedEquipment" :collapse="false" :cols="2" /> </v-tab-item></v-tabs-items
              ></v-tab-item>
              <v-tab-item><show-cards :inputs="character.Stances" :collapse="false" :cols="2" /></v-tab-item
            ></v-tabs-items>
          </v-card></div></v-tab-item
      ><v-tab-item>
        <v-row style="margin: 1em">
          <v-col :cols="columnNumbers">
            <combat-stats-widget :creature="character.Spirit" @changezd="$emit('changed')" /><status-widget
              :creature="character.Spirit"
              @changed="$emit('changed')" /></v-col
          ><v-col :cols="columnNumbers">
            <h4 style="text-align: center">Stance</h4>
            <div style="width: 50%; display: flex; justify-content: center; align-items: center; margin: auto">
              <v-select
                v-model="character.Spirit.CurrentStance"
                label="Change Stance"
                item-text="Name"
                :items="character.Spirit.Stances"
                filled
                @changeSelected="$emit('changed')"
              />
            </div>
            <base-widget :ability="character.Spirit.CurrentStance" :on_sheet="true" style="margin: auto" :key="character.Spirit.CurrentStance.Name"
          /></v-col>
        </v-row>
        <h3 style="text-align: center">Abilities and Equipment</h3>
        <v-card>
          <v-tabs v-model="ability_tab" class="character-tabs" dark color="black" centered
            ><v-tab> <h4>Abilities</h4> </v-tab><v-tab> <h4>Equipment</h4> </v-tab><v-tab> <h4>Traits</h4> </v-tab></v-tabs
          >
          <v-tabs-items v-model="ability_tab">
            <v-tab-item
              ><v-tabs v-model="abilitiesAndEquipmentTab" color="black" light centered
                ><v-tab><h5>Skill</h5></v-tab><v-tab><h5>Power</h5></v-tab><v-tab><h5>Passive</h5></v-tab><v-tab><h5>Maneuvers</h5></v-tab
                ><v-tab><h5>Attacks</h5></v-tab><v-tab><h5>Gambits</h5></v-tab><v-tab><h5>Reactions</h5></v-tab></v-tabs
              ><v-tabs-items v-model="abilitiesAndEquipmentTab" class="character-tab-content"
                ><v-tab-item><ability-tab abilityType="Skill" :character="character" :spirit="true" /></v-tab-item
                ><v-tab-item><ability-tab abilityType="Power" :character="character" :spirit="true" /></v-tab-item
                ><v-tab-item><ability-tab abilityType="Passive" :character="character" :spirit="true" /></v-tab-item
                ><v-tab-item><ability-tab abilityType="Maneuver" :character="character" :spirit="true" /></v-tab-item
                ><v-tab-item><ability-tab abilityType="Attack" :character="character" :spirit="true" /></v-tab-item
                ><v-tab-item><ability-tab abilityType="Gambit" :character="character" :spirit="true" /></v-tab-item
                ><v-tab-item><ability-tab abilityType="Reaction" :character="character" :spirit="true" /></v-tab-item
              ></v-tabs-items>
            </v-tab-item>
            <v-tab-item><show-cards :inputs="character.Spirit.Equipment" :collapse="false" :cols="2" /> </v-tab-item
            ><v-tab-item> <show-cards :inputs="this.$store.getters.getTraitsFromList(character.Spirit.Arts)" :collapse="false" :cols="1" /></v-tab-item
          ></v-tabs-items> </v-card></v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import StanceCard from '@/components/cards/StanceCard.vue'
import TypeCard from '@/components/cards/SpiritTypeCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import ShowAbilities from '@/components/cards/ShowAbilities.vue'
import BasicTable from '@/components/BasicTable.vue'
import AbilityTab from '@/components/AbilityTab.vue'
import BaseWidget from '@/components/BaseWidget.vue'
import StatusWidget from '@/components/StatusWidget.vue'
import CombatStatsWidget from '@/components/CombatStatsWidget.vue'
import TraitsAndWeaponsWidget from '@/components/TraitsAndWeaponsWidget.vue'
export default Vue.extend({
  name: 'display-character',
  components: {
    AbilityTab,
    BasicTable,
    ShowAbilities,
    ShowCards,
    BaseWidget,
    StanceCard,
    TypeCard,
    StatusWidget,
    TraitsAndWeaponsWidget,
    CombatStatsWidget,
  },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data() {
    return {
      equipment_tab: null,
      abilitiesAndEquipmentTab: null,
      ability_tab: null,
      spirit_equipment_tab: null,
      character_or_spirit_tab: null,
      windowWidth: window.innerWidth,
    }
  },
  computed: {
    screenSize() {
      if (this.windowWidth <= 760) return 1
      if (this.windowWidth <= 1500) return 2
      return 3
    },
    switchString() {
      return this.showArts ? 'Show Arts' : 'Show Abilities'
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
