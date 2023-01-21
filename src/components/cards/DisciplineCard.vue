<template
  ><div class="discipline--box" v-bind:class="discipline.Name.replace(' ', '_')">
    <h2>{{ discipline.Name }}</h2>
    <div class="page--description">
      <b>{{ discipline.Role }}</b>
    </div>
    <display-tooltip-text class="page--description" :string="discipline.Flavor" />
    <show-cards
      :inputs="$store.getters.getStancesFromList(discipline.Stances)"
      job="Stances"
      :display_text="stance_or_style"
      :card_color="category"
      :header_color="discipline.Name"
    />
    <show-cards :inputs="$store.getters.getTechniquesFromList(discipline.Techniques)" job="Techniques" :card_color="category" :header_color="discipline.Name" />
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { Discipline } from '@/class'
import { store } from '@/store'
export default Vue.extend({
  name: 'category-cards',
  props: {
    discipline: {
      type: Discipline,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  components: {
    ShowCards,
  },
  computed: {
    stance_or_style: function () {
      if (this.discipline.Category in ['Earth', 'Wind', 'Flame', 'Wood', 'Metal', 'Water']) return 'Stances'
      return 'Styles'
    },
  },
})
</script>

<style scoped lang="scss">
.discipline--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
