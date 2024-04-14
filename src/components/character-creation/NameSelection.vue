<template>
  <div class="name--wrapper">
    <h3>Choose a Name for You and Your Spirit!</h3>
    <br />
    <v-btn color="success" large tile @click="$emit('chose-names')" :disabled="(character.Name == '' || character.Spirit.Name == '')"
      ><span v-if="(character.Name == '')">CHOOSE A NAME FOR YOUR CHARACTER AND SPIRIT</span> <span v-else>CHOOSE {{ duoName }}</span></v-btn
    >
    <br />
    <br /><b>Name:&nbsp;&nbsp;&nbsp;</b><input v-model="character.Name" placeholder="Input Name" />
    <br />
    <br /><b>Spirit Name:&nbsp;&nbsp;&nbsp;</b><input v-model="character.Spirit.Name" placeholder="Input Name" />
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
export default {
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  computed: {
    duoName: function () {
      return this.character.Name + ' AND ' + this.character.Spirit.Name
    },
  },
}
</script>

<style scoped lang="scss">
.name--wrapper {
  color: black;
  margin-bottom: 1em;
}
</style>
