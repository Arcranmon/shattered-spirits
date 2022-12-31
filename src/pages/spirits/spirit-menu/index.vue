<template>
  <div style="text-align: center;">
    <custom-button to="/earth">Earth Spirits</custom-button> <br />
    <!-- 
    <custom-button to="/flame">Flame Spirits</custom-button> <br />
    <custom-button to="/metal">Metal Spirits</custom-button> <br />
    <custom-button to="/water">Water Spirits</custom-button> <br />
    <custom-button to="/wind">Wind Spirits</custom-button> <br />
    <custom-button to="/wood">Wood Spirits</custom-button> <br />
    -->
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
