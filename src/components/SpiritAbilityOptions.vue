<template>
  <div>
    <div style="padding: 2em; align-self: center; margin: auto">
      <spirit-type-card :type="this.$store.getters.getSpiritType(element + ' Spirit')" />
    </div>
    <show-cards
      display_text="Base Traits"
      :inputs="this.$store.getters.getSpiritTraitsByTagAndCost(element, 'None')"
      :cols="1" />
    <show-cards
      display_text="Common Traits (1 Point)"
      :inputs="this.$store.getters.getSpiritTraitsByTagAndCost(element, '1')"
      :cols="1" />
    <show-cards
      display_text="Uncommon Traits (2 Points)"
      :inputs="this.$store.getters.getSpiritTraitsByTagAndCost(element, '2')"
      :cols="1" />
    <show-cards
      display_text="Rare Traits (3 Points)"
      :inputs="this.$store.getters.getSpiritTraitsByTagAndCost(element, '3')"
      :cols="1" />
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import SpiritTypeCard from '@/components/cards/SpiritTypeCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'spirit-abilities',
  props: {
    element: { required: false, type: String },
  },
  data() {
    return {
      tab: 0,
    }
  },
  computed: {
    basicTraits: function () {
      return [this.element + 'born']
    },
  },
  components: { ShowCards, SpiritTypeCard },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.centered-single {
  justify-content: center;
  margin: auto;
  width: 33.33%;
}
.centered-duo {
  justify-content: center;
  margin: auto;
  width: 66.66%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
.spirit-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.spirit-tab-content {
  background-color: $color--background !important;
}
.spirit-box--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  height: 100%;
  text-align: center;
  color: black;
}
.spirit-box--underline-top {
  border-bottom: 5px solid black;
}
.spirit-box--content {
  color: black;
  padding: $space--xs;
}
.spirit-box--text-format {
  font-size: $font-size--m;
}
.spirit-box--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
