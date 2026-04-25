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
      <v-tab-item>
        <show-cards
          :inputs="earthArts"
          class="character-tab-content"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="flameArts"
          class="character-tab-content"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="metalArts"
          class="character-tab-content"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="waterArts"
          class="character-tab-content"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="windArts"
          class="character-tab-content"
          :collapse="false"
          :cols="1" />
      </v-tab-item>
      <v-tab-item>
        <show-cards
          :inputs="woodArts"
          class="character-tab-content"
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
  name: 'elemental-arts',
  components: { ShowCards },
  watch: {
    elementTab: function (newVal) {
      this.artTab = 0
    },
  },
  data() {
    return {
      selectedTab: 'Elemental Arts',
      elements: ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood'],

      elementTab: 0,
      artTab: 0,
    }
  },
  computed: {
    earthArts: function () {
      return this.$store.getters.getSpiritArtsByType('Earth').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    flameArts: function () {
      return this.$store.getters.getSpiritArtsByType('Flame').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    metalArts: function () {
      return this.$store.getters.getSpiritArtsByType('Metal').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    waterArts: function () {
      return this.$store.getters.getSpiritArtsByType('Water').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    windArts: function () {
      return this.$store.getters.getSpiritArtsByType('Wind').sort((a, b) => a.Name.localeCompare(b.Name))
    },
    woodArts: function () {
      return this.$store.getters.getSpiritArtsByType('Wood').sort((a, b) => a.Name.localeCompare(b.Name))
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
