<template>
  <div style="text-align: center">
    <v-row>
      <v-col cols="6">
        <h4>Combat</h4>
        <custom-button to="/combat-primer">Combat Primer</custom-button> <br />
        <custom-button to="/combat-rules">Combat Rules</custom-button> <br />
        <custom-button to="/afflictions-and-status">Afflictions and Status</custom-button>
        <br />
        <custom-button to="/features">Features</custom-button>
        <br />
        <custom-button to="/terrain">Terrain</custom-button><br />
        <br
      /></v-col>
      <v-col cols="6">
        <h4>Narrative</h4>
        <custom-button to="/">Narrative Primer</custom-button> <br />
        <custom-button to="/narrative">Narrative Rules</custom-button> <br />
        <br /></v-col
      ><v-col cols="6">
        <h4>Travel</h4>
        <custom-button to="/">Travel Primer</custom-button> <br />
        <br /></v-col
      ><v-col cols="6">
        <h4>Downtime</h4>
        <custom-button to="/">Downtime Primer</custom-button> <br />
        <br /></v-col
    ></v-row>
    <custom-button to="/glossary">Glossary</custom-button><br />
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'rules-menu',
  components: {
    CustomButton,
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
