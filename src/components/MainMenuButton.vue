<template>
  <div class="button-wrapper">
    <router-link class="btn" v-bind:class="width" :to="to">
      <img src="@/assets/weapons/BladeRotate.svg" class="blade" />
      <div class="text"><slot /></div>
    </router-link>
  </div>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null,
    },
  },
  computed: {
    width() {
      if (this.isMobile) {
        return 'btn-mobile'
      }
      return ''
    },
  },
}
</script>

<style scoped lang="scss">
a {
  text-decoration: none;
  color: black;
}
.button-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}
.btn {
  display: inline-block;
  margin: 0.5em 0;
  background: $color--light-parchment;
  color: black !important;
  font-family: $font--fancy;
  border: 4px double black;
  border-top-left-radius: 0.2em;
  border-bottom-left-radius: 0.2em;
  font-size: 2em;
  letter-spacing: 0.02em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: left;
  cursor: pointer;
  transition: 0.3s;
  padding: 5px;
  height: auto;
  width: 100%;
  min-width: 20vw;
}
.btn-mobile {
  min-width: 40vw !important;
}
.btn:hover {
  background: #ece6dc;
}
.blade {
  float: left;
  height: 1em;
  top: 50%;
}
.text {
  margin-left: 6em;
}
</style>
