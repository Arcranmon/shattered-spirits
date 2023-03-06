<template>
  <div>
    <discipline-cards type="Blademaster" />
    <discipline-cards type="Lancer" />
    <discipline-cards type="Warrior" />
    <discipline-cards type="Thrower" />
    <discipline-cards type="Sharpshooter" />
  </div>
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
