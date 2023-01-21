<template>
  <div class="npc--box" style="background-color: DarkGray;">
    <h3>
      <center>{{ npc.Name }}</center>
    </h3>
    <div class="npc--header">
      <div v-if="(npc.Desc.length > 0)">
        <i>{{ npc.Desc }}</i
        ><br /><b>{{ npc.SpiritType }} {{ npc.NpcType }}</b
        ><br /><b>{{ npc.Role }}</b>
      </div>
    </div>
    <div class="npc--content">
      <div v-html="$marked.parseInline(npc.ApText)" />
      <div v-html="$marked.parseInline(npc.SizeText)" />
      <div v-html="$marked.parseInline(npc.EnduranceText)" />
      <armor-card :armor="npc.Armor" :format="false" :on_sheet="true" />
      <show-cards :inputs="stances" job="Stances" :collapse="true" />
      <show-cards :inputs="styles" job="Stances" :collapse="true" display_text="Styles" />
      <show-cards :inputs="weapons" job="Weapons" :collapse="true" />
      <show-cards :inputs="techniques" job="Techniques" :collapse="true" />
      <show-cards :inputs="enhancements" job="Enhancements" :collapse="true" />
      <show-cards :inputs="reactions" job="Reactions" :collapse="true" />
      <show-cards
        v-if="(npc.OptionalStances.length > 0)"
        :inputs="optional_stances"
        job="Stances"
        :collapse="true"
        display_text="Optional Stances and Styles"
      />
      <show-cards
        v-if="(npc.OptionalTechniques.length > 0)"
        :inputs="optional_techniques"
        job="Techniques"
        :collapse="true"
        display_text="Optional Techniques"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Npc } from '@/class'
import ArmorCard from '@/components/cards/ArmorCard.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'npc-card',
  components: {
    ShowCards: () => import('@/components/cards/ShowCards.vue'),
    ArmorCard,
  },
  props: {
    npc: {
      type: Npc,
      required: true,
    },
  },
  computed: {
    weapons: function () {
      return this.$store.getters.getWeaponsFromList(this.npc.Weapons)
    },
    enhancements: function () {
      return this.$store.getters.getEnhancementsFromList(this.npc.Enhancements)
    },
    reactions: function () {
      return this.$store.getters.getReactionsFromList(this.npc.Reactions)
    },
    stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.Stances)
    },
    styles: function () {
      return this.$store.getters.getStancesFromList(this.npc.Styles)
    },
    techniques: function () {
      return this.$store.getters.getTechniquesFromList(this.npc.Techniques)
    },
    optional_stances: function () {
      return this.$store.getters.getStancesFromList(this.npc.OptionalStances)
    },
    optional_techniques: function () {
      return this.$store.getters.getTechniquesFromList(this.npc.OptionalTechniques)
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
  color: black;
  padding-bottom: $space--xs;
}
.npc--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
</style>
