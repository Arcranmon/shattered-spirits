<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top Armor">
      <div class="card--header">
        <h4 style="display: inline; font-style: normal">{{ armor.Name }}</h4>
        <div class="card--keywords">
          <b
            ><div>{{ armor.Category }}</div>
            <span v-for="(keyword, index) in armor.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false"
            /></span>
          </b>
        </div>
      </div>
    </div>
    <div class="card--content">
      <div><display-tooltip-text :string="armor.ArmorSummary" /></div>
      <div v-if="armor.HasParry"><display-tooltip-text :string="armor.ParryHeader" /></div>
      <div v-if="armor.HasTraits"><display-tooltip-text :string="armor.TraitsHeader" /></div>
      <div v-if="armor.HasSpecial"><display-tooltip-text :string="armor.SpecialHeader" /></div>
      <div v-if="armor.HasSacrifice"><display-tooltip-text :string="armor.SacrificeHeader" /></div>
    </div>
    <div class="desc--box" v-if="armor.Desc.length > 0" style="font-style: italic">{{ armor.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Armor } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'armor-card',
  props: {
    armor: {
      type: Armor,
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
.a {
}
</style>
