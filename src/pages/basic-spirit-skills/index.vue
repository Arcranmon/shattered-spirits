<template
  ><div class="background">
    <h2>Basic Spirit Skills</h2>
    <div style="width: 100%;">
      <show-cards
        :inputs="[$store.getters.getManeuver('Swift Manifestation'), this.$store.getters.getManeuver('Spirit Summon')]"
        job="Maneuvers"
        :collapse="false"
        :cols="2"
        v-bind:class="use_duo"
      />
      <show-cards
        :inputs="[this.$store.getters.getAttack('Minor Spirit Strike'), $store.getters.getAttack('Major Spirit Strike')]"
        job="Attacks"
        :collapse="false"
        :cols="2"
        v-bind:class="use_duo"
      />
      <br />
    </div>
    <v-tabs v-model="tab" class="spirit-tabs" background-color="#b69e75" color="black" centered
      ><v-tab> <h4>Earth</h4> </v-tab></v-tabs
    >
    <v-tabs-items v-model="tab" class="spirit-tab-content">
      <v-tab-item>
        <display-tooltip-text :string="earthText" />
        <h4>Earth Spirit Types</h4>
        <display-tooltip-text
          class="description-text"
          string="Your Spirit reflects your expertise in magic. Your spirit gets one of the below, based on your starting Spirit Discipline:" />
        <v-row style="padding: 1em;"
          ><v-col :cols="4" v-for="item in ['Land Spirit', 'Stone Spirit', 'Grounding Spirit', 'Courage Spirit', 'Earthsight Spirit']" :key="item">
            <div class="spirit-box--wrapper" inline>
              <div class="spirit-box--underline-top">
                <div class="spirit-box--header">
                  <h4 style="display: inline;">{{ item }}</h4>
                </div>
              </div>
              <div class="spirit-box--content spirit-box--format">
                <display-tooltip-text :string="$store.getters.getSpiritType(item).effect" />
              </div></div></v-col
        ></v-row>
        <h4>Earth Spirit Forms</h4>
        <display-tooltip-text class="description-text" string="Choose one of the below, which represents the physical form your spirit takes when summoned:" />
        <h4>Earth Spirit Weapons</h4>
        <display-tooltip-text class="description-text" string="Choose one of the below, which represents the physical weapons your spirit has:" />
        <h4>Earth Spirit Attacks</h4>
        <display-tooltip-text class="description-text" string="Basic attacks your Spirit has access to at all times:"
      /></v-tab-item>
    </v-tabs-items>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import EarthText from '@/database/text_files/spirit_mechanics/earth.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'basic-spirit-skills',
  data() {
    return { tab: null }
  },
  components: {
    ShowCards,
  },
  computed: {
    earthText() {
      return EarthText
    },
    use_duo() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-duo'
    },
    use_single() {
      if (this.isMobile) {
        return ''
      }
      return 'centered-single'
    },
    num_cols() {
      if (this.isMobile) {
        return 12
      }
      return 6
    },
  },
})
</script>

<style scoped lang="scss">
.description-text {
  text-align: center;
  width: 100%;
}
.centered-single {
  justify-content: center;
  margin: auto;
  width: 33.33%;
}
.centered-duo {
  justify-content: center;
  margin: auto;
  width: 66.66%;
}
.background {
  background: $color--background !important;
  height: 100%;
  margin: 0;
  padding: 0;
}
.spirit-tabs {
  font-family: $font--fancy;
  font-size: larger;
  border-top: $border--black-standard;
  border-radius: 0px;
}
.spirit-tab-content {
  margin-top: 1em;
  background-color: $color--background !important;
}
.spirit-box--wrapper {
  font-size: small;
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  height: 100%;
  text-align: center;
  color: black;
}
.spirit-box--underline-top {
  border-bottom: 5px solid black;
}
.spirit-box--content {
  color: black;
  padding: $space--xs;
}
.spirit-box--text-format {
  font-size: $font-size--s;
}
.spirit-box--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
