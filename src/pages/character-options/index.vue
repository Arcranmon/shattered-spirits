<template>
  <div>
    <v-select v-if="isMobile" v-model="selectedTab" :items="tabs" attach filled outlined style="margin: 1em; margin-bottom: -1em" />
    <v-row class="background" style="margin-top: 1em" align="stretch">
      <v-col v-if="!isMobile" cols="auto" class="sidebar" style="height: 100vh">
        <v-btn-toggle borderless overflow-auto>
          <div v-for="tab in tabs" style="width: 100%">
            <v-btn @click="selectedTab = tab" class="button--style" depressed tile block>
              {{ tab }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col style="padding-left: 0; padding-bottom: 0; margin-bottom: 0; height: 100%" class="background">
        <h2>{{ selectedTab }}</h2>
        <div v-if="selectedTab == 'Basic Skills'">
          <v-tabs v-model="abilityTab" class="character-tabs" dark color="black" centered
            ><v-tab> <h4>Abilities</h4> </v-tab><v-tab> <h4>Stances</h4> </v-tab></v-tabs
          >
          <v-tabs-items v-model="abilityTab" class="character-tab-content">
            <v-tab-item
              ><v-row
                ><v-col :cols="12 / columns" v-for="ability in basic_abilities"
                  ><ability-widget :ability="ability" from="" :cardStyle="true" :key="ability.Name" class="ability-box" /></v-col></v-row
            ></v-tab-item>
            <v-tab-item><show-cards :inputs="basic_stances" :collapse="false" :cols="columns" /></v-tab-item
          ></v-tabs-items>
        </div>
        <show-cards v-if="selectedTab == 'Arts'" :inputs="arts" :collapse="false" :cols="columns" />
        <show-cards v-if="selectedTab == 'Talents'" :inputs="talents" :collapse="false" :cols="columns" />

        <div v-if="selectedTab == 'Armor and Accessories'">
          <v-row align="center" style="margin-left: 0.5em">
            <v-col cols="12"> <v-select v-model="selectedArmors" :items="armorCategories" attach label="Armor Categories" multiple filled outlined /></v-col
          ></v-row>
          <show-cards :inputs="armors" :collapse="false" />
        </div>
        <div v-if="selectedTab == 'Weapons and Shields'">
          <v-row align="center" style="margin-left: 0.5em">
            <v-col cols="6"
              ><v-select v-model="selectedWeapons" :items="weaponCategories" attach label="Weapon Categories" multiple filled outlined
                ><template v-slot:prepend-item>
                  <v-list-item ripple @mousedown.prevent
                    ><v-list-item-action>
                      <v-icon :color="selectedWeapons.length > 0 ? 'indigo darken-4' : ''"> </v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                      <v-list-item-title> Select All </v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-divider class="mt-2"></v-divider> </template
                ><template v-slot:selection="{ item, index }">
                  <span v-if="index === 0">{{ item }} </span>&nbsp;
                  <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedWeapons.length - 1 }} others) </span>
                </template></v-select
              > </v-col
            ><v-col cols="6"><v-select v-model="selectedType" :items="weaponTypes" attach label="Weapon Type" filled outlined></v-select></v-col
          ></v-row>
          <show-cards :inputs="weapons" :collapse="false" :cols="2" />
        </div>
        <div v-if="selectedTab == 'Spirit Arts'">
          <v-tabs v-model="abilityTab" class="character-tabs" dark color="black" centered
            ><v-tab v-for="element in elements">
              <h4>{{ element }}</h4>
            </v-tab></v-tabs
          >
          <v-tabs-items v-model="abilityTab" class="character-tab-content">
            <v-tab-item v-for="element in elements"> <skill-tree :element="element" /></v-tab-item>
          </v-tabs-items>
        </div>
        <spirit-abilities v-if="selectedTab == 'Spirit Customization'" />
        <show-cards v-if="selectedTab == 'Equipment'" :inputs="consumables" :collapse="false" :cols="2" />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import AbilityWidget from '@/components/AbilityWidget.vue'
import SkillTree from '@/components/SkillTree.vue'
import SpiritAbilities from '@/components/SpiritAbilities.vue'

export default Vue.extend({
  name: 'character-options',
  components: {
    CustomButton,
    ShowCards,
    AbilityWidget,
    SkillTree,
    SpiritAbilities,
  },
  data() {
    return {
      selectedTab: 'Basic Skills',
      selectedElement: 'Earth',
      elements: ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood'],
      tabs: ['Basic Skills', 'Arts', 'Talents', 'Spirit Customization', 'Armor and Accessories', 'Weapons and Shields', 'Equipment'],
      armorCategories: ['Base Armor', 'Layered Armor', 'Over Armor', 'Helmet', 'Boot', 'Accessory'],
      selectedArmors: ['Base Armor', 'Layered Armor', 'Over Armor', 'Helmet', 'Boot', 'Accessory'],
      weaponCategories: ['Blade', 'Lance', 'Axe', 'Blunt', 'Throwing', 'Bow', 'Rod', 'Sling', 'Shield', 'Improvised'],
      selectedWeapons: ['Blade', 'Lance', 'Axe', 'Blunt', 'Throwing', 'Bow', 'Rod', 'Sling', 'Shield', 'Improvised'],
      weaponTypes: ['Any', 'Light', 'Balanced', 'Heavy'],
      selectedType: 'Any',
      abilityTab: 0,
      elementTab: 0,
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
    talents: function () {
      return this.$store.getters.getTalents()
    },
    armors: function () {
      return this.$store.getters.getFilteredArmors(this.selectedArmors)
    },
    weapons: function () {
      return this.$store.getters.getFilteredWeapons(this.selectedWeapons, this.selectedType)
    },
    consumables: function () {
      return this.$store.getters.getEquipments()
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
.character-tab-content {
  margin: 1em;
  padding: 1em;
  padding-bottom: 0em;
  background-color: $color--background !important;
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
</style>
