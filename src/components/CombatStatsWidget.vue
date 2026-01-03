<template>
  <div>
    <h4>Combat Resources</h4>
    <div style="max-width: 30em; margin-left: auto; margin-right: auto; margin-top: 1em">
      <v-row no-gutters> <b>Momentum:</b>&nbsp;{{ creature.Momentum }} </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-btn inline small @click=";(creature.Momentum -= 1), $emit('changed')" icon class="resource--button"
            ><v-icon color="black">mdi-minus</v-icon></v-btn
          > </v-col
        ><v-col style="height: 1.5em"> <img v-for="index in creature.Momentum" :src="require('@/assets/Momentum.svg')" style="height: 1.5em" /></v-col
        ><v-col cols="auto">
          <v-btn inline small @click=";(creature.Momentum += 1), $emit('changed')" icon class="resource--button"><v-icon color="black">mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters> <b>Vigor:</b>&nbsp;{{ creature.Vigor }} </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-btn inline small @click=";(creature.Vigor -= 1), $emit('changed')" icon class="resource--button"
            ><v-icon color="black">mdi-minus</v-icon></v-btn
          > </v-col
        ><v-col style="height: 1.5em"> <img v-for="index in creature.Vigor" :src="require('@/assets/Vitality.svg')" style="height: 1.5em" /></v-col
        ><v-col cols="auto">
          <v-btn inline small @click=";(creature.Vigor += 1), $emit('changed')" icon class="resource--button"><v-icon color="black">mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters> <b>Movement:</b>&nbsp;{{ creature.Movement }} / {{ creature.MaxMovement }} </v-row>
      <v-row no-gutters class="bar--area">
        <v-col cols="auto">
          <v-btn inline small @click=";(creature.Movement -= 1), $emit('changed')" icon class="resource--button"
            ><v-icon color="black">mdi-minus</v-icon></v-btn
          > </v-col
        ><v-col
          ><div class="hp--exterior">
            <div class="hp--interior" :style="movebar" /></div></v-col
        ><v-col cols="auto">
          <v-btn inline small @click=";(creature.Movement += 1), $emit('changed')" icon class="resource--button"><v-icon color="black">mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters> <b>Health:</b>&nbsp;{{ creature.Health }} / {{ creature.MaxHealth }} </v-row>
      <v-row no-gutters class="bar--area">
        <v-col cols="auto">
          <v-btn inline small @click=";(creature.Health -= 1), $emit('changed')" icon class="resource--button"
            ><v-icon color="black">mdi-minus</v-icon></v-btn
          > </v-col
        ><v-col
          ><div class="hp--exterior">
            <div class="hp--interior" :style="healthbar" /></div></v-col
        ><v-col cols="auto">
          <v-btn inline small @click=";(creature.Health += 1), $emit('changed')" icon class="resource--button"><v-icon color="black">mdi-plus</v-icon></v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <b>Padding:</b>&nbsp;{{ creature.Padding }} / {{ creature.MaxPadding }}&nbsp;<b>Stun:</b>&nbsp;{{ creature.Stun }} / {{ creature.MaxStun }}</v-col
        ><v-col align="right"> <v-checkbox v-model="apStun" :label="'AP Stun'" dense hide-details style="float: right; display: inline-block" /></v-col>
      </v-row>
      <v-row no-gutters class="bar--area">
        <v-col cols="auto">
          <v-btn inline small @click="creature.ClearStun(), $emit('changed')" icon class="resource--button"
            ><v-icon color="black">mdi-minus</v-icon></v-btn
          > </v-col
        ><v-col>
          <div class="soak--exterior" :style="soakWidth">
            <div class="soak--interior" :style="soakbar" />
          </div>
          <div class="stun--exterior" :style="stunWidth">
            <div class="stun--interior" :style="stunbar" />
          </div> </v-col
        ><v-col cols="auto">
          <v-btn inline small @click="apStun ? creature.AddApStun() : creature.AddStun(), $emit('changed')" icon class="resource--button"
            ><v-icon color="black">mdi-plus</v-icon></v-btn
          >
        </v-col>
      </v-row>
      <v-row no-gutters style="margin-top: 1em" align-content="center">
        <v-col v-if="!isSpirit" class="d-flex justify-center align-center"
          ><v-btn inline @click="creature.ApplyRespite(), $emit('changed')">Apply Respite</v-btn></v-col
        ><v-col class="d-flex justify-center align-center"><v-btn inline @click="creature.ResetDefault(), $emit('changed')">Reset Default</v-btn></v-col></v-row
      >
    </div>
    <br />
    <h4>Combat Statistics</h4>
    <div style="max-width: 30em; margin-left: auto; margin-right: auto; margin-top: 1em">
      <v-row v-if="this.isSpirit" no-gutters>
        <v-col><display-tooltip-text string="**_Speed_:**" /></v-col><v-col :cols="8">{{ creature.Speed }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Defenses_:**" /></v-col><v-col :cols="8"><display-tooltip-text :string="creature.Defenses" /></v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Guard_:**" /></v-col><v-col :cols="8">{{ creature.Guard }}</v-col>
      </v-row>
    </div>
  </div>
</template>

<script>
import { Character, Combatant, Spirit } from '@/class'
import Vue from 'vue'
export default Vue.extend({
  name: 'combat-stats-widget',
  props: {
    creature: { type: Combatant, required: true },
  },
  data() {
    return {
      apStun: false,
    }
  },
  computed: {
    isCharacter: function () {
      return this.creature instanceof Character
    },
    isSpirit: function () {
      return this.creature instanceof Spirit
    },
    healthbar() {
      return 'width: ' + this.creature.HealthPercent + '%; background-color: ' + this.creature.HealthColor
    },
    soakbar() {
      return 'width: ' + this.creature.PaddingPercent + '%;'
    },
    stunbar() {
      return 'width: ' + this.creature.StunPercent + '%; background-color: ' + this.creature.StunColor
    },
    movebar() {
      return 'width: ' + this.creature.MovePercent + '%; background-color: ' + this.creature.MoveColor
    },
    soakWidth() {
      return 'width: ' + this.creature.PaddingStunRatio + '%;'
    },
    stunWidth() {
      return 'width: ' + (100 - this.creature.PaddingStunRatio) + '%;'
    },
  },
})
</script>

<style scoped lang="scss">
.hp--exterior,
.soak--exterior,
.stun--exterior {
  width: 100%;
  border: 1px solid black;
  height: 20px;
  vertical-align: middle;
  display: inline-block;
}
.hp--interior,
.soak--interior,
.stun--interior {
  border: 0px solid transparent;
  margin: 0 auto;
  height: 18px;
  float: left;
}
.hp--interior {
  background-color: #a0010f;
}
.soak--exterior {
  display: inline;
  float: left;
  border-right: 2px solid black;
}
.soak--interior {
  background-color: #919191;
}
.stun--exterior {
  display: inline;
  float: right;
  border-left: 2px solid black;
}
.bar--area {
  display: flex;
  margin-top: $space--xs;
  margin-bottom: $space--xs;
  justify-content: center;
  align-content: center;
}
</style>
