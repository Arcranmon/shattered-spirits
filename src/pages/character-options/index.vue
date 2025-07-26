<template>
  <div style="text-align: center">
    <custom-button to="/basic-skills">Basic Arts</custom-button> <br />
    <custom-button to="/basic-stances">Basic Stances</custom-button> <br />
    <custom-button to="/archetypes">Archetypes</custom-button> <br />
    <custom-button to="/talents">Talents</custom-button> <br />
    <!---<custom-button to="/martial-disciplines">Martial Disciplines</custom-button> <br />--->
    <custom-button to="/spirit-arts">Spirit Arts</custom-button> <br />
    <custom-button to="/spirit-abilities">Spirit Customization</custom-button> <br />
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
