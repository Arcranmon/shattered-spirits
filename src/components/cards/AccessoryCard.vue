<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top colored-header">
      <div class="card--header">
        <h4 style="display: inline; font-style: normal">{{ accessory.Name }}</h4>
        <div class="card--keywords">
          <b
            ><div>{{ accessory.Category }}</div>
            <span v-for="(keyword, index) in accessory.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false"
            /></span>
          </b>
        </div>
      </div>
    </div>
    <div v-if="accessory.HasTraits"><display-tooltip-text :string="accessory.TraitsHeader" /></div>
    <div v-if="accessory.HasSpecial"><display-tooltip-text :string="accessory.SpecialHeader" /></div>
    <ability-widget v-for="(ability, index) in accessory.Abilities" :ability="ability" :useDivider="true" />
    <div v-if="accessory.HasTable" class="ability-box">
      <basic-table :chart="accessory.Table" />
    </div>
    <div class="desc--box" v-if="accessory.Desc.length > 0" style="font-style: italic">{{ accessory.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Accessory } from '@/class'
import AbilityWidget from '@/components/AbilityWidget.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'accessory-card',
  components: { AbilityWidget },
  props: {
    accessory: {
      type: Accessory,
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
.colored-header {
  background-color: #a776a0;
}
</style>
