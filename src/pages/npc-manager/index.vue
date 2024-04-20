<template>
  <npc-manager />
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { NpcManagementStore } from '@/store'
import NpcManager from '@/components/NpcManager.vue'
export default Vue.extend({
  components: { NpcManager },
})
</script>
