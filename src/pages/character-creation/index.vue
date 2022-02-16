<template>
  <div style="padding: 1em;">
    <h2>Character Creation</h2>
    <div v-html="choosingYourSpirit" />
  </div>
</template>

<script>
import Vue from "vue";
import ChoosingYourSpirit from "@/database/text_files/character_creation/choosing_your_spirit.txt";
import { store } from "@/store";
export default Vue.extend({
  name: "character-creation",
  components: {},
  computed: {
    choosingYourSpirit() {
      return this.$marked(ChoosingYourSpirit);
    },
  },
});
</script>

<style scoped lang="scss">
a {
}
</style>
