<template>
  <div>
    <span v-if="collapse">
      <v-expansion-panels flat style="padding: 3px;">
        <v-expansion-panel style="background-color: inherit;">
          <v-expansion-panel-header v-bind:class="contained_header">
            <h3 style="display: flex;">{{ dropName }}</h3>
            <div class="summary--text">{{ summary_text }}</div>
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
                  <div class="card--box" v-if="job == 'Stances'">
                    <stance-card :stance="n" :category="card_color" :on_sheet="on_sheet" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="job == 'Techniques'">
                    <tech-card :tech="n" :category="card_color" :on_sheet="on_sheet" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="job == 'Attacks'">
                    <attack-card :attack="n" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="job == 'Armor'">
                    <armor-card :armor="n" :color="card_color" :character_creation="character_creation" />
                  </div>
                  <div class="card--box" v-if="job == 'Maneuvers'">
                    <maneuver-card :maneuver="n" :format_text="true" :standalone="on_sheet" />
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
            <div class="card--box" v-if="job == 'Maneuvers'">
              <maneuver-card :maneuver="n" :format_text="true" />
            </div>
            <div class="card--box" v-if="job == 'Stances'">
              <stance-card :stance="n" :category="card_color" :on_sheet="on_sheet" :character_creation="character_creation" />
            </div>
            <div class="card--box" v-if="job == 'Techniques'">
              <tech-card :tech="n" :category="card_color" :on_sheet="on_sheet" :character_creation="character_creation" />
            </div>
            <div class="card--box" v-if="job == 'Attacks'">
              <attack-card :attack="n" :color="card_color" :character_creation="character_creation" />
            </div>
            <div class="card--box" v-if="job == 'Armor'">
              <armor-card :armor="n" :color="card_color" :character_creation="character_creation" />
            </div>
            <div class="card--box" v-if="job == 'NPC'">
              <npc-card :npc="n" />
            </div>
            <div class="card--box" v-if="job == 'Gear'">
              <gear-card :gear="n" />
            </div>
            <div class="card--box" v-if="job == 'Obstacles'">
              <obstacle-card :obstacle="n" />
            </div>
            <div class="card--box" v-if="job == 'Terrain'">
              <terrain-card :terrain="n" />
            </div>
            <div class="card--box" v-if="job == 'Status'">
              <status-card :status="n" />
            </div>
            <div class="card--box" v-if="job == 'Movement'">
              <movement-card :movement="n" />
            </div>
          </v-col>
        </v-row> </v-container
    ></span>
  </div>
</template>

<script>
import Vue from 'vue'
import ArmorCard from './ArmorCard.vue'
import GearCard from './GearCard.vue'
import ManeuverCard from './ManeuverCard.vue'
import MovementCard from './MovementCard.vue'
import ObstacleCard from './ObstacleCard.vue'
import StanceCard from './StanceCard.vue'
import StatusCard from './StatusCard.vue'
import TechCard from './TechCard.vue'
import TerrainCard from './TerrainCard.vue'
import AttackCard from './AttackCard.vue'
import NpcCard from './NpcCard.vue'

export default Vue.extend({
  name: 'show-cards',
  props: {
    inputs: {
      type: Array,
      required: true,
    },
    job: {
      type: String,
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
    ArmorCard,
    GearCard,
    ManeuverCard,
    MovementCard,
    NpcCard,
    ObstacleCard,
    StanceCard,
    StatusCard,
    TechCard,
    TerrainCard,
    AttackCard,
  },
  methods: {
    clickMethod(variable, index) {
      this.$emit('chose', { card: variable, index: index })
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
