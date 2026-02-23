<template>
  <div>
    <h4>Combat Resources</h4>
    <div style="max-width: 30em; margin-left: auto; margin-right: auto; margin-top: 1em">
      <v-row no-gutters> <b>Momentum:</b>&nbsp;{{ creature.Momentum }} </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Momentum -= 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col style="height: 1.5em">
          <img
            v-for="index in creature.Momentum"
            :src="require('@/assets/Momentum.svg')"
            style="height: 1.5em" />
        </v-col>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Momentum += 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters> <b>Vigor:</b>&nbsp;{{ creature.Vigor }} </v-row>
      <v-row no-gutters>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Vigor -= 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col style="height: 1.5em">
          <img
            v-for="index in creature.Vigor"
            :src="require('@/assets/Vitality.svg')"
            style="height: 1.5em" />
        </v-col>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Vigor += 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters> <b>Movement:</b>&nbsp;{{ creature.Movement }} / {{ creature.MaxMovement }} </v-row>
      <v-row
        no-gutters
        class="bar--area">
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Movement -= 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <div class="stamina--exterior">
            <div
              class="stamina--interior"
              :style="movebar" />
          </div>
        </v-col>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Movement += 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters> <b>Stamina:</b>&nbsp;{{ creature.Stamina }} / {{ creature.MaxStamina }} </v-row>
      <v-row
        no-gutters
        class="bar--area">
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Stamina -= 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <div class="stamina--exterior">
            <div
              class="stamina--interior"
              :style="staminabar" />
          </div>
        </v-col>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click=";(creature.Stamina += 1), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="auto"> <b>Stun:</b>&nbsp;{{ creature.Stun }} / {{ creature.MaxStun }}</v-col>
        <v-col align="right"> </v-col>
      </v-row>
      <v-row
        no-gutters
        class="bar--area">
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click="creature.Clearstun(), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-minus</v-icon>
          </v-btn>
        </v-col>
        <v-col>
          <div
            class="stun--exterior"
            :style="stunWidth">
            <div
              class="stun--interior"
              :style="stunbar" />
          </div>
        </v-col>
        <v-col cols="auto">
          <v-btn
            inline
            small
            @click="apstun ? creature.AddApstun() : creature.Addstun(), $emit('changed')"
            icon
            class="resource--button">
            <v-icon color="black">mdi-plus</v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row
        no-gutters
        style="margin-top: 1em"
        align-content="center">
        <v-col
          v-if="!isSpirit"
          class="d-flex justify-center align-center">
          <v-btn
            inline
            @click="creature.ApplyRespite(), $emit('changed')"
            >Apply Respite</v-btn
          >
        </v-col>
        <v-col class="d-flex justify-center align-center">
          <v-btn
            inline
            @click="creature.ResetDefault(), $emit('changed')"
            >Reset Default</v-btn
          >
        </v-col>
      </v-row>
    </div>
    <br />
    <h4>Combat Statistics</h4>
    <div style="max-width: 30em; margin-left: auto; margin-right: auto; margin-top: 1em">
      <v-row
        v-if="this.isSpirit"
        no-gutters>
        <v-col>
          <display-tooltip-text string="**_Speed_:**" />
        </v-col>
        <v-col :cols="8">{{ creature.Speed }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <display-tooltip-text string="**_Defenses_:**" />
        </v-col>
        <v-col :cols="8">
          <display-tooltip-text :string="creature.Defenses" />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <display-tooltip-text string="**_Block_:**" />
        </v-col>
        <v-col :cols="8">{{ creature.Block }}</v-col>
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
      apstun: false,
    }
  },
  computed: {
    isCharacter: function () {
      return this.creature instanceof Character
    },
    isSpirit: function () {
      return this.creature instanceof Spirit
    },
    staminabar() {
      return 'width: ' + this.creature.StaminaPercent + '%; background-color: ' + this.creature.StaminaColor
    },
    stunbar() {
      return 'width: ' + this.creature.stunPercent + '%; background-color: ' + this.creature.stunColor
    },
    movebar() {
      return 'width: ' + this.creature.MovePercent + '%; background-color: ' + this.creature.MoveColor
    },
  },
})
</script>

<style scoped lang="scss">
.stamina--exterior,
.stun--exterior {
  width: 100%;
  border: 1px solid black;
  height: 20px;
  vertical-align: middle;
  display: inline-stun;
}
.stamina--interior,
.stun--interior {
  border: 0px solid transparent;
  margin: 0 auto;
  height: 18px;
  float: left;
}
.stamina--interior {
  background-color: #a0010f;
}
.stun--exterior {
  display: inline;
  float: right;
}
.bar--area {
  display: flex;
  margin-top: $space--xs;
  margin-bottom: $space--xs;
  justify-content: center;
  align-content: center;
}
</style>
