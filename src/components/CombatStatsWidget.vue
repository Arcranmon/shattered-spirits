<template>
  <div>
    <h4>Combat Resources</h4>
    <div style="max-width: 30em; margin-left: auto; margin-right: auto; margin-top: 1em">
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Movement_:**" /></v-col><v-col>{{ creature.Movement }} / {{ creature.MaxMovement }}</v-col
        ><v-col style="min-width: 6em"
          ><v-btn inline x-small @click=";(creature.Movement -= 1), $emit('changed')" color="red">-</v-btn
          ><v-btn inline x-small @click=";(creature.Movement += 1), $emit('changed')" color="green">+</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Vigor_:**" /></v-col><v-col>{{ creature.Vigor }}</v-col
        ><v-col style="min-width: 6em"
          ><v-btn inline x-small @click=";(creature.Vigor -= 1), $emit('changed')" color="red">-</v-btn
          ><v-btn inline x-small @click=";(creature.Vigor += 1), $emit('changed')" color="green">+</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Health_:**" /></v-col><v-col>{{ creature.Health }} / {{ creature.MaxHealth }}</v-col
        ><v-col style="min-width: 6em"
          ><v-btn inline x-small @click=";(creature.Health -= 1), $emit('changed')" color="red">-</v-btn
          ><v-btn inline x-small @click=";(creature.Health += 1), $emit('changed')" color="green">+</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Stamina_:**" /></v-col><v-col>{{ creature.Stamina }} / {{ creature.MaxStamina }}</v-col
        ><v-col style="min-width: 6em"
          ><v-btn inline x-small @click=";(creature.Stamina -= 1), $emit('changed')" color="red">-</v-btn
          ><v-btn inline x-small @click=";(creature.Stamina += 1), $emit('changed')" color="green">+</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Stun_:**" /></v-col><v-col>{{ creature.Stun }} / {{ creature.MaxStun }}</v-col
        ><v-col style="min-width: 6em"
          ><v-btn inline x-small @click=";(creature.Stun -= 1), $emit('changed')" color="red">-</v-btn
          ><v-btn inline x-small @click=";(creature.Stun += 1), $emit('changed')" color="green">+</v-btn>
        </v-col>
      </v-row>
      <v-row no-gutters v-if="!isSpirit">
        <v-col><display-tooltip-text string="**_Momentum_:**" /></v-col><v-col>{{ creature.Momentum }}</v-col
        ><v-col style="min-width: 6em"
          ><v-btn inline x-small @click=";(creature.Momentum -= 1), $emit('changed')" color="red">-</v-btn
          ><v-btn inline x-small @click=";(creature.Momentum += 1), $emit('changed')" color="green">+</v-btn>
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
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Defenses_:**" /></v-col><v-col :cols="8"><display-tooltip-text :string="creature.Defenses" /></v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Guard_:**" /></v-col><v-col :cols="8">{{ creature.Guard }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Soak_:**" /></v-col><v-col :cols="8">{{ creature.Soak }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Jump_:**" /></v-col><v-col :cols="8">{{ creature.Jump }}</v-col>
      </v-row>
      <v-row no-gutters>
        <v-col><display-tooltip-text string="**_Traits_:**" /></v-col><v-col :cols="8"><display-tooltip-text :string="creature.BulletedTraits" /></v-col>
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
  computed: {
    isCharacter: function () {
      return this.creature instanceof Character
    },
    isSpirit: function () {
      return this.creature instanceof Spirit
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
