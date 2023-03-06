<template>
  <div>
    <discipline-cards type="Freedom" />
    <discipline-cards type="Skirmisher" />
    <discipline-cards type="Juggernaut" />
    <discipline-cards type="Shield Master" />
  </div>
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'armor-disciplines',
  components: {
    DisciplineCards,
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
