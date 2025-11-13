<template>
  <div style="padding: 1em">
    <display-tooltip-text :string="greenvaleText" />
  </div>
</template>

<script>
import Vue from 'vue'
import GreenvaleText from '@/database/text_files/greenvale.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  components: {},
  computed: {
    greenvaleText: function () {
      return this.$marked.parse(GreenvaleText)
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
