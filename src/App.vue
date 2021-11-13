<template>
  <v-app id="app" style="background: #c6b3b0;">
    <Navbar />
    <router-view />
  </v-app>
</template>

<script>
import Navbar from "@/components/Navbar";

export default {
  name: "app",
  components: { Navbar },
  watch: {
    $route(to, from) {
      document.title = to.meta.title || "Shattered Spirits";
    },
  },
};
</script>
