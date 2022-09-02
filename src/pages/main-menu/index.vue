<template>
  <div style="text-align: center;">
    <custom-button to="/world">The World</custom-button>
    <br />
    <custom-button to="/character-creation"
      >Character Creation Rules</custom-button
    >
    <br />
    <custom-button to="/combat">Combat Rules</custom-button> <br />
    <custom-button to="/equipment">Equipment</custom-button> <br />
    <custom-button to="/skills">Skill Disciplines</custom-button> <br />
    <custom-button to="/spirits">Spirit Disciplines</custom-button> <br />
    <custom-button to="/npcs">NPCs</custom-button> <br />
    <custom-button to="/character-creator"
      >Character Creator (WIP)</custom-button
    >
    <br />
    <custom-button to="/character-manager">Characters (WIP)</custom-button>
    <br />
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "@/components/Button.vue";

export default Vue.extend({
  name: "main-menu",
  components: {
    CustomButton,
  },
});
</script>
