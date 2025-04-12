<template>
  <div class="background">
    <h2>Basic Skills</h2>
    <div style="text-align: center; width: 100%">
      <p>The below tabs contain all the Techniques, Attacks, Actions, Stunts, Reactions, and Gambits that all characters have access to by default.</p>
      <br />
    </div>
    <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered
      ><v-tab> <h4>Techniques</h4> </v-tab><v-tab> <h4>Stances</h4> </v-tab><v-tab> <h4>Arts</h4> </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="character-tab-content">
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Technique')" /><show-cards
          :inputs="this.$store.getters.getTechniquesFromList(this.$store.getters.basicTechniques)"
          job="Techniques"
          :collapse="false"
      /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stance')" /><show-cards
          :inputs="this.$store.getters.getStancesFromList(this.$store.getters.basicStances)"
          job="Stances"
          :collapse="false"
      /></v-tab-item>
      <v-tab-item>
        <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Art')" />
        <show-cards :inputs="this.$store.getters.getArtsFromList(this.$store.getters.playerArts)" job="Arts" :collapse="false" /></v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-techniques',
  data() {
    return { tab: 0 }
  },
  components: {
    ShowCards,
  },
  computed: {
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
    },
    use_single() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-single'
    },
    use_trio() {
      if (this.isMobile) {
        return ''
      }
      return ''
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
  margin-top: 1em;
  background-color: $color--background !important;
}
</style>
