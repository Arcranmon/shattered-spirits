<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header" v-bind:class="getColor(form)">
        <h4 style="display: inline">{{ form.Name }}</h4>
      </div>
    </div>
    <div class="card--content card--format">
      <display-tooltip-text :string="form.HealthHeader" /><br />
      <display-tooltip-text :string="form.MovementHeader" /><br />
      <display-tooltip-text :string="form.JumpHeader" /><br />
      <div v-if="form.HasDefenses"><display-tooltip-text :string="form.DefensesHeader" /></div>
      <display-tooltip-text :string="form.WeaponsHeader" /><br />
      <display-tooltip-text v-if="form.HasTraits" :string="form.TraitsHeader" /><br v-if="form.HasTraits" />
      <display-tooltip-text v-if="form.HasArmor" :string="form.ArmorHeader" />
    </div>
    <div class="desc--box" v-if="form.Desc.length > 0" style="font-style: italic">{{ form.Desc }}<br /></div>
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
  },
  components: { MovementCard },
  methods: {
    getColor(form) {
      var str = form.Name.split(' ')
      return str[1]
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
