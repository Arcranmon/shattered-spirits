<template>
  <div>
    <v-select
      v-if="isMobile"
      v-model="selectedTab"
      :items="tabs"
      :item-text="(item) => `${prettyTab(item)}`"
      @change="updateTab(selectedTab)"
      attach
      filled
      outlined
      style="margin: 1em; margin-bottom: -1em">
      <template v-slot:selection="{ item }">
        {{ prettyTab(item) }}
      </template>
      <template v-slot:item="{ item }">
        {{ prettyTab(item) }}
      </template>
    </v-select>
    <v-row
      class="background"
      style="margin-top: 1em"
      align="stretch">
      <v-col
        v-if="!isMobile"
        cols="auto"
        class="sidebar"
        style="height: 100vh">
        <v-btn-toggle
          borderless
          overflow-auto>
          <div
            v-for="tab in tabs"
            :key="tab"
            style="width: 100%">
            <v-btn
              @click="updateTab(tab)"
              class="button--style"
              depressed
              tile
              block>
              {{ prettyTab(tab) }}
            </v-btn>
          </div>
        </v-btn-toggle>
      </v-col>
      <v-col
        :key="$route.params.tab"
        style="padding-left: 0; padding-bottom: 0; margin-bottom: 0; height: 100%"
        class="background">
        <h2>{{ prettyTab($route.params.tab) }}</h2>
        <div v-if="$route.params.tab == 'basic-skills'">
          <v-tabs
            v-model="abilityTab"
            class="character-tabs"
            dark
            color="black"
            centered>
            <v-tab>
              <h4>Maneuvers</h4>
            </v-tab>
            <v-tab>
              <h4>Attacks</h4>
            </v-tab>
            <v-tab>
              <h4>Gambits</h4>
            </v-tab>
            <v-tab> <h4>Reactions</h4> </v-tab>
            <v-tab> <h4>Stances</h4> </v-tab>
          </v-tabs>
          <v-tabs-items
            v-model="abilityTab"
            class="character-tab-content">
            <v-tab-item>
              <ability-tab
                abilityType="Maneuver"
                :character="character" />
            </v-tab-item>
            <v-tab-item>
              <ability-tab
                abilityType="Attack"
                :character="character" />
            </v-tab-item>
            <v-tab-item>
              <ability-tab
                abilityType="Gambit"
                :character="character" />
            </v-tab-item>
            <v-tab-item>
              <ability-tab
                abilityType="Reaction"
                :character="character" />
            </v-tab-item>
            <v-tab-item>
              <show-cards
                :inputs="basic_stances"
                :collapse="false"
                :cols="1" />
            </v-tab-item>
          </v-tabs-items>
        </div>
        <div
          class="character-tab-content"
          v-if="$route.params.tab == 'archetypes'"
          style="border-top: 2px solid black">
          <show-cards
            :inputs="archetypes"
            :collapse="false"
            :cols="1" />
        </div>

        <div v-if="$route.params.tab == 'disciplines'"><elemental-disciplines /></div>
        <div v-if="$route.params.tab == 'spirit-arts'"><elemental-arts /></div>
        <div
          class="character-tab-content"
          v-if="$route.params.tab == 'careers'"
          style="border-top: 2px solid black">
          <show-cards
            :inputs="careers"
            :collapse="false"
            :cols="1" />
        </div>

        <div v-if="$route.params.tab == 'armor-and-clothing'">
          <v-row
            class="select-bar"
            align="center">
            <v-col
              cols="12"
              style="padding-left: 3em; padding-right: 3em">
              <v-select
                v-model="selectedArmors"
                :items="armorCategories"
                attach
                label="Armor Categories"
                multiple
                filled
                background-color="#dbd9d9e3" />
            </v-col>
          </v-row>
          <div
            class="character-tab-content"
            style="border-top: 2px solid black">
            <show-cards
              :inputs="armors"
              :collapse="false"
              :cols="1" />
          </div>
        </div>
        <div v-if="$route.params.tab == 'weapons-and-shields'">
          <v-row
            dark
            align="center"
            class="select-bar">
            <v-col
              cols="6"
              style="padding-left: 3em">
              <v-select
                light
                v-model="selectedWeapons"
                :items="weaponCategories"
                attach
                label="Weapon Categories"
                multiple
                background-color="#dbd9d9e3"
                filled>
                <template v-slot:prepend-item>
                  <v-list-item
                    ripple
                    @mousedown.prevent>
                    <v-list-item-content>
                      <v-list-item-title> Select All </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"> </v-divider>
                </template>
                <template v-slot:selection="{ item, index }">
                  <span v-if="index === 0">{{ item }} </span>&nbsp;
                  <span
                    v-if="index === 1"
                    class="black--text text-caption">
                    (+{{ selectedWeapons.length - 1 }} others)
                  </span>
                </template>
              </v-select>
            </v-col>
            <v-col
              cols="6"
              style="padding-right: 3em">
              <v-select
                v-model="selectedType"
                :items="weaponTypes"
                attach
                label="Weapon Type"
                filled
                background-color="#dbd9d9e3">
              </v-select>
            </v-col>
          </v-row>
          <div
            class="character-tab-content"
            style="border-top: 2px solid black">
            <show-cards
              :inputs="weapons"
              :collapse="false"
              :cols="1" />
          </div>
        </div>
        <spirit-abilities v-if="$route.params.tab == 'spirit-customization'" />
        <div v-if="$route.params.tab == 'consumables'">
          <v-row
            class="select-bar"
            align="center">
            <v-col
              cols="12"
              style="padding-left: 3em; padding-right: 3em">
              <v-select
                v-model="selectedConsumables"
                :items="consumableCategories"
                attach
                label="Equipment Categories"
                multiple
                filled
                background-color="#dbd9d9e3" />
            </v-col>
          </v-row>
          <div class="character-tab-content">
            <show-cards
              :inputs="consumables"
              :collapse="false"
              :cols="1" />
          </div>
        </div>
        <div v-if="$route.params.tab == 'travel-items'">
          <v-row
            class="select-bar"
            align="center">
            <v-col
              cols="12"
              style="padding-left: 3em; padding-right: 3em">
              <v-select
                v-model="selectedTravelItems"
                :items="travelItemCategories"
                attach
                label="Equipment Categories"
                multiple
                filled
                background-color="#dbd9d9e3" />
            </v-col>
          </v-row>
          <div class="character-tab-content">
            <show-cards
              :inputs="travelItems"
              :collapse="false"
              :cols="1" />
          </div>
        </div>
        <div v-if="$route.params.tab == 'equipment'">
          <v-row
            class="select-bar"
            align="center">
            <v-col
              cols="12"
              style="padding-left: 3em; padding-right: 3em">
              <v-select
                v-model="selectedEquipment"
                :items="equipmentCategories"
                attach
                label="Equipment Categories"
                multiple
                filled
                background-color="#dbd9d9e3" />
            </v-col>
          </v-row>
          <div class="character-tab-content">
            <show-cards
              :inputs="equipment"
              :collapse="false"
              :cols="1" />
          </div>
        </div>
        <div v-if="$route.params.tab == 'resources'">
          <v-row
            class="select-bar"
            align="center">
            <v-col
              cols="12"
              style="padding-left: 3em; padding-right: 3em">
              <v-select
                v-model="selectedResources"
                :items="resourcesCategories"
                attach
                label="Equipment Categories"
                multiple
                filled
                background-color="#dbd9d9e3" />
            </v-col>
          </v-row>
          <div class="character-tab-content">
            <show-cards
              :inputs="resources"
              :collapse="false"
              :cols="1" />
          </div>
        </div>
        <div
          v-if="$route.params.tab == 'sample-characters'"
          style="margin-left: 1em; margin-right: 1em">
          <div
            v-for="character in characters"
            :key="character.Name">
            <display-tooltip-text :string="character[0]" />
            <v-expansion-panels
              v-if="!showChart"
              class="condensed"
              flat
              tile
              accordion
              style="width: 100%">
              <v-expansion-panel>
                <v-expansion-panel-header
                  class="expand--header-chart"
                  style="background-color: #85704c !important; background-image: none">
                  <h4>Show Character</h4>
                </v-expansion-panel-header>
                <v-expansion-panel-content
                  class="expand--body-chart"
                  style="margin: 0 !important; padding-bottom: 0 !important">
                  <show-character :character="character[1]" />
                </v-expansion-panel-content>
              </v-expansion-panel>
            </v-expansion-panels>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import CustomButton from '@/components/Button.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import AbilityWidget from '@/components/AbilityWidget.vue'
import AbilityTab from '@/components/AbilityTab.vue'
import SpiritAbilities from '@/components/SpiritAbilities.vue'
import ShowCharacter from '@/components/ShowCharacter.vue'
import ElementalDisciplines from '@/components/ElementalDisciplines.vue'
import ElementalArts from '@/components/ElementalArts.vue'
import BlaineText from '@/database/text_files/sample_characters/blaine.txt'
import BlaineStats from '@/database/sample_characters/blaine.json'
import JohnText from '@/database/text_files/sample_characters/john.txt'
import JohnStats from '@/database/sample_characters/john.json'
import MargaretText from '@/database/text_files/sample_characters/margaret.txt'
import MargaretStats from '@/database/sample_characters/margaret.json'
import MarlonText from '@/database/text_files/sample_characters/marlon.txt'
import MarlonStats from '@/database/sample_characters/marlon.json'
import ErikaText from '@/database/text_files/sample_characters/erika.txt'
import ErikaStats from '@/database/sample_characters/erika.json'
import WinonaText from '@/database/text_files/sample_characters/winona.txt'
import WinonaStats from '@/database/sample_characters/winona.json'

export default Vue.extend({
  name: 'character-options',
  components: { AbilityTab, CustomButton, ShowCards, ShowCharacter, AbilityWidget, SpiritAbilities, ElementalArts, ElementalDisciplines },
  data() {
    return {
      selectedTab: 'basic-skills',
      tabs: [
        'basic-skills',
        'archetypes',
        'disciplines',
        'spirit-arts',
        'careers',
        'spirit-customization',
        'armor-and-clothing',
        'weapons-and-shields',
        'consumables',
        'travel-items',
        'equipment',
        'resources',
        'sample-characters',
      ],
      characters: [
        [BlaineText, Character.Deserialize(BlaineStats)],
        [ErikaText, Character.Deserialize(ErikaStats)],
        [JohnText, Character.Deserialize(JohnStats)],
        [MargaretText, Character.Deserialize(MargaretStats)],
        [MarlonText, Character.Deserialize(MarlonStats)],
        [WinonaText, Character.Deserialize(WinonaStats)],
      ],
      armorCategories: ['Armor', 'Clothing', 'Helmet', 'Boot', 'Cloak'],
      selectedArmors: ['Armor', 'Clothing', 'Helmet', 'Boot', 'Cloak'],
      weaponCategories: ['Blade', 'Lance', 'Axe', 'Blunt', 'Staff', 'Throwing', 'Bow', 'Rod', 'Sling', 'Shield', 'Improvised'],
      selectedWeapons: ['Blade', 'Lance', 'Axe', 'Blunt', 'Staff', 'Throwing', 'Bow', 'Rod', 'Sling', 'Shield', 'Improvised'],
      consumableCategories: ['Grenade', 'Poison', 'Potion'],
      selectedConsumables: ['Grenade', 'Poison', 'Potion'],
      travelItemCategories: ['Food', 'Luxury', 'Medicine', 'Camp Item'],
      selectedTravelItems: ['Food', 'Luxury', 'Medicine', 'Camp Item'],
      equipmentCategories: ['Accessory', 'Supply', 'Tool', 'Trinket'],
      selectedEquipment: ['Accessory', 'Supply', 'Tool', 'Trinket'],
      resourcesCategories: ['Herb', 'Essence'],
      selectedResources: ['Herb', 'Essence'],
      weaponTypes: ['Any', 'Light', 'Balanced', 'Heavy'],
      selectedType: 'Any',
      abilityTab: 0,
      character: new Character(),
    }
  },
  computed: {
    columns: function () {
      if (this.isMobile) return 1
      return 2
    },
    arts: function () {
      return this.$store.getters.getArts().sort((a, b) => a.Name.localeCompare(b.Name))
    },
    archetypes: function () {
      return this.$store.getters.getArchetypes().sort((a, b) => a.Name.localeCompare(b.Name))
    },
    careers: function () {
      return this.$store.getters.getCareers().sort((a, b) => a.Name.localeCompare(b.Name))
    },
    armors: function () {
      return this.$store.getters.getFilteredArmors(this.selectedArmors).sort((a, b) => a.Name.localeCompare(b.Name))
    },
    weapons: function () {
      return this.$store.getters.getFilteredWeapons(this.selectedWeapons, 'Any').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    consumables: function () {
      return this.$store.getters.getFilteredEquipments(this.selectedConsumables).sort((a, b) => a.Name.localeCompare(b.Name))
    },
    travelItems: function () {
      return this.$store.getters.getFilteredEquipments(this.selectedTravelItems).sort((a, b) => a.Name.localeCompare(b.Name))
    },
    equipment: function () {
      return this.$store.getters.getFilteredEquipments(this.selectedEquipment).sort((a, b) => a.Name.localeCompare(b.Name))
    },
    resources: function () {
      return this.$store.getters.getFilteredEquipments(this.selectedResources).sort((a, b) => a.Name.localeCompare(b.Name))
    },
    basic_stances() {
      return this.$store.getters.getStancesFromList(this.$store.getters.basicStances).sort((a, b) => a.Name.localeCompare(b.Name))
    },
    basic_abilities() {
      var arr = [
        { code: 'Maneuver', value: 0 },
        { code: 'Reaction', value: 0 },
        { code: 'Gambit', value: 0 },
      ]
      var order = ['Maneuver', 'Reaction', 'Gambit']
      var abilities = [
        ...this.$store.getters.getAbilitiesFromList(this.$store.getters.basicAbilities),
        ...this.$store.getters.getAbilitiesFromList(this.$store.getters.playerAbilities),
      ]
      abilities.sort((a, b) => {
        if (a.Type == b.Type) return a.Name.localeCompare(b.Name)
        return order.indexOf(a.Type) - order.indexOf(b.Type)
      })
      return abilities
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
.character-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.select-bar {
  background: #85704c !important;
  padding-left: 0em;
  margin-left: 0em;
}
.ability-box {
  margin-top: 0 !important;
  padding-top: 0 !important;
  margin: 0.5em;
  margin-bottom: 0em;
  border: $border--black-standard;
  background-color: $color--grey-light !important;
  height: 100%;
}
.character-tab-content {
  background-color: $color--grey-light !important;
  padding: 1em;
  border-bottom: $border--black-standard;
  border-left: $border--black-standard;
}
</style>
