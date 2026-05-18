<template>
  <div style="margin: 1em">
    <v-autocomplete
      v-model="searchItem"
      label="Search"
      :filter="nameFilter"
      :items="$store.getters.getEverything()"
      filled>
      <template v-slot:selection="{ item }">
        {{ item.Name }}
      </template>
      <template v-slot:item="{ item }">
        {{ item.Name }}
      </template></v-autocomplete
    >
    <show-appropriate-card
      :input="searchItem"
      :key="searchItem" />
  </div>
</template>

<script>
import ShowAppropriateCard from '@/components/ShowAppropriateCard.vue'
import Vue from 'vue'

export default Vue.extend({
  name: 'search',
  components: { ShowAppropriateCard },
  data() {
    return {
      searchItem: '',
    }
  },
  methods: {
    nameFilter(item, queryText, itemText) {
      const nameText = item.Name.toLowerCase()
      const searchText = queryText.toLowerCase()
      return nameText.indexOf(searchText) > -1
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
