<template>
  <div style="padding: 1em;">
    <div class="weapon--box" style="background-color: #a78562;">
      <h2>Improvised</h2>
      <show-cards :inputs="improvised" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: #e2a66e;">
      <h2>Unarmed</h2>
      <show-cards :inputs="unarmed" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: #f75b5b;">
      <h2>Blades</h2>
      <show-cards :inputs="blades" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: #4f8a52;">
      <h2>Blunts</h2>
      <show-cards :inputs="blunts" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: DarkKhaki;">
      <h2>Chains</h2>
      <show-cards :inputs="chains" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: #767cda;">
      <h2>Lances</h2>
      <show-cards :inputs="lances" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: DarkGray;">
      <h2>Ranged</h2>
      <show-cards :inputs="ranged" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box" style="background-color: #f8e4fb;">
      <h2>Spirit Weapons</h2>
      <show-cards :inputs="spirit_weapons" job="Weapons" :collapse="false" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import { store } from "@/store";
export default Vue.extend({
  name: "weapons",
  components: {
    ShowCards,
  },
  computed: {
    ranged: function () {
      return this.$store.getters.getWeaponByCategory("Ranged");
    },
    blades: function () {
      return this.$store.getters.getWeaponByCategory("Blade");
    },
    blunts: function () {
      return this.$store.getters.getWeaponByCategory("Blunt");
    },
    chains: function () {
      return this.$store.getters.getWeaponByCategory("Chain");
    },
    lances: function () {
      return this.$store.getters.getWeaponByCategory("Lance");
    },
    unarmed: function () {
      return this.$store.getters.getWeaponByCategory("Unarmed");
    },
    improvised: function () {
      return this.$store.getters.getWeaponByCategory("Improvised");
    },
    spirit_weapons: function () {
      return this.$store.getters.getSpiritWeapons();
    },
  },
});
</script>

<style scoped lang="scss">
.weapon--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
