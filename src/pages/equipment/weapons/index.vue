<template>
  <div style="padding: 1em;" weapon_class in weapon_classes>
    <div v-for="(_, weapon_class) in weapon_info">
      <div class="weapon--box" v-bind:class="weapon_class + '-Header'">
        <h2>{{ weapon_class }}</h2>
        <display-tooltip-text class="page--description" :string="weapon_info[weapon_class]" />
        <show-cards :inputs="$store.getters.getWeaponsByCategory(weapon_class)" job="Weapons" :collapse="true" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import BladesText from '@/database/text_files/weapons/blades.txt'
import BluntsText from '@/database/text_files/weapons/blunts.txt'
import ImprovisedText from '@/database/text_files/weapons/improvised.txt'
import LancesText from '@/database/text_files/weapons/lances.txt'
import ProjectileText from '@/database/text_files/weapons/projectile.txt'
import UnarmedText from '@/database/text_files/weapons/unarmed.txt'
import ShieldText from '@/database/text_files/weapons/shield.txt'
import ThrowingText from '@/database/text_files/weapons/throwing.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'weapons',
  components: {
    ShowCards,
  },
  data: () => {
    return {
      weapon_info: {
        Improvised: ImprovisedText,
        Unarmed: UnarmedText,
        Blade: BladesText,
        Blunt: BluntsText,
        Lance: LancesText,
        Projectile: ProjectileText,
        Throwing: ThrowingText,
        Shield: ShieldText,
      },
    }
  },
})
</script>

<style scoped lang="scss">
.weapon--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
