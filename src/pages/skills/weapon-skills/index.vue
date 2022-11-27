<template>
  <category-cards category="Weapon" title="Weapon Skills" />
</template>

<script>
import Vue from 'vue'
import CategoryCards from '@/components/cards/CategoryCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'skill',
  components: {
    CategoryCards,
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
