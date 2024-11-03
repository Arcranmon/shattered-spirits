<template>
  <div class="talent--box">
    <h2>{{ talent.Name }}</h2>
    <div class="page--description">
      <display-tooltip-text style="margin-left: 1em; margin-right: 1em" :string="talent.Desc" />
    </div>
    <div class="header">
      <h4 style="display: flex">Rank 0</h4>
    </div>
    <div class="body">
      <div><display-tooltip-text :string="talent.FeatsHeader(0)" /></div>
      <div><display-tooltip-text :string="talent.DiceHeader(0)" /></div>
      <div><display-tooltip-text :string="talent.PushHeader(0)" /></div>
    </div>
    <div class="header">
      <h4 style="display: flex">Rank I</h4>
    </div>
    <div class="body">
      <div><display-tooltip-text :string="talent.FeatsHeader(1)" /></div>
      <div><display-tooltip-text :string="talent.DiceHeader(1)" /></div>
      <div><display-tooltip-text :string="talent.PushHeader(1)" /></div>
      <div><display-tooltip-text :string="talent.OtherHeader(1)" /></div>
    </div>
    <br />
  </div>
</template>

<script>
import Vue from 'vue'
import { Talent } from '@/class'
import { store } from '@/store'
export default Vue.extend({
  name: 'talent-card',
  props: {
    talent: {
      type: Talent,
      required: true,
    },
  },
})
</script>

<style scoped lang="scss">
.special--box {
  border: $border--black-standard;
  width: 100%;
  background-color: $color--light-parchment;
  font-size: $font-size--m;
  text-align: center;
  margin-top: 1em;
  margin-bottom: 1em;
}
.header {
  background-image: linear-gradient(rgba(0, 0, 0, 0.15) 0 0);
  border-radius: 0em;
  width: 100%;
  height: 4em;
  padding: 1em;
}
.body {
  background-image: linear-gradient(rgba(255, 255, 255, 0.2) 0 0);
  border-right: 2px solid hsla(2, 100%, 0%, 0.2);
  border-left: 2px solid hsla(2, 100%, 0%, 0.2);
  border-bottom: 2px solid hsla(2, 100%, 0%, 0.2);
  padding: 1em;
}
.talent--tier-box {
  background-color: inherit !important;
}
.tier-button {
  background-color: $color--parchment !important;
  margin-left: 2em;
}
.v-expansion-panel {
  max-width: 100%;
}
</style>
