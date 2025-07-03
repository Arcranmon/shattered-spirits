<template>
  <div class="card--wrapper" inline>
    <div class="card--underline-top">
      <div class="card--header" v-bind:class="type.Name">
        <div>
          <h4 style="display: inline">{{ type.Name }}</h4>
        </div>
        <div>
          <b><display-tooltip-text :string="type.SpiritType" :decorate="false" /></b>
        </div>
        <div></div>
      </div>
    </div>
    <div class="card--content">
      <v-row no-gutters>
        <v-col :cols="6">
          <display-tooltip-text :string="type.MovementHeader" /><br />
          <display-tooltip-text :string="type.RangeHeader" /><br />
          <display-tooltip-text :string="type.HealthHeader" /><br />
          <display-tooltip-text :string="type.Defenses.DefensesHeader" />
        </v-col>
        <v-col :cols="6"> </v-col>
      </v-row>
      <div v-if="type.Defenses.HasResistances">
        <display-tooltip-text :string="type.Defenses.ResistancesHeader" />
      </div>
      <div v-if="type.Defenses.HasWeaknesses">
        <display-tooltip-text :string="type.Defenses.WeaknessesHeader" />
      </div>
      <b>Traits: </b>
      <span v-for="(trait, index) in type.Traits" :key="index"> <display-tooltip-text :string="trait.replace('/', '_/_')" /></span>
    </div>
    <div class="desc--box" v-if="type.Desc.length > 0" style="font-style: italic">{{ type.Desc }}<br /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import { SpiritType } from '@/class'
import BasicTable from '@/components/BasicTable.vue'

export default Vue.extend({
  name: 'spirit-type-card',
  props: {
    type: {
      type: SpiritType,
      required: true,
    },
  },
  components: { BasicTable },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
