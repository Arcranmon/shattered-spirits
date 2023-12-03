<template>
  <div>
    <div style="text-align: center;"><custom-button to="/armor">Armor</custom-button> <br /></div>
    <div style="text-align: center;"><custom-button to="/weapons">Weapons and Shields</custom-button> <br /></div>
    <div style="text-align: center;"><custom-button to="/combat-gear">Combat Gear</custom-button> <br /></div>
    <div style="text-align: center;"><custom-button to="/weapons">Consumables</custom-button> <br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'equipment-menu',
  components: {
    CustomButton,
  },
})
</script>
