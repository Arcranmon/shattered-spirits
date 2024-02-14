<template>
  <div>
    <h2>Arts</h2>
    <span v-if="isMobile">
      <v-expansion-panels style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header>Filters </v-expansion-panel-header>
        </v-expansion-panel> </v-expansion-panels
      ><br /><v-select
        v-model="selectedArt"
        :items="arts"
        item-text="Name"
        return-object
        attach
        label="Selected Art"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em;"
      ></v-select
      ><art-card v-if="selectedArt != null" :art="selectedArt"
    /></span>
    <span v-else>
      <v-row align="center" style="margin-left: 0.5em; margin-right: 0.5em;">
        <v-col cols="3"
          ><v-select v-model="selectedTypes" :items="artTypes.slice()" attach label="Art Types" multiple filled outlined>
            <template v-slot:prepend-item>
              <v-list-item ripple @mousedown.prevent @click="toggle"
                ><v-list-item-action>
                  <v-icon :color="selectedTypes.length > 0 ? 'indigo darken-4' : ''">
                    {{ icon }}
                  </v-icon>
                </v-list-item-action>
                <v-list-item-content>
                  <v-list-item-title>
                    Select All
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
              <v-divider class="mt-2"></v-divider> </template
            ><template v-slot:selection="{ item, index }">
              <span v-if="index === 0">{{ item }} </span>&nbsp;
              <span v-if="index === 1" class="black--text text-caption"> (+{{ selectedTypes.length - 1 }} others) </span>
            </template></v-select
          >
        </v-col></v-row
      >
      <v-row class="page">
        <v-col cols="auto" class="sidebar">
          <v-btn-toggle borderless overflow-auto
            ><div v-for="art in arts" style="width: 100%;" v-bind:key="art.Name">
              <v-btn @click="selectedArt = art" class="button--style" depressed tile block>
                <img class="image--icon-size" :src="art.Icon" />{{ art.Name }}
              </v-btn>
            </div>
          </v-btn-toggle></v-col
        >
        <v-col> <discipline-card v-if="selectedArt != null" :discipline="selectedArt" /></v-col> </v-row
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import { getModule } from 'vuex-module-decorators'
import { CharacterManagementStore } from '@/store'
import { Character } from '@/class'
import { Art } from '@/class'
import DisciplineCard from '@/components/cards/DisciplineCard'

export default Vue.extend({
  name: 'arts',
  components: { DisciplineCard },
  data() {
    return {
      artTypes: ['Land', 'Mountain', 'Tide', 'Tundra', 'Blaze', 'Explosion', 'Gale', 'Storm'],
      selectedTypes: ['Land', 'Mountain', 'Tide', 'Tundra', 'Blaze', 'Explosion', 'Gale', 'Storm'],
      selectedArt: null,
    }
  },
  computed: {
    arts: function () {
      return this.$store.getters.getFilteredArts(this.selectedTypes)
    },
    hasAllTypes() {
      return this.selectedTypes.length === this.artTypes.length
    },
    hasSomeType() {
      return this.selectedTypes.length > 0 && !this.artTypes
    },
    icon() {
      if (this.hasAllTypes) return 'mdi-close-box'
      if (this.hasSomeType) return 'mdi-minus-box'
      return 'mdi-checkbox-blank-outline'
    },
  },
  methods: {
    toggle() {
      this.$nextTick(() => {
        if (this.hasAllTypes) {
          this.selectedTypes = []
        } else {
          this.selectedTypes = this.artTypes.slice()
        }
      })
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
