<template>
  <character-creator />
</template>

<script>
import Vue from "vue";
import CharacterCreator from "@/components/character-creation/CharacterCreator.vue";
export default Vue.extend({
  components: {
    CharacterCreator,
  },
});
</script>
