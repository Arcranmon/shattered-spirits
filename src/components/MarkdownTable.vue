<template>
  <v-row
    ><v-col :cols="1" /><v-col :cols="10"
      ><h4>{{ title }}</h4>

      <div
        class="chart--wrapper"
        inline>
        <v-row
          no-gutters
          class="chart--row">
          <v-col
            class="chart--head"
            v-for="(header, index) in headerContentInTableForm"
            :cols="colSizes ? colSizes[index] : 0"
            :key="header">
            <b>{{ header }}</b>
          </v-col>
        </v-row>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row"
          v-for="(rowItem, rowIndex) in tableContentInTableForm"
          :class="{ OddRow: rowIndex % 2 == 1 }">
          <v-col
            class="chart--cols justify-center align-center"
            v-for="(colItem, index) in rowItem"
            :cols="colSizes ? colSizes[index] : 0"
            >{{ colItem }}
          </v-col>
        </v-row>
      </div></v-col
    ><v-col :cols="1"
  /></v-row>
</template>

<script>
import Vue from 'vue'
import BasicTable from './BasicTable.vue'

export default Vue.extend({
  name: 'markdown-table',
  components: { BasicTable },
  props: {
    title: {
      type: String,
      required: true,
    },
    colSizes: {
      type: Array,
      required: false,
    },
    header: {
      type: String,
      required: false,
    },
    tableContent: {
      type: String,
      required: true,
    },
  },
  computed: {
    headerContentInTableForm: function () {
      return this.header.split('|')
    },
    tableContentInTableForm: function () {
      var table = []
      var rows = this.tableContent.split('||')
      for (var row of rows) {
        table.push(row.split('|'))
      }
      return table
    },
  },
})
</script>

<style scoped lang="scss">
.OddRow {
  filter: brightness(85%);
}
</style>
