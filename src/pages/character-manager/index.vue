<template>
  <character-manager />
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import CharacterManager from '@/components/CharacterManager.vue'
export default Vue.extend({
  components: { CharacterManager },
})
</script>
