<template>
  <v-app id="app" style="background: #c6b3b0;">
    <div><Navbar /></div>
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  components: { Navbar },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "Shattered Spirits";
    },
  },
};
</script>
