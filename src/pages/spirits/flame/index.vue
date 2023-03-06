<template>
  <discipline-cards category="Flame" :text="flameText" title="Flame Spirits" />
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import FlameText from '@/database/text_files/spirit_descriptions/flame.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'flame',
  components: {
    DisciplineCards,
  },
  computed: {
    flameText: function () {
      return this.$marked.parse(FlameText)
    },
  },
})
</script>
