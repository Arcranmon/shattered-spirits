<template>
  <character-manager :characters="characters" />
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import CharacterManager from '@/components/CharacterManager.vue'
export default Vue.extend({
  components: { CharacterManager },
  computed: {
    characters() {
      const store = getModule(CharacterManagementStore, this.$store)
      store.loadCharacter()
      return store.AllCharacters
    },
  },
})
</script>
