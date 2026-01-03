<template>
  <div>
    <span v-if="collapse">
      <v-expansion-panels flat style="padding: 3px">
        <v-expansion-panel style="background-color: inherit">
          <v-expansion-panel-header v-bind:class="contained_header">
            <h3 style="display: flex">{{ dropName }}</h3>
          </v-expansion-panel-header>
          <v-expansion-panel-content v-bind:class="contained_body">
            <v-container fluid>
              <v-row>
                <v-col
                  cols="12"
                  class="d-flex justify-center"
                  v-for="(n, index) in inputs"
                  v-bind:key="n.Name"
                  :lg="colWidth"
                  v-bind:class="{ 'card--button': selectButton }"
                  v-on:click="clickMethod(n, index)"
                >
                  <div class="card--box" v-if="isStance(n)">
                    <stance-card :stance="n" :category="card_color" :on_sheet="on_sheet" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="isWeapon(n)">
                    <weapon-card :weapon="n" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="isTrait(n)">
                    <trait-card :trait="n" :color="card_color" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="isArmor(n)">
                    <armor-card :armor="n" :color="card_color" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="isAbilityPackage(n)">
                    <ap-card :ap="n" style="height: 100%" />
                  </div>
                </v-col>
              </v-row> </v-container
          ></v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </span>
    <span v-else>
      <v-container fluid>
        <v-row>
          <v-col
            cols="12"
            class="d-flex justify-center"
            v-for="(n, index) in inputs"
            :key="n.Name"
            v-bind:class="{ 'card--button': selectButton }"
            v-on:click="clickMethod(n, index)"
            :lg="colWidth"
          >
            <div class="card--box" v-if="isStance(n)">
              <stance-card :stance="n" style="height: 100%" :category="card_color" :on_sheet="on_sheet" :character_creation="character_creation" />
            </div>
            <div class="card--box" v-if="isWeapon(n)">
              <weapon-card :weapon="n" :color="card_color" :character_creation="character_creation" style="height: 100%" />
            </div>
            <div class="card--box" v-if="isArmor(n)">
              <armor-card :armor="n" :color="card_color" :character_creation="character_creation" style="height: 100%" />
            </div>
            <div class="card--box" v-if="isEquipment(n)">
              <equipment-card :equipment="n" style="height: 100%" />
            </div>
            <!---
            <div class="card--box" v-if="job == 'Features'">
              <feature-card :feature="n" />
            </div>
            <div class="card--box" v-if="job == 'Movement'">
              <movement-card :movement="n" />
            </div>
            -->
            <div class="card--box" v-if="isTerrain(n)">
              <terrain-card :terrain="n" style="height: 100%" />
            </div>
            <div class="card--box" v-if="isAbilityPackage(n)">
              <ap-card :ap="n" style="height: 100%" />
            </div>
            <div class="card--box" v-if="isSpiritForm(n)">
              <spirit-form-card :form="n" style="height: 100%" />
            </div>
            <div class="card--box" v-if="isStatus(n)">
              <status-card :status="n" style="height: 100%" />
            </div>
          </v-col>
        </v-row> </v-container
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import ArmorCard from './ArmorCard.vue'
import ApCard from './APCard.vue'
import EquipmentCard from './EquipmentCard.vue'
import FeatureCard from './FeatureCard.vue'
import StanceCard from './StanceCard.vue'
import StatusCard from './StatusCard.vue'
import TechCard from './TechCard.vue'
import TerrainCard from './TerrainCard.vue'
import WeaponCard from './WeaponCard.vue'
import SpiritTypeCard from './SpiritTypeCard.vue'
import SpiritFormCard from './SpiritFormCard.vue'
import TraitCard from './TraitCard.vue'
import {
  AbilityPackage,
  Armor,
  Equipment,
  Archetype,
  Feature,
  Stance,
  Status,
  Talent,
  Technique,
  SpiritForm,
  Trait,
  Terrain,
  Weapon,
  SpiritType,
} from '@/class'

export default Vue.extend({
  name: 'show-cards',
  props: {
    inputs: {
      type: Array,
      required: true,
    },
    card_color: {
      type: String,
      required: false,
      default: '#ece6dc',
    },
    header_color: {
      type: String,
      required: false,
      default: '#ece6dc',
    },
    display_text: {
      type: String,
      required: false,
      default: 'None',
    },
    summary_text: {
      type: String,
      required: false,
      default: '',
    },
    standalone_or_contained: {
      type: String,
      required: false,
      default: 'Contained',
    },
    on_sheet: {
      type: Boolean,
      required: false,
      default: false,
    },
    collapse: {
      type: Boolean,
      required: false,
      default: true,
    },
    cols: {
      type: Number,
      required: false,
      default: 3,
    },
    selectButton: {
      type: Boolean,
      required: false,
      default: false,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  components: {
    ApCard,
    ArmorCard,
    EquipmentCard,
    FeatureCard,
    StanceCard,
    StatusCard,
    TechCard,
    TerrainCard,
    WeaponCard,
    SpiritFormCard,
    SpiritTypeCard,
    TraitCard,
  },
  methods: {
    clickMethod(variable, index) {
      this.$emit('chose', { card: variable, index: index })
    },
    isAbilityPackage(variable) {
      return variable instanceof AbilityPackage
    },
    isArchetype(variable) {
      return variable instanceof Archetype
    },
    isArmor(variable) {
      return variable instanceof Armor
    },
    isStance(variable) {
      return variable instanceof Stance
    },
    isTechnique(variable) {
      return variable instanceof Technique
    },
    isTerrain(variable) {
      return variable instanceof Terrain
    },
    isEquipment(variable) {
      return variable instanceof Equipment && !(variable instanceof Armor) && !(variable instanceof Weapon)
    },
    isWeapon(variable) {
      return variable instanceof Weapon
    },
    isTalent(variable) {
      return variable instanceof Talent
    },
    isSpiritForm(variable) {
      return variable instanceof SpiritForm
    },
    isTrait(variable) {
      return variable instanceof Trait
    },
    isStatus(variable) {
      return variable instanceof Status
    },
  },
  computed: {
    colWidth: function () {
      return 12 / this.cols
    },
    dropName: function () {
      if (this.display_text == 'None') return this.job
      else return this.display_text
    },
    contained_header: function () {
      if (this.standalone_or_contained == 'Contained') return 'expand--header-contained ' + this.header_color.replace(' ', '_')
      return 'expand--header-standalone ' + this.header_color.replace(' ', '_')
    },
    contained_body: function () {
      if (this.standalone_or_contained == 'Contained') return 'expand--body-contained ' + this.header_color.replace(' ', '_')
      return 'expand--body-standalone ' + this.header_color.replace(' ', '_')
    },
  },
})
</script>

<style scoped lang="scss">
.card--box {
  width: 100%;
}
.expand--header-contained {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border-top-left-radius: 1em;
  border-top-right-radius: 1em;
}
.expand--header-standalone {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border: $border--black-standard;
}
.expand--body-contained {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
}
.expand--body-standalone {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
  border: $border--black-thin;
  border-top: none;
}
.card--button:hover {
  transform: scale(1.05);
  cursor: pointer;
}
.summary--text {
  width: 70%;
  font-size: large;
  text-align: left;
  justify-content: right;
  display: flex;
}
</style>
