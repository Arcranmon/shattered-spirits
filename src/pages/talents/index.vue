<template>
  <div>
    <h2>Talents</h2>
    <v-row class="page">
      <v-col cols="auto" class="sidebar">
        <v-btn-toggle borderless overflow-auto
          ><div v-for="talent in talents" style="width: 100%" v-bind:key="talent.Name">
            <v-btn @click="selectedTalent = talent" class="button--style" depressed tile block>
              <img class="image--icon-size" :src="talent.Icon" />{{ talent.Name }}
            </v-btn>
          </div>
        </v-btn-toggle></v-col
      >
      <v-col> <talent-card v-if="selectedTalent != null" :talent="selectedTalent" :key="selectedTalent.Name" /></v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import TalentCard from '@/components/cards/TalentCard'

export default Vue.extend({
  name: 'talents',
  components: { TalentCard },
  data() {
    return {
      selectedTalent: null,
    }
  },
  computed: {
    talents: function () {
      return this.$store.getters.getTalents()
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
