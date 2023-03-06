<template>
  <div>
    <h2>{{ type }} Disciplines</h2>
    <display-tooltip-text class="description--block" :string="descriptions[type]" />
    <div style="padding: 1em;">
      <div v-for="disc in disciplines">
        <discipline-card :discipline="disc" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import DisciplineCard from '@/components/cards/DisciplineCard'
import Descriptions from '@/database/discipline_categories.json'
import { store } from '@/store'
export default Vue.extend({
  name: 'discipline-cards',
  props: {
    type: {
      type: String,
      required: true,
    },
  },
  components: {
    ShowCards,
    DisciplineCard,
  },
  computed: {
    disciplines: function () {
      return this.$store.getters.getDisciplinesByType(this.type)
    },
    parsedText: function () {
      return this.text
    },
  },
  data() {
    return {
      descriptions: Descriptions,
    }
  },
})
</script>

<style scoped lang="scss">
.weapon--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
.description--block {
  text-align: center;
  width: 100%;
}
</style>
