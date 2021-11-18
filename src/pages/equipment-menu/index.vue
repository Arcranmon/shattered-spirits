<template>
  <div style="text-align: center;">
    <custom-button to="/weapons">Weapons</custom-button> <br />
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "@/components/Button.vue";

export default Vue.extend({
  name: "equipment-menu",
  components: {
    CustomButton,
  },
});
</script>
