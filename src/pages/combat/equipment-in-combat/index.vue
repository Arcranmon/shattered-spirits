<template>
  <div style="padding: 1em;">
    <h2>Equipment in Combat</h2>
    <display-tooltip-text :string="equipmentInCombat" />
  </div>
</template>

<script>
import Vue from 'vue'
import EquipmentInCombat from '@/database/text_files/combat_rules/equipment_in_combat.txt'
import DisplayTooltipText from '@/components/DisplayTooltipText'
import { store } from '@/store'
export default Vue.extend({
  name: 'combat-basics',
  computed: {
    equipmentInCombat() {
      return EquipmentInCombat
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
