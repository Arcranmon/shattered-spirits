<template>
  <div>
    <v-dialog v-model="dialog" hide-overlay>
      <template v-slot:activator="{ on }">
        <v-btn color="white" v-on="on">
          About
        </v-btn>
      </template>

      <v-card>
        <v-card-text class="card--wrapper" style="font-size: larger; padding: 1em;">
          Welcome to the world of Deskar, the land of Shattered Spirits!<br />&nbsp;<br />
          This system is currently a huge WIP and is in the middle of a large revamp of character options. If you don't know where to start, take a glance at
          the Character Creation rules, look at the Character Options, and whenever you're confused about something click on the underlined text to bring up a
          tooltip! Look forward to a cleaner site, the return of interactive character sheets and the character creator, and continually more options as things
          progress! <br />&nbsp;<br />

          Character art is by Josh McKelvey: https://www.etsy.com/shop/JoshMcKelveyArt<br />&nbsp;<br />
          All icons are from https://game-icons.net. See the Readme on the GitHub for artist attributions. <br />&nbsp;<br />
          <a href="https://github.com/Arcranmon/shattered-spirits">Click here for more information and the source!</a>
          You can also report any typos or confusing mechanics you find there!
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
