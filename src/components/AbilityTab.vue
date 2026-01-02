<template>
  <v-row>
    <v-col cols="2" />
    <v-col cols="4"> <v-select v-model="classFilter" label="Class Filter" item-text="Name" :items="classOptions" filled /></v-col>
    <v-col cols="4">
      <v-select v-model="keywordFilter" label="Keyword Filter" item-text="Name" :items="character.AllKeywords(abilityType)" filled />
    </v-col>
    <v-col cols="2" />
    <show-abilities
      :abilities="abilities"
      :type="abilityType"
      :include_base="true"
      :classFilter="classFilter"
      :keywordFilter="keywordFilter"
      :key="classFilter && keywordFilter"
  /></v-row>
</template>

<script>
import Vue from 'vue'
import Character from '@/class'
import ShowAbilities from '@/components/cards/ShowAbilities.vue'
export default Vue.extend({
  name: 'ability-tab',
  components: { ShowAbilities },
  props: {
    character: {
      type: Character,
      required: true,
    },
    abilityType: {
      required: true,
    },
    spirit: {
      required: false,
      default: false,
    },
  },
  computed: {
    classOptions() {
      if (this.abilityType == 'Attack') {
        return ['All', 'Light', 'Balanced', 'Heavy']
      } else if (this.abilityType == 'Gambit') {
        return ['All', 'Offensive', 'Defensive']
      } else {
        return ['All', 'Offensive', 'Defensive', 'Utility', 'Mobility']
      }
    },
    abilities() {
      if (this.spirit) {
        return this.character.Spirit.FilteredAbilities(this.abilityType, this.classFilter, this.keywordFilter)
      }
      return this.character.FilteredAbilities(this.abilityType, this.classFilter, this.keywordFilter)
    },
  },
  data() {
    return {
      classFilter: 'All',
      keywordFilter: 'All',
    }
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
