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
          Welcome to the world of Deskar, the land of Shattered Spirits!<br />
          Character art done by Josh McKelvey: https://www.etsy.com/shop/JoshMcKelveyArt<br />
          Hafted Weapon, Projectile Weapon, Pole Weapon, Improvised Weapon, General, Move, Strike, Unarmed, Support, Land, Mountain, and Tremorsight icons made
          by lorc.<br />
          Light Armor, Unarmored, Heavy Armor, Sword, Stoneheart, and Grounding icons made by delapouite.<br />
          Unarmed icon made by skoll.<br />
          Shield icon made by sbed.<br />
          Thrown Weapon icon made by Faithtoken.<br />
          Available on https://game-icons.net.<br /><br />
          And a big thank you to the playtesters thus far: Aori, everythingElse, Kuji, MesiDoomstalker, and Mystic Witch! Without your feedback and testing none
          of this would be possible!<br />
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
