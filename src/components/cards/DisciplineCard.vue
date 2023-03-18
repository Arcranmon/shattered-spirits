<template
  ><div class="discipline--box">
    <h2>{{ discipline.Name }}</h2>
    <div class="page--description">
      <b>{{ discipline.TypeHeader }}</b
      ><br />
      <b>{{ discipline.RoleHeader }}</b
      ><br />
      <display-tooltip-text style="font-style: italic;" class="page--description" :string="discipline.Flavor" />
    </div>
    <v-expansion-panels flat accordion multiple v-model="panel">
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
          <v-row style="margin-top: 0.5em;"
            ><v-col cols="4" v-for="tech in discipline.Tier1Techniques" :key="tech"><tech-card :tech="tech" /></v-col
            ><v-col cols="4" v-for="man in discipline.Tier1Maneuvers" :key="man"><maneuver-card :maneuver="man" :format_text="true" /></v-col
          ></v-row>
        </v-expansion-panel-content>
      </v-expansion-panel>
      <v-expansion-panel class="discipline--tier-box" style="margin-left: -2px; margin-right: -2px;">
        <v-expansion-panel-header class="expand--header">
          <h4 style="display: flex;">Tier II</h4>
        </v-expansion-panel-header>
        <v-expansion-panel-content class="expand--body"
          ><v-row style="margin-top: 0.5em;"
            ><v-col cols="4" v-for="stance in discipline.Tier2Stances" :key="stance"><stance-card :stance="stance" /></v-col>
            <v-col cols="4" v-for="tech in discipline.Tier2Techniques" :key="tech"><tech-card :tech="tech" /></v-col
            ><v-col cols="4" v-for="man in discipline.Tier2Maneuvers" :key="man"><maneuver-card :maneuver="man" :format_text="true" /></v-col></v-row
        ></v-expansion-panel-content>
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
import ManeuverCard from '@/components/cards/ManeuverCard.vue'
import TechCard from '@/components/cards/TechCard.vue'
import StanceCard from '@/components/cards/StanceCard.vue'
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
    ManeuverCard,
    TechCard,
    StanceCard,
  },
  data() {
    return {
      panel: [0, 1],
    }
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
  max-width: 100%;
}
</style>
