<template>
  <div>
    <print-page :character="$route.params.character" />
    <v-row style="page-break-after: always" />
    <print-page :character="$route.params.character.Spirit" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Combatant } from '@/class'
import PrintPage from './PrintPage.vue'
export default Vue.extend({
  name: 'print',
  components: {
    PrintPage,
  },
})
</script>

<style scoped lang="scss">
@media print {
  @page {
    size: portrait !important;
    margin: 0.25in !important;
  }
}
.print-page {
  font-size: 8pt;
  background-color: $color--grey-light;
}
</style>
