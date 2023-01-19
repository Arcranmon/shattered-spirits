<template>
  <category-cards category="Martial Form" title="Martial Skills" />
</template>

<script>
import Vue from 'vue'
import CategoryCards from '@/components/cards/CategoryCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'martial-skills',
  components: {
    CategoryCards,
  },
})
</script>
