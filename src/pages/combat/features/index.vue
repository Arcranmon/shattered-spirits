<template>
  <div>
    <h2>Features</h2>
    <span v-if="isMobile">
      <v-select
        v-model="selectedFeature"
        :items="features"
        item-text="Name"
        return-object
        attach
        label="Selected Feature"
        filled
        outlined
        style="margin-left: 0.5em; margin-right: 0.5em">
      </v-select>
      <div>
        <feature-card
          v-if="selectedFeature != null"
          :feature="selectedFeature"
          style="width: 40em; margin-left: auto; margin-right: auto" />
      </div>
    </span>
    <span v-else>
      <v-row class="page">
        <v-col
          cols="auto"
          class="sidebar">
          <v-btn-toggle
            borderless
            overflow-auto>
            <div
              v-for="feature in features"
              style="width: 100%"
              v-bind:key="feature.Name">
              <div>
                <v-btn
                  @click="selectedFeature = feature"
                  class="button--style"
                  depressed
                  tile
                  block>
                  <img
                    class="image--icon-size"
                    :src="feature.Icon" />
                  {{ feature.Name }}
                </v-btn>
              </div>
            </div>
          </v-btn-toggle>
        </v-col>
        <v-col>
          <feature-card
            v-if="selectedFeature != null"
            :feature="selectedFeature"
            style="width: 40em"
            :key="selectedFeature.Name" />
        </v-col>
      </v-row>
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import FeatureCard from '@/components/cards/FeatureCard.vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'feature',
  components: { FeatureCard },
  data() {
    return {
      selectedFeature: null,
    }
  },
  computed: {
    features: function () {
      return this.$store.getters.getFeatures().sort((a, b) => (a.Name < b.Name ? -1 : a.Name > b.Name ? 1 : 0))
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
