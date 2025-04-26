<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header header">
        <h4 style="display: inline">{{ art.Name }}</h4>
        <br />
        <span>
          <b><display-tooltip-text :string="art.Category" /> Art</b><br />
        </span>
        <div class="card--keywords" v-bind:class="useTextFormatting">
          <b>
            <span v-for="(keyword, index) in art.Keywords" :key="index" class="keyword--box"> <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content" v-bind:class="useTextFormatting">
      <ability-widget v-for="(ability, index) in art.Abilities" :ability="ability" :use-divider="index != 0" />
      <div v-if="art.HasChart || art.HasTable" class="ability-box">
        <chart-table v-if="art.HasChart" :chart="art.Chart" />
        <basic-table v-if="art.HasTable" :chart="art.Table" />
      </div>
    </div>
    <div class="desc--box" v-if="art.Desc.length > 0" style="font-style: italic">{{ art.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Art } from '@/class'
import { store } from '@/store'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'art-card',
  props: {
    art: {
      type: Art,
      required: true,
    },
    format_text: {
      type: Boolean,
      default: false,
    },
    standalone: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    useTextFormatting: function () {
      if (this.format_text) return 'card--text-format'
    },
  },
  components: { AbilityWidget, BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.header {
  background-color: $color--general;
}
</style>
