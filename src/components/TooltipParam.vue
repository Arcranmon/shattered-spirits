<template>
  <span
    ><span v-if="this.$store.getters.existsInAnyGlossary(input)"
      ><v-tooltip bottom nudge-top="8"
        ><template v-slot:activator="{ on, attrs }">
          <span
            style="white-space: pre-wrap;"
            v-bind:class="{ dotted: decorate }"
            v-bind="attrs"
            v-on="on"
            v-html="$marked.parseInline(input)" /></template
        ><span>{{
          this.$store.getters.getGlossaryItem(input)
        }}</span></v-tooltip
      ></span
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
    decorate: {
      type: Boolean,
      required: false,
      default: false,
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
  opacity: 1;
}
.v-tooltip__content.menuable__content__active {
  opacity: 1 !important;
}
</style>
