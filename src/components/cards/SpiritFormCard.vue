<template>
  <div
    class="card--wrapper"
    inline>
    <div class="card--underline-top">
      <div
        class="card--header"
        v-bind:class="getColor(form)">
        <h4 style="display: inline">{{ form.Name }}</h4>
      </div>
    </div>
    <div class="card--content card--format">
      <v-row no-gutters>
        <v-col :cols="6">
          <display-tooltip-text :string="form.BlockHeader" />
          <br />
          <display-tooltip-text :string="form.StaminaHeader" />
          <br />
          <div v-if="form.HasDefenses">
            <display-tooltip-text :string="form.DefensesHeader" />
          </div>
        </v-col>
        <v-col :cols="6">
          <display-tooltip-text :string="form.MovementHeader" />
          <br />
          <display-tooltip-text :string="form.RangeHeader" />
          <br />
          <display-tooltip-text :string="form.WeaponsHeader" />
          <br />
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col :cols="6">
          <div v-if="form.HasTraits">
            <display-tooltip-text :string="form.TraitsHeader" />
          </div>
        </v-col>
      </v-row>
    </div>
    <div
      class="desc--box"
      v-if="form.Desc.length > 0"
      style="font-style: italic">
      {{ form.Desc }}<br />
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { SpiritForm } from '@/class'

export default Vue.extend({
  name: 'spirit-form-card',
  props: {
    form: {
      type: SpiritForm,
      required: true,
    },
  },
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
