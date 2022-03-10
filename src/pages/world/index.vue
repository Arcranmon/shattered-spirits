<template>
  <div style="padding: 1em;">
    <div v-html="worldText" />
  </div>
</template>

<script>
import Vue from "vue";
import WorldText from "@/database/text_files/world_of_deskar.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "combat-basics",
  components: {},
  computed: {
    worldText: function () {
      return this.$marked.parse(WorldText);
    },
  },
});
</script>

<style scoped lang="scss">
.a {
}
</style>
