<template
  ><span>
    <div class="character-creation">
      <span v-html="creationText" />
    </div>
    <br />
    <v-layout justify-center>
      <div class="button-seperator">
        <v-btn color="success" large tile @click="$emit('chose-techs')" :disabled="!character.HasAllTechniques">
          <span v-if="!character.HasAllTechniques">CHOOSE YOUR TECHNIQUES</span>
          <span v-else>ACCEPT TECHNIQUES</span>
        </v-btn>
      </div></v-layout
    >
    You may select up to an additional
    {{ character.TechniquesRemaining }} techniques!
    <div :v-if="!character.HasSpirit">
      Character must have a spirit selected to choose spirit techniques!
    </div>
    <div class="stance--box">
      <show-cards
        :inputs="charSpiritTechniques"
        job="Techniques"
        :collapse="true"
        display_text="Selected Spirit Techniques"
        standalone_or_contained="Standalone"
        :selectButton="true"
        :color_category="character.SpiritType"
        @chose="removeSpiritTech"
      />
    </div>
    <v-row
      ><v-col cols="3">
        <v-select
          label="Choose a Technique!"
          :items="spiritTechniques"
          :item-text="(item) => item.Name + ' (' + item.Discipline + ')'"
          hide-details
          v-model="spirit_technique"
          outlined
          return-object
          @change="$emit('chose', spirit_technique)" /></v-col
      ><v-col cols="9">
        <v-layout justify-center>
          <v-btn
            color="success"
            class="button-seperator"
            large
            tile
            @click="addSpiritTech(spirit_technique)"
            :disabled="spirit_technique.Name == '' || character.HasAllTechniques || character.SpiritTechniques.includes(spirit_technique.Name)"
          >
            <span v-if="spirit_technique.Name == ''">Select a technique on the left!</span>
            <span v-else>ADD {{ spirit_technique.Name }}</span>
          </v-btn></v-layout
        >
        <div>
          <tech-card
            :tech="spirit_technique"
            v-if="(spirit_technique.Name !='' || character.HasAllTechniques )"
            :category="character.SpiritType"
          /></div></v-col
    ></v-row>
    <div class="stance--box">
      <show-cards
        :inputs="charSkillTechniques"
        job="Techniques"
        :collapse="true"
        display_text="Selected Skill Techniques"
        standalone_or_contained="Standalone"
        :selectButton="true"
        @chose="removeSkillTech"
      />
    </div>
    <v-row
      ><v-col cols="3">
        <v-select
          label="Choose Skill Techniques!"
          :items="skillTechniques"
          :item-text="(item) => item.Name + ' (' + item.Discipline + ')'"
          hide-details
          v-model="skill_technique"
          outlined
          return-object
          @change="$emit('chose', skill_technique)" /></v-col
      ><v-col cols="9">
        <v-layout justify-center>
          <v-btn
            color="success"
            class="button-seperator"
            large
            tile
            @click="addSkillTech(skill_technique)"
            :disabled="skill_technique.Name == '' || character.HasAllTechniques || character.SkillTechniques.includes(skill_technique.Name)"
          >
            <span v-if="skill_technique.Name == ''">Select a technique on the left!</span>
            <span v-else>ADD {{ skill_technique.Name }}</span>
          </v-btn></v-layout
        >
        <div>
          <tech-card :tech="skill_technique" v-if="(skill_technique.Name !='' )" /></div></v-col></v-row
  ></span>
</template>
<script>
import Vue from 'vue'

import { store } from '@/store'
import { Character, Technique } from '@/class'
import ShowCards from '@/components/cards/ShowCards.vue'
import TechCard from '@/components/cards/TechCard.vue'
import TechniqueSelectionText from '@/database/text_files/character_creation/choosing_your_techniques.txt'

export default Vue.extend({
  name: 'technique-selection',
  components: { TechCard, ShowCards },
  props: {
    character: {
      type: Character,
      required: true,
    },
  },
  data: () => {
    return {
      skill_technique: new Technique(),
      spirit_technique: new Technique(),
    }
  },
  computed: {
    spiritDisciplines: function () {
      return this.$store.getters.getDisciplinesByCategory(this.character.SpiritType)
    },
    spiritTechniques: function () {
      var techniques = []
      for (var disc of this.spiritDisciplines) {
        techniques = techniques.concat(this.$store.getters.getTechniquesFromList(disc.Techniques))
      }
      return techniques
    },
    skillTechniques: function () {
      return this.$store.getters.getAllSkillTechniques()
    },
    charSpiritTechniques: function () {
      return this.$store.getters.getTechniquesFromList(this.character.SpiritTechniques)
    },
    charSkillTechniques: function () {
      return this.$store.getters.getTechniquesFromList(this.character.SkillTechniques)
    },
    spirit: function () {
      return this.character.SpiritType
    },
    creationText: function () {
      return this.$marked.parse(TechniqueSelectionText)
    },
  },
  methods: {
    addSkillTech: function (variable) {
      this.character.AddSkillTech(variable)
    },
    addSpiritTech: function (variable) {
      this.character.AddSpiritTech(variable)
    },
    removeSkillTech(variable) {
      this.character.RemoveSkillTech(variable.card, variable.index)
    },
    removeSpiritTech(variable) {
      this.character.RemoveSpiritTech(variable.card, variable.index)
    },
  },
  watch: {
    spirit: function (v) {
      this.spirit_technique = new Technique()
    },
  },
})
</script>

<style scoped lang="scss">
.button-seperator {
  margin-bottom: 1em;
}
.character-creation {
  font-size: smaller;
}
.stance--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
