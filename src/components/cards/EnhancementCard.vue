<template>
  <div class="enhancement--wrapper" inline>
    <div class="enhancement--underline-top">
      <div class="enhancement--header">
        <h3 style="display: inline; font-style: normal;">{{ enhancement.Name }}</h3>
        <div class="enhancement--keywords" v-bind:class="useTextFormatting">
          <span v-if="(enhancement.Desc.length > 0)" style="font-style: italic;">{{ enhancement.Desc }}<br /></span>
          <b><display-tooltip-text v-if="enhancement.HasKeywords" :string="enhancement.KeywordsHeader" :decorate="false" /></b>
        </div>
      </div>
    </div>
    <div class="enhancement--content" v-bind:class="useTextFormatting">
      <div class="enhancement--format" v-if="enhancement.HasAp">
        <display-tooltip-text :string="enhancement.ApHeader" />
      </div>
      <div v-if="enhancement.HasReqs">
        <display-tooltip-text class="enhancement--format" :string="enhancement.ReqsHeader" />
      </div>
      <div v-if="enhancement.HasCost">
        <display-tooltip-text class="enhancement--format" :string="enhancement.CostHeader" />
      </div>
      <div class="enhancement--format" v-if="enhancement.HasMove">
        <display-tooltip-text :string="enhancement.MoveHeader" />
      </div>
      <div class="enhancement--format" v-if="enhancement.HasEffect">
        <display-tooltip-text :string="enhancement.EffectHeader" />
      </div>
      <div class="enhancement--format" v-if="enhancement.HasSpecial">
        <display-tooltip-text :string="enhancement.SpecialHeader" />
      </div>
      <div class="enhancement--format" v-if="enhancement.HasBoost">
        <display-tooltip-text :string="enhancement.BoostHeader" />
      </div>
      <div style="height: 0.5em;" />
      <span v-if="(enhancement.HasChart)"><chart-table :chart="enhancement.Chart" /> </span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Enhancement } from '@/class'
import { store } from '@/store'
import ChartTable from '@/components/ChartTable.vue'
import Tooltip from '@/components/TooltipParam.vue'

export default Vue.extend({
  name: 'enhancement-card',
  props: {
    enhancement: {
      type: Enhancement,
      required: true,
    },
    format_text: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    useTextFormatting: function () {
      if (this.format_text) return 'enhancement--text-format'
    },
  },
  components: { ChartTable, Tooltip },
})
</script>

<style scoped lang="scss">
.enhancement--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  margin: 1em;
}
.enhancement--header {
  background-color: $color--enhancement;
  text-align: center;
  color: black;
}
.enhancement--underline-top {
  border-bottom: 5px solid black;
}
.enhancement--keywords {
  text-align: center;
  color: black;
  padding-bottom: $space--xs;
}
.enhancement--content {
  color: black;
  padding: $space--xs;
}
.enhancement--text-format {
  font-size: $font-size--s;
}
.enhancement--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
