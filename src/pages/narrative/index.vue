<template>
  <div style="padding: 1em">
    <h2>Narrative Play</h2>
    <display-tooltip-text :string="narrativeText" />
  </div>
</template>

<script>
import Vue from 'vue'
import NarrativeText from '@/database/text_files/narrative.txt'
import DisplayTooltipText from '@/components/DisplayTooltipText'
import { store } from '@/store'
export default Vue.extend({
  name: 'narrative-rules',
  computed: {
    narrativeText() {
      return NarrativeText
    },
  },
})
</script>

<style scoped lang="scss">
.skill--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin: auto;
  margin-top: 1em;
  width: 40%;
  align-self: center;
}
</style>
