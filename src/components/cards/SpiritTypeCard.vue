<template>
  <div inline>
    <div
      class="ability--head"
      v-bind:class="type.Name"
      style="width: 100%">
      <img
        v-if="type.HasIcon"
        :src="type.Icon"
        style="height: 1.5em; padding-right: 0.25em; margin-bottom: -0.25em" />
      <display-tooltip-text :string="type.Name" />
    </div>
    <div class="card--content">
      <div
        v-if="type.Desc.length > 0"
        style="font-style: italic">
        {{ type.Desc }}<br />
      </div>
      <div
        class="chart--wrapper"
        inline>
        <v-row
          no-gutters
          class="chart--row">
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Speed_"
              :decorate="false" />
          </v-col>
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Stamina_"
              :decorate="false" />
          </v-col>
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Stun_"
              :decorate="false" />
          </v-col>
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Movement_"
              :decorate="false" />
          </v-col>
        </v-row>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row"
          style="border-top: none">
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Speed }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Stamina }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            cols="2">
            {{ type.Stun }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Movement }}</v-col
          >
        </v-row>
        <v-row
          no-gutters
          class="chart--row"
          style="border-top: none">
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Block_"
              :decorate="false" />
          </v-col>
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Focus_"
              :decorate="false" />
          </v-col>
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Grit_"
              :decorate="false" />
          </v-col>
          <v-col
            class="chart--head"
            cols="2">
            <display-tooltip-text
              string="_Reflex_"
              :decorate="false" />
          </v-col>
        </v-row>
        <v-row
          align="stretch"
          no-gutters
          class="chart--row">
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Defenses.Block }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Defenses.Focus }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Defenses.Grit }}</v-col
          >
          <v-col
            class="chart--cols justify-center align-center"
            cols="2"
            >{{ type.Defenses.Reflex }}</v-col
          >
        </v-row>
      </div>
      <display-tooltip-text :string="type.ManifestHeader" />
      <br />
    </div>
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
