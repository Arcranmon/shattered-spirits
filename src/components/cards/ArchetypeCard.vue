<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header colored-header">
        <h4>{{ archetype.Name }}</h4>
      </div>
    </div>
    <div class="card--content">
      <div><display-tooltip-text :string="archetype.EffectHeader" /></div>
      <div v-if="archetype.HasBonuses"><display-tooltip-text :string="archetype.BonusesHeader" /></div>
      <div><display-tooltip-text :string="archetype.ManeuverHeader" /></div>
    </div>
    <br />
    <div class="desc--box" v-if="archetype.Desc.length > 0" style="font-style: italic">{{ archetype.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Archetype } from '@/class'
import { store } from '@/store'
export default Vue.extend({
  name: 'archetype-card',
  props: {
    archetype: {
      type: Archetype,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.colored-header {
  background-color: rgb(106, 168, 76);
}
</style>
