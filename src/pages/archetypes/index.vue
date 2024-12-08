<template>
  <div>
    <h2>Archetypes</h2>
    <v-row class="page">
      <v-col cols="auto" class="sidebar">
        <v-btn-toggle borderless overflow-auto
          ><div v-for="archetype in archetypes" style="width: 100%" v-bind:key="archetype.Name">
            <v-btn @click="selectedArchetype = archetype" class="button--style" depressed tile block>
              <img class="image--icon-size" :src="archetype.Icon" />{{ archetype.Name }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col> <archetype-card v-if="selectedArchetype != null" :archetype="selectedArchetype" :key="selectedArchetype.Name" style="width: 40em" /></v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import ArchetypeCard from '@/components/cards/ArchetypeCard'

export default Vue.extend({
  name: 'archetypes',
  components: { ArchetypeCard },
  data() {
    return {
      selectedArchetype: null,
    }
  },
  computed: {
    archetypes: function () {
      return this.$store.getters.getArchetypes().sort((a, b) => a.Name.localeCompare(b.Name))
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
