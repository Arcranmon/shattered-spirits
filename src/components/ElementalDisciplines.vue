<template>
  <div>
    <v-tabs
      v-model="elementTab"
      class="character-tabs-nested"
      dark
      color="black"
      centered>
      <v-tab v-for="element in elements">
        <h4>{{ element }}</h4>
      </v-tab>
    </v-tabs>
    <v-tabs-items v-model="elementTab">
      <v-tab-item v-for="element in elements">
        <v-tabs
          v-model="disciplineTab"
          light
          centered>
          <v-tab v-for="subdiscipline in subdisciplines[elementTab]">
            <h4>{{ subdiscipline }}</h4>
          </v-tab>
        </v-tabs>
        <v-tabs-items
          v-model="disciplineTab"
          class="character-tab-content-background">
          <v-tab-item
            class="character-tab-content"
            v-for="subdiscipline in subdisciplines[elementTab]">
            <show-cards
              :inputs="
                $store.getters
                  .getDisciplinesByType(element)
                  .sort((a, b) => a.Name.localeCompare(b.Name))
                  .filter((x) => x.Name.includes(subdiscipline))
              "
              :collapse="false"
              :cols="1" /></v-tab-item
        ></v-tabs-items>
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="flameDisciplines"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="metalDisciplines"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="waterDisciplines"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="windDisciplines"
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
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import ShowCards from '@/components/cards/ShowCards.vue'

export default Vue.extend({
  name: 'character-options',
  components: { ShowCards },
  watch: {
    elementTab: function (newVal) {
      this.disciplineTab = 0
    },
  },
  data() {
    return {
      selectedTab: 'Elemental Disciplines',
      elements: ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood'],
      subdisciplines: [
        ['Earthsense', 'Landcraft', 'Mountaincraft'],
        ['Flamesense', 'Blazecraft', 'Furnacecraft'],
        ['Metalsense', 'Lodecraft', 'Anvilcraft'],
        ['Watersense', 'Tidecraft', 'Frostcraft'],
        ['Windsense', 'Galecraft', 'Stormcraft'],
        ['Woodsense', 'Barkcraft', 'Bloomcraft'],
      ],
      elementTab: 0,
      disciplineTab: 0,
    }
  },
  computed: {
    flameDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Flame').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    metalDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Metal').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    waterDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Water').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    windDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Wind').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    woodDisciplines: function () {
      return this.$store.getters.getDisciplinesByType('Wood').sort((a, b) => a.Name.localeCompare(b.Name))
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
