<template>
  <v-row
    ><v-col :cols="4"
      ><h4>Forage Chart</h4>
      <basic-table
        :chart="greenvaleForage"
        style="width: 90%" /></v-col
    ><v-col :cols="4"
      ><h4>Hunting Chart</h4>
      <basic-table
        :chart="greenvaleHunting"
        style="width: 90%" /></v-col
    ><v-col :cols="4"
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
        ['2', 'You find nothing of use.'],
        ['3-5', 'You find _Supplies_.'],
        ['6-8', 'You find 2 _Supplies_.'],
        ['9-11', 'You find 3 _Supplies_.'],
        ['12', 'You find either 4 _Supplies_.'],
      ],
      greenvaleHunting: [
        ['2-3', "You accidentally stumble in a dangerous, territorial spirit's territory and will need to find your way out of this situation."],
        ['4-5', 'You find nothing, although you do not put yourself in danger either.'],
        ['6-7', 'You find small game; if somebody cooks, two characters may have a _Basic Meal_. Additionally, gain a small animal pelt (1 _Load_ _Trophy_).'],
        [
          '8-10',
          'You find some large birds and are very successful; if somebody cooks, four characters may have a _Basic Meal_. Additionally, gain some high quality feathers (1 _Load_ _Trophy_).',
        ],
        [
          '11-12',
          'You find large game; if somebody cooks, up to 10 characters may have a _Good Meal_. Additionally, gain a large animal pelt (1 _Load_ _Trophy_) and some other appropriate trophy, such as antlers (2 _Load_ _Trophy_).',
        ],
      ],
      greenvaleFishing: [
        ['2', 'You catch nothing.'],
        ['3-4', 'You catch a small, boney fish; if somebody cooks, a single character can have a _Poor Meal_.'],
        ['5-6', 'You catch a small fish; ; if somebody cooks, a single character can have a _Basic Meal_.'],
        ['7-10', 'You catch some small fish; if somebody cooks, two characters can have a _Basic Meal_.'],
        ['11-12', 'You catch a large fish; if somebody cooks, three characters can have a _Good Meal_.'],
      ],
    }
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
