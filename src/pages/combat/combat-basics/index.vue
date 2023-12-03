<template>
  <div style="padding: 1em;">
    <h2>Combat Basics</h2>
    <display-tooltip-text :string="combatText" />
  </div>
</template>

<script>
import Vue from 'vue'
import CombatText from '@/database/text_files/combat_rules/combat.txt'
import DisplayTooltipText from '@/components/DisplayTooltipText'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  computed: {
    combatText() {
      return CombatText
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
