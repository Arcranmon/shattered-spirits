<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header" v-bind:class="type.Name">
        <h4 style="display: inline">{{ type.Name }}</h4>
      </div>
    </div>
    <div class="card--content">
      <div v-if="type.HasEffect"><display-tooltip-text :string="type.EffectHeader" /></div>
      <div v-if="type.HasManifestEffect"><display-tooltip-text :string="type.ManifestEffectHeader" /></div>
      <div v-if="type.HasSummonEffect"><display-tooltip-text :string="type.SummonEffectHeader" /></div>
      <div v-if="type.HasSpecial"><display-tooltip-text :string="type.SpecialHeader" /></div>
      <div v-if="type.HasTraits"><display-tooltip-text :string="type.TraitsText" /></div>
    </div>
    <div class="desc--box" v-if="type.Desc.length > 0" style="font-style: italic">{{ type.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Subtype } from '@/class'
import MovementCard from '@/components/cards/MovementCard.vue'

export default Vue.extend({
  name: 'spirit-type-card',
  props: {
    type: {
      type: Subtype,
      required: true,
    },
  },
  components: { MovementCard },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
