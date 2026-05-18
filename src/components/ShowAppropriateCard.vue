<template>
  <div>
    <span v-if="input instanceof GlossaryItem"> <display-tooltip-text :string="input.DisplayText" /> </span>
    <span v-if="input instanceof Weapon">
      <weapon-widget
        :weapon="input"
        :format_text="true"
        class="object rounded-corner" />
    </span>
    <span v-if="input instanceof Ability || input instanceof AbilityPackage">
      <base-widget
        :ability="input"
        :format_text="true"
        class="object rounded-corner" />
    </span>
  </div>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
import BaseWidget from './BaseWidget.vue'
import WeaponWidget from './cards/WeaponWidget.vue'
import AbilityWidget from './AbilityWidget.vue'
import { Ability, AbilityPackage, Equipment } from '@/class'
export default Vue.extend({
  name: 'tooltip',
  components: { BaseWidget, WeaponWidget, AbilityWidget },
  props: {
    input: {
      required: true,
    },
  },
  computed: {
    isGlossaryItem() {
      return this.input instanceof GlossaryItem
    },
  },
})
</script>

<style scoped lang="scss">
.object {
  padding: 0px;
  border: none;
  font-size: $font-size--m;
  background-color: $color--off-white;
}
.rounded-corner {
  border-top-left-radius: 1.5em;
}
</style>
