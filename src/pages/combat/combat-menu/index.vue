<template>
  <div style="text-align: center;">
    <custom-button to="/combat-basics">Combat Basics</custom-button> <br />
    <custom-button to="/equipment-in-combat">Equipment in Combat</custom-button>
    <br />
    <custom-button to="/reading-abilities">Reading Abilities</custom-button>
    <br />
    <custom-button to="/spirit-mechanics">Spirit Mechanics</custom-button>
    <br />
    <custom-button to="/afflictions-and-status">Afflictions and Status</custom-button>
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
