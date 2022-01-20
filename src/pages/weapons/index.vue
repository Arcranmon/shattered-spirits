<template>
  <div style="padding: 1em;">
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Unarmed</div>
      <show-cards :inputs="unarmed" job="Weapons" />
    </div>
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Ranged</div>
      <show-cards :inputs="ranged" job="Weapons" />
    </div>
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Blades</div>
      <show-cards :inputs="blades" job="Weapons" />
    </div>
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Blunts</div>
      <show-cards :inputs="blunts" job="Weapons" />
    </div>
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Chains</div>
      <show-cards :inputs="chains" job="Weapons" />
    </div>
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Polearms</div>
      <show-cards :inputs="polearms" job="Weapons" />
    </div>
    <div class="weapon--box" style="background-color: Gainsboro;">
      <div class="page--title">Spirit Weapons</div>
      <show-cards :inputs="spirit_weapons" job="Weapons" />
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

<style scoped lang="scss">
.weapon--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
