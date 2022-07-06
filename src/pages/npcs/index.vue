<template>
  <div>
    <show-cards :inputs="spirit_beasts" job="NPC" :collapse="false" :cols="1" />
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/cards/ShowCards.vue";

import { store } from "@/store";
export default Vue.extend({
  name: "npcs",
  components: { ShowCards },
  computed: {
    spirit_beasts: function () {
      return this.$store.getters.getSpiritBeasts();
    },
  },
});
</script>

<style scoped lang="scss"></style>
