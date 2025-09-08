<template>
  <div class="skill-tree">
    <div class="node" v-bind:class="element"><display-tooltip-text :string="skillTree[element].root" /></div>
    <img class="image--header-left" src="@/assets/Arrow.svg" />
    <div class="node" v-bind:class="element"><display-tooltip-text :string="skillTree[element].level_one[0].name" /></div>
  </div>
</template>

<script>
import Vue from 'vue'
import SkillTreeJson from '@/database/skill_trees.json'
export default Vue.extend({
  name: 'skill-tree',
  props: {
    element: { type: String, required: true },
  },
  data() {
    return {
      skillTree: SkillTreeJson,
    }
  },
})
</script>

<style scoped lang="scss">
.node {
  border: $border--black-standard;
  width: 6em;
  height: 6em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.skill-tree {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
