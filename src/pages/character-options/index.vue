<template>
  <div>
    <v-select
      v-if="isMobile"
      v-model="selectedTab"
      :items="tabs"
      attach
      filled
      outlined
      style="margin: 1em; margin-bottom: -1em" />
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
            style="width: 100%">
            <v-btn
              @click="selectedTab = tab"
              class="button--style"
              depressed
              tile
              block>
              {{ tab }}
            </v-btn>
          </div>
        </v-btn-toggle>
      </v-col>
      <v-col
        style="padding-left: 0; padding-bottom: 0; margin-bottom: 0; height: 100%"
        class="background">
        <h2>{{ selectedTab }}</h2>
        <div v-if="selectedTab == 'Basic Skills'">
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
          v-if="selectedTab == 'Archetypes'"
          style="border-top: 2px solid black">
          <show-cards
            :inputs="archetypes"
            :collapse="false"
            :cols="1" />
        </div>

        <div v-if="selectedTab == 'Disciplines'">
          <v-tabs
            v-model="abilityTab"
            class="character-tabs"
            dark
            color="black"
            centered>
            <v-tab>
              <h4>Metal</h4>
            </v-tab>
            <v-tab>
              <h4>Wood</h4>
            </v-tab>
          </v-tabs>
          <v-tabs-items
            v-model="abilityTab"
            class="character-tab-content">
            <v-tab-item>
              <show-cards
                :inputs="metalDisciplines"
                :collapse="false"
                :cols="1" />
            </v-tab-item>
            <v-tab-item>
              <show-cards
                :inputs="woodDisciplines"
                :collapse="false"
                :cols="1" />
            </v-tab-item>
          </v-tabs-items>
        </div>
        <div
          class="character-tab-content"
          v-if="selectedTab == 'Talents'"
          style="border-top: 2px solid black">
          <show-cards
            :inputs="talents"
            :collapse="false"
            :cols="1" />
        </div>

        <div v-if="selectedTab == 'Armor and Accessories'">
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
        <div v-if="selectedTab == 'Weapons and Shields'">
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
        <spirit-abilities v-if="selectedTab == 'Spirit Customization'" />
        <div v-if="selectedTab == 'Equipment'">
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
import SkillTree from '@/components/SkillTree.vue'
import SpiritAbilities from '@/components/SpiritAbilities.vue'

export default Vue.extend({
  name: 'character-options',
  components: { AbilityTab, CustomButton, ShowCards, AbilityWidget, SkillTree, SpiritAbilities },
  data() {
    return {
      selectedTab: 'Basic Skills',
      selectedElement: 'Earth',
      elements: ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood'],
      tabs: ['Basic Skills', 'Archetypes', 'Disciplines', 'Talents', 'Spirit Customization', 'Armor and Accessories', 'Weapons and Shields', 'Equipment'],
      armorCategories: ['Base Armor', 'Layered Armor', 'Over Armor', 'Helmet', 'Boot', 'Accessory'],
      selectedArmors: ['Base Armor', 'Layered Armor', 'Over Armor', 'Helmet', 'Boot', 'Accessory'],
      weaponCategories: ['Blade', 'Lance', 'Axe', 'Blunt', 'Throwing', 'Bow', 'Rod', 'Sling', 'Shield', 'Improvised'],
      selectedWeapons: ['Blade', 'Lance', 'Axe', 'Blunt', 'Throwing', 'Bow', 'Rod', 'Sling', 'Shield', 'Improvised'],
      consumableCategories: ['Food', 'Grenade', 'Luxury', 'Medicine', 'Potion', 'Supply'],
      selectedConsumables: ['Food', 'Grenade', 'Luxury', 'Medicine', 'Potion', 'Supply'],
      weaponTypes: ['Any', 'Light', 'Balanced', 'Heavy'],
      selectedType: 'Any',
      abilityTab: 0,
      elementTab: 0,
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
    metalDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Metal').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    woodDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Wood').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    talents: function () {
      return this.$store.getters.getTalents()
    },
    armors: function () {
      return this.$store.getters.getFilteredArmors(this.selectedArmors)
    },
    weapons: function () {
      return this.$store.getters.getFilteredWeapons(this.selectedWeapons, 'Any')
    },
    consumables: function () {
      return this.$store.getters.getFilteredEquipments(this.selectedConsumables)
    },
    basic_stances() {
      return this.$store.getters.getStancesFromList(this.$store.getters.basicStances)
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
