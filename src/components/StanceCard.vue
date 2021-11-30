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
      <tooltipped-text
        v-if="stance.HasAccumulate"
        :input="stance.AccumulateArray"
        :itallic="true"
      />
      <tooltipped-text
        v-if="stance.Refresh"
        :input="stance.RefreshArray"
        :itallic="true"
      />
      <tooltipped-text
        v-if="stance.HasEffect"
        :input="stance.EffectArray"
        :itallic="true"
      />
      <tooltipped-text
        v-if="stance.HasSpecial"
        :input="stance.SpecialArray"
        :itallic="true"
      />
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { Stance } from "@/class";
import TooltippedText from "./TooltipTextFromArray.vue";

export default Vue.extend({
  name: "stance-card",
  props: {
    stance: {
      type: Stance,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  components: { TooltippedText },
});
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
.Earth {
  background-color: $color--earth;
}
</style>
