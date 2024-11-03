<template>
  <div style="text-align: center">
    <custom-button to="/combat-primer">Combat Primer</custom-button> <br />
    <custom-button to="/combat-rules">Combat Rules</custom-button> <br />
    <custom-button to="/equipment-in-combat">Equipment in Combat</custom-button>
    <br />
    <custom-button to="/afflictions-and-status">Afflictions and Status</custom-button>
    <br />
    <custom-button to="/features">Features</custom-button>
    <br />
    <custom-button to="/terrain">Terrain</custom-button>
    <br />
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'combat-menu',
  components: {
    CustomButton,
  },
})
</script>
