<template>
  <div style="text-align: center">
    <v-row>
      <v-col cols="6">
        <h4>Character Options</h4>
        <custom-button to="/basic-skills">Basic Skills</custom-button> <br />
        <custom-button to="/archetypes">Archetypes</custom-button> <br />
        <custom-button to="/talents">Talents</custom-button> <br />
        <!---<custom-button to="/martial-disciplines">Martial Disciplines</custom-button> <br />--->
        <custom-button to="/spirit-arts">Spirit Arts</custom-button> <br />
        <custom-button to="/spirit-abilities">Spirit Customization</custom-button> <br
      /></v-col>
      <v-col cols="6">
        <h4>Equipment</h4>
        <custom-button to="/armor">Armor and Accessories</custom-button> <br />
        <custom-button to="/weapons">Weapons and Shields</custom-button> <br />
        <custom-button to="/Consumables">Consumables</custom-button> <br /></v-col
    ></v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'character-options',
  components: {
    CustomButton,
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
