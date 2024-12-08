<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header colored-header">
        <h4>{{ talent.Name }}</h4>
      </div>
    </div>
    <div class="card--content">
      <div><display-tooltip-text :string="talent.PrereqsHeader" /></div>
      <div><display-tooltip-text :string="talent.AlwaysHeader" /></div>
      <div v-if="talent.HasPush"><display-tooltip-text :string="talent.PushHeader" /></div>
    </div>
    <br />
    <div class="desc--box" v-if="talent.Desc.length > 0" style="font-style: italic">{{ talent.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Talent } from '@/class'
import { store } from '@/store'
export default Vue.extend({
  name: 'talent-card',
  props: {
    talent: {
      type: Talent,
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
