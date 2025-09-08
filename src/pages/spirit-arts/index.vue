<template>
  <div>
    <h2>Spirit Arts</h2>
    <v-row class="page">
      <v-col cols="auto" class="sidebar">
        <v-btn-toggle borderless overflow-auto>
          <div style="width: 100%">
            <v-btn @click="selectedElement = 'Metal'" class="button--style" depressed tile block>
              <img class="image--icon-size" src="@/assets/disciplines/Metal.svg" />Metal
            </v-btn>
          </div>
          <div style="width: 100%">
            <v-btn @click="selectedElement = 'Flame'" class="button--style" depressed tile block>
              <img class="image--icon-size" src="@/assets/disciplines/Flame.svg" />Flame
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col> <skill-tree v-if="selectedElement" :element="selectedElement" /></v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import ArtCard from '@/components/cards/ArtCard'
import SkillTree from '@/components/SkillTree.vue'

export default Vue.extend({
  name: 'spirit-arts',
  components: { ArtCard, SkillTree },
  data() {
    return {
      artCategories: ['Flame', 'Earth', 'Metal', 'Water', 'Wind', 'Wood'],
      selectedCategories: [],
      artTypes: {
        Earth: ['Land', 'Mountain'],
        Water: ['Tide', 'Tundra'],
        Flame: ['Blaze', 'Detonation'],
        Wind: ['Gale', 'Storm'],
        Wood: ['Bloom'],
      },
      selectedTypes: [],
      selectedElement: null,
    }
  },
  computed: {
    selectableTypes: function () {
      var selectable_types = []
      for (var cat of this.selectedCategories) {
        selectable_types.push(...this.artTypes[cat])
      }
      return selectable_types
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
