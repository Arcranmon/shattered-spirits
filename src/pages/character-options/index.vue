<template>
  <div style="text-align: center">
    <custom-button to="/equipment">Equipment</custom-button> <br />
    <custom-button to="/talents">Talents</custom-button> <br />
    <custom-button to="/basic-skills">Basic Skills</custom-button> <br />
    <custom-button to="/spirit-abilities">Spirit Abilities</custom-button> <br />
    <custom-button to="/minor-disciplines">Minor Disciplines</custom-button> <br />
    <custom-button to="/major-disciplines">Major Disciplines</custom-button> <br />
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
