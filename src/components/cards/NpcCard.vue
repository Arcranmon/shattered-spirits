<template>
  <div class="npc--box" style="background-color: DarkGray;">
    <h3>
      <center>{{ npc.Name }}</center>
    </h3>
    <div class="npc--header">
      <div v-if="(npc.Desc.length > 0)">
        <i>{{ npc.Desc }}</i
        ><br /><b>{{ npc.SpiritType }} {{ npc.NpcType }}</b
        ><br /><b>{{ npc.Role }}</b
        ><br /><b><display-tooltip-text :string="npc.Class" :decorate="false" /></b>
      </div>
    </div>
    <div class="npc--content">
      <v-row no-gutters>
        <v-col cols="6">
          <div v-if="npc.Class != 'Minion'" v-html="$marked.parseInline(npc.ApText)" />
          <div v-html="$marked.parseInline(npc.SizeText)" />
          <div v-html="$marked.parseInline(npc.EnduranceText)" />
          <div v-html="$marked.parseInline(npc.ArmorText)" />
          <div v-if="npc.Traits.length > 0"><b>Traits:</b></div>
          <span v-for="trait in npc.Traits" :key="trait">
            <display-tooltip-text
              :string="'* **' + trait.replaceAll('_', '') + ':** ' + $store.getters.getTrait(splitTrait(trait))"
              :decorate="false" /></span></v-col
        ><v-col cols="6"> <movement-card :movement="npc.Movement" :npc="true" /></v-col
      ></v-row>
      <v-row no-gutters></v-row><br />
    </div>
    <v-card>
      <v-tabs v-model="tab" class="character-tabs" background-color="#b69e75" color="black" centered>
        <v-tab>
          <h3>Techniques</h3>
        </v-tab>
        <v-tab>
          <h3>Attacks</h3>
        </v-tab>
        <v-tab v-if="npc.HasWeapons">
          <h3>Weapons</h3>
        </v-tab>
        <v-tab v-if="npc.Class != 'Minion'">
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
        </v-tab></v-tabs
      ><v-tabs-items v-model="tab" class="character-tab-content">
        <v-tab-item> <show-cards :inputs="techniques" job="Techniques" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="attacks" job="Attacks" :collapse="false" /></v-tab-item
        ><v-tab-item v-if="npc.HasWeapons"> <show-cards :inputs="weapons" job="Attacks" :collapse="false" /></v-tab-item
        ><v-tab-item v-if="npc.Class != 'Minion'"> <show-cards :inputs="actions" job="Maneuvers" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="stunts" job="Maneuvers" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="reactions" job="Maneuvers" :collapse="false" /></v-tab-item
        ><v-tab-item> <show-cards :inputs="gambits" job="Maneuvers" :collapse="false" /></v-tab-item
      ></v-tabs-items>
    </v-card>
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import MovementCard from '@/components/cards/MovementCard.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'npc-card',
  components: {
    ShowCards: () => import('@/components/cards/ShowCards.vue'),
    MovementCard,
  },
  data() {
    return { tab: null }
  },
  props: {
    npc: {
      type: Npc,
      required: true,
    },
  },
  computed: {
    actions: function () {
      return this.$store.getters.getManeuversFromList(this.npc.Actions)
    },
    attacks: function () {
      return this.$store.getters.getAttacksFromList(this.npc.Attacks)
    },
    gambits: function () {
      return this.$store.getters.getManeuversFromList(this.npc.Gambits)
    },
    weapons: function () {
      return this.$store.getters.getWeaponsFromList(this.npc.Weapons)
    },
    reactions: function () {
      return this.$store.getters.getManeuversFromList(this.npc.Reactions)
    },
    spirit_stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.SpiritStances)
    },
    martial_stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.MartialStances)
    },
    stunts: function () {
      return this.$store.getters.getManeuversFromList(this.npc.Stunts)
    },
    techniques: function () {
      return this.$store.getters.getTechniquesFromList(this.npc.Techniques)
    },
  },
  methods: {
    splitTrait(trait) {
      if (trait.includes('_')) return trait.split('_')[1]
      return trait
    },
  },
})
</script>

<style scoped lang="scss">
.npc--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
  width: 100%;
  overflow: hidden;
}
.npc--header {
  text-align: center;
  font-size: $font-size--s;
  font-family: $font--standard;
  color: black;
  padding-bottom: $space--xs;
}
.npc--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
  font-family: $font--standard !important;
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
