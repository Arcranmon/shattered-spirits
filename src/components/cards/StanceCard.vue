<template>
  <div class="stance--wrapper" inline>
    <div class="stance--color-header" v-bind:class="category">
      <div class="stance--header">
        <h3 style="display: inline; font-style: normal;">{{ stance.Name }}</h3>
      </div>
      <div class="stance--keywords">
        <span v-if="(stance.Desc.length > 0)"
          ><i>{{ stance.Desc }}</i
          ><br
        /></span>
      </div>
    </div>
    <div class="stance--content">
      <div v-if="stance.HasAccumulate">
        <display-tooltip-text :string="stance.AccumulateHeader" />
      </div>
      <div v-if="stance.HasRefresh">
        <display-tooltip-text :string="stance.RefreshHeader" />
      </div>
      <div v-if="stance.HasEffect">
        <display-tooltip-text :string="stance.EffectHeader" />
      </div>
      <div v-if="stance.HasSpecial">
        <display-tooltip-text :string="stance.SpecialHeader" />
      </div>
      <div v-if="stance.HasReaction">
        <display-tooltip-text :string="stance.ReactionHeader" />
      </div>
      <div v-if="stance.HasReaction">
        <display-tooltip-text string="**Reaction:** Gain the following Reaction while in this Stance:" />
        <reaction-card :reaction="$store.getters.getReaction(stance.Reaction)" />
      </div>
      <div v-if="stance.HasEnhancement">
        <display-tooltip-text string="**Enhance:** Gain the following Enhance option while in this Stance:" />
        <enhancement-card :enhancement="$store.getters.getEnhancement(stance.Enhancement)" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import ChartTable from '@/components/ChartTable.vue'
import ReactionCard from './ReactionCard.vue'
import EnhancementCard from './EnhancementCard.vue'
import { Stance } from '@/class'

export default Vue.extend({
  name: 'stance-card',
  props: {
    stance: {
      type: Stance,
      required: true,
    },
    category: {
      type: String,
      required: false,
      default: '#ece6dc',
    },
  },
  components: { ChartTable, EnhancementCard, ReactionCard },
})
</script>

<style scoped lang="scss">
.stance--wrapper {
  font-family: $font--standard;
  background-color: $color--grey-light;
  border: $border--black-standard;
  height: 100%;
}
.stance--color-header {
  border-bottom: 5px double black;
}
.stance--header {
  font-size: $font-size--l;
  text-align: center;
  color: black;
}
.stance--keywords {
  text-align: center;
  font-size: $font-size--s;
  color: black;
  padding-bottom: $space--xs;
}
.stance--content {
  font-size: $font-size--s;
  color: black;
  padding: $space--xs;
  padding-bottom: 0;
}
.stance--reaction-content {
  font-size: $font-size--s;
  color: black;
  padding-left: $space--xs;
  padding-right: $space--xs;
}
.stance--format {
  font-family: $font--standard;
  font-size: $font-size--m;
  padding: none;
  text-align: left;
  color: black;
  display: inline;
  white-space: normal !important;
}
</style>
