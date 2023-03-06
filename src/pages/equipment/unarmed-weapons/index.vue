<template>
  <div style="padding: 1em;">
    <h2>Unarmed Weapons</h2>
    <display-tooltip-text class="page--description" :string="weapon_info['Unarmed']" />
    <div class="weapon--box Unarmed-Header">
      <h2>Basic Unarmed Weapons</h2>
      <show-cards :inputs="$store.getters.getWeaponsByFlag('basic_unarmed')" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box Unarmed-Header">
      <h2>Body Weapons</h2>
      <show-cards :inputs="$store.getters.getWeaponByKeywordAndCategory('Body', 'Unarmed')" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box Unarmed-Header">
      <h2>Fist Weapons</h2>
      <show-cards :inputs="$store.getters.getWeaponByKeywordAndCategory('Fist', 'Unarmed')" job="Weapons" :collapse="false" />
    </div>
    <div class="weapon--box Unarmed-Header">
      <h2>Kick Weapons</h2>
      <show-cards :inputs="$store.getters.getWeaponByKeywordAndCategory('Kick', 'Unarmed')" job="Weapons" :collapse="false" />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ShowCards from '@/components/cards/ShowCards.vue'
import UnarmedText from '@/database/text_files/weapons/unarmed.txt'
import { store } from '@/store'
export default Vue.extend({
  name: 'unarmed-weapons',
  components: {
    ShowCards,
  },
  data: () => {
    return {
      weapon_info: {
        Unarmed: UnarmedText,
      },
    }
  },
})
</script>

<style scoped lang="scss">
.weapon--box {
  border: $border--black-standard;
  margin-top: 1em;
}
</style>
