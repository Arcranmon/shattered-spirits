<template>
  <div style="padding: 1em;">
    <div class="armor--box" style="background-color: DarkGray;">
      <h2>Unarmored</h2>
      <show-cards :inputs="unarmored" job="Armor" :collapse="false" />
    </div>
    <div class="armor--box" style="background-color: DarkGray;">
      <h2>Light Armor</h2>
      <show-cards :inputs="light" job="Armor" :collapse="false" />
    </div>
    <div class="armor--box" style="background-color: DarkGray;">
      <h2>Heavy Armor</h2>
      <show-cards :inputs="heavy" job="Armor" :collapse="false" />
    </div>
    <div class="armor--box" style="background-color: #9d67b6;">
      <h2>Shields</h2>
      <show-cards :inputs="shields" job="Weapons" :collapse="false" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/cards/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "weapons",
  components: {
    ShowCards,
  },
  computed: {
    unarmored: function () {
      return this.$store.getters.getArmorByCategory("Unarmored");
    },
    light: function () {
      return this.$store.getters.getArmorByCategory("Light Armor");
    },
    heavy: function () {
      return this.$store.getters.getArmorByCategory("Heavy Armor");
    },
    shields: function () {
      return this.$store.getters.getWeaponByCategory("Shield");
    },
  },
});
</script>

<style scoped lang="scss">
.armor--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
