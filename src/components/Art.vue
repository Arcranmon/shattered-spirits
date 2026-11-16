<template>
  <div style="width: 100%">
    <v-container
      fluid
      style="padding: 0px">
      <v-tabs
        v-model="artTab"
        class="character-tabs-nested"
        dark
        color="black"
        centered>
        <v-tab
          v-for="art in arts"
          :key="art">
          <h4>{{ art }}</h4>
        </v-tab>
      </v-tabs>
      <v-tabs-items
        v-model="artTab"
        class="character-tab-content-background">
        <v-tab-item
          v-for="art in arts"
          :key="art"
          class="character-tab-content">
          <show-cards
            :inputs="$store.getters.getArtsByType(art).sort((a, b) => a.Name.localeCompare(b.Name))"
            :collapse="false"
            :cols="1"
        /></v-tab-item> </v-tabs-items
    ></v-container>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'

export default Vue.extend({
  name: 'character-options',
  components: { ShowCards },
  data() {
    return {
      selectedTab: 'Arts',
      arts: ['Martial', 'Crafting', 'Technical', 'Skill', 'Weapon', 'Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood', 'Tag Team'],
      artTab: 0,
    }
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
