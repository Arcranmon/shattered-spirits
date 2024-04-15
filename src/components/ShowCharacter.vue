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
                <v-col cols="8"><h4>Combat Statistics</h4></v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" /><v-col cols="3"><display-tooltip-text string="**_Guard_:**" /></v-col
                ><v-col cols="3">{{ character.EquippedArmor.Guard }}</v-col></v-row
              >
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Vigor_:**" /></v-col>
                <v-col cols="2">{{ character.Vigor }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.Vigor -= 1), $emit('changed')" color="red">-</v-btn
                  ><v-btn inline x-small @click=";(character.Vigor += 1), $emit('changed')" color="green">+</v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Health_:**" /></v-col>
                <v-col cols="2">{{ character.CurrentHealth }} / {{ character.MaxHealth }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.CurrentHealth -= 1), $emit('changed')" color="red">-</v-btn
                  ><v-btn inline x-small @click=";(character.CurrentHealth += 1), $emit('changed')" color="green">+</v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Stamina_:**" /></v-col>
                <v-col cols="2">{{ character.Stamina }} / {{ character.MaxStamina }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.Stamina -= 1), $emit('changed')" color="red">-</v-btn
                  ><v-btn inline x-small @click=";(character.Stamina += 1), $emit('changed')" color="green">+</v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" />
                <v-col cols="3"><display-tooltip-text string="**_Momentum_:**" /></v-col><v-col cols="2"> {{ character.Momentum }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.Momentum -= 1), $emit('changed')" color="red">-</v-btn
                  ><v-btn inline x-small @click=";(character.Momentum += 1), $emit('changed')" color="green">+</v-btn>
                </v-col>
              </v-row>
              <v-row no-gutters>
                <v-col cols="2" /><v-col cols="3"><display-tooltip-text string="**_AP_:**" /></v-col
                ><v-col cols="2"> {{ character.AP }} / {{ character.MaxAP }}</v-col>
                <v-col cols="3"
                  ><v-btn inline x-small @click=";(character.AP -= 1), $emit('changed')" color="red">-</v-btn
                  ><v-btn inline x-small @click=";(character.AP += 1), $emit('changed')" color="green">+</v-btn>
                </v-col></v-row
              >
              <v-row no-gutters>
                <v-col cols="2" /><v-col cols="3"><display-tooltip-text string="**_Manifest_ Available:**" /></v-col><v-col cols="2"></v-col
                ><v-col cols="3"
                  ><v-btn inline x-small @click="character.ToggleManifest(), $emit('changed')" :color="character.UsedManifest ? 'red' : 'green'">{{
                    character.UsedManifest ? 'X' : '✔'
                  }}</v-btn></v-col
                ></v-row
              >
              <v-row no-gutters>
                <v-col cols="8"><movement-card :movement="character.MoveChart" :on_sheet="true" style /></v-col>
              </v-row> </v-col
            ><v-col :cols="columnNumbers">
              <v-row no-gutters>
                <v-col cols="1"></v-col>
                <v-col cols="6"><h4>Status Effects</h4></v-col>
                <v-col cols="2"><status-window @status-selected="character.AddStatus($event), $emit('changed')" /></v-col>
              </v-row>
              <v-row no-gutters v-for="status_effect in character.StatusEffects">
                <v-col cols="2" />
                <v-col cols="3"
                  ><img style="height: 1em; padding-right: 1em;" :src="require('@/assets/statuses/' + status_effect.status + '.svg')" />
                  <display-tooltip-text :string="'**_' + status_effect.status + '_:**'" /></v-col
                ><v-col cols="2">
                  <span v-if="status_effect.stack < 777">{{ status_effect.stack }}</span></v-col
                >
                <v-col cols="3"
                  ><v-btn inline x-small @click="character.RemoveStatus(status_effect.status), $emit('changed')" color="red">-</v-btn
                  ><v-btn v-if="status_effect.stack < 777" inline x-small @click="character.AddStatus(status_effect.status), $emit('changed')" color="green"
                    >+</v-btn
                  >
                </v-col></v-row
              ></v-col
            >
            <v-col :cols="12" style="margin-bottom: 1em;">
              <h3 style="text-align: center;">Stances</h3>
              <v-row
                ><v-col :cols="columnNumbers"> <stance-card :stance="character.CurrentSpiritStance" :on_sheet="true" style="width: 90%; margin: auto;" /></v-col
                ><v-col :cols="columnNumbers">
                  <stance-card :stance="character.CurrentMartialStance" :on_sheet="true" style="width: 90%; margin: auto;" /></v-col></v-row></v-col
          ></v-row>
          <h3 style="text-align: center;">Equipment</h3>
          <v-card>
            <v-tabs v-model="equipment_tab" class="character-tabs" background-color="#b69e75" color="black" centered>
              <v-tab>
                <h3>Weapons</h3>
              </v-tab>
              <v-tab>
                <h3>Armor</h3>
              </v-tab>
              <v-tab>
                <h3>Accessories</h3>
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
              <v-tab-item><display-tooltip-text class="description-text" string="Not applicable yet!" /></v-tab-item>
              <v-tab-item><display-tooltip-text class="description-text" string="Not applicable yet!" /></v-tab-item>
              <v-tab-item style="margin: 1em;"
                ><div v-for="disc in character.Disciplines" :key="disc.name">{{ disc.name }} <span v-for="n in disc.tier" :key="n">I</span></div>
              </v-tab-item>
            </v-tabs-items>
          </v-card>
          <h3 style="text-align: center;">Abilities</h3>
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
              <v-col cols="8"><h4>Combat Statistics</h4></v-col></v-row
            >
            <v-row no-gutters>
              <v-col cols="2" /><v-col cols="3"><display-tooltip-text string="**_Guard_:**" /></v-col
              ><v-col cols="3">{{ character.Spirit.Form.Guard }}</v-col></v-row
            >
            <v-row no-gutters>
              <v-col cols="2" />
              <v-col cols="3"><display-tooltip-text string="**_Vigor_:**" /></v-col>
              <v-col cols="2">{{ character.Spirit.Vigor }}</v-col>
              <v-col cols="3"
                ><v-btn inline x-small @click=";(character.Spirit.Vigor -= 1), $emit('changed')" color="red">-</v-btn
                ><v-btn inline x-small @click=";(character.Spirit.Vigor += 1), $emit('changed')" color="green">+</v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" />
              <v-col cols="3"><display-tooltip-text string="**_Health_:**" /></v-col>
              <v-col cols="2"> {{ character.Spirit.CurrentHealth }} / {{ character.Spirit.Form.Health }}</v-col>
              <v-col cols="3"
                ><v-btn inline x-small @click=";(character.Spirit.CurrentHealth -= 1), $emit('changed')" color="red">-</v-btn
                ><v-btn inline x-small @click=";(character.Spirit.CurrentHealth += 1), $emit('changed')" color="green">+</v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="2" />
              <v-col cols="3"><display-tooltip-text string="**_Stamina_:**" /></v-col>
              <v-col cols="2">{{ character.Spirit.Stamina }} / {{ character.Spirit.MaxStamina }}</v-col>
              <v-col cols="3">
                <v-btn inline x-small @click=";(character.Spirit.Stamina -= 1), $emit('changed')" color="red">-</v-btn
                ><v-btn inline x-small @click=";(character.Spirit.Stamina += 1), $emit('changed')" color="green">+</v-btn>
              </v-col>
            </v-row>
            <v-row no-gutters>
              <v-col cols="8"><movement-card :movement="$store.getters.getMovement(character.Spirit.Form.Movement)" :on_sheet="true" /></v-col>
            </v-row> </v-col
          ><v-col :cols="columnNumbers">
            <v-row no-gutters>
              <v-col cols="1"></v-col>
              <v-col cols="6"><h4>Status Effects</h4></v-col>
              <v-col cols="2"><status-window @status-selected="character.Spirit.AddStatus($event), $emit('changed')" /></v-col>
            </v-row>
            <v-row no-gutters v-for="status_effect in character.Spirit.StatusEffects">
              <v-col cols="2" />
              <v-col cols="3"><display-tooltip-text :string="'**_' + status_effect.status + '_:**'" /></v-col
              ><v-col cols="2">
                <span v-if="status_effect.stack < 777">{{ status_effect.stack }}</span></v-col
              >
              <v-col cols="3"
                ><v-btn inline x-small @click="character.Spirit.RemoveStatus(status_effect.status), $emit('changed')" color="red">-</v-btn
                ><v-btn
                  v-if="status_effect.stack < 777"
                  inline
                  x-small
                  @click="character.Spirit.AddStatus(status_effect.status), $emit('changed')"
                  color="green"
                  >+</v-btn
                >
              </v-col></v-row
            ></v-col
          ></v-row
        >
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
              <display-tooltip-text v-if="character.Spirit.Subtype.HasEffect" :string="character.Spirit.Subtype.EffectHeader" /><br
                v-if="character.Spirit.Subtype.HasEffect"
              />
              <display-tooltip-text v-if="character.Spirit.Subtype.HasManifestEffect" :string="character.Spirit.Subtype.ManifestEffectHeader" /><br
                v-if="character.Spirit.Subtype.HasManifestEffect"
              />
              <display-tooltip-text v-if="character.Spirit.Subtype.HasSummonEffect" :string="character.Spirit.Subtype.SummonEffectHeader" /><br
                v-if="character.Spirit.Subtype.HasSummonEffect"
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
              <h3>Techniques</h3>
            </v-tab>
            <v-tab>
              <h3>Actions</h3>
            </v-tab>
            <v-tab>
              <h3>Attacks</h3>
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
              <show-cards
                job="Techniques"
                :inputs="character.SpiritTechniques"
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
              />
            </v-tab-item>
            <v-tab-item>
              <h4>Minor Attacks</h4>
              <show-cards
                job="Attacks"
                :inputs="character.SpiritMinorAttacks"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize" />
              <h4>Major Attacks</h4>
              <show-cards
                job="Attacks"
                :inputs="character.SpiritMajorAttacks"
                standalone_or_contained="Standalone"
                :collapse="false"
                v-bind:cols="screenSize" /></v-tab-item
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
import StatusWindow from '@/components/StatusWindow.vue'
import ShowCards from '@/components/cards/ShowCards.vue'
export default Vue.extend({
  name: 'display-character',
  components: { MovementCard, ShowCards, StanceCard, StatusWindow },
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
