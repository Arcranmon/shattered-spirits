<template
  ><div class="discipline--box">
    <h2>{{ discipline.Name }}</h2>
    <div class="page--description">
      <b>{{ discipline.TypeHeader }}</b
      ><br />
      <b><display-tooltip-text :string="discipline.RoleHeader.replace('/', '_/_')" /></b><br />
      <display-tooltip-text style="margin-left: 1em; margin-right: 1em;" class="page--description" :string="discipline.Flavor" />
    </div>
    <div class="header">
      <h4 style="display: flex;">
        Tier I <v-btn v-if="add_button" :disabled="tiers != 0" class="tier-button" v-on:click="clickMethod(discipline, 1)">Unlock Tier I</v-btn>
      </h4>
    </div>
    <div class="body">
      <div style="margin-top: 0.5em;" v-if="discipline.HasTier1Special" class="special--box">
        <h4 style="display: inline; font-style: normal;">Special</h4>
        <br />
        <display-tooltip-text :string="discipline.Tier1Special" />
      </div>
      <v-row
        ><v-col :cols="num_cols" v-for="tech in discipline.Tier1Techniques" :key="tech.Name"><tech-card :tech="tech" /></v-col
        ><v-col :cols="num_cols" v-for="attack in discipline.Tier1Attacks" :key="attack.Name"><attack-card :attack="attack" /></v-col
        ><v-col :cols="num_cols" v-for="man in discipline.Tier1Maneuvers" :key="man.Name"><maneuver-card :maneuver="man" :format_text="true" /></v-col
      ></v-row>
    </div>
    <div class="header">
      <h4 style="display: flex;">
        Tier II <v-btn v-if="add_button" :disabled="tiers != 1" class="tier-button" v-on:click="clickMethod(discipline, 2)">Unlock Tier II</v-btn>
      </h4>
    </div>
    <div class="body">
      <div style="margin-top: 0.5em;" v-if="discipline.HasTier2Special" class="special--box">
        <h4 style="display: inline; font-style: normal;">Special</h4>
        <br />
        <display-tooltip-text :string="discipline.Tier2Special" />
      </div>
      <v-row
        ><v-col :cols="num_cols" v-for="stance in discipline.Tier2Stances" :key="stance.Name"><stance-card :stance="stance" /></v-col>
        <v-col :cols="num_cols" v-for="attack in discipline.Tier2Attacks" :key="attack.Name"><attack-card :attack="attack" /></v-col
        ><v-col :cols="num_cols" v-for="tech in discipline.Tier2Techniques" :key="tech.Name"><tech-card :tech="tech" /></v-col
        ><v-col :cols="num_cols" v-for="man in discipline.Tier2Maneuvers" :key="man.Name"><maneuver-card :maneuver="man" :format_text="true" /></v-col
      ></v-row>
    </div>
    <div class="header">
      <h4 style="display: flex;">Tier III</h4>
    </div>
    <div class="body"></div>
    <br />
  </div>
</template>

<script>
import Vue from 'vue'
import AttackCard from '@/components/cards/AttackCard.vue'
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
    add_button: {
      type: Boolean,
      required: false,
      default: false,
    },
    tiers: {
      type: Number,
      required: false,
      default: -1,
    },
  },
  components: {
    ManeuverCard,
    TechCard,
    StanceCard,
    AttackCard,
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
    num_cols: function () {
      if (this.isMobile) return 12
      if (this.discipline.Tier1Techniques.length == 0) return 6
      return 4
    },
  },
  methods: {
    clickMethod(variable, tier) {
      this.$emit('chose', { discipline: variable, index: tier })
    },
  },
})
</script>

<style scoped lang="scss">
.special--box {
  border: $border--black-standard;
  width: 100%;
  background-color: $color--light-parchment;
  font-size: $font-size--m;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
}
.header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border-radius: 0em;
  width: 100%;
  height: 4em;
  padding: 1em;
}
.body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
  border-right: 2px solid hsla(2, 100%, 0%, 0.2);
  border-left: 2px solid hsla(2, 100%, 0%, 0.2);
  border-bottom: 2px solid hsla(2, 100%, 0%, 0.2);
  padding: 1em;
}
.discipline--tier-box {
  background-color: inherit !important;
}
.tier-button {
  background-color: $color--parchment !important;
  margin-left: 2em;
}
.v-expansion-panel {
  max-width: 100%;
}
</style>
