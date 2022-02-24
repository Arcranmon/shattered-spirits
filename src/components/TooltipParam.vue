<template>
  <span
    ><span v-if="this.$store.getters.existsInAnyGlossary(input)"
      ><v-tooltip bottom
        ><template v-slot:activator="{ on, attrs }">
          <span
            style="white-space: pre-wrap;"
            v-bind="attrs"
            v-on="on"
            v-html="$marked.parseInline(formatInput)" /></template
        ><span
          v-html="
            $marked(this.$store.getters.getGlossaryItem(input))
          " /></v-tooltip></span
    ><span
      style="white-space: pre-wrap;"
      v-else
      v-html="$marked.parseInline(input)"
  /></span>
</template>

<script>
import Vue from "vue";
import { store } from "@/store";
export default Vue.extend({
  name: "tooltip",
  components: {},
  props: {
    input: {
      type: String,
      required: true,
    },
    italic: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    formatInput: function () {
      if (this.italic) return "*" + this.input + "*";
      return this.input;
    },
  },
});
</script>

<style scoped lang="scss">
.v-tooltip__content {
  color: black;
  font-family: $font--standard;
  font-size: $font-size--s;
  background-color: $color--off-white;
  border: $border--black-standard;
  width: 20%;
}
</style>
