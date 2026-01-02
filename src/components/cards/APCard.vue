<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header" v-bind:class="getBestColor">
        <h4 style="display: inline">{{ ap.Name }}</h4>
        <br />

        <div class="card--keywords" v-bind:class="useTextFormatting">
          <b>
            <display-tooltip-text :string="ap.Header" :decorate="false" /><br />
            <span v-for="(keyword, index) in ap.Keywords" :key="index" class="keyword--box"> <display-tooltip-text :string="keyword" :decorate="false" /></span
          ></b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div v-if="ap.HasPrereqs">
        <display-tooltip-text :string="ap.PrereqsHeader" />
      </div>
      <div v-if="ap.HasCost">
        <display-tooltip-text :string="ap.CostHeader" />
      </div>
      <div v-if="ap.HasSpecial">
        <display-tooltip-text :string="ap.SpecialHeader" />
      </div>
      <div v-bind:class="useTextFormatting">
        <ability-widget
          v-for="(ability, index) in ap.Abilities"
          :ability="ability"
          :use-divider="index != 0 || ap.HasSpecial || ap.HasPrereqs || ap.HasCost"
          :showFrom="false"
        />
        <div v-if="ap.HasChap || ap.HasTable" class="ability-box">
          <chap-table v-if="ap.HasChap" :chap="ap.Chap" />
          <basic-table v-if="ap.HasTable" :chap="ap.Table" />
        </div>
      </div>
    </div>
    <div class="desc--box" v-if="ap.Desc.length > 0" style="font-style: italic">{{ ap.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { AbilityPackage } from '@/class'
import { store } from '@/store'
import AbilityWidget from '@/components/AbilityWidget.vue'
import BasicTable from '@/components/BasicTable.vue'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'ap-card',
  props: {
    ap: {
      type: AbilityPackage,
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
    getBestColor: function () {
      var overrideColors = ['Earth', 'Flame', 'Metal', 'Water', 'Wind', 'Wood', 'Archetype']
      if (overrideColors.includes(this.ap.Category)) {
        return this.ap.Category
      }
      return this.ap.Type
    },
  },
  components: { AbilityWidget, BasicTable, ChartTable },
})
</script>

<style scoped lang="scss">
.Archetype {
  background-color: rgb(106, 168, 76);
}
.Trait {
  background-color: rgb(106, 168, 76);
}
.Art {
  background-color: $color--general;
}
.Talent {
  background-color: rgb(106, 168, 76);
}
</style>
