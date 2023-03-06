<template
  ><div class="discipline--box" v-bind:class="discipline.Type.replace(' ', '_')">
    <h2>{{ discipline.Name }}</h2>
    <div class="page--description">
      <b>{{ discipline.Role }}</b
      ><br />
      <display-tooltip-text style="font-style: italic;" class="page--description" :string="discipline.Flavor" />
    </div>
    <v-expansion-panels flat accordion multiple>
      <v-expansion-panel class="discipline--tier-box">
        <v-expansion-panel-header class="expand--header">
          <h4 style="display: flex;">Tier I</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expand--body"
          ><div v-if="discipline.HasTier1Special" class="special--box">
            <h4 style="display: inline; font-style: normal;">Special</h4>
            <br />
            <display-tooltip-text :string="discipline.Tier1Special" />
          </div>
          <show-cards
            v-if="discipline.HasTier1Techniques"
            job="Techniques"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier1Techniques" /><show-cards
            v-if="discipline.HasTier1Maneuvers"
            job="Maneuvers"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier1Maneuvers" /><show-cards
            v-if="discipline.HasTier1Reactions"
            job="Reactions"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier1Reactions"
        /></v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="discipline--tier-box" style="margin-left: -2px; margin-right: -2px;">
        <v-expansion-panel-header class="expand--header">
          <h4 style="display: flex;">Tier II</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expand--body"
          ><show-cards
            v-if="discipline.HasTier2Stances"
            job="Stances"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier2Stances" /><show-cards
            v-if="discipline.HasTier2Techniques"
            job="Techniques"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier2Techniques" /><show-cards
            v-if="discipline.HasTier2Maneuvers"
            job="Maneuvers"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier2Maneuvers" /><show-cards
            v-if="discipline.HasTier2Reactions"
            job="Reactions"
            standalone_or_contained="standalone"
            :collapse="false"
            :cols="1"
            :inputs="discipline.Tier2Reactions"
        /></v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="discipline--tier-box">
        <v-expansion-panel-header class="expand--header">
          <h4 style="display: flex;">Tier III</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expand--body"></v-expansion-panel-content>
      </v-expansion-panel> </v-expansion-panels
    ><br />
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import { Discipline } from '@/class'
import { store } from '@/store'
export default Vue.extend({
  name: 'discipline-cards',
  props: {
    discipline: {
      type: Discipline,
      required: true,
    },
  },
  components: {
    ShowCards,
  },
  computed: {
    stance_or_style: function () {
      if (this.discipline.Type in ['Earth', 'Wind', 'Flame', 'Wood', 'Metal', 'Water']) return 'Spirit Stance'
      return 'Martial Stance'
    },
  },
})
</script>

<style scoped lang="scss">
.discipline--box {
  border: $border--black-standard;
  margin-top: -2px;
}
.special--box {
  border: $border--black-standard;
  width: 95%;
  background-color: $color--parchment;
  font-size: $font-size--s;
  text-align: center;
  margin: 0 auto;
}
.expand--header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border-radius: 0em;
}
.expand--body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
  border-right: 2px solid hsla(2, 100%, 0%, 0.2);
  border-left: 2px solid hsla(2, 100%, 0%, 0.2);
  border-bottom: 2px solid hsla(2, 100%, 0%, 0.2);
}
.discipline--tier-box {
  background-color: inherit !important;
}
.v-expansion-panel {
  max-width: 33%;
}
</style>
