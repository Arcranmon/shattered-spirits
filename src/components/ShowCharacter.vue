<template>
  <div style="padding: 15px; margin: 1em;" class="background--color">
    <div v-if="character.Name != ''" class="character-cell">
      <h2>{{ character.Name }} and {{ character.SpiritName }} the {{ character.SpiritType }} Spirit</h2>
      <v-row style="margin: 1em;">
        <v-col :cols="columnNumbers">
          <v-row no-gutters>
            <v-col cols="2" />
            <v-col cols="3"><b>Endurance:</b></v-col>
            <v-col cols="2">{{ character.CurrentEndurance }} / {{ character.MaxEndurance }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.CurrentEndurance += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.CurrentEndurance -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" />
            <v-col cols="3"><b>Health:</b></v-col>
            <v-col cols="2"> {{ character.CurrentHealth }} / {{ character.MaxHealth }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.CurrentHealth += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.CurrentHealth -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" />
            <v-col cols="3"><b>Grit:</b></v-col
            ><v-col cols="2"> {{ character.Grit }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.Grit += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.Grit -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" />
            <v-col cols="3"><b>Poise:</b></v-col
            ><v-col cols="2"> {{ character.Poise }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.Poise += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.Poise -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" />
            <v-col cols="3"><b>Momentum:</b></v-col
            ><v-col cols="2"> {{ character.Momentum }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.Momentum += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.Momentum -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row no-gutters>
            <v-col cols="2" />
            <v-col cols="3"><b>Reflex:</b></v-col
            ><v-col cols="2"> {{ character.reflex }}</v-col>
            <v-col cols="3"
              ><v-btn inline x-small @click=";(character.reflex += 1), $emit('changed')" color="green">+</v-btn>
              <v-btn inline x-small @click=";(character.reflex -= 1), $emit('changed')" color="red">-</v-btn></v-col
            >
          </v-row>
          <v-row justify="center">
            <v-btn @click="character.ApplyRefresh(), $emit('changed')" class="grey lighten-4 mx-2">Apply Refresh</v-btn>
            <v-btn @click="character.ResetDefault(), $emit('changed')" class="grey lighten-4 mx-2">Set Default</v-btn></v-row
          ></v-col
        ><v-col :cols="columnNumbers"><armor-card :armor="character.EquippedArmor" :on_sheet="true" /> </v-col
        ><v-col v-if="character.AnyStanceUnequipped" cols="12" style="text-align: center;">Click a Stance or Style below to enter it!</v-col
        ><v-col :cols="columnNumbers" style="margin-bottom: 1em;">
          <h4>Spirit Stance</h4>
          <stance-card :stance="character.CurrentSpiritStance" :on_sheet="true" /></v-col
        ><v-col :cols="columnNumbers" style="margin-bottom: 1em;">
          <h4>Martial Stance</h4>
          <stance-card :stance="character.CurrentMartialStance" :on_sheet="true" /></v-col
      ></v-row>
      <v-card>
        <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered>
          <v-tab>
            <h3>Stances</h3>
          </v-tab>
          <v-tab>
            <h3>Weapons</h3>
          </v-tab>
          <v-tab>
            <h3>Unarmed Weapons</h3>
          </v-tab>
          <v-tab>
            <h3>Techniques</h3>
          </v-tab>
          <v-tab>
            <h3>Maneuvers</h3>
          </v-tab>
          <v-tab>
            <h3>Disciplines</h3>
          </v-tab>
        </v-tabs>
        <v-tabs-items v-model="tab" class="character-tab-content">
          <v-tab-item
            ><h2>Spirit Stances</h2>
            <show-cards
              job="Stances"
              :inputs="character.SpiritStances"
              standalone_or_contained="Standalone"
              :selectButton="true"
              :on_sheet="true"
              @chose="changeSpiritStance"
              :collapse="false"
              v-bind:cols="screenSize"
            />
            <h2>Martial Stances</h2>
            <show-cards
              job="Stances"
              :inputs="character.MartialStances"
              standalone_or_contained="Standalone"
              :selectButton="true"
              :on_sheet="true"
              @chose="changeMartialStance"
              :collapse="false"
              v-bind:cols="screenSize"
            />
          </v-tab-item>
          <v-tab-item>
            <show-cards
              job="Weapons"
              :inputs="$store.getters.getWeaponsFromList(character.Weapons)"
              standalone_or_contained="Standalone"
              :collapse="false"
              v-bind:cols="screenSize"
            />
          </v-tab-item>
          <v-tab-item
            ><show-cards
              job="Weapons"
              display_text="Unarmed Weapons"
              :inputs="$store.getters.getWeaponsFromList(character.UnarmedWeapons)"
              standalone_or_contained="Standalone"
              :collapse="false"
              v-bind:cols="screenSize"
            />
          </v-tab-item>
          <v-tab-item
            ><show-cards
              job="Techniques"
              display_text="Skill Techniques"
              :inputs="character.Techniques"
              standalone_or_contained="Standalone"
              :on_sheet="true"
              :collapse="false"
              v-bind:cols="screenSize"
          /></v-tab-item>
          <v-tab-item>
            <v-card>
              <v-tabs v-model="maneuver_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
                <v-tab> <h4>Stratagems</h4> </v-tab><v-tab> <h4>Stunts</h4> </v-tab><v-tab> <h4>Resists</h4> </v-tab><v-tab> <h4>Reactions</h4> </v-tab
                ><v-tab> <h4>Gambits</h4> </v-tab><v-tab> <h4>Flourishes</h4> </v-tab
                ><v-tab>
                  <h4>Punishes</h4>
                </v-tab>
              </v-tabs>
              <v-tabs-items v-model="maneuver_tab" class="character-tab-content">
                <v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Stratagem')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  />
                </v-tab-item>
                <v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Stunt')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  />
                </v-tab-item>
                <v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Resist')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  /> </v-tab-item
                ><v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Reaction')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  />
                </v-tab-item>
                <v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Gambit')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  /> </v-tab-item
                ><v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Flourish')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  /> </v-tab-item
                ><v-tab-item>
                  <show-cards
                    job="Maneuvers"
                    display_text="Maneuvers"
                    :inputs="character.ManeuversOfType('Punish')"
                    standalone_or_contained="Standalone"
                    :on_sheet="true"
                    :collapse="false"
                    v-bind:cols="screenSize"
                  /> </v-tab-item></v-tabs-items
            ></v-card>
          </v-tab-item>
          <v-tab-item style="margin: 1em;"
            ><div v-for="disc in character.Disciplines" :key="disc.name">{{ disc.name }} <span v-for="n in disc.tier" :key="n">I</span></div>
          </v-tab-item>
        </v-tabs-items>
      </v-card>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import ArmorCard from '@/components/cards/ArmorCard.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
export default Vue.extend({
  name: 'display-character',
  components: { ArmorCard, ShowCards, StanceCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data() {
    return { tab: null, maneuver_tab: null, windowWidth: window.innerWidth }
  },
  methods: {
    changeSpiritStance: function (variable) {
      this.character.CurrentSpiritStance = variable.card
      this.$emit('changed')
    },
    changeMartialStance: function (variable) {
      this.character.CurrentMartialStance = variable.card
      this.$emit('changed')
    },
  },
  computed: {
    screenSize() {
      if (this.windowWidth <= 760) return 1
      if (this.windowWidth <= 1500) return 2
      return 3
    },
    columnNumbers() {
      if (this.isMobile) return 12
      return 6
    },
  },
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
})
</script>

<style scoped lang="scss">
.character-cell {
  background-color: $color--grey-light;
  outline: $border--black-standard;
  border-radius: 0px;
}
.character-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.character-tab-content {
  background-color: $color--grey-light !important;
}
</style>
