<template>
  <div style="padding: 1em;">
    <h2>Equipment in Combat</h2>
    <display-tooltip-text :string="equipmentInCombat" />
    <show-cards job="Movement" :inputs="moves" :collapse="false" :cols="4" />
  </div>
</template>

<script>
import Vue from 'vue'
import EquipmentInCombat from '@/database/text_files/combat_rules/equipment_in_combat.txt'
import ShowCards from '@/components/cards/ShowCards.vue'
import DisplayTooltipText from '@/components/DisplayTooltipText'
import { store } from '@/store'
export default Vue.extend({
  name: 'equipment-in-combat',
  components: { ShowCards },
  computed: {
    equipmentInCombat() {
      return EquipmentInCombat
    },
    moves: function () {
      return this.$store.getters.getMovementsFromList(['Unencumbered', 'Light Load', 'Medium Load', 'Heavy Load'])
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
