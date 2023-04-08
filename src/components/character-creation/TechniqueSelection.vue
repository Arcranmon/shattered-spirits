<template
  ><span>
    <display-tooltip-text :string="creationText" />
    <br />
    <v-layout justify-center>
      <div class="button-separator">
        <v-btn color="success" large tile @click="$emit('chose-techs')" :disabled="!character.HasAllTechniques">
          <span v-if="!character.HasAllTechniques">CHOOSE YOUR TECHNIQUES</span>
          <span v-else>ACCEPT TECHNIQUES</span>
        </v-btn>
      </div></v-layout
    >
    <div class="centered--formatted">
      <display-tooltip-text :string="'You may select up to an additional ' + character.TechniquesRemaining + ' Techniques!'" />
      <div :v-if="!character.HasSpirit">
        <display-tooltip-text string="Character must have a Spirit selected to choose Spirit Techniques!" />
      </div>
    </div>
    <v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Spirit Techniques</h4>
          <show-cards
            :inputs="charSpiritTechniques"
            job="Techniques"
            :collapse="false"
            :cols="1"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="removeSpiritTech"
        /></v-col>
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <span v-for="discipline in spiritDisciplines" :key="discipline.name">
            <show-cards
              :inputs="$store.getters.getTechniquesFromList(discipline.Techniques)"
              job="Techniques"
              :cols="2"
              :card_color="character.SpiritType"
              :header_color="discipline.Name"
              :display_text="discipline.Name"
              :summary_text="discipline.Summary"
              standalone_or_contained="Standalone"
              :character_creation="true"
              :selectButton="true"
              @chose="addSpiritTech" /></span
        ></v-col> </v-row></v-container
    ><v-container class="fill-height" fluid>
      <v-row>
        <v-col cols="4" class="selected--box">
          <h4>Current Skill Techniques</h4>
          <show-cards
            :inputs="charSkillTechniques"
            job="Techniques"
            :collapse="false"
            :cols="1"
            standalone_or_contained="Standalone"
            :selectButton="true"
            @chose="removeSkillTech"
        /></v-col>
        <v-col cols="8" class="selecting--box ma-0 pa-0">
          <span v-for="discipline in skillDisciplines" :key="discipline.name">
            <show-cards
              :inputs="$store.getters.getTechniquesFromList(discipline.Techniques)"
              job="Techniques"
              :cols="2"
              :header_color="discipline.Name"
              :display_text="discipline.Name"
              :summary_text="discipline.Summary"
              standalone_or_contained="Standalone"
              :character_creation="true"
              :selectButton="true"
              @chose="addSkillTech" /></span
        ></v-col> </v-row></v-container
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
    skillDisciplines: function () {
      return [...this.$store.getters.getDisciplinesByCategory('Weapon'), ...this.$store.getters.getDisciplinesByCategory('Armor')]
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
      return TechniqueSelectionText
    },
  },
  methods: {
    addSkillTech: function (variable) {
      this.character.AddSkillTech(variable.card)
    },
    addSpiritTech: function (variable) {
      this.character.AddSpiritTech(variable.card)
    },
    removeSkillTech(variable) {
      this.character.RemoveSkillTech(variable.card)
    },
    removeSpiritTech(variable) {
      this.character.RemoveSpiritTech(variable.card)
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
.button-separator {
  margin-bottom: 1em;
}
.stance--box {
  margin-top: 1em;
  margin-bottom: 1em;
}
</style>
