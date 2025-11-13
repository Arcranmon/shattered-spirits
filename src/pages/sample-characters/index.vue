<template>
  <div style="padding: 1em">
    <display-tooltip-text :string="text" />
  </div>
</template>

<script>
import Vue from 'vue'
import Text from '@/database/text_files/sample_characters.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'sample-characters',
  components: {},
  computed: {
    text: function () {
      return Text
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
