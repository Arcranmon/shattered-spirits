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
    basic: {
      required: false,
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
      if (this.abilityType == 'Skill' || 'Camp' || 'Travel') {
        var categories = [this.abilityType]
        if (this.spirit) {
          var skills = this.character.Spirit.FilteredAbilities('Talent', categories, 'All')
          skills = skills.concat(this.character.Spirit.FilteredAbilities('Power', categories, 'All'))
          skills = skills.concat(this.character.Spirit.FilteredAbilities('Boon', categories, 'All'))
          skills = skills.concat(this.character.Spirit.FilteredAbilities('Action', categories, 'All'))
          return skills
        }
        if (this.basic) return this.character.FilteredAbilities('Action', categories, 'All')
        return [
          ...this.character.FilteredAbilities('Talent', categories, 'All'),
          ...this.character.FilteredAbilities('Power', categories, 'All'),
          ...this.character.FilteredAbilities('Boon', categories, 'All'),
          ...this.character.FilteredAbilities('Action', categories, 'All'),
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
