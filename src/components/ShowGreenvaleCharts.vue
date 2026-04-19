<template>
  <v-row
    ><v-col :cols="6"
      ><h4>Forage Chart</h4>
      <basic-table
        :chart="greenvaleForage"
        style="width: 90%" /></v-col
    ><v-col :cols="6"
      ><h4>Hunting Chart</h4>
      <basic-table
        :chart="greenvaleHunting"
        style="width: 90%" /></v-col
    ><v-col :cols="6"
      ><h4>Herbalism Chart</h4>
      <basic-table
        :chart="greenvaleHerbalism"
        style="width: 90%" /></v-col
    ><v-col :cols="6"
      ><h4>Fishing Chart</h4>
      <basic-table
        :chart="greenvaleFishing"
        style="width: 90%" /></v-col
  ></v-row>
</template>

<script>
import Vue from 'vue'
import BasicTable from './BasicTable.vue'

export default Vue.extend({
  name: 'show-greenvale-charts',
  components: { BasicTable },
  data() {
    return {
      greenvaleForage: [
        ['2', 'You find only water for the party and sufficient kindling for camp.'],
        ['3-5', 'You find some acorns and other edible nuts (1 Passable _Food_) as well as water for the party and sufficient kindling for camp.'],
        ['6-8', 'You find some tasty fruit (2 Basic _Food_) as well as water for the party and sufficient kindling for camp.'],
        ['9-11', 'You find either _Medicinal Herbs_ or some tasty fruit (3 Basic _Food_) as well as water for the party and sufficient kindling for camp.'],
        [
          '12',
          'You find either 2 _Medicinal Herbs_ or a bounty of perfectly ripe, tasty fruit (4 Good _Food_) as well as water for the party and sufficient kindling for camp.',
        ],
      ],
      greenvaleHunting: [
        ['2-3', "You accidentally stumble in a dangerous, territorial spirit's territory and will need to find your way out of this situation."],
        ['4-5', 'You find nothing, although you do not put yourself in danger either.'],
        ['6-7', 'You find small game; gain 2 _Basic_ _Food_ (_Meat_) and a small animal pelt (1 _Load_).'],
        ['8-10', 'You find some large birds and are very successful; gain 4 _Basic_ _Food_ (_Meat_) and some high quality feathers (1 _Load_).'],
        ['11-12', 'You find large game; gain 10 _Good_ _Food_ (_Meat_), a large animal pelt (2 _Load_), and a fine trophy (2 _Load_).'],
      ],
      greenvaleHerbalism: [
        ['2-4', 'You find _Medicinal Herbs_.'],
        ['5-7', 'You find any two of _Medicinal Herbs_ and _Crownbark_, in any combination.'],
        ['8-10', 'You find one _Dreamweed_.'],
        ['11-12', 'You find one _Heart of the Vine_.'],
      ],
      greenvaleFishing: [
        ['2', 'You catch nothing.'],
        ['3-4', 'You catch a small, boney fish; gain 1 _Bad_ _Food_ (_Meat_).'],
        ['5-6', 'You catch a small fish; gain 1 _Basic_ _Food_ (_Meat_).'],
        ['7-10', 'You catch some small fish; gain 2 _Basic_ _Food_ (_Meat_).'],
        ['11-12', 'You catch a large fish; gain 3 _Good_ _Food_ (_Meat_).'],
      ],
    }
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
