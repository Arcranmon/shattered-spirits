<template>
  <div>
    <div v-for="ability in abilities">
      <base-widget :ability="ability" :useDivider="true" :key="ability.Name" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import BaseWidget from '@/components/BaseWidget.vue'
import AbilityWidget from '../AbilityWidget.vue'
import ChartTable from '../ChartTable.vue'
import BasicTable from '../BasicTable.vue'

export default Vue.extend({
  name: 'show-abilities',
  props: {
    abilities: {
      type: Array,
      required: true,
    },
    include_base: {
      type: Boolean,
      required: false,
    },
    type: {
      type: String,
      required: true,
    },
    categoryFilter: {
      type: String,
      required: true,
    },
    keywordFilter: {
      type: String,
      required: true,
    },
    spirit: {
      type: String,
      required: false,
    },
  },
  computed: {
    columnNumbers() {},
  },
  components: {
    AbilityWidget,
    ChartTable,
    BasicTable,
    BaseWidget,
  },
})
</script>

<style scoped lang="scss">
.card--box {
  width: 100%;
}
</style>
