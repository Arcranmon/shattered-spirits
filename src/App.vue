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
      document.title = to.title || 'Blahblahblah'
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
.text--miss {
  color: $color--chart-miss;
}
.text--graze {
  color: $color--chart-graze;
}
.text--hit {
  color: $color--chart-hit;
}
.text--crit {
  color: $color--chart-crit;
}
.earth-border {
  border: thick solid $color--earth;
}
.circle {
  height: 30em;
  border-radius: 50%;
  float: left;
  display: block;
  margin-right: 2em;
}
.circle-mobile {
  height: 30em;
  border-radius: 50%;
  display: block;
  margin-right: auto;
  margin-left: auto;
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
