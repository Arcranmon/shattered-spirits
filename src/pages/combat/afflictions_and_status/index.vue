<template>
  <div style="padding: 1em;">
    <h2>Afflictions and Status</h2>
    <div v-html="instantEffectText" />
    <div v-for="effect in instantEffects">
      <display-tooltip-text v-if="!effect.hasOwnProperty('see')" :string="'**' + effect.name + '**: ' + effect.effect" />
    </div>
    <br />
    <div v-html="afflictionText" />
    <div>
      <show-cards :inputs="afflictions" job="Affliction" :collapse="false" />
    </div>
    <br />
    <div v-html="elementalAfflictionText" />
    <div>
      <show-cards :inputs="elementalAfflictions" job="Affliction" :collapse="false" />
    </div>
    <br />
    <div v-html="mentalAfflictionText" />
    <div>
      <show-cards :inputs="mentalAfflictions" job="Affliction" :collapse="false" />
    </div>
    <br />
    <div v-html="statusText" />
    <div>
      <show-cards :inputs="statuses" job="Status" :collapse="false" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import InstantEffectText from '@/database/text_files/combat_rules/instant_effects.txt'
import StatusText from '@/database/text_files/combat_rules/statuses.txt'
import AfflictionText from '@/database/text_files/combat_rules/afflictions.txt'
import ShowCards from '@/components/cards/ShowCards.vue'
import ElementalAfflictionText from '@/database/text_files/combat_rules/elemental_afflictions.txt'
import MentalAfflictionText from '@/database/text_files/combat_rules/mental_afflictions.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  components: { ShowCards },
  computed: {
    statuses: function () {
      return this.$store.getters.getStatuses()
    },
    statusText: function () {
      return this.$marked.parse(StatusText)
    },
    instantEffects: function () {
      return this.$store.getters.getInstantEffects()
    },
    instantEffectText: function () {
      return this.$marked.parse(InstantEffectText)
    },
    afflictions: function () {
      return this.$store.getters.getAfflictionsByType('standard')
    },
    afflictionText: function () {
      return this.$marked.parse(AfflictionText)
    },
    elementalAfflictions: function () {
      return this.$store.getters.getAfflictionsByType('elemental')
    },
    elementalAfflictionText: function () {
      return this.$marked.parse(ElementalAfflictionText)
    },
    mentalAfflictions: function () {
      return this.$store.getters.getAfflictionsByType('mental')
    },
    mentalAfflictionText: function () {
      return this.$marked.parse(MentalAfflictionText)
    },
  },
})
</script>

<style scoped lang="scss">
.skill--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin: auto;
  margin-top: 1em;
  width: 40%;
  align-self: center;
}
</style>
