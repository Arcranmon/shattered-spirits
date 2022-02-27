<template>
  <div style="text-align: center;">
    <custom-button to="/combat-basics">Combat Basics</custom-button> <br />
    <custom-button to="/reading-disciplines">Reading Disciplines</custom-button>
    <br />
    <custom-button to="/conditions-and-status"
      >Conditions and Status</custom-button
    >
    <br />
    <custom-button to="/terrain-and-obstacles"
      >Terrain and Obstacles</custom-button
    >
    <br />
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "@/components/Button.vue";

export default Vue.extend({
  name: "combat-menu",
  components: {
    CustomButton,
  },
});
</script>
