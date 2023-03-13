<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay>
      <template v-slot:activator="{ on }">
        <v-btn color="white" v-on="on">
          About
        </v-btn>
      </template>

      <v-card>
        <v-card-title>About</v-card-title>
        <v-card-text>
          Welcome to the world of Deskar, the land of Shattered Spirits!
          <br />
          <br />General, Move, Strike, and Support icons made by lorc. Defensive icon made by delapouite. Available on https://game-icons.net.
          <br />
          <br />
          <a href="https://github.com/Arcranmon/shattered-spirits">Click here for more information and the source!</a>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  data() {
    return {
      dialog: false,
    }
  },
}
</script>
