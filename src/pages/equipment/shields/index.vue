<template>
  <div style="padding: 1em;" weapon_class in weapon_classes>
    <div v-for="(_, weapon_class) in weapon_info">
      <div class="weapon--box" v-bind:class="weapon_class + '-Header'">
        <h2>{{ weapon_class }}</h2>
        <display-tooltip-text class="page--description" :string="weapon_info[weapon_class]" />
        <show-cards :inputs="$store.getters.getWeaponsByCategory(weapon_class)" job="Attacks" :collapse="false" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import ShieldText from '@/database/text_files/weapons/shield.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'weapons',
  components: {
    ShowCards,
  },
  data: () => {
    return {
      weapon_info: {
        Shield: ShieldText,
      },
    }
  },
})
</script>

<style scoped lang="scss">
.weapon--box {
  border: $border--black-standard;
  margin-top: -2px;
}
</style>
