<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header">
        <h4 style="display: inline">{{ trait.Name }}</h4>
        <div class="card--keywords" v-bind:class="useTextFormatting">
          <b>
            <span v-for="(keyword, index) in trait.Keywords" :key="index" class="keyword--box">
              <display-tooltip-text :string="keyword" :decorate="false"
            /></span>
          </b>
        </div>
      </div>
    </div>
    <div class="card--content card--format">
      <div><display-tooltip-text :string="trait.RequirementsHeader" /></div>
      <div><display-tooltip-text :string="trait.CostHeader" /></div>
      <div><display-tooltip-text :string="trait.EffectHeader" /></div>
    </div>
    <div class="desc--box" v-if="trait.Desc.length > 0" style="font-style: italic">{{ trait.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Trait } from '@/class'

export default Vue.extend({
  name: 'trait-card',
  props: {
    trait: {
      type: Trait,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
