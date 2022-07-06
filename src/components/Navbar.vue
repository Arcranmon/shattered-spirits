<template>
  <div class="nav--wrapper">
    <router-link to="/"
      ><span class="nav--text">Shattered Spirits</span></router-link
    >
  </div>
</template>

<script>
export default {
  name: "navbar",
};
</script>

<style scoped lang="scss">
a {
  text-decoration: none !important;
}
.nav--wrapper {
  background-color: $color--nav;
  align-items: center;
  min-height: 50px;
  overflow: hidden;
  width: 100%;
  position: sticky;
}
.nav--text {
  font-family: $font--nav;
  color: white;
  font-size: 3em;
}
</style>
