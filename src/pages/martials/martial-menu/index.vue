<template>
  <div style="text-align: center;">
    <custom-button to="/armor-disciplines">Armor Disciplines</custom-button> <br />
    <custom-button to="/unarmed-disciplines">Unarmed Disciplines</custom-button> <br />
    <!-- 
    <custom-button to="/martial-skills">Martial Skills</custom-button> <br />
    <custom-button to="/stratagem-skills">Stratagem Skills</custom-button>
    <br /> 
    -->
    <custom-button to="/weapon-disciplines">Weapon Disciplines</custom-button> <br />
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
