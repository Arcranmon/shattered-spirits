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
    inline: {
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
        var partitioned = split_input[index].split('/')
        if (partitioned.length == 4) {
          split_input[index] = '<tooltip input="' + split_input[index] + '" :partitioned="true" :decorate="' + this.decorate + '"></tooltip>'
        }
        if (
          this.$store.getters.existsInAnyGlossary(split_input[index]) ||
          this.$store.getters.isArchetype(split_input[index]) ||
          this.$store.getters.isFeature(split_input[index]) ||
          this.$store.getters.isTalent(split_input[index]) ||
          this.$store.getters.isTerrain(split_input[index]) ||
          this.$store.getters.isManeuver(split_input[index]) ||
          this.$store.getters.isStance(split_input[index]) ||
          this.$store.getters.isStatus(split_input[index]) ||
          this.$store.getters.isTechnique(split_input[index]) ||
          this.$store.getters.isManeuver(split_input[index]) ||
          this.$store.getters.isArmor(split_input[index]) ||
          this.$store.getters.isWeapon(split_input[index]) ||
          this.$store.getters.isArt(split_input[index]) ||
          this.$store.getters.isTrait(split_input[index]) ||
          this.$store.getters.isBasicAbility(split_input[index])
        ) {
          split_input[index] = '<tooltip input="' + split_input[index] + '" :decorate="' + this.decorate + '"></tooltip>'
        }
      }
      var merged_input = split_input.join('')
      if (this.inline) return "<span style='display: inline-block;'>" + this.$marked.parse(merged_input) + '</span>'
      else return "<div style='display: inline-block;'>" + this.$marked.parse(merged_input) + '</div>'
    },
  },
})
