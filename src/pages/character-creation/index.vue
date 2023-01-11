<template>
  <div style="padding: 1em;">
    <h2>Character Creation</h2>
    <display-tooltip-text :string="choosingYourSpirit" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourEquipment" />
    <br />
    <display-tooltip-text :string="choosingYourArmor" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourWeapons" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourStyleStances" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourTechniques" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourTalents" />
    <br />
    <br />
    <display-tooltip-text :string="choosingYourAppearance" />
    <br />
    <br />
    <display-tooltip-text :string="creatingYourBackground" />
    <br />
    <br />
    <display-tooltip-text :string="finalizingYourCharacter" />
  </div>
</template>

<script>
import Vue from 'vue'
import ChoosingYourSpirit from '@/database/text_files/character_creation/choosing_your_spirit.txt'
import ChoosingYourEquipment from '@/database/text_files/character_creation/choosing_your_equipment.txt'
import ChoosingYourArmor from '@/database/text_files/character_creation/choosing_your_armor.txt'
import ChoosingYourWeapons from '@/database/text_files/character_creation/choosing_your_weapons.txt'
import ChoosingYourStyleStances from '@/database/text_files/character_creation/choosing_your_styles_stances.txt'
import ChoosingYourTechniques from '@/database/text_files/character_creation/choosing_your_techniques.txt'
import ChoosingYourTalents from '@/database/text_files/character_creation/choosing_your_talents.txt'
import ChoosingYourAppearance from '@/database/text_files/character_creation/choosing_your_appearance.txt'
import CreatingYourBackground from '@/database/text_files/character_creation/creating_your_background.txt'
import FinalizingYourCharacter from '@/database/text_files/character_creation/finalizing_your_character.txt'
import DisplayTooltipText from '@/components/DisplayTooltipText'

import { store } from '@/store'
export default Vue.extend({
  name: 'character-creation',
  components: {},
  computed: {
    choosingYourSpirit() {
      return ChoosingYourSpirit
    },
    choosingYourEquipment() {
      return ChoosingYourEquipment
    },
    choosingYourArmor() {
      return ChoosingYourArmor
    },
    choosingYourWeapons() {
      return ChoosingYourWeapons
    },
    choosingYourStyleStances() {
      return ChoosingYourStyleStances
    },
    choosingYourTechniques() {
      return ChoosingYourTechniques
    },
    choosingYourTalents() {
      return ChoosingYourTalents
    },
    choosingYourAppearance() {
      return ChoosingYourAppearance
    },
    creatingYourBackground() {
      return CreatingYourBackground
    },
    finalizingYourCharacter() {
      return FinalizingYourCharacter
    },
  },
})
</script>

<style scoped lang="scss">
a {
}
</style>
