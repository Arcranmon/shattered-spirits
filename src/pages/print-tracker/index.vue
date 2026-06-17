<template>
  <div class="print-page">
    <div
      style="top: -0.75in; left: 0.25in"
      class="token-wrapper">
      <div class="token-circle" />
      <div class="token-text"><b>Momentum</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite, gain 2 Guard per Momentum lost.
      </div>
    </div>

    <div
      style="top: -0.75in; right: 0.25in"
      class="token-wrapper">
      <div class="token-circle" />
      <div class="token-text"><b>Movement</b></div>
      <div
        class="token-text"
        style="font-style: italic">
        Lost at Respite.
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default Vue.extend({
  name: 'print',
  components: {},
  mounted() {
    window.onresize = () => {
      this.windowWidth = window.innerWidth
    }
  },
})
</script>

<style scoped lang="scss">
@media print {
  @page {
    size: landscape;
  }
}
.token-wrapper {
  width: 1.6in;
  position: absolute;
}
.token-text {
  text-align: center;
  font-size: 10px;
}
.token-circle {
  width: 1.6in;
  height: 1.6in;
  border-radius: 50%;
  border: $border--black-thin;
}
</style>
