<template>
  <div style="padding: 1em;">
    <display-tooltip-text :string="worldText" />
  </div>
</template>

<script>
import Vue from 'vue'
import WorldText from '@/database/text_files/world_of_deskar.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  components: {},
  computed: {
    worldText: function () {
      return this.$marked.parse(WorldText)
    },
    jennaArt: function () {
      return require('@/assets/art/Jenna.png')
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
