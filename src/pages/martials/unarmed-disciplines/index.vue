<template>
  <discipline-cards type="Unarmed" />
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'skill',
  components: {
    DisciplineCards,
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
