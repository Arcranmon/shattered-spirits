<template>
  <v-row>
    <v-col cols="2" />
    <v-col cols="4">
      <v-select
        v-model="categoryFilter"
        label="Category Filter"
        item-text="Name"
        :items="categoryOptions"
        filled />
    </v-col>
    <v-col cols="4">
      <v-select
        v-model="keywordFilter"
        label="Keyword Filter"
        item-text="Name"
        :items="character.AllKeywords(abilityType)"
        filled />
    </v-col>
    <v-col cols="2" />
    <show-abilities
      :abilities="abilities"
      :type="abilityType"
      :include_base="true"
      :categoryFilter="categoryFilter"
      :keywordFilter="keywordFilter"
      :key="categoryFilter && keywordFilter"
      style="width: 100%" />
  </v-row>
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
    categoryOptions() {
      if (this.abilityType == 'Attack') {
        return ['All', 'Light', 'Balanced', 'Heavy']
      } else if (this.abilityType == 'Gambit') {
        return ['All', 'General', 'Offensive', 'Defensive']
      } else if (this.abilityType == 'Skill') {
        return ['All', 'Camp', 'Downtime', 'Skill', 'Travel']
      } else {
        return ['All', 'Offensive', 'Defensive', 'Utility', 'Mobility']
      }
    },
    abilities() {
      if (this.abilityType == 'Skill') {
        if (this.spirit) {
          var skills = this.character.Spirit.FilteredAbilities('Talent', this.categoryFilter, 'All')
          skills = skills.concat(this.character.Spirit.FilteredAbilities('Power', this.categoryFilter, 'All'))
          skills = skills.concat(this.character.Spirit.FilteredAbilities('Boon', this.categoryFilter, 'All'))
          return skills
        }
        return [
          ...this.character.FilteredAbilities('Talent', this.categoryFilter, 'All'),
          ...this.character.FilteredAbilities('Power', this.categoryFilter, 'All'),
          ...this.character.FilteredAbilities('Boon', this.categoryFilter, 'All'),
        ]
      }
      if (this.spirit) {
        return this.character.Spirit.FilteredAbilities(this.abilityType, this.categoryFilter, this.keywordFilter)
      }
      return this.character.FilteredAbilities(this.abilityType, this.categoryFilter, this.keywordFilter)
    },
  },
  data() {
    return {
      categoryFilter: 'All',
      keywordFilter: 'All',
    }
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
