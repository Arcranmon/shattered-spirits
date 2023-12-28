<template>
  <div class="spirit-box--wrapper" inline>
    <div class="spirit-box--underline-top">
      <div class="spirit-box--header" v-bind:class="header_color">
        <h4 style="display: inline;">{{ type.Name }}</h4>
        <div style="font-style: italic;">{{ type.Desc }}</div>
      </div>
    </div>
    <div class="spirit-box--content">
      <div v-if="type.HasEffect"><display-tooltip-text :string="type.EffectHeader" /></div>
      <div v-if="type.HasManifestEffect"><display-tooltip-text :string="type.ManifestEffectHeader" /></div>
      <div v-if="type.HasSummonEffect"><display-tooltip-text :string="type.SummonEffectHeader" /></div>
      <div v-if="type.HasTraits"><display-tooltip-text :string="type.TraitsText" /></div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { SpiritType } from '@/class'
import MovementCard from '@/components/cards/MovementCard.vue'

export default Vue.extend({
  name: 'spirit-type-card',
  props: {
    type: {
      type: SpiritType,
      required: true,
    },
    header_color: {
      type: String,
      required: true,
    },
  },
  components: { MovementCard },
})
</script>

<style scoped lang="scss">
.spirit-box--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  height: 100%;
  text-align: center;
  color: black;
}
.spirit-box--underline-top {
  border-bottom: 5px solid black;
}
.spirit-box--content {
  color: black;
  padding: $space--xs;
}
</style>
