<template>
  <div>
    <div v-for="ability in abilities">
      <span v-if="ability.Origin">
        <ability-widget :ability="ability" :useDivider="true" :key="ability.Name" />
        <chart-table v-if="ability.Origin.HasChart && ability.UsesChart" :chart="ability.Origin.Chart" />
        <basic-table v-if="ability.Origin.HasTable && ability.UsesChart" :chart="ability.Origin.Table" />
      </span>
      <span v-else>
        <ability-widget :ability="ability" :useDivider="true" :key="ability.Name" />
      </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
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
    classFilter: {
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
  },
})
</script>

<style scoped lang="scss">
.card--box {
  width: 100%;
}
</style>
