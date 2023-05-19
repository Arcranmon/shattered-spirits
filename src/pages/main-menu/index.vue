<template>
  <div style="text-align: center;">
    <custom-button to="/world">The World</custom-button>
    <br />
    <custom-button to="/character-creation">Character Creation Rules</custom-button>
    <br />
    <custom-button to="/combat">Combat Rules</custom-button> <br />
    <custom-button to="/equipment">Equipment</custom-button> <br />
    <custom-button to="/basic-skills">Basic Skills</custom-button> <br />
    <custom-button to="/basic-spirit-skills">Basic Spirit Skills</custom-button> <br />
    <!----
    <custom-button to="/martial-disciplines">Martial Disciplines</custom-button> <br />
    <custom-button to="/character-creator">Character Creator (WIP)</custom-button>
    <br />
    <custom-button to="/character-manager">Characters (WIP)</custom-button>
    <br />
    --->
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
