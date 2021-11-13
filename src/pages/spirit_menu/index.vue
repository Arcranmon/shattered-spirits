<template>
  <div style="text-align: center;">
    <custom-button to="/earth">Earth Spirits</custom-button> <br />
  </div>
</template>

<script>
import Vue from "vue";
import CustomButton from "@/components/Button.vue";

export default Vue.extend({
  name: "spirit-menu",
  components: {
    CustomButton,
  },
});
</script>
