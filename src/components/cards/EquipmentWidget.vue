<template>
  <div inline>
    <div class="equipment ability--head" style="width: 100%">
      <img :src="equipment.Icon" style="height: 1.5em; padding-right: 0.25em; margin-bottom: -0.25em" />
      <display-tooltip-text :string="equipment.Header" />
    </div>
    <div style="margin-top: 0.5em">
      <span v-for="(keyword, index) in equipment.Keywords" :key="index" class="keyword--box" style="margin-left: 0.5em"
        ><b> <display-tooltip-text :string="keyword.replace('/', '_/_')" :decorate="false" /></b>
      </span>
    </div>
    <div class="card--content">
      <span v-if="equipment.Desc.length > 0" style="font-style: italic">{{ equipment.Desc }}<br /></span>
      <display-tooltip-text :string="equipment.Summary" /><br />
      <display-tooltip-text v-if="equipment.HasHands" :string="equipment.HandsHeader" />
      <div v-if="equipment.HasTraits"><display-tooltip-text :string="equipment.TraitsHeader" /></div>
      <div v-if="equipment.HasEffect"><display-tooltip-text :string="equipment.EffectHeader" /></div>
      <div v-if="equipment.HasSpecial"><display-tooltip-text :string="equipment.SpecialHeader" /></div>
      <div v-for="(ability, index) in equipment.Abilities" :key="index" class="ability-box" style="padding-bottom: 0.25em; padding-left: 3em">
        <ability-widget :ability="ability" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Equipment } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import ChartTable from '@/components/ChartTable.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'equipment-widget',
  components: { AbilityWidget, ChartTable },
  props: {
    equipment: {
      type: Equipment,
      required: true,
    },
    on_sheet: {
      type: Boolean,
      required: false,
      default: false,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
})
</script>

<style scoped lang="scss">
.equipment {
  background-color: #a776a0;
}
.ability--head {
  border-top-left-radius: 1em;
  padding-left: 0.5em;
  font-size: 1.05em;
  font-weight: bold;
  align-items: center;
}
</style>
