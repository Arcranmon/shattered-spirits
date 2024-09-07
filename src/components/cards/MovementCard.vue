<template>
  <div class="chart--wrapper" inline>
    <v-container fluid>
      <v-row no-gutters class="chart--row">
        <v-col class="chart--head" cols="12"
          ><b
            ><span v-if="!on_sheet">{{ movement.Name }}</span> Movement Chart</b
          ></v-col
        ></v-row
      ><v-row align="stretch" no-gutters class="chart--row" v-if="!on_sheet && movement.HasEncumbrance"
        ><v-col class="chart--cols" cols="6"><b>Maximum Weight</b></v-col
        ><v-col class="chart--cols chart--cols-right" cols="6">{{ movement.Encumbrance }}</v-col></v-row
      ><v-row align="stretch" no-gutters class="chart--row" v-if="!on_sheet"
        ><v-col class="chart--cols" cols="6"><b>Movement</b></v-col
        ><v-col class="chart--cols chart--cols-right" cols="6">{{ movement.Movement }}</v-col></v-row
      ><v-row align="stretch" no-gutters class="chart--row" v-if="movement.HasManifestRange"
        ><v-col class="chart--cols" cols="6"><b>Manifest Range</b></v-col
        ><v-col class="chart--cols chart--cols-right" cols="6"><display-tooltip-text :string="movement.ManifestRange" /></v-col
      ></v-row>
      <v-row align="stretch" no-gutters class="chart--row"
        ><v-col class="chart--cols" cols="6"><b>Jump</b></v-col
        ><v-col class="chart--cols chart--cols-right" cols="6">{{ movement.Jump }}</v-col></v-row
      ><v-row align="stretch" no-gutters class="chart--row" v-if="!on_sheet"
        ><v-col class="chart--cols" cols="6"><b>Traits</b></v-col
        ><v-col class="chart--cols chart--cols-right" cols="6"><display-tooltip-text :string="movement.TraitsList" /></v-col></v-row
    ></v-container>
  </div>
</template>
<script>
import Vue from 'vue'
import { Movement } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'movement-card',
  props: {
    movement: {
      type: Movement,
      required: true,
    },
    on_sheet: {
      type: Boolean,
      default: false,
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
