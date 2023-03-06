<template>
  <discipline-cards category="Metal" :text="metalText" title="Metal Spirits" />
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import MetalText from '@/database/text_files/spirit_descriptions/metal.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'earth',
  components: {
    DisciplineCards,
  },
  computed: {
    metalText: function () {
      return this.$marked.parse(MetalText)
    },
  },
})
</script>
