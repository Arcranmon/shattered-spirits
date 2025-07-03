<template>
  <div>
    <div v-for="[art, ability] in abilities">
      <ability-widget :ability="ability" :from="art.Name" :useDivider="true" :key="ability.Name" />
      <chart-table v-if="art.HasChart && ability.UsesChart" :chart="art.Chart" />
      <basic-table v-if="art.HasTable && ability.UsesChart" :chart="art.Table" />
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
    inputs: {
      type: Array,
      required: true,
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
  },
  computed: {
    abilities() {
      var abilities = []
      for (var input of this.inputs) {
        for (var ability of input.Abilities) {
          var typeMatches = this.type == 'All' || ability.Type == this.type
          var classMatches = this.classFilter == 'All' || this.classFilter == ability.Class
          var keywordMatches = this.keywordFilter == 'All' || ability.Keywords.includes(this.keywordFilter)
          if (typeMatches && classMatches && keywordMatches) {
            abilities.push([input, ability])
          }
        }
      }
      abilities.sort((a, b) => a[1].Name.localeCompare(b[1].Name))
      return abilities
    },
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
