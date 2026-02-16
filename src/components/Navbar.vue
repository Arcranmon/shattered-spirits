<template>
  <div>
    <div class="nav--wrapper">
      <router-link to="/">
        <span class="nav--text">Shattered Spirits</span>
      </router-link>
      <about class="about d-none d-lg-block" />
    </div>
  </div>
</template>

<script>
import About from './About'
export default {
  name: 'navbar',
  data() {
    return {
      popupActive: false,
    }
  },
  components: {
    About,
  },
}
</script>
<style scoped lang="scss">
a {
  text-decoration: none !important;
}
.nav--wrapper {
  background-color: $color--parchment;
  border-bottom: thick double black;
  align-items: center;
  min-height: 50px;
  overflow: hidden;
  display: flex;
  align-items: center;
}
.nav--text {
  font-family: $font--fancy;
  color: black;
  font-size: 3em;
  -webkit-text-stroke-width: 1px;
}
.nav--text-mobile {
  font-family: $font--fancy;
  color: black;
  font-size: 3em;
  -webkit-text-stroke-width: 1px;
}
.about {
  font-family: $font--fancy;
  margin-left: auto;
  margin-right: 1em;
  color: black;
}
</style>
