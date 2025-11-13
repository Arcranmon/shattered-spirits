<template>
  <div style="padding: 1em">
    <display-tooltip-text :string="text" />
  </div>
</template>

<script>
import Vue from 'vue'
import Text from '@/database/text_files/civilization.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  components: {},
  computed: {
    text: function () {
      return this.$marked.parse(Text)
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
