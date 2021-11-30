<template>
  <div style="padding: 1em;">
    <div class="page--title">Unarmed</div>
    <show-cards :inputs="unarmed" job="Weapon" />
    <div class="page--title">Artillery</div>
    <show-cards :inputs="artillery" job="Weapon" />
    <div class="page--title">Blades</div>
    <show-cards :inputs="blades" job="Weapon" />
    <div class="page--title">Blunts</div>
    <show-cards :inputs="blunts" job="Weapon" />
    <div class="page--title">Chains</div>
    <show-cards :inputs="chains" job="Weapon" />
    <div class="page--title">Polearms</div>
    <show-cards :inputs="polearms" job="Weapon" />
    <div class="page--title">Spirit Weapons</div>
    <show-cards :inputs="spirit_weapons" job="Weapon" />
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
    artillery: function () {
      return this.$store.getters.getWeaponByCategory("Artillery");
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
    polearms: function () {
      return this.$store.getters.getWeaponByCategory("Polearm");
    },
    unarmed: function () {
      return this.$store.getters.getWeaponByCategory("Unarmed");
    },
    spirit_weapons: function () {
      return this.$store.getters.getSpiritWeapons();
    },
  },
});
</script>
