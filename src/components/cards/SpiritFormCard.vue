<template>
  <div class="spirit-box--wrapper" inline>
    <div class="spirit-box--underline-top">
      <div class="spirit-box--header" v-bind:class="header_color">
        <h4 style="display: inline;">{{ form.Name }}</h4>
        <div style="font-style: italic;">{{ form.Desc }}</div>
      </div>
    </div>
    <div class="spirit-box--content spirit-box--format">
      <display-tooltip-text :string="form.SizeHeader" /><br />
      <display-tooltip-text :string="form.HealthHeader" /><br />
      <display-tooltip-text :string="form.WeaponsHeader" /><br />
      <display-tooltip-text :string="form.BonusAttackHeader" /><br />
      <display-tooltip-text v-if="form.HasTraits" :string="form.TraitsHeader" /><br v-if="form.HasTraits" />
      <display-tooltip-text v-if="form.HasArmor" :string="form.ArmorHeader" /><movement-card
        :movement="$store.getters.getMovement(form.Movement)"
        :npc="true"
      />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { SpiritForm } from '@/class'
import MovementCard from '@/components/cards/MovementCard.vue'

export default Vue.extend({
  name: 'spirit-form-card',
  props: {
    form: {
      type: SpiritForm,
      required: true,
    },
    header_color: {
      type: String,
      required: true,
    },
  },
  components: { MovementCard },
})
</script>

<style scoped lang="scss">
.spirit-box--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-lighter;
  border: $border--black-standard;
  height: 100%;
  padding-bottom: $space--xs;
}
.spirit-box--type {
  font-family: $font--fancy !important;
}
.spirit-box--header {
  padding-top: $space--xs;
  height: 100%;
  text-align: center;
  color: black;
}
.spirit-box--underline-top {
  border-bottom: 5px solid black;
}
.spirit-box--content {
  color: black;
  padding: $space--xs;
}
.spirit-box--text-format {
  font-size: $font-size--m;
}
.spirit-box--format {
  font-family: $font--standard;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
</style>
