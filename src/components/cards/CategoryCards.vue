<template>
  <div style="padding: 1em;">
    <display-tooltip-text class="page--header" :string="parsedText" />
    <div v-for="disc in disciplines">
      <discipline-card :discipline="disc" :category="category" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import DisciplineCard from '@/components/cards/DisciplineCard'
import { store } from '@/store'
export default Vue.extend({
  name: 'category-cards',
  props: {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: false,
      default: '',
    },
  },
  components: {
    ShowCards,
    DisciplineCard,
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getDisciplinesByCategory(this.category)
    },
    parsedText: function () {
      return this.text
    },
  },
})
</script>

<style scoped lang="scss">
.weapon--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
