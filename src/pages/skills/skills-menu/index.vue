<template>
  <div style="text-align: center;">
    <custom-button to="/basic-skills">Basic Skills</custom-button> <br />
    <custom-button to="/armor-skills">Armor Skills</custom-button> <br />
    <!-- 
    <custom-button to="/martial-skills">Martial Skills</custom-button> <br />
    <custom-button to="/stratagem-skills">Stratagem Skills</custom-button>
    <br /> 
    -->
    <custom-button to="/weapon-skills">Weapon Skills</custom-button> <br />
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'spirit-menu',
  components: {
    CustomButton,
  },
})
</script>
