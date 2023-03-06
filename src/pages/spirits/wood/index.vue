<template>
  <discipline-cards category="Wood" :text="woodText" title="Wood Spirits" />
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import WoodText from '@/database/text_files/spirit_descriptions/wood.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'wood',
  components: {
    DisciplineCards,
  },
  computed: {
    woodText: function () {
      return this.$marked.parse(WoodText)
    },
  },
})
</script>
