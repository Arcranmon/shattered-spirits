<template>
  <div v-bind:class="useFormatting" inline>
    <div v-bind:class="gear.Category">
      <div v-if="format" class="gear--header">
        <h4 style="display: inline; font-style: normal;">{{ gear.Name }}</h4>
      </div>
      <div v-if="format" class="gear--keywords">
        <i
          ><span v-if="(gear.Desc.length > 0)">{{ gear.Desc }}<br /></span
        ></i>
        <b>
          {{ gear.WeightHeader }}
        </b>
      </div>
      <div class="gear--content">
        <display-tooltip-text :string="gear.EffectHeader" />
        <display-tooltip-text v-if="gear.HasSpecial" :string="gear.SpecialHeader" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Gear } from '@/class'
import DisplayTooltipText from '@/components/DisplayTooltipText'

export default Vue.extend({
  name: 'gear-card',
  props: {
    gear: {
      type: Gear,
      required: true,
    },
    format: {
      type: Boolean,
      required: false,
      default: true,
    },
    on_sheet: {
      type: Boolean,
      required: false,
      default: false,
    },
    character_creation: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  computed: {
    useFormatting: function () {
      if (this.format) return 'gear--wrapper'
    },
    useContent: function () {
      if (this.format) return 'gear--content'
    },
  },
})
</script>

<style scoped lang="scss">
.gear--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
}
.gear--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
  padding-top: $space--xs;
}
.gear--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  border-bottom: 5px black solid;
  padding-bottom: $space--xs;
}
.gear--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
}
.gear--format {
  font-family: $font--standard;
  font-size: $font-size--s;
  padding: none;
  text-align: left;
  color: black;
  white-space: normal !important;
}
.gear--format-no-text {
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
