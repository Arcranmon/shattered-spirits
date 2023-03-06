<template>
  <discipline-cards category="Water" :text="waterText" title="Water Spirits" />
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import WaterText from '@/database/text_files/spirit_descriptions/water.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'water',
  components: {
    DisciplineCards,
  },
  computed: {
    waterText: function () {
      return this.$marked.parse(WaterText)
    },
  },
})
</script>
