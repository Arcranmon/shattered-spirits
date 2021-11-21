<template>
  <span
    ><span v-if="this.$store.getters.hasGlossaryItem(input)"
      ><v-tooltip class="markdown-body" bottom
        ><template v-slot:activator="{ on, attrs }">
          <span v-bind="attrs" v-on="on"
            ><vue-simple-markdown :source="formatInput" /></span></template
        ><span>{{ this.$store.getters.getGlossaryItem(input) }}</span>
      </v-tooltip>
    </span>
    <span v-else><vue-simple-markdown :source="input" /></span>
  </span>
</template>

<script>
import Vue from "vue";
import { store } from "@/store";
export default Vue.extend({
  name: "tooltip",
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
.markdown-body {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: pre-wrap !important;
  line-height: 1.25 !important;
  margin-bottom: 0;
}
.markdown-body::before {
  content: none;
}
.markdown-body::after {
  content: none;
}
</style>
