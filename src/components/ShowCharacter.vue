<template>
  <div style="margin: 1em;" class="background--color character-wrapper">
    <v-tabs v-model="character_or_spirit_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
      <v-tab
        ><h3>{{ character.Name }}</h3></v-tab
      ><v-tab
        ><h3>{{ character.Spirit.Name }}</h3></v-tab
      >
    </v-tabs>
    <v-tabs-items v-model="character_or_spirit_tab" class="character-tab-content"
      ><v-tab-item>
        <div v-if="character.Name != ''">
          <v-row style="margin: 1em;">
            <v-col :cols="columnNumbers">
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Vigor_:**" /></v-col>
                <v-col cols="2">{{ character.Vigor }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.Vigor += 1), $emit('changed')" color="green">+</v-btn>
                  <v-btn inline x-small @click=";(character.Vigor -= 1), $emit('changed')" color="red">-</v-btn></v-col
                >
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Health_:**" /></v-col>
                <v-col cols="2">{{ character.CurrentHealth }} / {{ character.MaxHealth }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.CurrentHealth += 1), $emit('changed')" color="green">+</v-btn>
                  <v-btn inline x-small @click=";(character.CurrentHealth -= 1), $emit('changed')" color="red">-</v-btn></v-col
                >
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Momentum_:**" /></v-col><v-col cols="2"> {{ character.Momentum }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.Momentum += 1), $emit('changed')" color="green">+</v-btn>
                  <v-btn inline x-small @click=";(character.Momentum -= 1), $emit('changed')" color="red">-</v-btn></v-col
                >
              </v-row>
              <!-- TODO: Add Stamina button here -->
              <v-row justify="center">
                <v-btn @click="character.ApplyRefresh(), $emit('changed')" class="grey lighten-4 mx-2">Apply Refresh</v-btn>
                <v-btn @click="character.ResetDefault(), $emit('changed')" class="grey lighten-4 mx-2">Set Default</v-btn></v-row
              ></v-col
            ><v-col :cols="columnNumbers">
              <display-tooltip-text :string="character.EquippedArmor.ArmorHeader" /><movement-card :movement="character.MoveChart" :on_sheet="true" /> </v-col
            ><v-col :cols="12" style="margin-bottom: 1em;">
              <h4>Stance</h4>
              <stance-card :stance="character.CurrentSpiritStance" :on_sheet="true" style="width: 50%; margin: auto;" /></v-col
          ></v-row>
          <h4>Equipment</h4>
          <v-card>
            <v-tabs v-model="equipment_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
              <v-tab>
                <h3>Weapons</h3>
              </v-tab>
              <v-tab>
                <h3>Armor</h3>
              </v-tab>
              <v-tab>
                <h3>Gear</h3>
              </v-tab>
              <v-tab>
                <h3>Consumables</h3>
              </v-tab>
            </v-tabs>
            <v-tabs-items v-model="equipment_tab" class="character-tab-content">
              <v-tab-item>
                <show-cards
                  job="Attacks"
                  :inputs="$store.getters.getWeaponsFromList(character.Weapons)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                />
              </v-tab-item>
              <v-tab-item>
                <show-cards job="Armor" :inputs="[character.EquippedArmor]" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" />
              </v-tab-item>
              <v-tab-item
                ><show-cards
                  job="Gear"
                  :inputs="$store.getters.getGearFromList(character.Gear)"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
              /></v-tab-item>
              <v-tab-item><display-tooltip-text class="description-text" string="Not applicable yet!" /></v-tab-item>
              <v-tab-item style="margin: 1em;"
                ><div v-for="disc in character.Disciplines" :key="disc.name">{{ disc.name }} <span v-for="n in disc.tier" :key="n">I</span></div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          <h4>Abilities</h4>
          <v-card>
            <v-tabs v-model="ability_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
              <v-tab><h3>Techniques</h3></v-tab><v-tab><h3>Actions</h3></v-tab> <v-tab><h3>Attacks</h3></v-tab><v-tab><h3>Stunts</h3></v-tab
              ><v-tab><h3>Reactions</h3></v-tab><v-tab><h3>Gambits</h3></v-tab>
            </v-tabs>
            <v-tabs-items v-model="ability_tab" class="character-tab-content">
              <v-tab-item>
                <show-cards
                  job="Techniques"
                  :inputs="character.Techniques"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  :inputs="character.ManeuversOfType('Action')"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                /> </v-tab-item
              ><v-tab-item>
                <h4>Minor Attacks</h4>
                <show-cards job="Attacks" :inputs="character.MinorAttacks" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize" />
                <h4>Major Attacks</h4>
                <show-cards
                  job="Attacks"
                  :inputs="character.MajorAttacks"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  :inputs="character.ManeuversOfType('Stunt')"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  :inputs="character.ManeuversOfType('Reaction')"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                /> </v-tab-item
              ><v-tab-item>
                <show-cards
                  job="Maneuvers"
                  :inputs="character.ManeuversOfType('Gambit')"
                  standalone_or_contained="Standalone"
                  :collapse="false"
                  v-bind:cols="screenSize"
                />
              </v-tab-item> </v-tabs-items
          ></v-card></div></v-tab-item
      ><v-tab-item>
        <v-row style="margin: 1em;">
          <v-col :cols="columnNumbers">
            <v-row no-gutters>
              <v-col cols="2" />
              <v-col cols="3"><display-tooltip-text string="**_Health_:**" /></v-col>
              <v-col cols="2"> {{ character.Spirit.CurrentHealth }} / {{ character.Spirit.SpiritForm.Health }}</v-col>
              <v-col cols="3"
                ><v-btn inline x-small @click=";(character.Spirit.CurrentHealth += 1), $emit('changed')" color="green">+</v-btn>
                <v-btn inline x-small @click=";(character.Spirit.CurrentHealth -= 1), $emit('changed')" color="red">-</v-btn></v-col
              >
            </v-row>
            <!--- TODO: Add Stamina here --->
            <v-row justify="center">
              <v-btn @click="character.Spirit.ApplyRefresh(), $emit('changed')" class="grey lighten-4 mx-2">Apply Refresh</v-btn>
              <v-btn @click="character.Spirit.ResetDefault(), $emit('changed')" class="grey lighten-4 mx-2">Set Default</v-btn></v-row
            ></v-col
          ><v-col :cols="columnNumbers">
            <display-tooltip-text :string="character.Spirit.SpiritForm.ArmorHeader" /><movement-card
              :movement="$store.getters.getMovement(character.Spirit.SpiritForm.Movement)"
              :on_sheet="true"
            /> </v-col
        ></v-row>
        <h4>Traits and Weapons</h4>
        <v-card>
          <v-tabs v-model="spirit_trait_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
            <v-tab>
              <h3>Traits</h3>
            </v-tab>
            <v-tab>
              <h3>Weapons</h3>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="spirit_trait_tab" class="character-tab-content">
            <v-tab-item>
              <display-tooltip-text v-if="character.Spirit.SpiritType.HasEffect" :string="character.Spirit.SpiritType.EffectHeader" /><br
                v-if="character.Spirit.SpiritType.HasEffect"
              />
              <display-tooltip-text v-if="character.Spirit.SpiritType.HasManifestEffect" :string="character.Spirit.SpiritType.ManifestEffectHeader" /><br
                v-if="character.Spirit.SpiritType.HasManifestEffect"
              />
              <display-tooltip-text v-if="character.Spirit.SpiritType.HasSummonEffect" :string="character.Spirit.SpiritType.SummonEffectHeader" /><br
                v-if="character.Spirit.SpiritType.HasSummonEffect"
              />
              <div v-for="trait in character.Spirit.AllTraits" :key="trait">
                <display-tooltip-text :string="'* **' + trait.replaceAll('_', '') + ':** ' + $store.getters.getTrait(splitTrait(trait))" :decorate="false" />
              </div>
            </v-tab-item>
            <v-tab-item
              ><show-cards
                job="Attacks"
                :inputs="$store.getters.getWeaponsFromList(character.Spirit.Weapons)"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize"
            /></v-tab-item>
          </v-tabs-items>
        </v-card>
        <h4>Abilities</h4>
        <v-card>
          <v-tabs v-model="spirit_ability_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
            <v-tab>
              <h3>Attacks</h3>
            </v-tab>
            <v-tab>
              <h3>Techniques</h3>
            </v-tab>
            <v-tab>
              <h3>Actions</h3>
            </v-tab>
            <v-tab>
              <h3>Stunts</h3>
            </v-tab>
            <v-tab>
              <h3>Reactions</h3>
            </v-tab>
            <v-tab>
              <h3>Gambits</h3>
            </v-tab>
          </v-tabs>
          <v-tabs-items v-model="spirit_ability_tab" class="character-tab-content">
            <v-tab-item>
              <h4>Minor Attacks</h4>
              <show-cards
                job="Attacks"
                :inputs="character.SpiritMinorAttacks"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize" />
              <h4>Major Attacks</h4>
              <show-cards job="Attacks" :inputs="character.SpiritMajorAttacks" standalone_or_contained="Standalone" :collapse="false" v-bind:cols="screenSize"
            /></v-tab-item>
            <v-tab-item>
              <show-cards
                job="Techniques"
                :inputs="character.Techniques"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize"
              /> </v-tab-item
            ><v-tab-item>
              <show-cards
                job="Maneuvers"
                :inputs="character.SpiritManeuversOfType('Action')"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize"
              /> </v-tab-item
            ><v-tab-item>
              <show-cards
                job="Maneuvers"
                :inputs="character.SpiritManeuversOfType('Stunt')"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize"
              /> </v-tab-item
            ><v-tab-item>
              <show-cards
                job="Maneuvers"
                :inputs="character.SpiritManeuversOfType('Reaction')"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize"
              /> </v-tab-item
            ><v-tab-item>
              <show-cards
                job="Maneuvers"
                :inputs="character.SpiritManeuversOfType('Gambit')"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize"
            /></v-tab-item>
          </v-tabs-items> </v-card></v-tab-item
    ></v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import { Character } from '@/class'
import MovementCard from '@/components/cards/MovementCard.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
export default Vue.extend({
  name: 'display-character',
  components: { MovementCard, ShowCards, StanceCard },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data() {
    return {
      ability_tab: null,
      equipment_tab: null,
      spirit_trait_tab: null,
      spirit_ability_tab: null,
      character_or_spirit_tab: null,
      maneuver_tab: null,
      windowWidth: window.innerWidth,
    }
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
  methods: {
    splitTrait(trait) {
      if (trait.includes('_')) return trait.split('_')[1]
      return trait
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
.description-text {
  text-align: center;
  width: 100%;
}
.character-wrapper {
  font-family: $font--standard;
  border: 5px double black;
}
.character-tabs {
  font-family: $font--fancy;
  border-radius: 0px;
}
.character-tab-content {
  background-color: $color--grey-light !important;
  padding: 1em;
}
</style>
