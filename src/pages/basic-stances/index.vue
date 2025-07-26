<template>
  <div class="background">
    <h2>Basic Stances</h2>
    <display-tooltip-text class="description-text" :string="$store.getters.getGlossaryItem('Stance')" /><show-cards
      :inputs="this.$store.getters.getStancesFromList(this.$store.getters.basicStances)"
      job="Stances"
      :collapse="false"
    />
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-stances',
  data() {
    return { tab: 0 }
  },
  components: {
    ShowCards,
  },
  computed: {
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
    },
    use_single() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-single'
    },
    use_trio() {
      if (this.isMobile) {
        return ''
      }
      return ''
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
.character-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.character-tab-content {
  margin-top: 1em;
  background-color: $color--background !important;
}
</style>
