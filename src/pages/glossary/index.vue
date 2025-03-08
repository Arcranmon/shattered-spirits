<template>
  <div style="padding: 1em">
    <h2>Glossary</h2>
    <div v-for="key of glossaryItems.keys()">
      <h3>{{ key }}</h3>
      <div v-for="item of glossaryItems.get(key)" style="padding-bottom: 1em">
        <display-tooltip-text :string="'**' + item.name + ':** ' + item.effect" />
      </div>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { store } from '@/store'
export default Vue.extend({
  name: 'glossary',
  computed: {
    glossaryItems() {
      var glossary = this.$store.getters.getGlossary()
      glossary.sort((a, b) => a.name.localeCompare(b.name))
      var organizedGlossary = new Map()
      for (var item of glossary) {
        if (item.hasOwnProperty('effect')) {
          if (!organizedGlossary.has(item.name[0])) {
            organizedGlossary.set(item.name[0], [])
          }
          organizedGlossary.get(item.name[0]).push(item)
        }
      }
      return organizedGlossary
    },
  },
})
</script>

<style scoped lang="scss">
.skill--box {
  border-radius: 1em;
  border: $border--black-standard;
  margin: auto;
  margin-top: 1em;
  width: 40%;
  align-self: center;
}
</style>
