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
            <v-col :cols="12" style="margin-bottom: 1em">
              <h3 style="text-align: center">Stances</h3>
              <stance-card :stance="character.CurrentStance" :on_sheet="true" style="width: 90%; margin: auto" /></v-col
          ></v-row>
          <!--
          <h3 style="text-align: center">Skills</h3>
          <v-card>
            <v-tabs v-model="equipment_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
              <v-tab>
                <h3>Archetype</h3>
              </v-tab>
              <v-tab>
                <h3>Talents</h3>
              </v-tab></v-tabs
            >
            <v-tabs-items v-model="equipment_tab" class="character-tab-content">
              <v-tab-item
                ><show-cards
                  job="Archetype"
                  :inputs="$store.getters.getArchetypesFromList(character.Archetypes)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  :cols="2" /></v-tab-item
              ><v-tab-item
                ><show-cards
                  job="Talent"
                  :inputs="$store.getters.getTalentsFromList(character.Talents)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  :cols="2" /></v-tab-item></v-tabs-items
          ></v-card>
            -->
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
            </v-tabs>
            <v-tabs-items v-model="equipment_tab" class="character-tab-content">
              <v-tab-item>
                <show-cards
                  job="Weapons"
                  :inputs="$store.getters.getWeaponsFromList(character.Weapons)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  :cols="2"
                />
              </v-tab-item>
              <v-tab-item>
                <show-cards
                  job="Armor"
                  :inputs="$store.getters.getArmorFromList(character.Armor)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  :cols="2"
                />
              </v-tab-item>
              <v-tab-item
                ><show-cards
                  job="Accessories"
                  :inputs="$store.getters.getAccessoryFromList(character.Accessories)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  :cols="2"
              /></v-tab-item>
              <h4>Abilities</h4>
              <v-tabs v-model="ability_tab" class="character-tabs" background-color="#b69e75" color="black" centered
                ><v-tab> <h4>Techniques</h4> </v-tab><v-tab> <h4>Stances</h4> </v-tab><v-tab> <h4>Arts</h4> </v-tab><v-tab> <h4>Archetypes</h4> </v-tab></v-tabs
              >
              <v-tabs-items v-model="ability_tab" class="character-tab-content">
                <v-tab-item
                  ><show-cards :inputs="this.$store.getters.getTechniquesFromList(this.$store.getters.basicTechniques)" job="Techniques" :collapse="false"
                /></v-tab-item>
                <v-tab-item
                  ><show-cards :inputs="this.$store.getters.getStancesFromList(this.$store.getters.basicStances)" job="Stances" :collapse="false"
                /></v-tab-item>
                <v-tab-item>
                  <show-cards :inputs="this.$store.getters.getArtsFromList(this.$store.getters.playerArts)" job="Arts" :collapse="false" /></v-tab-item
              ></v-tabs-items>
            </v-tabs-items>
          </v-card></div></v-tab-item
      ><v-tab-item>
        <v-row style="margin: 1em">
          <v-col :cols="columnNumbers"><combat-stats-widget :creature="character.Spirit" @changed="$emit('changed')" /> </v-col
          ><v-col :cols="columnNumbers"> <status-widget :creature="character.Spirit" @changed="$emit('changed')" /></v-col
        ></v-row>
        <h3 style="text-align: center">Equipment</h3>
        <v-card>
          <v-tabs v-model="spirit_equipment_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
            <v-tab>
              <h3>Weapons</h3>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="spirit_equipment_tab" class="character-tab-content">
            <v-tab-item>
              <show-cards job="Attacks" :inputs="character.Spirit.Weapons" standalone_or_contained="Standalone" :collapse="false" :cols="2" />
            </v-tab-item>
          </v-tabs-items> </v-card></v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import StanceCard from '@/components/cards/StanceCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import BasicTable from '@/components/BasicTable.vue'
import AbilitiesWidget from '@/components/AbilitiesWidget.vue'
import StatusWidget from '@/components/StatusWidget.vue'
import CombatStatsWidget from '@/components/CombatStatsWidget.vue'
import TraitsAndWeaponsWidget from '@/components/TraitsAndWeaponsWidget.vue'
export default Vue.extend({
  name: 'display-character',
  components: { BasicTable, ShowCards, StanceCard, AbilitiesWidget, StatusWidget, TraitsAndWeaponsWidget, CombatStatsWidget },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data() {
    return {
      equipment_tab: null,
      ability_tab: null,
      spirit_equipment_tab: null,
      character_or_spirit_tab: null,
      windowWidth: window.innerWidth,
    }
  },
  methods: {
    changeStance: function (variable) {
      this.character.CurrentStance = variable.card
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
