<template>
  <div style="text-align: center">
    <custom-button to="/world">The World</custom-button>
    <br />
    <custom-button to="/character-creation">Character Creation Rules</custom-button>
    <br />
    <custom-button to="/combat">Combat</custom-button> <br />
    <custom-button to="/character-options">Character Options</custom-button> <br />
    <custom-button to="/character-creator">Character Creator (WIP)</custom-button> <br />
    <custom-button to="/character-manager">Characters (WIP)</custom-button> <br />
  </div>
</template>

<script>
import Vue from 'vue'
import CustomButton from '@/components/Button.vue'

export default Vue.extend({
  name: 'main-menu',
  components: {
    CustomButton,
  },
})
</script>

<style scoped lang="scss">
.blade {
  float: left;
  background-color: lightgrey;
  clip-path: polygon(82% 0, 100% 51%, 82% 100%, 0 100%, 0 0);
}
</style>
