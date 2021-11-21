<template>
  <span>
    <span v-for="(val, index) in input"
      ><tooltip :input="val" :italic="itallic" />
      <span v-if="index != input.length - 1"
        ><span v-if="commas">, </span></span
      ></span
    ><br />
  </span>
</template>

<script>
import Vue from "vue";
import { store } from "@/store";
import Tooltip from "./TooltipParam.vue";

export default Vue.extend({
  name: "tooltipped-text",
  props: {
    input: {
      type: Array,
      required: true,
    },
    itallic: {
      type: Boolean,
      required: false,
      default: false,
    },
    commas: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: { Tooltip },
});
</script>
