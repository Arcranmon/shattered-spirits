import Vue from 'vue'

Vue.component('DisplayTooltipText', {
  props: {
    string: {
      required: true,
      type: String,
    },
    decorate: {
      required: false,
      type: Boolean,
      default: true,
    },
  },
  render(h) {
    const render = {
      template: this.formattedText,
    }
    return h(render)
  },
  computed: {
    formattedText() {
      var split_input = this.string.split('_')
      for (var index in split_input) {
        if (
          this.$store.getters.existsInAnyGlossary(split_input[index]) ||
          this.$store.getters.isObstacle(split_input[index]) ||
          this.$store.getters.isTerrain(split_input[index]) ||
          this.$store.getters.isAffliction(split_input[index]) ||
          this.$store.getters.isEnhancement(split_input[index]) ||
          this.$store.getters.isStance(split_input[index]) ||
          this.$store.getters.isStatus(split_input[index]) ||
          this.$store.getters.isTechnique(split_input[index]) ||
          this.$store.getters.isReaction(split_input[index]) ||
          this.$store.getters.isArmor(split_input[index]) ||
          this.$store.getters.isWeapon(split_input[index])
        ) {
          split_input[index] = '<tooltip input="' + split_input[index] + '" :decorate="' + this.decorate + '"></tooltip>'
        }
      }
      var merged_input = split_input.join('')
      return "<span style='display: inline-block;'>" + this.$marked.parse(merged_input) + '</span>'
    },
  },
})
