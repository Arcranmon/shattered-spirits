<template>
  <div style="text-align: center;">
    <custom-button to="/character-creation"
      >Character Creation Rules</custom-button
    >
    <br />
    <custom-button to="/basics">Basic Techniques</custom-button> <br />
    <custom-button to="/skills">Skill Masteries</custom-button> <br />
    <custom-button to="/spirits">Spirit Masteries</custom-button> <br />
    <custom-button to="/equipment">Equipment</custom-button> <br />
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
