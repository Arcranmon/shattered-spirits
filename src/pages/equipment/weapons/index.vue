<template>
  <div style="padding: 1em;">
    <div class="weapon--box" style="background-color: #a78562;">
      <h2>Improvised</h2>
      <span class="page--description" v-html="improvisedText" />
      <show-cards :inputs="improvised" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: #e2a66e;">
      <h2>Unarmed</h2>
      <span class="page--description" v-html="unarmedText" />
      <show-cards :inputs="unarmed" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: #f75b5b;">
      <h2>Blades</h2>
      <span class="page--description" v-html="bladesText" />
      <show-cards :inputs="blades" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: #4f8a52;">
      <h2>Blunts</h2>
      <span class="page--description" v-html="bluntsText" />
      <show-cards :inputs="blunts" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: DarkKhaki;">
      <h2>Chains</h2>
      <show-cards :inputs="chains" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: #767cda;">
      <h2>Lances</h2>
      <span class="page--description" v-html="lancesText" />
      <show-cards :inputs="lances" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: DarkGray;">
      <h2>Ranged</h2>
      <span class="page--description" v-html="rangedText" />
      <show-cards :inputs="ranged" job="Weapons" :collapse="true" />
    </div>
    <div class="weapon--box" style="background-color: #f8e4fb;">
      <h2>Spirit Weapons</h2>
      <show-cards :inputs="spirit_weapons" job="Weapons" :collapse="true" />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ShowCards from "@/components/ShowCards.vue";
import BladesText from "@/database/text_files/weapons/blades.txt";
import BluntsText from "@/database/text_files/weapons/blunts.txt";
import ImprovisedText from "@/database/text_files/weapons/improvised.txt";
import LancesText from "@/database/text_files/weapons/lances.txt";
import UnarmedText from "@/database/text_files/weapons/unarmed.txt";
import RangedText from "@/database/text_files/weapons/ranged.txt";
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
    rangedText: function () {
      return this.$marked.parse(RangedText);
    },
    blades: function () {
      return this.$store.getters.getWeaponByCategory("Blade");
    },
    bladesText: function () {
      return this.$marked.parse(BladesText);
    },
    blunts: function () {
      return this.$store.getters.getWeaponByCategory("Blunt");
    },
    bluntsText: function () {
      return this.$marked.parse(BluntsText);
    },
    chains: function () {
      return this.$store.getters.getWeaponByCategory("Chain");
    },
    lances: function () {
      return this.$store.getters.getWeaponByCategory("Lance");
    },
    lancesText: function () {
      return this.$marked.parse(LancesText);
    },
    unarmed: function () {
      return this.$store.getters.getWeaponByCategory("Unarmed");
    },
    unarmedText: function () {
      return this.$marked.parse(UnarmedText);
    },
    improvised: function () {
      return this.$store.getters.getWeaponByCategory("Improvised");
    },
    improvisedText: function () {
      return this.$marked.parse(ImprovisedText);
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
