<template>
  <router-link class="btn" :to="to" :custom="true"><slot /> </router-link>
</template>

<script>
export default {
  props: {
    to: {
      type: String,
      default: null,
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
  background: $color--off-white;
  border: 2px solid black;
  border-radius: 10px;
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
  min-width: 20%;
  width: auto;
  height: auto;
}
.btn:hover {
  background: #ece6dc;
}
</style>
