<template>
  <div class="reaction--wrapper" inline>
    <div class="reaction--underline-top">
      <div class="reaction--header">
        <h3 style="display: inline; font-style: normal;">{{ reaction.Name }}</h3>
        <div class="reaction--keywords" v-bind:class="useTextFormatting">
          <span v-if="(reaction.Desc.length > 0)" style="font-style: italic;">{{ reaction.Desc }}<br /></span>
          <b><display-tooltip-text v-if="reaction.HasKeywords" :string="reaction.KeywordsHeader" :decorate="false" /></b>
        </div>
      </div>
    </div>
    <div class="reaction--content" v-bind:class="useTextFormatting">
      <div v-if="reaction.HasCost">
        <display-tooltip-text class="reaction--format" :string="reaction.CostHeader" />
      </div>
      <div class="reaction--format" v-if="reaction.HasRequirements">
        <display-tooltip-text :string="reaction.RequirementsHeader" />
      </div>
      <div class="reaction--format" v-if="reaction.HasTrigger">
        <display-tooltip-text :string="reaction.TriggerHeader" />
      </div>
      <div class="reaction--format" v-if="reaction.HasMove">
        <display-tooltip-text :string="reaction.MoveHeader" />
      </div>
      <div class="reaction--format" v-if="reaction.HasEffect">
        <display-tooltip-text :string="reaction.EffectHeader" />
      </div>
      <div class="reaction--format" v-if="reaction.HasBoost">
        <display-tooltip-text :string="reaction.BoostHeader" />
      </div>
      <div style="height: 0.5em;" />
      <div class="expand--collapse-box-outlined" v-if="(reaction.HasChart)">
        <v-expansion-panels class="condensed" flat tile>
          <v-expansion-panel style="background-color: inherit;"
            ><v-expansion-panel-header class="expand--header-chart">Attack Profile</v-expansion-panel-header>
            <v-expansion-panel-content class="expand--body-chart"><chart-table :chart="reaction.Chart" /></v-expansion-panel-content>
          </v-expansion-panel>
        </v-expansion-panels>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Reaction } from '@/class'
import { store } from '@/store'
import ChartTable from '@/components/ChartTable.vue'

export default Vue.extend({
  name: 'reaction-card',
  props: {
    reaction: {
      type: Reaction,
      required: true,
    },
    format_text: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    useTextFormatting: function () {
      if (this.format_text) return 'reaction--text-format'
    },
  },
  components: { ChartTable },
})
</script>

<style scoped lang="scss">
.reaction--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
}
.reaction--header {
  text-align: center;
  padding-top: $space--xs;
  background-color: $color--reaction;
  color: black;
}
.reaction--underline-top {
  border-bottom: 5px solid black;
}
.reaction--keywords {
  text-align: center;
  color: black;
  padding-bottom: $space--xs;
}
.reaction--content {
  color: black;
  padding: $space--xs;
}
.reaction--text-format {
  font-size: $font-size--s;
}
.reaction--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
