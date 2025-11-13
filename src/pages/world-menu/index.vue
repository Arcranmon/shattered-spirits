<template>
  <div style="text-align: center">
    <!-- Add some welcome text here --->
    <custom-button to="/world">The World in Brief</custom-button><br />
    <custom-button to="/civilization">Civilization Now</custom-button><br />
    <custom-button to="/greenvale">Greenvale</custom-button><br />
    <custom-button to="/sample-characters">Sample Characters</custom-button>
    <br />
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'world-menu',
  components: {
    CustomButton,
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
