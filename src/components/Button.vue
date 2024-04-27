<template>
  <router-link class="btn" v-bind:class="width" :to="to"><slot /> </router-link>
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
.btn {
  display: inline-block;
  margin: 0.5em 0;
  background: $color--light-parchment;
  border: 2px solid black;
  border-radius: 0.2em;
  color: black !important;
  font-family: $font--fancy;
  font-size: 1em;
  font-weight: 700;
  letter-spacing: 0.02em;
  line-height: 1;
  text-decoration: none;
  text-transform: uppercase;
  text-align: center;
  cursor: pointer;
  transition: 0.3s;
  padding: 5px;
  height: auto;
  width: auto;
  min-width: 20vw;
}
.btn-mobile {
  min-width: 40vw !important;
}
.btn:hover {
  background: #ece6dc;
}
</style>
