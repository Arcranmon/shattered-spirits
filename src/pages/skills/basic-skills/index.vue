<template
  ><div>
    <h2>Reactions</h2>
    <show-cards
      :inputs="[
        $store.getters.getReaction('Reorient'),
        $store.getters.getReaction('Deflect'),
        $store.getters.getReaction('Dodge'),
        $store.getters.getReaction('Opportunity Attack'),
        $store.getters.getReaction('Counter'),
      ]"
      job="Reactions"
      :collapse="false"
    />
    <h2>Techniques</h2>
    <show-cards :inputs="basics" job="Techniques" :collapse="false" />
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-techniques',
  components: {
    ShowCards,
  },
  computed: {
    basics: function () {
      var disc = this.$store.getters.getDiscipline('Basic')
      return this.$store.getters.getTechniquesFromList(disc.Techniques)
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
