<template>
  <span>
    <span v-for="(val, index) in input">
      <span v-if="val.includes('_') && splitForKeyword">
        <span v-for="valsplit in val.split('_')">
          <tooltip
            :input="valsplit"
            :decorate="itallic" />
        </span>
      </span>
      <span v-else>
        <tooltip
          :input="val"
          :decorate="itallic" />
      </span>
      <span v-if="index != input.length - 1">
        <span v-if="commas">, </span>
      </span>
      <span v-else> </span>
    </span>
    <br />
  </span>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import Tooltip from './TooltipParam.vue'

export default Vue.extend({
  name: 'tooltipped-text',
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
    splitForKeyword: {
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
})
</script>
