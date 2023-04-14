<template>
  <v-app id="app" class="background--color" v-bind:class="fontType">
    <div><Navbar /></div>
    <router-view />
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  components: { Navbar },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || 'Shattered Spirits'
    },
  },
  computed: {
    fontType() {
      if (screen.width <= 760) {
        return 'mobile--font'
      }
      return ''
    },
  },
}
</script>

<style lang="scss">
.mobile--font {
  font-size: calc(1px + 2vw);
}
.earth-circle {
  height: 30em;
  border-radius: 50%;
  float: left;
  display: block;
  border: thick solid $color--earth;
  margin-right: 2em;
}
.earth-circle-mobile {
  height: 30em;
  border-radius: 50%;
  display: block;
  border: thick solid $color--earth;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
