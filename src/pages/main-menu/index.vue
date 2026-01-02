<template>
  <div>
    <v-row>
      <v-col>
        <main-menu-button to="/world-menu">The Shattered World</main-menu-button>
        <main-menu-button to="/rules-menu">Rules</main-menu-button>
        <main-menu-button to="/character-options">Character Options</main-menu-button>
        <!-- 
        <main-menu-button to="/equipment">Equipment</main-menu-button> <br />
<custom-button to="/character-creator">Character Creator (WIP)</custom-button> <br /> --->
        <main-menu-button to="/character-manager">Character Manager (WIP)</main-menu-button> </v-col
      ><v-col cols="6">
        <display-tooltip-text :string="welcomeText" style="position: static; margin: 1em" />
        <div style="justify-content: center; display: flex">
          <img :src="$jenna" class="earth-border" style="justify-content: center; display: flex; width: 60%" />
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Vue from 'vue'
import MainMenuButton from '@/components/MainMenuButton.vue'
import WelcomeText from '@/database/text_files/welcome.txt'

export default Vue.extend({
  name: 'main-menu',
  components: {
    MainMenuButton,
  },
  computed: {
    welcomeText: function () {
      return this.$marked.parse(WelcomeText)
    },
    jennaArt: function () {
      return require('@/assets/art/Jenna.png')
    },
  },
})
</script>

<style scoped lang="scss">
.a {
}
</style>
