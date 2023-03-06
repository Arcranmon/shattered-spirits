<template
  ><div>
    <discipline-cards type="Land" />
    <discipline-cards type="Stone" />
    <discipline-cards type="Grounding" />
    <discipline-cards type="Stoneheart" />
    <discipline-cards type="Tremorsight" />
  </div>
</template>

<script>
import Vue from 'vue'
import DisciplineCards from '@/components/cards/DisciplineCards.vue'
import EarthText from '@/database/text_files/spirit_descriptions/earth.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'earth',
  components: {
    DisciplineCards,
  },
  computed: {
    earthText: function () {
      return this.$marked.parse(EarthText)
    },
  },
})
</script>
